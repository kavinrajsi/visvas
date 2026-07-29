// Specific WordPress URL redirects
// Map old WordPress slugs to new Next.js URLs
// Users can add specific mappings here

export const wordpressSpecificRedirects = [
  // Blog posts (old flat URLs → /blog/:slug)
  { source: '/blog-visvas-promoters-madurai', destination: '/blog', permanent: true },
  { source: '/credai-fairpro-2026-madurai', destination: '/blog/credai-fairpro-2026-madurai', permanent: true },
  { source: '/investments-and-diversification-at-visvas', destination: '/blog/investments-and-diversification-at-visvas', permanent: true },
  { source: '/visvas-promoters-most-trusted-builders-in-madurai', destination: '/blog/visvas-promoters-most-trusted-builders-in-madurai', permanent: true },
  { source: '/top-residential-project-in-madurai-new-projects-for-sale', destination: '/blog/top-residential-project-in-madurai-new-projects-for-sale', permanent: true },
  { source: '/independent-villa-for-sale-in-madurai', destination: '/blog/independent-villa-for-sale-in-madurai', permanent: true },
  { source: '/flats-in-madurai', destination: '/blog/flats-in-madurai', permanent: true },
  { source: '/residential-and-commercial-land-plots-for-sale-in-madurai', destination: '/blog/residential-and-commercial-land-plots-for-sale-in-madurai', permanent: true },
  { source: '/visvas-promoters-properties-for-sale-in-madurai', destination: '/blog/visvas-promoters-properties-for-sale-in-madurai', permanent: true },
  { source: '/rera-major-benefits-of-new-rera-act-for-home-buyers', destination: '/blog/rera-major-benefits-of-new-rera-act-for-home-buyers', permanent: true },
  { source: '/visvas-agrini-enclave', destination: '/blog/visvas-agrini-enclave', permanent: true },
  { source: '/gated-community-independent-villa-for-sale-in-madurai', destination: '/blog/gated-community-independent-villa-for-sale-in-madurai', permanent: true },
  { source: '/gated-communities-in-madurai', destination: '/blog/gated-communities-in-madurai', permanent: true },
  { source: '/ultimate-guide-to-buying-a-house', destination: '/blog/ultimate-guide-to-buying-a-house', permanent: true },
  { source: '/buying-an-apartment-flats-for-sale-in-madurai', destination: '/blog/buying-an-apartment-flats-for-sale-in-madurai', permanent: true },

  // Projects (old /projects/:old-slug → /projects/:new-slug)
  { source: '/projects', destination: '/projects/ongoing', permanent: true },

  // Static/legal/portal pages
  { source: '/contact-1-best-property-developer-in-madurai', destination: '/contact', permanent: true },
  { source: '/properties-madurai-builders', destination: '/projects/ongoing', permanent: true },
  { source: '/about-visvas-promoters', destination: '/about', permanent: true },
  { source: '/madhyapuri-2-bhk-3-bhk-apartments-ellis-nagar', destination: '/projects/madhyapuri', permanent: true },
  { source: '/testimonials', destination: '/', permanent: true },
  { source: '/inquiry-form', destination: '/contact', permanent: true },
  { source: '/insights', destination: '/blog', permanent: true },
  { source: '/faq-visvas-promoters-1-best-builder-in-madurai', destination: '/', permanent: true },
  { source: '/services', destination: '/', permanent: true },
  // NOTE: /privacy and /terms-and-conditions used to redirect to '/'. They are now
  // served by the Policies collection via src/app/(frontend)/[slug]/page.js, so the
  // redirects were removed — config redirects run before filesystem routes and would
  // shadow the real pages. /privacy points at the canonical /privacy-policy slug.
  { source: '/privacy', destination: '/privacy-policy', permanent: true },

  // Houzez portal/account pages
  { source: '/my-profile', destination: '/', permanent: true },
  { source: '/rent', destination: '/', permanent: true },
  { source: '/buy', destination: '/', permanent: true },
  { source: '/complete-order', destination: '/', permanent: true },
  { source: '/packages', destination: '/', permanent: true },
  { source: '/search-results', destination: '/', permanent: true },
  { source: '/create-listing', destination: '/', permanent: true },
  { source: '/board', destination: '/', permanent: true },
  { source: '/saved-search', destination: '/', permanent: true },
  { source: '/membership-info', destination: '/', permanent: true },
  { source: '/invoices', destination: '/', permanent: true },
  { source: '/thank-you', destination: '/', permanent: true },
  { source: '/stripe', destination: '/', permanent: true },
  { source: '/compare-properties', destination: '/', permanent: true },
  { source: '/favorite-properties', destination: '/', permanent: true },
  { source: '/my-properties', destination: '/', permanent: true },
]
