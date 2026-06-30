// Local storage: JSON file (primary) + SQLite (optional)
import fs from 'fs/promises'
import path from 'path'
import { createRequire } from 'module'
import { sanitiseFormType } from '@/lib/security/sanitiser'

const DB_DIR = process.env.DATABASE_DIR || 'data'
const DB_TYPE = process.env.DATABASE_TYPE || 'json'

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

// ========== SQLite Storage (Optional) ==========

let sqliteDb = null

async function initSQLite() {
  if (sqliteDb) return

  try {
    const require = createRequire(import.meta.url)
    const packageName = 'better' + '-sqlite3'
    const sqlite3 = require(packageName)
    const dbPath = path.join(DB_DIR, 'submissions.db')

    sqliteDb = new sqlite3(dbPath)
    console.log('[DB] SQLite initialized:', dbPath)

    // Create table if not exists
    sqliteDb.exec(`
      CREATE TABLE IF NOT EXISTS form_submissions (
        id TEXT PRIMARY KEY,
        form_type TEXT NOT NULL,
        email TEXT,
        name TEXT,
        phone TEXT,
        data TEXT NOT NULL,
        metadata TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)
  } catch (error) {
    console.warn('[DB] SQLite not available, using JSON only:', error.message)
    sqliteDb = null
  }
}

export async function storeFormDataSQLite(formType, formData, metadata = {}) {
  try {
    await initSQLite()

    if (!sqliteDb) {
      return { success: false, error: 'SQLite not available' }
    }

    const id = `${formType}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
    const stmt = sqliteDb.prepare(`
      INSERT INTO form_submissions (id, form_type, email, name, phone, data, metadata)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)

    stmt.run(
      id,
      formType,
      formData.email,
      formData.name,
      formData.mobile,
      JSON.stringify(formData),
      JSON.stringify(metadata)
    )

    console.log(`[DB] Form data stored (SQLite): ${id}`)
    return { success: true, id }
  } catch (error) {
    console.error('[DB] Error storing form data (SQLite):', error.message)
    return { success: false, error: error.message }
  }
}

export async function getFormDataSQLite(formType, limit = 100) {
  try {
    await initSQLite()

    if (!sqliteDb) {
      return { success: false, error: 'SQLite not available' }
    }

    const stmt = sqliteDb.prepare(`
      SELECT * FROM form_submissions
      WHERE form_type = ?
      ORDER BY created_at DESC
      LIMIT ?
    `)

    const rows = stmt.all(formType, limit)
    const data = rows.map(row => ({
      id: row.id,
      formType: row.form_type,
      timestamp: row.created_at,
      data: JSON.parse(row.data),
      metadata: row.metadata ? JSON.parse(row.metadata) : {},
    }))

    return { success: true, data }
  } catch (error) {
    console.error('[DB] Error reading form data (SQLite):', error.message)
    return { success: false, error: error.message }
  }
}

// ========== Smart Router ==========

export async function storeFormData(formType, formData, metadata = {}) {
  const useJson = DB_TYPE === 'json' || DB_TYPE === 'both'
  const useSqlite = DB_TYPE === 'sqlite' || DB_TYPE === 'both'

  const results = []

  if (useJson) {
    const jsonResult = await storeFormDataJson(formType, formData, metadata)
    results.push(jsonResult)
  }

  if (useSqlite) {
    const sqliteResult = await storeFormDataSQLite(formType, formData, metadata)
    results.push(sqliteResult)
  }

  const allSuccess = results.every(r => r.success)
  return {
    success: allSuccess,
    results,
    error: allSuccess ? null : 'One or more storage backends failed',
  }
}

export async function getFormData(formType, limit = 100) {
  const primaryDb = DB_TYPE === 'sqlite' ? 'sqlite' : 'json'

  if (primaryDb === 'json') {
    return getFormDataJson(formType, limit)
  } else {
    return getFormDataSQLite(formType, limit)
  }
}
