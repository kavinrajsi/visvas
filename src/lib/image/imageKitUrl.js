const IMAGEKIT_DOMAIN = process.env.NEXT_PUBLIC_IMAGEKIT_DOMAIN
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export function toImageKitUrl(url, options = {}) {
  if (!url) return '/placeholder.png'

  // If URL is already an ImageKit URL, return as-is
  if (url.includes('ik.imagekit.io')) return url

  // If URL is a full absolute URL (not Payload relative), skip transformation
  if (url.startsWith('http')) return url

  // If ImageKit domain configured, transform to ImageKit
  if (IMAGEKIT_DOMAIN) {
    const cleanUrl = url.startsWith('/') ? url.slice(1) : url
    const params = new URLSearchParams({
      tr: options.tr || 'w-800,h-600,c-at_max,f-auto,q-80',
    })
    return `${IMAGEKIT_DOMAIN}/${cleanUrl}?${params.toString()}`
  }

  // Fallback: return as absolute URL to allow Next.js Image optimization
  // Needed for Next.js Image component to work with relative Payload URLs
  if (url.startsWith('/')) {
    return `${SITE_URL}${url}`
  }

  return url
}

// Responsive image srcSet variants for mobile optimization
export function getImageSrcSet(url) {
  if (!url || !IMAGEKIT_DOMAIN || url.startsWith('http')) return undefined

  const cleanUrl = url.startsWith('/') ? url.slice(1) : url

  return {
    mobile: `${IMAGEKIT_DOMAIN}/${cleanUrl}?tr=w-320,h-240,c-at_max,f-auto,q-75`,
    tablet: `${IMAGEKIT_DOMAIN}/${cleanUrl}?tr=w-640,h-480,c-at_max,f-auto,q-80`,
    desktop: `${IMAGEKIT_DOMAIN}/${cleanUrl}?tr=w-1200,h-900,c-at_max,f-auto,q-85`,
  }
}
