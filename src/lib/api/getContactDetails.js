import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

const FALLBACK = {
  address: '84, TPK Main Road, Madurai, Tamil Nadu.',
  phone: '+91 95432 24411',
}

// The root layout calls this on every render, including dynamic pages, so the
// global is held in Next's data cache for an hour and purged by the
// ContactPage global hook via the `contact-page` tag. Errors are caught by the
// caller (not inside unstable_cache) so a DB outage never caches an empty value.
const loadContactDetails = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const data = await payload.findGlobal({ slug: 'contact-page', depth: 0 })
    return data?.contactDetails || {}
  },
  ['contact-details'],
  { tags: ['contact-page'], revalidate: 3600 },
)

// Wrapped in react cache() so the layout, Footer and /contact share a single
// lookup per request.
export const getContactDetails = cache(async () => {
  let details = {}

  try {
    details = await loadContactDetails()
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
