'use client'

import { useEffect, useRef, useState } from 'react'

// Native loading="lazy" on iframes kicks in ~1250px before the viewport, which
// still pulls Google Maps (~200 KB of JS) on short pages. Mount the iframe only
// once its slot is within `rootMargin` of the viewport.
export default function LazyIframe({ rootMargin = '200px', className, style, ...iframeProps }) {
  const slotRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const slot = slotRef.current
    if (!slot) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )
    observer.observe(slot)
    return () => observer.disconnect()
  }, [rootMargin])

  if (visible) {
    return <iframe className={className} style={style} {...iframeProps} />
  }

  // Hold the iframe's space so swapping it in doesn't shift the layout
  const placeholderStyle = {
    display: 'block',
    width: '100%',
    height: iframeProps.height ? Number(iframeProps.height) : '100%',
    ...style,
  }
  return <div ref={slotRef} className={className} style={placeholderStyle} aria-hidden="true" />
}
