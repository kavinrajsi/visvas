// Bulk-create projects from All_Projects_Master_Data.csv + upload their images.
// CSV is malformed past the Price column (unquoted commas), so only the reliable
// leading columns (name/type/config/status) are parsed here; numeric/address
// fields are left for manual admin entry. Images come from public/project.
// Uploads go to media (R2 'project/' prefix via s3Storage config).
import fs from 'fs'
import path from 'path'

process.loadEnvFile('/Users/kavinrajsi/Work/visvas/.env.local')
const { getPayload } = await import('payload')
const { default: config } = await import('../payload.config.js')

const ROOT = '/Users/kavinrajsi/Work/visvas'
const IMG_DIR = path.join(ROOT, 'public', 'project')

// ---- name -> image file slug (confirmed mapping) ----
const IMAGE_SLUG = {
  'Supraja': 'supraja',
  'Ajita Phase II (Visvas Ajita)': 'ajita-phase-two',
  'Ajita 3 BHK (Visvas Ajita)': 'ajita-phase-two',
  'Ajita 4 BHK (Visvas Ajita)': 'ajita-phase-two',
  'Aprameya (Visvas Aprameya)': null,
  'Vaaruni Enclave': null,
  'Agrini': 'agrini',
  'Vajra (Visvas Vajra)': 'vajra',
  'Vasudhara (Visvas Vasudhara)': 'vasudhara',
  'Vibhava (Visvas Vibhava)': 'vibhava',
  'Aparna': 'aparna',
  'Virat C Block (Visvas Virat)': 'virat',
  'Virat D Block (Visvas Virat)': 'virat',
}

// ---- CSV project type -> existing project-types value ----
const TYPE_MAP = {
  'Residential Villa': 'villa',
  'Land': 'plotted',
  'Apartment Residential Villa': 'mixed_use',
  'Apartment Residential': 'apartment',
  'Apartment Residential Studio': 'mixed_use',
  'Studio': 'studio',
  'Apartment': 'apartment',
}

// quote-aware tokenizer: reliable for leading fields (before the price commas)
function firstFields(line, n) {
  const out = []
  let cur = ''
  let q = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') { q = !q; continue }
    if (ch === ',' && !q) { out.push(cur); cur = ''; if (out.length >= n) return out; continue }
    cur += ch
  }
  out.push(cur)
  return out
}

function bhkValuesFromConfig(cfg) {
  const vals = new Set()
  const re = /(\d(?:\.\d)?)\s*BHK/gi
  let m
  while ((m = re.exec(cfg))) vals.add(m[1].replace('.', '_') + 'bhk')
  return [...vals]
}

const payload = await getPayload({ config })

// upsert helper for taxonomy collections
async function upsertTax(collection, value, name) {
  const found = await payload.find({ collection, where: { value: { equals: value } }, limit: 1 })
  if (found.docs[0]) return found.docs[0].id
  const doc = await payload.create({ collection, data: { value, name } })
  return doc.id
}

// upload one image file once; cache by filename
const mediaCache = {}
async function uploadImage(slug, kind, altName) {
  const filename = `visvas-${slug}-${kind}.png`
  if (mediaCache[filename] !== undefined) return mediaCache[filename]
  const fp = path.join(IMG_DIR, filename)
  if (!fs.existsSync(fp)) { mediaCache[filename] = null; return null }
  const existing = await payload.find({ collection: 'media', where: { filename: { equals: filename } }, limit: 1 })
  if (existing.docs[0]) { mediaCache[filename] = existing.docs[0].id; return existing.docs[0].id }
  const buf = fs.readFileSync(fp)
  const doc = await payload.create({
    collection: 'media',
    data: { alt: `${altName} ${kind}` },
    file: { data: buf, mimetype: 'image/png', name: filename, size: buf.size },
  })
  mediaCache[filename] = doc.id
  return doc.id
}

// completed status once
const completedStatusId = await upsertTax('project-statuses', 'completed', 'Completed')

// parse + group CSV rows by project name
const lines = fs.readFileSync(path.join(ROOT, 'scripts', 'All_Projects_Master_Data.csv'), 'utf8')
  .split(/\r?\n/).filter(Boolean)
const grouped = new Map()
for (let i = 1; i < lines.length; i++) {
  const [name, type, cfg] = firstFields(lines[i], 4)
  if (!grouped.has(name)) grouped.set(name, { name, type, bhk: new Set() })
  for (const b of bhkValuesFromConfig(cfg || '')) grouped.get(name).bhk.add(b)
}

const results = []
for (const proj of grouped.values()) {
  try {
    const typeVal = TYPE_MAP[proj.type] || proj.type.toLowerCase().replace(/[^a-z0-9]+/g, '_')
    const typeId = await upsertTax('project-types', typeVal, proj.type)

    const bhkIds = []
    for (const bv of proj.bhk) {
      const label = bv.replace('_', '.').replace('bhk', ' BHK').toUpperCase()
      bhkIds.push(await upsertTax('bhk-types', bv, label))
    }

    const slug = IMAGE_SLUG[proj.name]
    const cover = slug ? await uploadImage(slug, 'cover', proj.name) : null
    const detail = slug ? await uploadImage(slug, 'detail', proj.name) : null
    const content = slug ? await uploadImage(slug, 'content', proj.name) : null

    const data = {
      name: proj.name,
      projectType: typeId,
      status: completedStatusId,
      bhkTypes: bhkIds,
    }
    if (cover) data.coverImage = cover
    if (detail) data.detailCoverImage = detail
    if (content) data.contentImage = content

    const existing = await payload.find({ collection: 'projects', where: { name: { equals: proj.name } }, limit: 1 })
    let id
    if (existing.docs[0]) {
      id = existing.docs[0].id
      await payload.update({ collection: 'projects', id, data })
    } else {
      // collision-safe slug: base from name, append -2/-3 if taken by another project
      let base = proj.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim()
      let candidate = base
      let n = 1
      while ((await payload.find({ collection: 'projects', where: { slug: { equals: candidate } }, limit: 1 })).docs[0]) {
        n += 1
        candidate = `${base}-${n}`
      }
      const doc = await payload.create({ collection: 'projects', data: { ...data, slug: candidate } })
      id = doc.id
    }
    results.push({ name: proj.name, id, cover: !!cover, detail: !!detail, bhk: bhkIds.length })
  } catch (e) {
    results.push({ name: proj.name, error: e.message.split('\n')[0] })
  }
}

console.log('=== RESULTS ===')
for (const r of results) console.log(JSON.stringify(r))
process.exit(0)
