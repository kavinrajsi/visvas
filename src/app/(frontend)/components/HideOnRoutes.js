'use client'

import { usePathname } from 'next/navigation'

// Hides an already-rendered subtree (e.g. the global Footer) on routes whose
// pathname starts with one of `prefixes`. The child is still a Server
// Component rendered by the parent layout — this only controls whether it
// mounts into the DOM for the current route.
export default function HideOnRoutes({ prefixes, children }) {
  const pathname = usePathname()
  const hidden = prefixes.some((prefix) => pathname?.startsWith(prefix))

  if (hidden) return null
  return children
}
