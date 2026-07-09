// Generic form submission handler
// Coordinates: email (Gmail SMTP) + sheets (Google) + CMS (Payload)
import { sendAdminNotification, sendUserConfirmation } from '@/lib/email/gmail'
import { storeFormData as storeFormDataSheets } from '@/lib/storage/googleSheets'
import { storeFormDataPayload, updateDeliveryPayload } from '@/lib/storage/payloadDb'
import { storeFormDataZoho } from '@/lib/storage/zohoCrm'

export async function submitForm(formType, formData, options = {}) {
  const {
    sendAdminEmail = true,
    sendUserEmail = true,
    storeInSheets = true,
    storeInPayload = true,
    storeInZoho = true,
    metadata = {},
  } = options

  const startTime = Date.now()
  const results = {
    formType,
    timestamp: new Date().toISOString(),
    success: false,
    email: null,
    sheets: null,
    payload: null,
    zoho: null,
    errors: [],
  }

  // Get client IP
  let clientIp = metadata.ip || 'unknown'

  // ========== LOG FORM SUBMISSION ==========

  console.log(
    '[FORM_SUBMISSION] incoming',
    JSON.stringify(
      {
        formType,
        timestamp: results.timestamp,
        ip: clientIp,
        userAgent: metadata.userAgent,
        referer: metadata.referer,
        isSpam: metadata.isSpam || false,
        attribution: metadata.attribution,
        data: formData,
      },
      null,
      2
    )
  )

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
      const payloadResult = await storeFormDataPayload(formType, formData, metadata, {
        sheetsStored: !!results.sheets?.success && results.sheets?.mode !== 'skipped',
        sheetsError: results.sheets?.error || null,
      })
      results.payload = payloadResult
      if (!payloadResult.success) {
        results.errors.push(`Payload storage failed: ${payloadResult.error}`)
      }
    } catch (error) {
      results.errors.push(`Payload storage error: ${error.message}`)
    }
  }

  // ========== ZOHO CRM ==========

  if (storeInZoho) {
    try {
      const zohoResult = await storeFormDataZoho(formType, formData, metadata)
      results.zoho = zohoResult
      if (!zohoResult.success) {
        results.errors.push(`Zoho push failed: ${zohoResult.error}`)
      }
    } catch (error) {
      results.errors.push(`Zoho push error: ${error.message}`)
    }
  }

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

    // Record email delivery status on the CMS submission
    if (results.payload?.id) {
      const emailErrors = results.errors.filter((e) => e.includes('email')).join('; ')
      // Send the full delivery group — a partial group update could reset the sheets fields
      await updateDeliveryPayload(results.payload.id, {
        sheetsStored: !!results.sheets?.success && results.sheets?.mode !== 'skipped',
        sheetsError: results.sheets?.error || null,
        adminEmailSent: !!results.email?.admin?.success && results.email?.admin?.mode !== 'development',
        userEmailSent: !!results.email?.user?.success && results.email?.user?.mode !== 'development',
        emailError: emailErrors || null,
      })
    }
  }

  // ========== FINAL RESULT ==========

  const processingTime = Date.now() - startTime
  results.success = results.errors.length === 0
  results.processingTime = processingTime

  // Log the complete submission data + a per-destination status table
  console.log(
    `[FORM_SUBMISSION] result ${formType} ${results.success ? 'SUCCESS' : 'FAILED'} (${processingTime}ms)`,
    JSON.stringify({ formType, timestamp: results.timestamp, ip: clientIp, data: formData }, null, 2)
  )

  // Derive a status label from a destination result object
  const statusOf = (r) => {
    if (!r) return 'not attempted'
    if (r.mode === 'skipped') return 'skipped'
    if (r.mode === 'development') return 'dev (skipped)'
    return r.success ? 'success' : 'failed'
  }
  const detailOf = (r) => (r ? r.error || r.id || r.mode || '' : '')

  console.table([
    { destination: 'Google Sheets', status: statusOf(results.sheets), detail: detailOf(results.sheets) },
    { destination: 'Payload CMS', status: statusOf(results.payload), detail: detailOf(results.payload) },
    { destination: 'Zoho CRM', status: statusOf(results.zoho), detail: detailOf(results.zoho) },
    { destination: 'Admin Email', status: statusOf(results.email?.admin), detail: detailOf(results.email?.admin) },
    { destination: 'User Email', status: statusOf(results.email?.user), detail: detailOf(results.email?.user) },
  ])

  return results
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
