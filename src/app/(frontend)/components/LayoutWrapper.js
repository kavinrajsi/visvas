'use client'

import { usePathname } from 'next/navigation'

const comingSoonPaths = [
  '/',
  '/about',
  '/projects',
  '/projects/ongoing',
  '/projects/completed',
  '/community',
  '/blog',
  '/contact',
  '/faq',
  '/testimonials',
  '/status',
  '/label',
  '/feature',
  '/category',
]

export default function LayoutWrapper({ children, footer = false }) {
  const pathname = usePathname()

  const isComingSoonPage = comingSoonPaths.some((path) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  })

  if (isComingSoonPage) {
    return null
  }

  return <>{children}</>
}
