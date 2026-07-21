/**
 * One-off restore for the projects.images field after it changed from an
 * array of { image, caption } rows to a hasMany upload.
 *
 * The old projects_images table is dropped by that schema change, so the
 * media ids below are a snapshot taken before it ran. Writing through the
 * Payload API rather than SQL keeps the polymorphic rels rows correct.
 *
 * Idempotent: a project that already has images is skipped.
 *
 * Usage: node scripts/restore-project-images.js
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config.js'

// project id -> media ids, in display order
const SNAPSHOT = {
  53: [398],
  56: [350, 351, 352],
  71: [353, 354, 355],
}

const run = async () => {
  const payload = await getPayload({ config })

  for (const [projectId, mediaIds] of Object.entries(SNAPSHOT)) {
    const id = Number(projectId)

    const project = await payload.findByID({
      collection: 'projects',
      id,
      depth: 0,
    })

    if (!project) {
      payload.logger.warn(`project ${id} not found, skipping`)
      continue
    }

    if (project.images?.length) {
      payload.logger.info(`project ${id} (${project.name}) already has images, skipping`)
      continue
    }

    await payload.update({
      collection: 'projects',
      id,
      data: { images: mediaIds },
      depth: 0,
    })

    payload.logger.info(`project ${id} (${project.name}) restored ${mediaIds.length} images`)
  }

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
