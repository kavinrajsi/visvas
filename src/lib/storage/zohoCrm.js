// Zoho CRM Web-to-Lead push. Posts enquiry/contact submissions to the Zoho
// webform endpoint (Enquiries module). Fails gracefully if env vars are absent.
//
// Field mapping (from the generated Zoho webform):
//   Last Name  <- name          Email       <- email
//   Phone      <- mobile        LEADCF67    <- budget (Expected Maximum Price)
//   Description<- message+meta  LEADCF36    <- project (Preferred Projects picklist)
//   Lead Source = 'Website'
//
// Budget is a short text field (maxlength 16) and Preferred Projects is a
// picklist, so budget + project are ALSO folded into Description as a safety net.

const ZOHO_URL = process.env.ZOHO_WEBTOLEAD_URL || 'https://crm.zoho.in/crm/WebToLeadForm'
const XNQSJSDP = process.env.ZOHO_WEBTOLEAD_XNQSJSDP
const XMIWTLD = process.env.ZOHO_WEBTOLEAD_XMIWTLD
const ACTION_TYPE = process.env.ZOHO_WEBTOLEAD_ACTION_TYPE || 'TGVhZHM=' // base64 "Leads"
const RETURN_URL =
  process.env.ZOHO_WEBTOLEAD_RETURN_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.visvas.in'

// Only push lead-type submissions to the CRM
const LEAD_FORM_TYPES = new Set(['enquiry', 'contact'])

function buildDescription(formData) {
  const lines = []
  if (formData.message) lines.push(String(formData.message).trim())
  if (formData.project) lines.push(`Project: ${formData.project}`)
  if (formData.budget) lines.push(`Budget: ${formData.budget}`)
  if (formData.whatsapp !== undefined) lines.push(`WhatsApp: ${formData.whatsapp ? 'Yes' : 'No'}`)
  return lines.join('\n')
}

export async function storeFormDataZoho(formType, formData, metadata = {}) {
  if (!LEAD_FORM_TYPES.has(formType)) {
    return { success: true, mode: 'skipped' }
  }

  if (!XNQSJSDP || !XMIWTLD) {
    // Not configured — no-op, do not block the submission
    return { success: true, mode: 'skipped' }
  }

  try {
    const params = new URLSearchParams()
    // Required Zoho tokens
    params.set('xnQsjsdp', XNQSJSDP)
    params.set('xmIwtLD', XMIWTLD)
    params.set('actionType', ACTION_TYPE)
    params.set('returnURL', RETURN_URL)

    // Mapped fields (skip empties)
    if (formData.name) params.set('Last Name', String(formData.name).slice(0, 80))
    if (formData.email) params.set('Email', String(formData.email).slice(0, 100))
    if (formData.mobile) params.set('Phone', String(formData.mobile).slice(0, 30))
    if (formData.budget) params.set('LEADCF67', String(formData.budget).slice(0, 16))
    if (formData.project) params.set('LEADCF36', String(formData.project))
    const description = buildDescription(formData)
    if (description) params.set('Description', description)
    params.set('Lead Source', 'Website')

    const response = await fetch(ZOHO_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      cache: 'no-store',
    })

    if (!response.ok) {
      return { success: false, error: `Zoho responded ${response.status}` }
    }

    console.log('[ZOHO] Lead pushed:', { formType, email: formData.email })
    return { success: true }
  } catch (error) {
    console.error('[ZOHO] Error pushing lead:', error.message)
    return { success: false, error: error.message }
  }
}
