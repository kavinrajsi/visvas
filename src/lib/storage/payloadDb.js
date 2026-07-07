// Payload CMS storage for form submissions
import { getPayload } from 'payload'
import config from '@payload-config'

export async function storeFormDataPayload(formType, formData, metadata = {}, delivery = {}) {
  try {
    const payload = await getPayload({ config })

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
      ip: metadata.ip,
      userAgent: metadata.userAgent,
      referrer: metadata.referer,
      referrerDomain: metadata.attribution?.referrerDomain,
      previousPage: metadata.attribution?.previousPage,
      pageHistory: metadata.attribution?.pageHistory ? JSON.stringify(metadata.attribution.pageHistory) : null,
      // First touch
      utmSourceFirst: metadata.attribution?.firstTouch?.utmSource,
      utmMediumFirst: metadata.attribution?.firstTouch?.utmMedium,
      utmCampaignFirst: metadata.attribution?.firstTouch?.utmCampaign,
      utmTermFirst: metadata.attribution?.firstTouch?.utmTerm,
      utmContentFirst: metadata.attribution?.firstTouch?.utmContent,
      gclIdFirst: metadata.attribution?.firstTouch?.gclid,
      fbClIdFirst: metadata.attribution?.firstTouch?.fbclid,
      landingPageFirst: metadata.attribution?.firstTouch?.landingPage,
      timestampFirst: metadata.attribution?.firstTouch?.timestamp,
      // Last touch
      utmSourceLast: metadata.attribution?.lastTouch?.utmSource,
      utmMediumLast: metadata.attribution?.lastTouch?.utmMedium,
      utmCampaignLast: metadata.attribution?.lastTouch?.utmCampaign,
      utmTermLast: metadata.attribution?.lastTouch?.utmTerm,
      utmContentLast: metadata.attribution?.lastTouch?.utmContent,
      gclIdLast: metadata.attribution?.lastTouch?.gclid,
      fbClIdLast: metadata.attribution?.lastTouch?.fbclid,
      currentPageLast: metadata.attribution?.lastTouch?.currentPage,
      timestampLast: metadata.attribution?.lastTouch?.timestamp,
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
