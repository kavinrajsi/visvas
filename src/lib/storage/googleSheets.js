// Google Sheets integration for form data storage
// Auth: service account (JWT) — share the spreadsheet with GOOGLE_SHEETS_CLIENT_EMAIL as Editor
import { JWT } from 'google-auth-library'
import { sanitiseFormType } from '@/lib/security/sanitiser'

const GOOGLE_SHEETS_CONFIG = {
  clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
  privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
  spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
  baseUrl: 'https://sheets.googleapis.com/v4/spreadsheets',
}

let jwtClient = null

function getJwtClient() {
  if (!jwtClient) {
    jwtClient = new JWT({
      email: GOOGLE_SHEETS_CONFIG.clientEmail,
      // Env vars store newlines as literal \n — restore them for the PEM key
      key: GOOGLE_SHEETS_CONFIG.privateKey.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
  }
  return jwtClient
}

export async function appendToSheet(sheetName, rows) {
  try {
    // Missing config: log instead of write
    if (!GOOGLE_SHEETS_CONFIG.clientEmail || !GOOGLE_SHEETS_CONFIG.privateKey || !GOOGLE_SHEETS_CONFIG.spreadsheetId) {
      console.log('[SHEETS] Missing config - would append to sheet:', {
        sheet: sheetName,
        rowCount: rows.length,
        data: rows,
      })
      return { success: true, updatedRows: rows.length, mode: 'skipped' }
    }

    const { token } = await getJwtClient().getAccessToken()

    const url = `${GOOGLE_SHEETS_CONFIG.baseUrl}/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/values/${encodeURIComponent(sheetName)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        values: rows,
        majorDimension: 'ROWS',
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Google Sheets API error: ${response.status} ${error}`)
    }

    const result = await response.json()
    return {
      success: true,
      updatedRows: result.updates?.updatedRows || rows.length,
      updatedCells: result.updates?.updatedCells,
    }
  } catch (error) {
    console.error('[SHEETS] Error appending to sheet:', error.message)
    return { success: false, error: error.message }
  }
}

export async function storeFormData(formType, formData, metadata = {}) {
  const timestamp = new Date().toISOString()
  const safeFormType = sanitiseFormType(formType)
  const sheetName = `${safeFormType}_responses`

  // Prepare row: [timestamp, name, email, phone, message, metadata...]
  const row = [
    timestamp,
    formData.name || '',
    formData.email || '',
    formData.mobile || '',
    formData.message || '',
    JSON.stringify({
      ...formData,
      ...metadata,
      timestamp,
    }),
  ]

  return appendToSheet(sheetName, [row])
}

export async function createSheetHeaders(formType) {
  // For future use: initialize sheet with headers
  const headers = [
    ['Timestamp', 'Name', 'Email', 'Mobile', 'Message', 'Full Data'],
  ]
  const safeFormType = sanitiseFormType(formType)
  const sheetName = `${safeFormType}_responses`

  if (process.env.NODE_ENV === 'development') {
    console.log('[SHEETS] Dev mode - would create headers:', { sheet: sheetName, headers })
    return { success: true, mode: 'development' }
  }

  return appendToSheet(sheetName, headers)
}
