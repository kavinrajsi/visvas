/** @type {import('payload').CollectionConfig} */
const Media = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
  upload: {
    disableLocalStorage: false,
    // /api/media/file/* runs Payload (a DB lookup) per request, and SVGs skip
    // next/image, so browsers hit it directly. Let Vercel's CDN hold files for
    // a day so page views don't wake the database.
    modifyResponseHeaders: ({ headers }) => {
      headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800')
      return headers
    },
  },
}

export default Media
