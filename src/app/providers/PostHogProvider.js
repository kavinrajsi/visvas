'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

export function PostHogProvider({ children }) {
  useEffect(() => {
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST
    const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN

    if (host && token) {
      posthog.init(token, {
        api_host: host,
        loaded: (ph) => {
          if (process.env.NODE_ENV === 'development') ph.debug()
        },
      })
    }
  }, [])

  return children
}
