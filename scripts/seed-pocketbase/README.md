# Seeding the PocketBase timeline

`seed.mjs` loads `items.json` (the portfolio timeline: experience and projects) and
writes it to the `portfolio_timeline_items` collection on PocketBase. Each item is matched
by `legacy_id`. By default the script is create-only: missing records are created and
existing ones are skipped, so edits made later in the PocketBase admin UI are never
overwritten by a re-run. Pass `--update` to overwrite existing records from `items.json`.

Requires Node 22 or newer. No dependencies.

## Files

- `items.json`: the initial content. After the first seed, PocketBase is the source of
  truth; edit records in the admin UI rather than here.
  Fields match the data contract (`kind`, `title`, `subtitle`, `blurb`, `start_date`,
  `end_date`, `ext_link`, `repo_link`, `image`, `image_alt`, `tech`, `published`,
  `sort_weight`, `legacy_id`). `image` is a filename in `images/` or `null`.
- `images/`: image files referenced by `items.json`. Allowed types: jpg, png, webp. Max 5MB each.
- `seed.mjs`: the seeder.

## Usage

Preview without touching the server (no credentials needed, no network calls):

```sh
node scripts/seed-pocketbase/seed.mjs --dry-run
```

Seed for real:

```sh
PB_SUPERUSER_EMAIL=you@example.com \
PB_SUPERUSER_PASSWORD='...' \
node scripts/seed-pocketbase/seed.mjs
```

Overwrite existing records from `items.json` (discards admin-UI edits to those records),
optionally re-uploading their images:

```sh
node scripts/seed-pocketbase/seed.mjs --update
node scripts/seed-pocketbase/seed.mjs --update --force-images
```

Environment variables:

| variable | default | notes |
|---|---|---|
| `PB_URL` | `https://data.merrill-api.com` | PocketBase base URL |
| `PB_SUPERUSER_EMAIL` | (required for real runs) | superuser identity |
| `PB_SUPERUSER_PASSWORD` | (required for real runs) | never logged or hard-coded |

## Behavior

- All items and image files are validated before any request is sent. If validation
  fails, nothing is written.
- For each item, the script looks up `legacy_id`:
  - Missing: creates the record. The image is uploaded as multipart.
  - Present: skipped, unless `--update` is passed. With `--update` the record is
    overwritten with JSON (empty optional fields are cleared); the image is left alone
    unless `--force-images` is also passed.
- If any item fails, the script keeps going, prints each failure, and exits 1.

## Notes

- `published` is `false` for the three 2023–2025 CapTech roles added from the backend
  work history. Review them, then set `published` to `true` in `items.json` and re-run.
- Dates are stored as `YYYY-MM-DD` in `items.json` and sent to PocketBase as midnight UTC.
- A record with `end_date` null displays as "Present" for experience entries.
