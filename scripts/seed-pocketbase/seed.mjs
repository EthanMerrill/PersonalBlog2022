#!/usr/bin/env node
// Seeds the portfolio_timeline_items collection on PocketBase from items.json.
// Node 22+, no dependencies. See README.md in this folder.

import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ITEMS_FILE = path.join(HERE, "items.json");
const IMAGE_DIR = path.join(HERE, "images");

const COLLECTION = "portfolio_timeline_items";
const SUPERUSER_AUTH = "/api/collections/_superusers/auth-with-password";
const KINDS = new Set(["experience", "project"]);
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // contract: 5MB
const IMAGE_TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};
const DATE_FIELDS = ["start_date", "end_date"];
const LINK_FIELDS = ["ext_link", "repo_link"];
const FIELDS = [
  "legacy_id", "kind", "title", "subtitle", "blurb", "start_date", "end_date",
  "ext_link", "repo_link", "image_alt", "tech", "published", "sort_weight",
];

const KNOWN_FLAGS = new Set(["--dry-run", "--update", "--force-images"]);
const args = process.argv.slice(2);
const unknownArgs = args.filter((a) => !KNOWN_FLAGS.has(a));
if (unknownArgs.length) {
  console.error(`error: unknown argument(s): ${unknownArgs.join(", ")}`);
  console.error("usage: seed.mjs [--dry-run] [--update [--force-images]]");
  process.exit(1);
}
const DRY_RUN = args.includes("--dry-run");
// Default is create-only: records that already exist are left alone, so edits
// made in the PocketBase admin UI (e.g. end dates) survive a re-run.
// --update overwrites existing records from items.json.
const UPDATE = args.includes("--update");
const FORCE_IMAGES = args.includes("--force-images");
if (FORCE_IMAGES && !UPDATE) {
  console.error("error: --force-images only applies with --update");
  process.exit(1);
}

// ---------- validation (runs for every mode, before any network call) ----------

function checkLength(errs, name, value, max) {
  if (value != null && (typeof value !== "string" || value.length > max)) {
    errs.push(`${name} must be a string of at most ${max} characters`);
  }
}

async function checkImage(file) {
  const errs = [];
  const ext = path.extname(file).toLowerCase();
  if (!IMAGE_TYPES[ext]) errs.push(`image ${file}: extension must be one of ${Object.keys(IMAGE_TYPES).join(", ")}`);
  try {
    const info = await stat(path.join(IMAGE_DIR, file));
    if (!info.isFile()) errs.push(`image ${file}: not a regular file in images/`);
    else if (info.size > MAX_IMAGE_BYTES) errs.push(`image ${file}: ${info.size} bytes exceeds the 5MB limit`);
    return { errs, bytes: info.size };
  } catch {
    errs.push(`image ${file}: not found in images/`);
    return { errs, bytes: null };
  }
}

