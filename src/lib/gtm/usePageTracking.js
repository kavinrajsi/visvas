'use client'

import { useEffect } from 'react'
import { trackPageView } from './events'

export function usePageTracking(pageType, additionalData = {}) {
  useEffect(() => {
    trackPageView({
      page_type: pageType,
      page_url: typeof window !== 'undefined' ? window.location.pathname : '',
      page_title: typeof document !== 'undefined' ? document.title : '',
      timestamp: new Date().toISOString(),
      ...additionalData,
    })
  }, [pageType, additionalData])
}
