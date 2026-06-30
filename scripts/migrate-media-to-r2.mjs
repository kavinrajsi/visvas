import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import { getPayload } from 'payload'
import config from '../payload.config.js'
import fs from 'fs/promises'
import path from 'path'

const s3Client = new S3Client({
  endpoint: process.env.R2_ENDPOINT,
  region: 'auto',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
})

const BUCKET = process.env.R2_BUCKET_NAME
const MEDIA_DIR = path.join(process.cwd(), 'media')

async function fileExistsInR2(key) {
  try {
    await s3Client.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }))
    return true
  } catch (error) {
    if (error.name === 'NotFound') return false
    throw error
  }
}

async function uploadFileToR2(filename, fileBuffer) {
  const key = `media/${filename}`

  // Skip if already uploaded
  if (await fileExistsInR2(key)) {
    console.log(`✓ Already in R2: ${filename}`)
    return key
  }

  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: fileBuffer,
      })
    )
    console.log(`✓ Uploaded to R2: ${filename}`)
    return key
  } catch (error) {
    console.error(`✗ Failed to upload ${filename}:`, error.message)
    throw error
  }
}

async function migrateMedia() {
  try {
    // Validate env vars
    if (!BUCKET || !process.env.R2_ENDPOINT || !process.env.R2_ACCESS_KEY || !process.env.R2_SECRET_KEY) {
      console.error('Missing R2 credentials in env vars')
      process.exit(1)
    }

    console.log('Starting media migration to R2...\n')

    const payload = await getPayload({ config })

    // Query all media records
    const { docs: mediaRecords } = await payload.find({
      collection: 'media',
      limit: 1000,
    })

    console.log(`Found ${mediaRecords.length} media records in Payload\n`)

    // Check if media directory exists
    let localFiles = []
    try {
      localFiles = await fs.readdir(MEDIA_DIR)
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log('No local /media/ directory found. Checking Payload records only...\n')
      } else {
        throw error
      }
    }

    // Migrate each media record
    let successCount = 0
    let skipCount = 0

    for (const record of mediaRecords) {
      try {
        const url = record.url
        // Extract filename from Payload URL (e.g., /api/media/filename.jpg -> filename.jpg)
        const filename = url.split('/').pop()

        // Check if file exists locally
        let fileBuffer
        if (localFiles.includes(filename)) {
          try {
            fileBuffer = await fs.readFile(path.join(MEDIA_DIR, filename))
          } catch (error) {
            console.warn(`⚠ Could not read local file ${filename}: ${error.message}`)
            skipCount++
            continue
          }

          // Upload to R2
          const r2Key = await uploadFileToR2(filename, fileBuffer)

          // Update Payload record with R2 URL
          const newUrl = `${process.env.R2_ENDPOINT}/${r2Key}`
          await payload.update({
            collection: 'media',
            id: record.id,
            data: { url: newUrl },
          })

          console.log(`  Updated Payload record: ${record.id}`)

          // Delete local file
          try {
            await fs.unlink(path.join(MEDIA_DIR, filename))
            console.log(`  Deleted local file: ${filename}\n`)
          } catch (error) {
            console.warn(`  ⚠ Could not delete local file ${filename}: ${error.message}\n`)
          }

          successCount++
        } else {
          // File doesn't exist locally, assume already migrated
          skipCount++
        }
      } catch (error) {
        console.error(`✗ Error migrating record ${record.id}:`, error.message, '\n')
      }
    }

    console.log('\n========== MIGRATION SUMMARY ==========')
    console.log(`✓ Successfully migrated: ${successCount}`)
    console.log(`⊘ Skipped (already migrated or missing): ${skipCount}`)
    console.log(`Total processed: ${successCount + skipCount}/${mediaRecords.length}`)
    console.log('========================================')

    if (successCount > 0) {
      console.log('\n✓ Migration complete! You can now safely delete the /media/ directory.')
    }
  } catch (error) {
    console.error('Fatal error during migration:', error)
    process.exit(1)
  }
}

migrateMedia()