async function validateItem(item, index) {
  const errs = [];
  if (!item || typeof item !== "object") return [`item ${index}: not an object`];
  if (typeof item.legacy_id !== "string" || !item.legacy_id || item.legacy_id.length > 50) {
    errs.push("legacy_id must be a non-empty string of at most 50 characters");
  }
  if (!KINDS.has(item.kind)) errs.push(`kind must be one of ${[...KINDS].join(", ")}`);
  if (typeof item.title !== "string" || !item.title.trim() || item.title.length > 200) {
    errs.push("title must be a non-empty string of at most 200 characters");
  }
  checkLength(errs, "subtitle", item.subtitle, 300);
  checkLength(errs, "blurb", item.blurb, 4000);
  checkLength(errs, "image_alt", item.image_alt, 300);
  for (const f of DATE_FIELDS) {
    if (item[f] != null && !/^\d{4}-\d{2}-\d{2}$/.test(item[f])) errs.push(`${f} must be YYYY-MM-DD or null`);
  }
  for (const f of LINK_FIELDS) {
    if (item[f] != null && !/^https?:\/\//.test(item[f])) errs.push(`${f} must be an http(s) URL or null`);
  }
  if (!Array.isArray(item.tech) || item.tech.some((t) => typeof t !== "string")) {
    errs.push("tech must be an array of strings");
  }
  if (typeof item.published !== "boolean") errs.push("published must be true or false");
  if (typeof item.sort_weight !== "number") errs.push("sort_weight must be a number");
  if (item.image != null) {
    if (typeof item.image !== "string" || item.image.includes("/") || item.image.includes("\\")) {
      errs.push("image must be a bare filename in images/ or null");
    } else {
      const { errs: imgErrs } = await checkImage(item.image);
      errs.push(...imgErrs);
    }
  }
  const label = `items[${index}] (${item.legacy_id ?? "no legacy_id"})`;
  return errs.map((e) => `${label}: ${e}`);
}

async function loadAndValidate() {
  let items;
  try {
    items = JSON.parse(await readFile(ITEMS_FILE, "utf8"));
  } catch (err) {
    throw new Error(`cannot read ${ITEMS_FILE}: ${err.message}`);
  }
  if (!Array.isArray(items)) throw new Error("items.json must contain an array");

  const problems = [];
  const seen = new Set();
  for (const [i, item] of items.entries()) {
    problems.push(...(await validateItem(item, i)));
    if (item?.legacy_id) {
      if (seen.has(item.legacy_id)) problems.push(`duplicate legacy_id ${item.legacy_id}`);
      seen.add(item.legacy_id);
    }
  }
  return { items, problems };
}

// ---------- payload building ----------

const toPbDate = (d) => `${d} 00:00:00.000Z`;

// Create: nulls are omitted. Update: nulls clear the field (JSON null, or "" in multipart).
function buildJsonBody(item) {
  const body = {};
  for (const f of FIELDS) {
    const v = item[f];
    if (v === null || v === undefined) {
      body[f] = null;
    } else if (DATE_FIELDS.includes(f)) {
      body[f] = toPbDate(v);
    } else {
      body[f] = v;
    }
  }
  return body;
}

function buildMultipartBody(item, isCreate) {
  const form = new FormData();
  for (const f of FIELDS) {
    const v = item[f];
    if (v === null || v === undefined) {
      if (!isCreate) form.append(f, "");
      continue;
    }
    if (DATE_FIELDS.includes(f)) form.append(f, toPbDate(v));
    else if (Array.isArray(v)) form.append(f, JSON.stringify(v));
    else form.append(f, String(v));
  }
  return form;
}

async function appendImage(form, file) {
  const bytes = await readFile(path.join(IMAGE_DIR, file));
  const type = IMAGE_TYPES[path.extname(file).toLowerCase()];
  form.append("image", new Blob([bytes], { type }), path.basename(file));
  return form;
}

// ---------- PocketBase client ----------

function makeClient(baseUrl, token) {
  async function call(method, apiPath, { query, body, json } = {}) {
    const url = new URL(apiPath, baseUrl);
    if (query) url.search = new URLSearchParams(query).toString();
    const headers = {};
    if (token) headers.Authorization = token;
    let payload;
    if (json !== undefined) {
      headers["Content-Type"] = "application/json";
      payload = JSON.stringify(json);
    } else if (body !== undefined) {
      payload = body; // FormData sets its own content-type
    }
    const res = await fetch(url, { method, headers, body: payload });
    const text = await res.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      /* non-JSON error page */
    }
    if (!res.ok) {
      const detail = data?.message ?? text.slice(0, 200);
      throw new Error(`${method} ${apiPath} failed: HTTP ${res.status} ${detail}`);
    }
    return data;
  }
  return call;
}

async function authenticate(baseUrl, email, password) {
  const anon = makeClient(baseUrl, null);
  const data = await anon("POST", SUPERUSER_AUTH, { json: { identity: email, password } });
  if (!data?.token) throw new Error("superuser auth succeeded but returned no token");
  return data.token;
}

