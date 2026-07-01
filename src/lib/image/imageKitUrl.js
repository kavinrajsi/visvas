const IMAGEKIT_DOMAIN = process.env.NEXT_PUBLIC_IMAGEKIT_DOMAIN

export function toImageKitUrl(url, options = {}) {
  if (!url) return '/placeholder.png'

  // If no ImageKit domain configured, return original URL
  if (!IMAGEKIT_DOMAIN) return url

  // If URL is already an ImageKit URL, return as-is
  if (url.includes('ik.imagekit.io')) return url

  // If URL is a full absolute URL (not Payload relative), skip transformation
  if (url.startsWith('http')) return url

  // Transform Payload relative URL to ImageKit
  // Strip leading slash if present
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url

  // Build ImageKit URL with default mobile optimization
  const params = new URLSearchParams({
    tr: options.tr || 'w-800,h-600,c-at_max,f-auto,q-80',
  })

  return `${IMAGEKIT_DOMAIN}/${cleanUrl}?${params.toString()}`
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
