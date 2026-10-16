'use client'

import { useEffect } from 'react'

export function PostHogProvider({ children }) {
  useEffect(() => {
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST
    const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
    if (!host || !token) return

    // posthog-js is ~75 KB gzipped; fetch it after the page has loaded instead
    // of shipping it in every page's first-load bundle.
    let cancelled = false
    const start = () => {
      import('posthog-js').then(({ default: posthog }) => {
        if (cancelled) return
        posthog.init(token, {
          api_host: host,
          loaded: (ph) => {
            if (process.env.NODE_ENV === 'development') ph.debug()
          },
        })
      })
    }

    if (document.readyState === 'complete') {
      start()
    } else {
      window.addEventListener('load', start, { once: true })
    }
    return () => {
      cancelled = true
      window.removeEventListener('load', start)
    }
  }, [])

  return children
}
