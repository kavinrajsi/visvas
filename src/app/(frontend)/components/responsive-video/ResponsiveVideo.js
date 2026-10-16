'use client'

import { useEffect, useState } from 'react'

// Muted autoplay background video with a mobile and a desktop rendition.
// The file is picked in JS instead of <source media>, which PageSpeed's
// Chromium answered by fetching both renditions. The download starts after
// window load so the poster paints first and the video doesn't compete with
// critical CSS/JS.
export default function ResponsiveVideo({ mobileSrc, desktopSrc, poster, className }) {
  const [src, setSrc] = useState(null)

  useEffect(() => {
    const start = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches
      setSrc(isMobile ? mobileSrc : desktopSrc)
    }
    if (document.readyState === 'complete') {
      start()
      return
    }
    window.addEventListener('load', start, { once: true })
    return () => window.removeEventListener('load', start)
  }, [mobileSrc, desktopSrc])

  return (
    <video
      src={src ?? undefined}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className={className}
    />
  )
}