async function findByLegacyId(call, legacyId) {
  const escaped = legacyId.replace(/["\\]/g, "\\$&");
  const data = await call("GET", `/api/collections/${COLLECTION}/records`, {
    query: { filter: `legacy_id="${escaped}"`, perPage: "2" },
  });
  if (data.items.length > 1) throw new Error(`more than one record has legacy_id ${legacyId}`);
  return data.items[0] ?? null;
}

// ---------- main ----------

async function runDryRun(items) {
  console.log(`dry-run: ${items.length} items from items.json. No network calls, no writes.`);
  for (const [i, item] of items.entries()) {
    const imgNote = item.image
      ? `image=${item.image} (uploaded on create${FORCE_IMAGES ? "; re-uploaded on update" : ""})`
      : "image=none";
    console.log(
      `  [${String(i + 1).padStart(2)}] ${item.kind.padEnd(10)} ${item.legacy_id}  "${item.title}"  ` +
        `published=${item.published}  ${imgNote}`,
    );
    console.log(`       -> create if legacy_id is missing, otherwise ${UPDATE ? "overwrite in place" : "skip"}`);
  }
  const withImages = items.filter((it) => it.image);
  console.log(`images referenced: ${withImages.length}, all present and within 5MB`);
  console.log("dry-run complete. Nothing was sent to PocketBase.");
}

async function runSeed(items) {
  const baseUrl = (process.env.PB_URL || "https://data.merrill-api.com").replace(/\/+$/, "");
  const email = process.env.PB_SUPERUSER_EMAIL;
  const password = process.env.PB_SUPERUSER_PASSWORD;
  if (!email || !password) {
    throw new Error("set PB_SUPERUSER_EMAIL and PB_SUPERUSER_PASSWORD (or run with --dry-run)");
  }

  console.log(`target: ${baseUrl}`);
  const token = await authenticate(baseUrl, email, password);
  const call = makeClient(baseUrl, token);

  const failures = [];
  let created = 0;
  let updated = 0;
  let skipped = 0;
  for (const item of items) {
    const label = `${item.legacy_id} "${item.title}"`;
    try {
      const existing = await findByLegacyId(call, item.legacy_id);
      if (!existing) {
        const body = item.image
          ? await appendImage(buildMultipartBody(item, true), item.image)
          : buildJsonBody(item);
        const payload = item.image ? { body } : { json: body };
        await call("POST", `/api/collections/${COLLECTION}/records`, payload);
        created++;
        console.log(`created  ${label}${item.image ? " (image uploaded)" : ""}`);
      } else if (!UPDATE) {
        skipped++;
        console.log(`skipped  ${label} (exists; pass --update to overwrite)`);
      } else {
        const upload = FORCE_IMAGES && item.image;
        const payload = upload
          ? { body: await appendImage(buildMultipartBody(item, false), item.image) }
          : { json: buildJsonBody(item) };
        await call("PATCH", `/api/collections/${COLLECTION}/records/${existing.id}`, payload);
        updated++;
        console.log(`updated  ${label}${upload ? " (image re-uploaded)" : ""}`);
      }
    } catch (err) {
      failures.push(label);
      console.error(`FAILED   ${label}: ${err.message}`);
    }
  }

  console.log(`done: ${created} created, ${updated} updated, ${skipped} skipped, ${failures.length} failed`);
  if (failures.length) {
    throw new Error(`${failures.length} item(s) failed: ${failures.join("; ")}`);
  }
}

async function main() {
  const { items, problems } = await loadAndValidate();
  if (problems.length) {
    for (const p of problems) console.error(`invalid: ${p}`);
    throw new Error(`${problems.length} validation problem(s); nothing was sent to PocketBase`);
  }
  if (DRY_RUN) await runDryRun(items);
  else await runSeed(items);
}

main().catch((err) => {
  console.error(`error: ${err.message}`);
  process.exitCode = 1;
});
