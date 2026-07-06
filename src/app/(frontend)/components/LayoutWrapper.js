'use client'

import { usePathname } from 'next/navigation'

export default function LayoutWrapper({ children, footer = false }) {
  const pathname = usePathname()
  const isComingSoon = pathname === '/coming-soon'

  if (isComingSoon) {
    return null
  }

  return <>{children}</>
}
