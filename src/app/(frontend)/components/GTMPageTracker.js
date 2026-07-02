'use client'

import { useEffect } from 'react'
import { pushDataLayer } from '@/lib/gtm/events'

export default function GTMPageTracker({ pageType, author = 'Visvas Team', customData = {} }) {
  useEffect(() => {
    pushDataLayer({
      pagePostType: pageType,
      pagePostAuthor: author,
      ...customData,
    })
  }, [pageType, author, customData])

  return null
}
