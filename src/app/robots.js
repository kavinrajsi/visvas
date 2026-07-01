export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.visvas.in'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/payload*'],
      },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot'],
        allow: ['/llms.txt', '/llms-full.txt', '/ai.txt'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
