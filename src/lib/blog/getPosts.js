// Blog read API for the frontend. Reads the JSON snapshot on R2 (written by the
// Posts hooks), cached in Next's data cache under BLOG_CACHE_TAG. The DB is hit
// only when the snapshot is missing, and in that case the snapshot is seeded so
// the next read skips the DB. Pages should import from here, never query
// `posts` directly.
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import { INDEX_KEY, postKey, readJson, writeJson, isSnapshotStoreEnabled } from './r2Json'
import { buildIndex, writeFullSnapshot } from './snapshot'

export const BLOG_CACHE_TAG = 'blog-posts'
export const POSTS_PER_PAGE = 10

const CACHE_OPTS = { tags: [BLOG_CACHE_TAG], revalidate: 3600 }

async function loadIndex() {
  const stored = await readJson(INDEX_KEY)
  if (stored) return stored

  const payload = await getPayload({ config })

  if (isSnapshotStoreEnabled()) {
    try {
      const { index } = await writeFullSnapshot(payload)
      return index
    } catch (error) {
      console.error('[BLOG] snapshot seed failed:', error.message)
    }
  }
  return buildIndex(payload)
}

async function loadPost(slug) {
  const stored = await readJson(postKey(slug))
  if (stored) return stored

  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    depth: 2,
    limit: 1,
  })
  const doc = result.docs[0] ?? null

  if (doc) {
    await writeJson(postKey(slug), doc).catch((error) =>
      console.error('[BLOG] post snapshot write failed:', error.message),
    )
  }
  return doc
}

const cachedIndex = unstable_cache(loadIndex, ['blog-index'], CACHE_OPTS)
const cachedPost = unstable_cache(loadPost, ['blog-post'], CACHE_OPTS)

export async function getBlogIndex() {
  return cachedIndex()
}

export async function getAllPosts() {
  const { posts } = await getBlogIndex()
  return posts ?? []
}

export async function getPublishedPosts({ page = 1, limit = POSTS_PER_PAGE } = {}) {
  const posts = await getAllPosts()
  const totalDocs = posts.length
  const totalPages = Math.max(1, Math.ceil(totalDocs / limit))
  const currentPage = Math.min(Math.max(1, page), totalPages)
  const start = (currentPage - 1) * limit

  return {
    docs: posts.slice(start, start + limit),
    totalDocs,
    totalPages,
    page: currentPage,
  }
}

export async function getPostBySlug(slug) {
  if (!slug) return null
  return cachedPost(slug)
}

export async function getBlogPageSettings() {
  const { blogPage } = await getBlogIndex()
  return blogPage ?? {}
}
