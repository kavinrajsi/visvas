import { getPayload } from 'payload'
import config from '../../../../../payload.config.js'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

async function downloadFile(url) {
  try {
    const response = await fetch(url, {
      timeout: 30000,
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const buffer = await response.arrayBuffer()
    return Buffer.from(buffer)
  } catch (err) {
    console.error(`Failed to download ${url}:`, err.message)
    return null
  }
}

function extractImages(xmlContent) {
  const images = []
  const imageRegex = /src="(https?:\/\/[^"]+\.(?:jpg|jpeg|png|gif|webp))"/gi

  let match
  const seen = new Set()

  while ((match = imageRegex.exec(xmlContent)) !== null) {
    const url = match[1]

    // Avoid duplicates
    if (seen.has(url)) continue
    seen.add(url)

    const filename = path.basename(new URL(url).pathname)
    images.push({ url, filename })
  }

  return images
}

export async function POST(req) {
  try {
    const wpXmlPath = path.join(process.cwd(), 'wp', 'visvas.WordPress.2026-07-02.xml')

    if (!fs.existsSync(wpXmlPath)) {
      return Response.json({ error: 'WordPress XML not found' }, { status: 404 })
    }

    const xmlContent = fs.readFileSync(wpXmlPath, 'utf-8')
    const images = extractImages(xmlContent)

    console.log(`Found ${images.length} images to import`)

    const payload = await getPayload({ config })
    const uploaded = []
    const failed = []

    for (const img of images) {
      try {
        console.log(`Downloading: ${img.filename}`)
        const buffer = await downloadFile(img.url)

        if (!buffer) {
          failed.push({ filename: img.filename, error: 'Download failed' })
          continue
        }

        // Create FormData-like object for Payload
        const mediaFile = new File([buffer], img.filename, {
          type: 'application/octet-stream',
        })

        const result = await payload.create({
          collection: 'media',
          data: {
            alt: img.filename,
          },
          file: mediaFile,
        })

        uploaded.push({
          id: result.id,
          filename: result.filename,
          url: result.url,
        })

        console.log(`✓ Uploaded: ${img.filename} (ID: ${result.id})`)
      } catch (err) {
        console.error(`✗ Failed: ${img.filename}`, err.message)
        failed.push({
          filename: img.filename,
          error: err.message,
        })
      }
    }

    return Response.json({
      success: true,
      message: `Imported ${uploaded.length} images`,
      stats: {
        total: images.length,
        uploaded: uploaded.length,
        failed: failed.length,
      },
      uploaded: uploaded.slice(0, 10),
      failed: failed.slice(0, 5),
      summary: `${uploaded.length}/${images.length} images uploaded successfully`,
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
