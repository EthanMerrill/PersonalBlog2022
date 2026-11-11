# Seeding the PocketBase timeline

`seed.mjs` loads `items.json` (the portfolio timeline: experience and projects) and
writes it to the `portfolio_timeline_items` collection on PocketBase. It is idempotent:
each item is matched by `legacy_id`, created if missing, and updated in place if present.

Requires Node 22 or newer. No dependencies.

## Files

- `items.json`: the source of truth. Edit this file to change what gets seeded.
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

Re-upload images for records that already exist:

```sh
node scripts/seed-pocketbase/seed.mjs --force-images
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
  - Present: updates the record with JSON. The image is left alone unless `--force-images`
    is passed, in which case it is re-uploaded.
- Empty optional fields are cleared on update.
- If any item fails, the script keeps going, prints each failure, and exits 1.

## Notes

- `published` is `false` for the three 2023–2025 CapTech roles added from the backend
  work history. Review them, then set `published` to `true` in `items.json` and re-run.
- Dates are stored as `YYYY-MM-DD` in `items.json` and sent to PocketBase as midnight UTC.
- A record with `end_date` null displays as "Present" for experience entries.
