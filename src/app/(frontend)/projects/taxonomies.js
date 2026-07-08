// Server-only helpers: fetch filter options from taxonomy collections.
// Do not import from client components (pulls Payload into the client bundle).
import { getPayload } from 'payload'
import config from '@payload-config'

export async function getTaxonomyOptions() {
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
}
