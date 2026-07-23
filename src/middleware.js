import { NextResponse } from 'next/server'
import { getClientIp, isBlockedIp } from '@/lib/security/blockedIps'

export function middleware(request) {
  const ip = getClientIp(request.headers)
  if (!isBlockedIp(ip)) return NextResponse.next()

  const { pathname } = request.nextUrl

  // Direct API hits (e.g. bots posting the form) get a hard 403.
  if (pathname.startsWith('/api')) {
    return NextResponse.json(
      { error: 'Access restricted' },
      { status: 403, headers: { 'Cache-Control': 'no-store' } }
    )
  }

  // Everything else renders the block page, keeping the requested URL.
  // The guard avoids a rewrite loop on /blocked itself. no-store keeps any CDN
  // from caching a block response under a normal URL.
  if (pathname !== '/blocked') {
    const res = NextResponse.rewrite(new URL('/blocked', request.url))
    res.headers.set('Cache-Control', 'no-store')
    return res
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
