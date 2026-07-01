import { getPayload } from 'payload'
import config from '../payload.config.js'

async function init() {
  try {
    console.log('Initializing Payload schema...')
    const payload = await getPayload({ config })
    console.log('Payload initialized successfully')
  } catch (error) {
    console.error('Error initializing Payload:', error.message)
    process.exit(0) // Don't fail build if schema already exists
  }
}

init()
