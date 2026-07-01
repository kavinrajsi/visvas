'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { captureFirstTouch, captureLastTouch, trackPageVisit } from '@/lib/analytics/attribution'

function TrackerContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    captureFirstTouch()
    captureLastTouch()
    trackPageVisit()
  }, [pathname, searchParams])

  return null
}

export default function AttributionTracker() {
  return (
    <Suspense fallback={null}>
      <TrackerContent />
    </Suspense>
  )
}
