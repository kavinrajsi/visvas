// One-time seed after select→relationship migration (July 2026).
// Creates Project Statuses / Project Types / BHK Types docs and relinks
// existing projects from the pre-migration value capture.
// Usage: node scripts/seed-project-taxonomies.mjs [path-to-capture.json]
import { readFileSync } from 'fs'

// Load env before payload.config.js is evaluated (it reads PAYLOAD_SECRET at import time)
process.loadEnvFile(new URL('../.env.local', import.meta.url).pathname)

const { getPayload } = await import('payload')
const { default: config } = await import('../payload.config.js')

const STATUSES = [
  { name: 'On Sale', value: 'upcoming' },
  { name: 'Under Construction', value: 'under_construction' },
  { name: 'Ready to Move', value: 'ready_to_move' },
  { name: 'Completed', value: 'completed' },
]

const TYPES = [
  { name: 'Studio', value: 'studio' },
  { name: 'Apartment', value: 'apartment' },
  { name: 'Villa', value: 'villa' },
  { name: 'Plotted Development', value: 'plotted' },
  { name: 'Commercial', value: 'commercial' },
  { name: 'Mixed Use', value: 'mixed_use' },
]

const BHK = [
  { name: 'Studio', value: 'studio' },
  { name: '1 BHK', value: '1bhk' },
  { name: '2 BHK', value: '2bhk' },
  { name: '3 BHK', value: '3bhk' },
  { name: '4 BHK', value: '4bhk' },
  { name: '5 BHK', value: '5bhk' },
  { name: 'Penthouse', value: 'penthouse' },
  { name: 'Villa', value: 'villa' },
]

async function upsertAll(payload, collection, items) {
  const byValue = {}
  for (const item of items) {
    const existing = await payload.find({
      collection,
      where: { value: { equals: item.value } },
      limit: 1,
    })
    const doc = existing.docs[0] || (await payload.create({ collection, data: item }))
    byValue[item.value] = doc.id
  }
  return byValue
}

const payload = await getPayload({ config })

const statusIds = await upsertAll(payload, 'project-statuses', STATUSES)
const typeIds = await upsertAll(payload, 'project-types', TYPES)
const bhkIds = await upsertAll(payload, 'bhk-types', BHK)
console.log('Seeded:', { statuses: statusIds, types: typeIds, bhk: bhkIds })

const capturePath =
  process.argv[2] ||
  '/private/tmp/claude-501/-Users-kavinrajsi-Work-visvas/d16c5df1-cd2c-421b-9e51-3ece22da7687/scratchpad/project-taxonomy-capture.json'
const captured = JSON.parse(readFileSync(capturePath, 'utf8'))

for (const p of captured) {
  const data = {}
  if (p.status && statusIds[p.status]) data.status = statusIds[p.status]
  if (p.project_type && typeIds[p.project_type]) data.projectType = typeIds[p.project_type]
  if (p.bhk_types?.length) data.bhkTypes = p.bhk_types.map((v) => bhkIds[v]).filter(Boolean)
  if (Object.keys(data).length === 0) continue
  await payload.update({ collection: 'projects', id: p.id, data })
  console.log(`Relinked project ${p.id} (${p.name}):`, data)
}

console.log('Done.')
process.exit(0)
