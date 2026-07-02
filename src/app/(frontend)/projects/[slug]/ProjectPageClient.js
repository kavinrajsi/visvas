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
      project_type: project?.projectType,
      project_status: project?.status,
      has_cover_image: !!project?.coverImage,
      has_description: !!project?.description,
      bhk_types: project?.bhkTypes?.length || 0,
      timestamp: new Date().toISOString(),
    })
  }, [project])

  useEffect(() => {
    // Track when enquiry form becomes visible
    const form = document.querySelector('[class*="enquiry-form"]')
    if (form) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            trackEvent('enquiry_form_visible', {
              project_name: project?.name,
              project_slug: project?.slug,
            })
          }
        },
        { threshold: 0.5 }
      )
      observer.observe(form)
      return () => observer.disconnect()
    }
  }, [project])

  return null
}
