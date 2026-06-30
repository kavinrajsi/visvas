'use client'

// Client-side analytics tracking for form submissions
// Fires events to: GTM dataLayer, GA4, Google Ads, Meta Pixel

export function trackFormSubmit(formType, data = {}) {
  if (typeof window === 'undefined') return

  // 1. Push to GTM dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'form_submit',
      form_type: formType,
      ...data,
    })
  }

  // 2. GA4 generate_lead event
  if (window.gtag) {
    window.gtag('event', 'generate_lead', {
      form_type: formType,
      ...data,
    })
  }

  // 3. Google Ads conversion
  if (window.gtag && process.env.NEXT_PUBLIC_GADS_ID) {
    window.gtag('event', 'conversion', {
      send_to: process.env.NEXT_PUBLIC_GADS_ID,
      form_type: formType,
      ...data,
    })
  }

  // 4. Meta Pixel Lead event
  if (window.fbq) {
    window.fbq('track', 'Lead', {
      form_name: formType,
      ...data,
    })
  }

  console.log('[ANALYTICS] Form submission tracked:', { formType, data })
}
