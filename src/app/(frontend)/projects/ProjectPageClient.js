'use client'

import { useEffect } from 'react'
import { trackPageView } from '@/lib/gtm/events'

export default function ProjectPageClient({ category, projectCount, filters = {} }) {
  useEffect(() => {
    trackPageView({
      page_type: 'projects',
      category: category,
      project_count: projectCount,
      has_filters: Object.keys(filters).length > 0,
      active_filters: Object.keys(filters),
      timestamp: new Date().toISOString(),
    })
  }, [category, projectCount, filters])

  return null
}
