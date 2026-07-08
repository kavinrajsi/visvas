'use client'

import { useEffect } from 'react'
import { trackPageView, trackEvent } from '@/lib/gtm/events'

export default function ProjectPageClient({ project }) {
  useEffect(() => {
    trackPageView({
      page_type: 'project_detail',
      project_name: project?.name,
      project_slug: project?.slug,
      project_location: project?.location,
      project_type: project?.projectType?.map((t) => t?.value).filter(Boolean).join(','),
      project_status: project?.status?.map((s) => s?.value).filter(Boolean).join(','),
      has_cover_image: !!project?.coverImage,
      has_description: !!project?.description,
      bhk_types: project?.bhkTypes?.length || 0,
      timestamp: new Date().toISOString(),
    })
  }, [project])

  return null
}
