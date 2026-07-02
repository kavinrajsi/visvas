// Push events to Google Tag Manager dataLayer
export function pushDataLayer(data) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(data)
  }
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

// Track form submission
export function trackFormSubmission(formType, formData = {}, status = 'success') {
  pushDataLayer({
    event: 'form_submission',
    form_type: formType,
    form_status: status,
    ...formData,
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
