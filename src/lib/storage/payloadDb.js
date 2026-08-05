// Payload CMS storage for form submissions
import { getPayload } from 'payload'
import config from '@payload-config'

export async function storeFormDataPayload(formType, formData, metadata = {}, delivery = {}) {
  try {
    const payload = await getPayload({ config })

    const attribution = metadata.attribution || {}
    const firstTouch = attribution.firstTouch || {}
    const lastTouch = attribution.lastTouch || {}

    // Field names must match the group structure in src/collections/ContactSubmissions.js.
    // Note the client sends `gclid`/`fbclid` (attribution.js) while the schema uses `gclId`/`fbClId`.
    const payloadData = {
      delivery,
      name: formData.name,
      email: formData.email,
      phone: formData.mobile,
      whatsappActivated: formData.whatsapp || false,
      budget: formData.budget,
      message: formData.message,
      formType,
      project: formData.project || null,
      isSpam: metadata.isSpam || false,
      tracking: {
        ip: metadata.ip,
        userAgent: metadata.userAgent,
        referrer: metadata.referer,
        referrerDomain: attribution.referrerDomain,
        previousPage: attribution.previousPage,
        pageHistory: attribution.pageHistory ? JSON.stringify(attribution.pageHistory) : null,
      },
      firstTouch: {
        utmSource: firstTouch.utmSource,
        utmMedium: firstTouch.utmMedium,
        utmCampaign: firstTouch.utmCampaign,
        utmTerm: firstTouch.utmTerm,
        utmContent: firstTouch.utmContent,
        gclId: firstTouch.gclid,
        fbClId: firstTouch.fbclid,
        landingPage: firstTouch.landingPage,
        timestamp: firstTouch.timestamp,
      },
      lastTouch: {
        utmSource: lastTouch.utmSource,
        utmMedium: lastTouch.utmMedium,
        utmCampaign: lastTouch.utmCampaign,
        utmTerm: lastTouch.utmTerm,
        utmContent: lastTouch.utmContent,
        gclId: lastTouch.gclid,
        fbClId: lastTouch.fbclid,
        currentPage: lastTouch.currentPage,
        timestamp: lastTouch.timestamp,
      },
    }

    const result = await payload.create({
      collection: 'contact-submissions',
      data: payloadData,
    })

    console.log('[PAYLOAD] Form data stored:', result.id)
    return { success: true, id: result.id }
  } catch (error) {
    console.error('[PAYLOAD] Error storing form data:', error.message)
    return { success: false, error: error.message }
  }
}

// Write one immutable log row per submission attempt (audit trail in Neon)
export async function logFormSubmission(logData) {
  try {
    const payload = await getPayload({ config })

    const result = await payload.create({
      collection: 'form-submission-logs',
      data: logData,
    })

    return { success: true, id: result.id }
  } catch (error) {
    console.error('[PAYLOAD] Error writing submission log:', error.message)
    return { success: false, error: error.message }
  }
}

// Update delivery status (e.g. email results) on an existing submission
export async function updateDeliveryPayload(id, delivery) {
  try {
    const payload = await getPayload({ config })

    await payload.update({
      collection: 'contact-submissions',
      id,
      data: { delivery },
    })

    return { success: true }
  } catch (error) {
    console.error('[PAYLOAD] Error updating delivery status:', error.message)
    return { success: false, error: error.message }
  }
}
