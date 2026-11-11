import type {TimelineItem, TimelineKind} from "../types/TimelineItem";

export const DEFAULT_POCKETBASE_URL = "https://data.merrill-api.com";
const COLLECTION = "portfolio_timeline_items";

function baseUrl(): string {
	const raw = process.env.NEXT_PUBLIC_POCKETBASE_URL || DEFAULT_POCKETBASE_URL;
	return raw.replace(/\/+$/, "");
}

const str = (v: unknown): string | undefined => (typeof v === "string" && v.trim() !== "" ? v : undefined);

// PocketBase returns dates like "2022-06-01 07:00:00.328Z"; normalise to ISO.
function isoDate(v: unknown): string | undefined {
	const s = str(v);
	if (!s) return undefined;
	const d = new Date(s.replace(" ", "T"));
	return isNaN(d.getTime()) ? undefined : d.toISOString();
}

function techList(v: unknown): string[] | undefined {
	let value = v;
	if (typeof value === "string") {
		try {
			value = JSON.parse(value);
		} catch {
			return undefined;
		}
	}
	if (!Array.isArray(value)) return undefined;
	const list = value.filter((t): t is string => typeof t === "string" && t.trim() !== "");
	return list.length ? list : undefined;
}

interface Mapped {
	item: TimelineItem;
	weight: number;
}

function mapRecord(rec: unknown, base: string): Mapped | null {
	if (typeof rec !== "object" || rec === null) return null;
	const r = rec as Record<string, unknown>;
	const id = str(r.id);
	const title = str(r.title);
	const kind = r.kind;
	if (!id || !title || (kind !== "experience" && kind !== "project")) return null;
	const image = str(r.image);
	const collectionId = str(r.collectionId);
	const item: TimelineItem = {
		id,
		kind: kind as TimelineKind,
		title,
		subtitle: str(r.subtitle),
		blurb: str(r.blurb),
		startDate: isoDate(r.start_date),
		endDate: isoDate(r.end_date),
		extLink: str(r.ext_link),
		repoLink: str(r.repo_link),
		imageUrl:
			image && collectionId
				? `${base}/api/files/${encodeURIComponent(collectionId)}/${encodeURIComponent(id)}/${encodeURIComponent(image)}?thumb=800x0`
				: undefined,
		imageAlt: str(r.image_alt),
		tech: techList(r.tech),
	};
	return {item, weight: typeof r.sort_weight === "number" ? r.sort_weight : 0};
}

/** Newest startDate first; undated items last; ties by sort_weight (higher first). */
function sortTimeline(mapped: Mapped[]): TimelineItem[] {
	return [...mapped]
		.sort((a, b) => {
			const ta = a.item.startDate ? Date.parse(a.item.startDate) : null;
			const tb = b.item.startDate ? Date.parse(b.item.startDate) : null;
			if (ta !== tb) {
				if (ta === null) return 1;
				if (tb === null) return -1;
				return tb - ta;
			}
			return b.weight - a.weight;
		})
		.map((m) => m.item);
}

export async function fetchTimelineItems(): Promise<TimelineItem[]> {
	const base = baseUrl();
	const url = `${base}/api/collections/${COLLECTION}/records?perPage=200&sort=-start_date,-sort_weight`;
	const res = await fetch(url, {headers: {Accept: "application/json"}});
	if (!res.ok) {
		throw new Error(`Timeline fetch failed: ${res.status} ${res.statusText}`);
	}
	const json: unknown = await res.json();
	const records = (json as {items?: unknown} | null)?.items;
	if (!Array.isArray(records)) {
		throw new Error("Timeline fetch returned an unexpected payload (missing items array)");
	}
	const mapped = records.map((r) => mapRecord(r, base)).filter((m): m is Mapped => m !== null);
	return sortTimeline(mapped);
}

/**
 * Build-time loader. If NEXT_PUBLIC_POCKETBASE_URL is explicitly set, a failed
 * fetch fails the build. If unset, fall back to the local fixture with a warning.
 */
export async function loadTimelineItems(): Promise<TimelineItem[]> {
	if (process.env.NEXT_PUBLIC_POCKETBASE_URL) {
		return fetchTimelineItems();
	}
	console.warn("[timeline] NEXT_PUBLIC_POCKETBASE_URL is not set; using timeline.fixture.ts");
	const {timelineFixture} = await import("./timeline.fixture");
	return timelineFixture;
}
