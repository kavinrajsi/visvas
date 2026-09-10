'use client'

import { useEffect, useRef } from 'react'
import { trackSectionView } from '@/lib/gtm/events'

// Wraps a page section and fires one `section_view` GTM event the first time
// it scrolls into the viewport. Avoids duplicating IntersectionObserver setup
// per section (see ProjectStickyNav.js for the same pattern used for nav highlighting).
export default function TrackedSection({
  id,
  as: Component = 'section',
  className = '',
  language,
  children,
  ...rest
}) {
  const ref = useRef(null)
  const hasFired = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasFired.current) {
            hasFired.current = true
            trackSectionView(id, { language })
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [id, language])

  return (
    <Component id={id} ref={ref} className={className} {...rest}>
      {children}
    </Component>
  )
}
