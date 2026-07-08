// Seed/enrich upcoming projects from Visvas_Projects_Upcoming_Full.csv (properly
// quoted → all columns parsed). Updates the 4 existing projects in place and
// creates the 2 new ones. Uploads covers from public/project to media (R2 project/).
import fs from 'fs'
import path from 'path'

process.loadEnvFile('/Users/kavinrajsi/Work/visvas/.env.local')
const { getPayload } = await import('payload')
const { default: config } = await import('../payload.config.js')

const ROOT = '/Users/kavinrajsi/Work/visvas'
const IMG_DIR = path.join(ROOT, 'public', 'project')

// CSV name -> image file slug
const IMAGE_SLUG = {
  'Visvas Vidhatri': 'vidhatri',
  'Visvas Madhyapuri': 'madhyapuri',
  'Visvas Aparna (2 BHK)': 'aparna',
  'Visvas Aparna (1 BHK)': 'aparna',
  'Visvas Ajita – Phase I Extension (B Block)': 'ajita-phase-one',
  'Visvas Amita': 'amita',
}

// CSV name -> existing project name to update (null = create new)
const EXISTING_MATCH = {
  'Visvas Vidhatri': 'Vidhatri',
  'Visvas Madhyapuri': 'Madhyapuri',
  'Visvas Aparna (2 BHK)': 'Aparna 2BHK',
  'Visvas Aparna (1 BHK)': 'Aparna 1BHK',
  'Visvas Ajita – Phase I Extension (B Block)': null,
  'Visvas Amita': null,
}

const TYPE_MAP = {
  'Apartment, Residential': 'apartment',
  'Residential, Villa': 'villa',
  'Residential, Villa (Duplex)': 'villa',
}

// full CSV parser (handles quotes + escaped "")
function parseLine(line) {
  const out = []
  let cur = ''
  let q = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') { if (q && line[i + 1] === '"') { cur += '"'; i++ } else q = !q; continue }
    if (ch === ',' && !q) { out.push(cur); cur = ''; continue }
    cur += ch
  }
  out.push(cur)
  return out
}

function bhkValues(cfg) {
  const vals = new Set()
  if (/studio/i.test(cfg)) vals.add('studio')
  const re = /(\d(?:\.\d)?)\s*BHK/gi
  let m
  while ((m = re.exec(cfg))) {
    // "2 & 3 BHK" -> the regex only catches "3 BHK"; also scan leading "N &"
    vals.add(m[1].replace('.', '_') + 'bhk')
  }
  // catch "2 & 3 BHK" / "3 & 4 BHK" leading numbers before &
  const amp = cfg.match(/(\d)\s*&\s*(\d)/)
  if (amp) { vals.add(amp[1] + 'bhk'); vals.add(amp[2] + 'bhk') }
  return [...vals]
}

function toLexical(text) {
  if (!text) return undefined
  return {
    root: {
      type: 'root',
      format: '', indent: 0, version: 1, direction: 'ltr',
      children: [{
        type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr',
        textFormat: 0,
        children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
      }],
    },
  }
}

const payload = await getPayload({ config })

async function upsertTax(collection, value, name) {
  const found = await payload.find({ collection, where: { value: { equals: value } }, limit: 1 })
  if (found.docs[0]) return found.docs[0].id
  return (await payload.create({ collection, data: { value, name } })).id
}

async function upsertAmenity(name) {
  const found = await payload.find({ collection: 'amenities', where: { name: { equals: name } }, limit: 1 })
  if (found.docs[0]) return found.docs[0].id
  return (await payload.create({ collection: 'amenities', data: { name } })).id
}

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

const upcomingStatusId = await upsertTax('project-statuses', 'upcoming', 'On Sale')

const lines = fs.readFileSync(path.join(ROOT, 'scripts', 'Visvas_Projects_Upcoming_Full.csv'), 'utf8')
  .split(/\r?\n/).filter(Boolean)
const hdr = parseLine(lines[0]).map((h) => h.replace(/^﻿/, '').trim())
const col = (row, name) => row[hdr.indexOf(name)] || ''

const results = []
for (let i = 1; i < lines.length; i++) {
  const row = parseLine(lines[i])
  const name = col(row, 'Project Name')
  try {
    const typeRaw = col(row, 'Property Type')
    const typeVal = TYPE_MAP[typeRaw] || typeRaw.toLowerCase().replace(/[^a-z0-9]+/g, '_')
    const typeId = await upsertTax('project-types', typeVal, typeRaw)

    const bhkIds = []
    for (const bv of bhkValues(col(row, 'Configurations'))) {
      const label = bv === 'studio' ? 'Studio' : bv.replace('bhk', ' BHK').toUpperCase()
      bhkIds.push(await upsertTax('bhk-types', bv, label))
    }

    const amenityIds = []
    for (const a of col(row, 'Amenities').split(';').map((s) => s.trim()).filter(Boolean)) {
      amenityIds.push(await upsertAmenity(a))
    }

    const slug = IMAGE_SLUG[name]
    const cover = slug ? await uploadImage(slug, 'cover', name) : null
    const detail = slug ? await uploadImage(slug, 'detail', name) : null
    const content = slug ? await uploadImage(slug, 'content', name) : null

    const priceNum = Number(col(row, 'Starting Price (Rs.)').replace(/[^0-9]/g, '')) || undefined
    const addressParts = [col(row, 'Address'), col(row, 'Area'), col(row, 'City'), col(row, 'State'), col(row, 'Zip Code'), col(row, 'Country')]
      .map((s) => s.trim()).filter(Boolean)

    const data = {
      name,
      projectType: typeId,
      status: upcomingStatusId,
      bhkTypes: bhkIds,
      location: col(row, 'Area') || col(row, 'City') || undefined,
      priceRangeStartFrom: priceNum,
      projectArea: col(row, 'Size (starting)') || undefined,
      reraNo: col(row, 'RERA No.') || undefined,
      locationAddress: addressParts.join(', ') || undefined,
      description: toLexical(col(row, 'Description')),
    }
    if (amenityIds.length) data.amenities = amenityIds
    if (cover) data.coverImage = cover
    if (detail) data.detailCoverImage = detail
    if (content) data.contentImage = content

    const matchName = EXISTING_MATCH[name]
    let target = null
    if (matchName) {
      const f = await payload.find({ collection: 'projects', where: { name: { equals: matchName } }, limit: 1 })
      target = f.docs[0] || null
    }

    let id, action
    if (target) {
      id = target.id
      await payload.update({ collection: 'projects', id, data })
      action = 'updated'
    } else {
      let base = name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
      let candidate = base, n = 1
      while ((await payload.find({ collection: 'projects', where: { slug: { equals: candidate } }, limit: 1 })).docs[0]) {
        n += 1; candidate = `${base}-${n}`
      }
      id = (await payload.create({ collection: 'projects', data: { ...data, slug: candidate } })).id
      action = 'created'
    }
    results.push({ name, id, action, cover: !!cover, bhk: bhkIds.length, amenities: amenityIds.length })
  } catch (e) {
    results.push({ name, error: e.message.split('\n')[0] })
  }
}

console.log('=== RESULTS ===')
for (const r of results) console.log(JSON.stringify(r))
process.exit(0)
