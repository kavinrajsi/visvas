// Local storage: JSON file
import fs from 'fs/promises'
import path from 'path'
import { sanitiseFormType } from '@/lib/security/sanitiser'

const DB_DIR = process.env.DATABASE_DIR || 'data'

async function ensureDbDir() {
  try {
    await fs.mkdir(DB_DIR, { recursive: true })
  } catch (error) {
    console.error('[DB] Error creating DB directory:', error.message)
  }
}

// ========== JSON Storage ==========

export async function storeFormDataJson(formType, formData, metadata = {}) {
  try {
    await ensureDbDir()

    const safeFormType = sanitiseFormType(formType)
    const filePath = path.join(DB_DIR, `${safeFormType}_submissions.json`)
    const tempPath = `${filePath}.tmp`
    const timestamp = new Date().toISOString()
    const id = `${formType}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

    const entry = {
      id,
      formType,
      timestamp,
      data: formData,
      metadata,
    }

    let data = []
    try {
      const existing = await fs.readFile(filePath, 'utf-8')
      data = JSON.parse(existing)
    } catch {
      // File doesn't exist yet
      data = []
    }

    data.push(entry)
    await fs.writeFile(tempPath, JSON.stringify(data, null, 2))
    await fs.rename(tempPath, filePath)

    console.log(`[DB] Form data stored (JSON): ${id}`)
    return { success: true, id, filePath }
  } catch (error) {
    console.error('[DB] Error storing form data (JSON):', error.message)
    return { success: false, error: error.message }
  }
}

export async function getFormDataJson(formType, limit = 100) {
  try {
    await ensureDbDir()

    const safeFormType = sanitiseFormType(formType)
    const filePath = path.join(DB_DIR, `${safeFormType}_submissions.json`)
    const data = await fs.readFile(filePath, 'utf-8')
    const submissions = JSON.parse(data)

    return { success: true, data: submissions.slice(-limit) }
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { success: true, data: [] }
    }
    console.error('[DB] Error reading form data (JSON):', error.message)
    return { success: false, error: error.message }
  }
}

export async function storeFormData(formType, formData, metadata = {}) {
  return storeFormDataJson(formType, formData, metadata)
}

export async function getFormData(formType, limit = 100) {
  return getFormDataJson(formType, limit)
}
