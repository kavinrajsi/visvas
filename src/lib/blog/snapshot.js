// Builds and writes the blog JSON snapshot to R2.
//
//   blog/index.json        list of published posts (card fields) + blog-page global
//   blog/posts/<slug>.json full post document (depth 2, ready for <RichText />)
//
// Pure Payload + R2 code: no `next/*` imports, so it also runs from CLI scripts.
// Callers pass the Payload instance (and `req` when inside a hook so reads share
// the hook's transaction).
import { INDEX_KEY, postKey, writeJson, deleteJson } from './r2Json.js'

const PUBLISHED = { status: { equals: 'published' } }

function pickImage(img) {
  if (!img || typeof img !== 'object') return img ?? null
  const { id, url, alt, width, height, filename, mimeType } = img
  return { id, url, alt, width, height, filename, mimeType }
}

function pickCategory(cat) {
  if (!cat || typeof cat !== 'object') return cat ?? null
  const { id, name, title, slug } = cat
  return { id, name: name ?? title, slug }
}

export function toIndexEntry(post) {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? '',
    author: post.author ?? '',
    publishedAt: post.publishedAt ?? null,
    updatedAt: post.updatedAt ?? null,
    coverImage: pickImage(post.coverImage),
    categories: Array.isArray(post.categories) ? post.categories.map(pickCategory) : [],
  }
}

export async function fetchPublishedPosts(payload, { depth = 1, req } = {}) {
  const result = await payload.find({
    collection: 'posts',
    where: PUBLISHED,
    sort: '-publishedAt',
    limit: 1000,
    pagination: false,
    depth,
    req,
  })
  return result.docs
}

export async function buildIndex(payload, { req } = {}) {
  const [posts, blogPage] = await Promise.all([
    fetchPublishedPosts(payload, { depth: 1, req }),
    payload.findGlobal({ slug: 'blog-page', depth: 0, req }).catch(() => null),
  ])

  return {
    generatedAt: new Date().toISOString(),
    blogPage: {
      heroImage: blogPage?.heroImage ?? null,
      mobileHeroImage: blogPage?.mobileHeroImage ?? null,
    },
    posts: posts.map(toIndexEntry),
  }
}

export async function writeIndex(payload, opts = {}) {
  const index = await buildIndex(payload, opts)
  await writeJson(INDEX_KEY, index)
  return index
}

// Writes (or removes, when no longer published) one post's JSON. Returns the doc.
export async function writePost(payload, id, { req } = {}) {
  const doc = await payload.findByID({ collection: 'posts', id, depth: 2, req })
  if (!doc?.slug) return doc

  if (doc.status === 'published') {
    await writeJson(postKey(doc.slug), doc)
  } else {
    await deleteJson(postKey(doc.slug))
  }
  return doc
}

export async function removePostSnapshot(slug) {
  if (!slug) return
  await deleteJson(postKey(slug))
}

// Full rebuild: every published post + index. Used by the backfill script and
// by the runtime fallback when the snapshot is missing.
export async function writeFullSnapshot(payload) {
  const posts = await fetchPublishedPosts(payload, { depth: 2 })
  for (const post of posts) {
    if (post.slug) await writeJson(postKey(post.slug), post)
  }
  const index = await writeIndex(payload)
  return { posts: posts.length, index }
}
