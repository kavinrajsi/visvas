// Server-only project listing queries for /projects, /projects/ongoing and
// /projects/completed. Those pages read searchParams, so they render on every
// request; each query here is held in Next's data cache and purged by the
// `projects` tag (Projects collection hook), so a page view no longer wakes
// the database.
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import { buildWhere } from '@/app/(frontend)/projects/helpers'

const CACHE_OPTS = { tags: ['projects'], revalidate: 3600 }

// Only the params the queries read, as plain strings, so junk query params
// don't fan out into separate cache entries.
const FILTER_KEYS = ['status', 'type', 'location', 'minBudget', 'maxBudget', 'search']

function normaliseFilters(searchParams) {
  const filters = {}
  for (const key of FILTER_KEYS) {
    const value = searchParams[key]
    const str = Array.isArray(value) ? value[0] : value
    if (str) filters[key] = String(str)
  }
  return filters
}

const loadProjects = unstable_cache(
  async (category, filters, page) => {
    const payload = await getPayload({ config })
    const where = category === 'all' ? {} : buildWhere(filters, category)

    return payload.find({
      collection: 'projects',
      limit: 8,
      page,
      depth: 1,
      sort: ['displayOrder', '-createdAt'],
      where: Object.keys(where).length > 0 ? where : undefined,
    })
  },
  ['projects-listing'],
  CACHE_OPTS,
)

export function getProjects(category, searchParams) {
  const page = Number(searchParams.page) || 1
  const filters = category === 'all' ? {} : normaliseFilters(searchParams)
  return loadProjects(category, filters, page)
}

export const getAvailableLocations = unstable_cache(
  async () => {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'projects',
      limit: 1000,
      depth: 0,
      select: { location: true },
    })

    return [...new Set(result.docs.map((p) => p.location).filter(Boolean))].sort()
  },
  ['projects-locations'],
  CACHE_OPTS,
)
