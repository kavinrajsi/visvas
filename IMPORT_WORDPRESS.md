# WordPress XML Import Guide

Import WordPress posts from XML export to Payload CMS.

## Prerequisites

- Payload CMS running locally or on remote
- Environment variables configured (`.env.local`):
  - `PAYLOAD_SECRET` — secret key for Payload
  - `DATABASE_URL` — database connection string
  - `DATABASE_TYPE` — 'postgres' or 'sqlite'

## What the script does

- ✅ Parses `wp/visvas.WordPress.2026-07-02.xml`
- ✅ Removes all `<img>` tags from post content
- ✅ Strips `class`, `style`, `id` attributes (keeps only semantic HTML)
- ✅ Removes event handlers (`onclick`, etc.)
- ✅ Sets placeholder cover image: `https://visvas.vercel.app/og-image.png`
- ✅ Sets all posts to `published` status
- ✅ Skips pages and draft posts
- ✅ Imports 39 posts to Payload Posts collection

## How to run

### 1. Ensure environment is set up

```bash
# .env.local must have:
PAYLOAD_SECRET=your-secret-key-here
DATABASE_URL=postgresql://...
```

### 2. Run the import

```bash
node scripts/import-wordpress.mjs
```

Output:
```
📥 Importing WordPress posts to Payload CMS...

Found 39 posts in WordPress export

✓ [1/39] Gated communities in Madurai
✓ [2/39] Best properties in Madurai
...
✅ Import complete: 37 posts created (2 skipped)
```

## Cleanup before re-running

If you re-run the import and get duplicate slug errors:

```bash
# Delete all posts with a certain prefix, or:
# - Manually delete posts in Payload admin, or:
# - Truncate the posts table in the database
```

## Schema mapping

| WordPress | Payload CMS |
|-----------|-------------|
| `<title>` | `title` |
| URL slug | `slug` |
| `<content:encoded>` | `content` (cleaned) |
| `<dc:creator>` | `author` |
| `<wp:post_date_gmt>` | `publishedAt` |
| (none) | `coverImage` → placeholder URL |
| (none) | `status` → `published` |

## Troubleshooting

- **"Cannot find module 'payload'"** → Run `npm install` first
- **"missing secret key"** → Set `PAYLOAD_SECRET` in `.env.local`
- **"duplicate slug"** → Delete existing posts or use different slug pattern
- **"Cannot find module 'xml2js'"** → Run `npm install xml2js --save-dev`
