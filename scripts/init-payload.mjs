import { getPayload } from 'payload'
import config from '../payload.config.js'

async function init() {
  if (!process.env.PAYLOAD_SECRET || !process.env.DATABASE_URL) {
    console.log('Skipping Payload initialization: missing env vars')
    return
  }

  try {
    console.log('Initializing Payload schema...')
    const payload = await getPayload({ config })
    console.log('Payload initialized successfully')
  } catch (error) {
    console.error('Error initializing Payload:', error.message)
    // Don't fail build - schema might already exist
  }
}

await init()
