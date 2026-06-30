import { withPayload } from '@payloadcms/next/withPayload'
import { wordpressSpecificRedirects } from './src/lib/redirects/wordpressUrls.js'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  turbopack: {
    resolveAlias: {
      '@payload-config': './payload.config.js',
    },
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
