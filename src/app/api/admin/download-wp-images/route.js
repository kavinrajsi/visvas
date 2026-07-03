import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function extractImages(xmlContent) {
  const images = []
  const imageRegex = /src="(https?:\/\/[^"]+\.(?:jpg|jpeg|png|gif|webp))"/gi

  let match
  const seen = new Set()

  while ((match = imageRegex.exec(xmlContent)) !== null) {
    const url = match[1]

    if (seen.has(url)) continue
    seen.add(url)

    const filename = path.basename(new URL(url).pathname)
    images.push({ url, filename })
  }

  return images
}

async function downloadAndSave(url, filepath) {
  try {
    const response = await fetch(url, { timeout: 30000 })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const buffer = await response.arrayBuffer()
    fs.writeFileSync(filepath, Buffer.from(buffer))

    return true
  } catch (err) {
    console.error(`Failed to download ${url}:`, err.message)
    return false
  }
}

export async function POST(req) {
  try {
    const wpXmlPath = path.join(process.cwd(), 'wp', 'visvas.WordPress.2026-07-02.xml')

    if (!fs.existsSync(wpXmlPath)) {
      return Response.json({ error: 'WordPress XML not found' }, { status: 404 })
    }

    ensureDir(UPLOAD_DIR)

    const xmlContent = fs.readFileSync(wpXmlPath, 'utf-8')
    const images = extractImages(xmlContent)

    console.log(`Found ${images.length} images. Downloading...`)

    const downloaded = []
    const failed = []

    for (const img of images) {
      const filepath = path.join(UPLOAD_DIR, img.filename)

      // Skip if already exists
      if (fs.existsSync(filepath)) {
        downloaded.push({
          filename: img.filename,
          path: `/uploads/${img.filename}`,
          skipped: true,
        })
        continue
      }

      console.log(`Downloading: ${img.filename}`)
      const success = await downloadAndSave(img.url, filepath)

      if (success) {
        downloaded.push({
          filename: img.filename,
          path: `/uploads/${img.filename}`,
        })
        console.log(`✓ Downloaded: ${img.filename}`)
      } else {
        failed.push({ filename: img.filename, url: img.url })
      }
    }

    return Response.json({
      success: true,
      message: `Downloaded ${downloaded.length} images`,
      stats: {
        total: images.length,
        downloaded: downloaded.filter(d => !d.skipped).length,
        skipped: downloaded.filter(d => d.skipped).length,
        failed: failed.length,
      },
      uploadDir: UPLOAD_DIR,
      downloaded: downloaded.slice(0, 10),
      failed: failed.slice(0, 5),
    })
  } catch (error) {
    return Response.json(
      {
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}
