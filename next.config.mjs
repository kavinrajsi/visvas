import { withPayload } from '@payloadcms/next/withPayload'
import { wordpressSpecificRedirects } from './src/lib/redirects/wordpressUrls.js'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  turbopack: {
    resolveAlias: {
      '@payload-config': './payload.config.js',
    },
    ignoreIssue: [
      {
        path: '**/src/lib/storage/nanoDb.js',
        title: 'Module not found',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      // Common WordPress patterns
      { source: '/wp-login.php', destination: '/', permanent: true },
      { source: '/wp-login', destination: '/', permanent: true },
      { source: '/wp-admin/:path*', destination: '/', permanent: true },
      { source: '/wp-content/:path*', destination: '/', permanent: true },
      { source: '/wp-includes/:path*', destination: '/', permanent: true },
      { source: '/wp-json/:path*', destination: '/', permanent: true },
      { source: '/wp-api/:path*', destination: '/', permanent: true },
      { source: '/feed', destination: '/', permanent: true },
      { source: '/feed/:path*', destination: '/', permanent: true },
      { source: '/rss', destination: '/', permanent: true },
      { source: '/rss/:path*', destination: '/', permanent: true },
      { source: '/xmlrpc.php', destination: '/', permanent: true },
      { source: '/category/:slug*', destination: '/blog', permanent: true },
      { source: '/tag/:slug*', destination: '/blog', permanent: true },
      { source: '/tags/:slug*', destination: '/blog', permanent: true },
      { source: '/author/:slug*', destination: '/', permanent: true },
      { source: '/authors/:slug*', destination: '/', permanent: true },
      { source: '/', destination: '/', has: [{ type: 'query', key: 'p' }], permanent: true },
      { source: '/', destination: '/', has: [{ type: 'query', key: 'page_id' }], permanent: true },
      { source: '/', destination: '/', has: [{ type: 'query', key: 'cpage' }], permanent: true },
      // Specific WordPress URL mappings (user-defined)
      ...wordpressSpecificRedirects,
    ]
  },
}

export default withPayload(nextConfig)
