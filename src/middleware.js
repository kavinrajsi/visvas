import { NextResponse } from 'next/server'

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
]

export function middleware(request) {
  const pathname = request.nextUrl.pathname

  const isComingSoonPath = comingSoonPaths.some((path) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  })

  if (isComingSoonPath && pathname !== '/coming-soon') {
    return NextResponse.rewrite(new URL('/coming-soon', request.url))
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
}
