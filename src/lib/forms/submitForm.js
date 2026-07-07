// Generic form submission handler
// Coordinates: email (Gmail SMTP) + storage (JSON/SQLite) + sheets (Google) + CMS (Payload)
import { sendAdminNotification, sendUserConfirmation } from '@/lib/email/gmail'
import { storeFormData as storeFormDataDb, getFormData } from '@/lib/storage/nanoDb'
import { storeFormData as storeFormDataSheets } from '@/lib/storage/googleSheets'
import { storeFormDataPayload } from '@/lib/storage/payloadDb'

export async function submitForm(formType, formData, options = {}) {
  const {
    sendAdminEmail = true,
    sendUserEmail = true,
    storeInDb = true,
    storeInSheets = true,
    storeInPayload = true,
    metadata = {},
  } = options

  const startTime = Date.now()
  const results = {
    formType,
    timestamp: new Date().toISOString(),
    success: false,
    email: null,
    db: null,
    sheets: null,
    payload: null,
    errors: [],
  }

  // Get client IP
  let clientIp = metadata.ip || 'unknown'

  // ========== LOG FORM SUBMISSION ==========

  console.log(
    '[FORM_SUBMISSION]',
    JSON.stringify(
      {
        formType,
        timestamp: results.timestamp,
        ip: clientIp,
        userAgent: metadata.userAgent,
        data: formData,
      },
      null,
      2
    )
  )

  // ========== EMAIL NOTIFICATIONS ==========

  if (sendAdminEmail || sendUserEmail) {
    const emailData = {
      formType,
      formData,
      timestamp: results.timestamp,
      email: formData.email,
      ip: clientIp,
      id: `${formType}_${Date.now()}`,
      isSpam: metadata.isSpam || false,
      attribution: metadata.attribution,
    }

    if (sendAdminEmail) {
      try {
        const adminResult = await sendAdminNotification(emailData)
        results.email = { admin: adminResult }
        if (!adminResult.success) {
          results.errors.push(`Admin email failed: ${adminResult.error}`)
        }
      } catch (error) {
        results.errors.push(`Admin email error: ${error.message}`)
      }
    }

    if (sendUserEmail && formData.email) {
      try {
        const userResult = await sendUserConfirmation(emailData)
        results.email = { ...results.email, user: userResult }
        if (!userResult.success) {
          results.errors.push(`User email failed: ${userResult.error}`)
        }
      } catch (error) {
        results.errors.push(`User email error: ${error.message}`)
      }
    }
  }

  // ========== DATABASE STORAGE ==========

  if (storeInDb) {
    try {
      const dbResult = await storeFormDataDb(formType, formData, {
        ...metadata,
        source: 'form_submission',
      })
      results.db = dbResult
      if (!dbResult.success) {
        results.errors.push(`DB storage failed: ${dbResult.error}`)
      }
    } catch (error) {
      results.errors.push(`DB storage error: ${error.message}`)
    }
  }

  // ========== GOOGLE SHEETS ==========

  if (storeInSheets) {
    try {
      const sheetsResult = await storeFormDataSheets(formType, formData, metadata)
      results.sheets = sheetsResult
      if (!sheetsResult.success) {
        results.errors.push(`Sheets storage failed: ${sheetsResult.error}`)
      }
    } catch (error) {
      results.errors.push(`Sheets storage error: ${error.message}`)
    }
  }

  // ========== PAYLOAD CMS STORAGE ==========

  if (storeInPayload) {
    try {
      const payloadResult = await storeFormDataPayload(formType, formData, metadata)
      results.payload = payloadResult
      if (!payloadResult.success) {
        results.errors.push(`Payload storage failed: ${payloadResult.error}`)
      }
    } catch (error) {
      results.errors.push(`Payload storage error: ${error.message}`)
    }
  }

  // ========== FINAL RESULT ==========

  const processingTime = Date.now() - startTime
  results.success = results.errors.length === 0
  results.processingTime = processingTime

  // Log result
  console.log(`[FORM] ${formType} submission ${results.success ? 'SUCCESS' : 'FAILED'}`, {
    timestamp: results.timestamp,
    email: formData.email,
    success: results.success,
    processingTime,
    errors: results.errors,
  })

  return results
}

// Retrieve submitted form data
export async function getFormSubmissions(formType, limit = 100) {
  try {
    return await getFormData(formType, limit)
  } catch (error) {
    console.error('[FORM] Error retrieving submissions:', error.message)
    return { success: false, error: error.message }
  }
}

// Validate form data
export function validateFormData(formType, formData) {
  const errors = []

  // Common validations
  if (!formData.name || formData.name.trim().length === 0) {
    errors.push('Name is required')
  }

  if (!formData.email || !isValidEmail(formData.email)) {
    errors.push('Valid email is required')
  }

  // Form-specific validations
  if (formType === 'enquiry' || formType === 'contact') {
    if (!formData.mobile || formData.mobile.trim().length === 0) {
      errors.push('Mobile number is required')
    }

    if (!formData.budget || formData.budget.trim().length === 0) {
      errors.push('Budget is required')
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
