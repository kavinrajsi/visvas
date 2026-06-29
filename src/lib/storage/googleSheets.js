// Google Sheets integration for form data storage

const GOOGLE_SHEETS_CONFIG = {
  apiKey: process.env.GOOGLE_SHEETS_API_KEY,
  spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
  baseUrl: 'https://sheets.googleapis.com/v4/spreadsheets',
}

export async function appendToSheet(sheetName, rows) {
  try {
    // Missing config: log instead of write
    if (!GOOGLE_SHEETS_CONFIG.apiKey || !GOOGLE_SHEETS_CONFIG.spreadsheetId) {
      console.log('[SHEETS] Missing config - would append to sheet:', {
        sheet: sheetName,
        rowCount: rows.length,
        data: rows,
      })
      return { success: true, updatedRows: rows.length, mode: 'skipped' }
    }

    // Production: send to Google Sheets API
    const url = `${GOOGLE_SHEETS_CONFIG.baseUrl}/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/values/${sheetName}:append?key=${GOOGLE_SHEETS_CONFIG.apiKey}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
  const sheetName = `${formType}_responses`

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
  const sheetName = `${formType}_responses`

  if (process.env.NODE_ENV === 'development') {
    console.log('[SHEETS] Dev mode - would create headers:', { sheet: sheetName, headers })
    return { success: true, mode: 'development' }
  }

  return appendToSheet(sheetName, headers)
}
