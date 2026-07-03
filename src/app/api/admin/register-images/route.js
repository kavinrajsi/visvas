import { getPayload } from 'payload'
import config from '../../../../../payload.config.js'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')

export async function POST(req) {
  try {
    if (!fs.existsSync(UPLOAD_DIR)) {
      return Response.json({ error: 'Upload directory not found' }, { status: 404 })
    }

    const files = fs.readdirSync(UPLOAD_DIR).filter(f => {
      return /\.(jpg|jpeg|png|gif|webp)$/i.test(f)
    })

    console.log(`Found ${files.length} image files to register`)

    const payload = await getPayload({ config })
    const registered = []
    const failed = []
    const skipped = []

    for (const filename of files) {
      try {
        const filepath = path.join(UPLOAD_DIR, filename)
        const stat = fs.statSync(filepath)

        // Check if already registered
        const existing = await payload.find({
          collection: 'media',
          where: {
            filename: { equals: filename },
          },
        })

        if (existing.docs.length > 0) {
          skipped.push({
            filename,
            id: existing.docs[0].id,
            reason: 'Already registered',
          })
          continue
        }

        // Read file
        const fileBuffer = fs.readFileSync(filepath)
        const mimeType = filename.endsWith('.png') ? 'image/png' : 'image/jpeg'

        // Create media entry via Payload (server-side, bypasses auth)
        const result = await payload.create({
          collection: 'media',
          data: {
            alt: filename.replace(/\.[^/.]+$/, ''),
          },
          file: {
            data: fileBuffer,
            mimetype: mimeType,
            name: filename,
            size: stat.size,
          },
        })

        registered.push({
          id: result.id,
          filename: result.filename,
          url: result.url,
        })

        console.log(`✓ Registered: ${filename} (ID: ${result.id})`)
      } catch (err) {
        console.error(`✗ Failed to register ${filename}:`, err.message)
        failed.push({
          filename,
          error: err.message,
        })
      }
    }

    return Response.json({
      success: true,
      message: `Registered ${registered.length} images`,
      stats: {
        total: files.length,
        registered: registered.length,
        skipped: skipped.length,
        failed: failed.length,
      },
      registered: registered.slice(0, 10),
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
