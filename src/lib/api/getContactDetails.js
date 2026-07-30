import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

const FALLBACK = {
  address: '84, TPK Main Road, Madurai, Tamil Nadu.',
  phone: '+91 95432 24411',
}

// Wrapped in react cache() so the layout, Footer and /contact share a single
// query per request instead of each fetching the contact-page global.
export const getContactDetails = cache(async () => {
  let details = {}

  try {
    const payload = await getPayload({ config })
    const data = await payload.findGlobal({ slug: 'contact-page', depth: 0 })
    details = data?.contactDetails || {}
  } catch (error) {
    console.error('[CONTACT] Failed to load contact details:', error.message)
  }

  const phone = details.phone || process.env.NEXT_PUBLIC_BUSINESS_PHONE || FALLBACK.phone

  return {
    address: details.address || FALLBACK.address,
    email: details.email || process.env.NEXT_PUBLIC_BUSINESS_EMAIL || '',
    phone,
    // Most Indian developers use the same number for calls and WhatsApp
    whatsapp: details.whatsapp || phone,
  }
})
