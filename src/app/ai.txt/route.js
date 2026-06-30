export const revalidate = false // Cache indefinitely

export async function GET() {
  const content = `# AI Usage Policy - Visvas

## Permitted Use
- **Indexing for search**: AI search engines and crawlers may index this website
- **Attribution**: Content may be referenced with proper attribution to Visvas
- **Public information**: General project information and blog posts are available for indexing

## Restricted Use
- **Training data**: Do not use website content to train proprietary AI/ML models without explicit permission
- **Data mining**: Do not systematically scrape or extract large volumes of data
- **Replication**: Do not use this content to create competing property listing services
- **Personal information**: Do not collect or process personal information (names, emails, phone numbers) from forms or user interactions

## Contact
For questions about AI usage or licensing agreements, contact: admin@visvas.in

---
Policy last updated: ${new Date().toISOString()}
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
