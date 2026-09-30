/**
 * Backfills the blog JSON snapshot on R2: blog/index.json plus one
 * blog/posts/<slug>.json per published post.
 *
 *   node --env-file=.env.local scripts/export-blog-snapshot.mjs
 *
 * Run once after deploying the snapshot feature. From then on the Posts and
 * BlogPage hooks (src/lib/blog/hooks.js) keep the snapshot in sync on every
 * publish, update, or delete in the admin.
 */
import { getPayload } from 'payload'
import config from '../payload.config.js'
import { isSnapshotStoreEnabled } from '../src/lib/blog/r2Json.js'
import { writeFullSnapshot } from '../src/lib/blog/snapshot.js'

if (!isSnapshotStoreEnabled()) {
  console.error('R2_BUCKET_NAME / R2_ENDPOINT / R2_ACCESS_KEY / R2_SECRET_KEY must be set')
  process.exit(1)
}

const payload = await getPayload({ config })
const { posts, index } = await writeFullSnapshot(payload)
console.log(`Wrote ${posts} post file(s) and blog/index.json (${index.posts.length} entries)`)
process.exit(0)
