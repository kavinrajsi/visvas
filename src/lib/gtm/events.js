// Push events to Google Tag Manager dataLayer.
// The array is created on demand so pushes that happen before gtm.js loads
// (e.g. a form_view on first paint) are queued and replayed by GTM.
export function pushDataLayer(data) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(data)
}

// Track page view with custom data
export function trackPageView(pageData) {
  pushDataLayer({
    event: 'pageview',
    ...pageData,
  })
}

// Track event
export function trackEvent(eventName, eventData) {
  pushDataLayer({
    event: eventName,
    ...eventData,
  })
}

// Set page type (like WordPress pagePostType)
export function setPageType(pageType, additionalData = {}) {
  pushDataLayer({
    pagePostType: pageType,
    ...additionalData,
  })
}

// Fields that must never reach the dataLayer. GA4 rejects personally
// identifiable information, and GTM forwards everything we push, so raw
// form values are replaced with presence flags before pushing.
const PII_FIELDS = new Set(['name', 'email', 'mobile', 'phone', 'message', 'company'])

export function sanitiseFormPayload(formData = {}) {
  const safe = {}
  for (const [key, value] of Object.entries(formData)) {
    if (PII_FIELDS.has(key)) continue
    if (key === 'whatsapp') {
      safe.whatsapp_opted = Boolean(value)
      continue
    }
    if (key === 'project') {
      if (value) safe.project_name = value
      continue
    }
    safe[key] = value
  }
  if ('message' in formData) {
    const text = typeof formData.message === 'string' ? formData.message.trim() : ''
    safe.has_message = text.length > 0
    safe.message_length = text.length
  }
  return safe
}

// Track form submission outcome. `formData` may contain raw form values;
// PII is stripped before the push.
export function trackFormSubmission(formType, formData = {}, status = 'success') {
  pushDataLayer({
    event: 'form_submission',
    form_type: formType,
    form_status: status,
    ...sanitiseFormPayload(formData),
  })
}

// Track phone click
export function trackPhoneClick(phoneNumber, source = '') {
  pushDataLayer({
    event: 'phone_click',
    phone_number: phoneNumber,
    phone_source: source,
  })
}

// Track address click
export function trackAddressClick(address, source = '') {
  pushDataLayer({
    event: 'address_click',
    address: address,
    address_source: source,
  })
}

// Track a page section scrolling into view (fire once per section per page load)
export function trackSectionView(section, additionalData = {}) {
  pushDataLayer({
    event: 'section_view',
    section,
    ...additionalData,
  })
}

// Track a language switch on a multi-language page
export function trackLanguageSwitch(fromLanguage, toLanguage, additionalData = {}) {
  pushDataLayer({
    event: 'language_switch',
    from_language: fromLanguage,
    to_language: toLanguage,
    ...additionalData,
  })
}
