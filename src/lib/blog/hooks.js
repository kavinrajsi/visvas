// Payload hooks that keep the R2 blog snapshot in sync and purge Next caches.
// Wired into src/collections/Posts.js and src/globals/BlogPage.js.
import { writePost, writeIndex, removePostSnapshot } from './snapshot.js'
import { revalidateTags, revalidatePaths } from '../cache/revalidateTags.js'

// Same tag as BLOG_CACHE_TAG in getPosts.js (kept separate so this module never
// pulls next/cache in at import time).
const BLOG_TAG = 'blog-posts'

async function purge(...slugs) {
  await revalidateTags(BLOG_TAG)
  await revalidatePaths('/blog', ...slugs.filter(Boolean).map((s) => `/blog/${s}`))
}

export async function syncPostAfterChange({ doc, previousDoc, req }) {
  try {
    if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
      await removePostSnapshot(previousDoc.slug)
    }
    await writePost(req.payload, doc.id, { req })
    await writeIndex(req.payload, { req })
  } catch (error) {
    console.error('[BLOG] snapshot sync failed:', error.message)
  }
  await purge(doc.slug, previousDoc?.slug)
  return doc
}

export async function syncPostAfterDelete({ doc, req }) {
  try {
    await removePostSnapshot(doc.slug)
    await writeIndex(req.payload, { req })
  } catch (error) {
    console.error('[BLOG] snapshot removal failed:', error.message)
  }
  await purge(doc.slug)
}

export async function syncBlogPageAfterChange({ doc, req }) {
  try {
    await writeIndex(req.payload, { req })
  } catch (error) {
    console.error('[BLOG] index rebuild failed:', error.message)
  }
  await purge()
  return doc
}
