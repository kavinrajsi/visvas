'use client'

// Attribution tracking: captures UTM, gclid, fbclid, referrer, page history
// Uses localStorage (first-touch, lifetime) + sessionStorage (last-touch + page history, session-scoped)

function getQueryParam(name) {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  return params.get(name)
}

export function captureFirstTouch() {
  if (typeof window === 'undefined') return null

  const storedFirstTouch = window.localStorage.getItem('visvas_first_touch')
  if (storedFirstTouch) {
    return JSON.parse(storedFirstTouch)
  }

  const firstTouch = {
    utmSource: getQueryParam('utm_source'),
    utmMedium: getQueryParam('utm_medium'),
    utmCampaign: getQueryParam('utm_campaign'),
    utmTerm: getQueryParam('utm_term'),
    utmContent: getQueryParam('utm_content'),
    gclid: getQueryParam('gclid'),
    fbclid: getQueryParam('fbclid'),
    landingPage: window.location.pathname + window.location.search,
    referrer: document.referrer,
    timestamp: new Date().toISOString(),
  }

  // Only store if at least one tracking param is present
  if (firstTouch.utmSource || firstTouch.utmMedium || firstTouch.utmCampaign || firstTouch.gclid || firstTouch.fbclid) {
    window.localStorage.setItem('visvas_first_touch', JSON.stringify(firstTouch))
    return firstTouch
  }

  return null
}

export function captureLastTouch() {
  if (typeof window === 'undefined') return null

  const hasTrackingParams = !!(
    getQueryParam('utm_source') ||
    getQueryParam('utm_medium') ||
    getQueryParam('utm_campaign') ||
    getQueryParam('gclid') ||
    getQueryParam('fbclid')
  )

  if (!hasTrackingParams) {
    return null
  }

  const lastTouch = {
    utmSource: getQueryParam('utm_source'),
    utmMedium: getQueryParam('utm_medium'),
    utmCampaign: getQueryParam('utm_campaign'),
    utmTerm: getQueryParam('utm_term'),
    utmContent: getQueryParam('utm_content'),
    gclid: getQueryParam('gclid'),
    fbclid: getQueryParam('fbclid'),
    currentPage: window.location.pathname + window.location.search,
    timestamp: new Date().toISOString(),
  }

  window.sessionStorage.setItem('visvas_last_touch', JSON.stringify(lastTouch))
  return lastTouch
}

export function trackPageVisit() {
  if (typeof window === 'undefined') return

  const pageVisit = {
    path: window.location.pathname + window.location.search,
    timestamp: new Date().toISOString(),
  }

  let history = []
  try {
    const stored = window.sessionStorage.getItem('visvas_page_history')
    if (stored) {
      history = JSON.parse(stored)
    }
  } catch {
    history = []
  }

  history.push(pageVisit)
  // Cap at 20 entries
  if (history.length > 20) {
    history = history.slice(-20)
  }

  window.sessionStorage.setItem('visvas_page_history', JSON.stringify(history))
}

export function getAttributionData() {
  if (typeof window === 'undefined') {
    return {
      firstTouch: null,
      lastTouch: null,
      previousPage: null,
      referrerDomain: null,
      pageHistory: [],
    }
  }

  let firstTouch = null
  let lastTouch = null
  let pageHistory = []

  try {
    const storedFirstTouch = window.localStorage.getItem('visvas_first_touch')
    if (storedFirstTouch) {
      firstTouch = JSON.parse(storedFirstTouch)
    }

    const storedLastTouch = window.sessionStorage.getItem('visvas_last_touch')
    if (storedLastTouch) {
      lastTouch = JSON.parse(storedLastTouch)
    }

    const storedHistory = window.sessionStorage.getItem('visvas_page_history')
    if (storedHistory) {
      pageHistory = JSON.parse(storedHistory)
    }
  } catch (error) {
    console.error('[ATTRIBUTION] Error parsing stored data:', error.message)
  }

  // Compute previousPage (second-to-last in history)
  let previousPage = null
  if (pageHistory.length >= 2) {
    previousPage = pageHistory[pageHistory.length - 2].path
  }

  // Extract referrer domain from first-touch referrer
  let referrerDomain = null
  if (firstTouch?.referrer) {
    try {
      const refUrl = new URL(firstTouch.referrer)
      referrerDomain = refUrl.hostname
    } catch {
      referrerDomain = firstTouch.referrer
    }
  }

  return {
    firstTouch,
    lastTouch,
    previousPage,
    referrerDomain,
    pageHistory,
  }
}
