// Server-only helpers: fetch filter options from taxonomy collections.
// Do not import from client components (pulls Payload into the client bundle).
// Cached for an hour (the taxonomy collections have no revalidation hook), so
// the dynamic project listing pages don't query them on every request.
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

export const getTaxonomyOptions = unstable_cache(
  async () => {
    const payload = await getPayload({ config })

    const [statuses, types] = await Promise.all([
      payload.find({ collection: 'project-statuses', limit: 100, depth: 0, sort: 'createdAt' }),
      payload.find({ collection: 'project-types', limit: 100, depth: 0, sort: 'createdAt' }),
    ])

    const toOptions = (result) => result.docs.map(({ name, value }) => ({ name, value }))

    return {
      statusOptions: toOptions(statuses),
      typeOptions: toOptions(types),
    }
  },
  ['projects-taxonomy-options'],
  { revalidate: 3600 },
)
