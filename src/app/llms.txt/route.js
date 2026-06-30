export const revalidate = 86400 // 24 hours

export async function GET() {
  const content = `# Visvas - Luxury Property Solutions

## Company

Visvas is a luxury property developer in Madurai, India. We build premium residential properties including apartments, villas, plotted developments, and mixed-use projects.

## Website Structure

### Pages
- Homepage: https://www.visvas.in/
- Ongoing Projects: https://www.visvas.in/projects/ongoing
- Completed Projects: https://www.visvas.in/projects/completed
- Blog: https://www.visvas.in/blog

### Project Details
Each project includes:
- Overview and amenities
- Location and transportation
- Floor plans and media gallery
- FAQ section
- Enquiry form for interested buyers

### Blog
Articles and insights about real estate, project updates, and property investment guidance.

## Contact
For inquiries, use the enquiry form on any project page or contact through our website.

## Key Information
- Location: Madurai, Tamil Nadu, India
- Focus: Premium residential and commercial properties
- Services: Property sales, investment consultation

---
Last updated: ${new Date().toISOString()}
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  })
}
