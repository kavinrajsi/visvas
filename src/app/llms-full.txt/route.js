import { getPayload } from 'payload'
import config from '@payload-config'

export const revalidate = 3600

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.visvas.in'

export async function GET() {
  const payload = await getPayload({ config })

  let content = `# Visvas - Complete Property Portfolio

## Company Overview
Visvas is a luxury property developer based in Madurai, Tamil Nadu, India. We specialize in high-end residential and commercial real estate development.

---

## Projects Directory

`

  try {
    // Fetch all projects
    const projectsResult = await payload.find({
      collection: 'projects',
      limit: 1000,
    })

    content += `### Ongoing Projects (${projectsResult.docs.filter(p => !p.status?.some(s => s?.value === 'completed')).length})\n\n`
    projectsResult.docs
      .filter(p => !p.status?.some(s => s?.value === 'completed'))
      .forEach((project) => {
        content += `- **${project.name}** (${project.projectType?.map(t => t?.name).filter(Boolean).join(', ') || 'N/A'})\n`
        content += `  URL: ${baseUrl}/projects/${project.slug}\n`
        if (project.location) content += `  Location: ${project.location}\n`
        if (project.projectDescription) {
          content += `  Description: ${project.projectDescription.substring(0, 200)}...\n`
        }
        content += `\n`
      })

    content += `\n### Completed Projects (${projectsResult.docs.filter(p => p.status?.some(s => s?.value === 'completed')).length})\n\n`
    projectsResult.docs
      .filter(p => p.status?.some(s => s?.value === 'completed'))
      .forEach((project) => {
        content += `- **${project.name}** (${project.projectType?.map(t => t?.name).filter(Boolean).join(', ') || 'N/A'})\n`
        content += `  URL: ${baseUrl}/projects/${project.slug}\n`
        if (project.location) content += `  Location: ${project.location}\n`
        if (project.projectDescription) {
          content += `  Description: ${project.projectDescription.substring(0, 200)}...\n`
        }
        content += `\n`
      })

    // Fetch all blog posts
    const postsResult = await payload.find({
      collection: 'posts',
      limit: 1000,
    })

    content += `---\n\n## Blog (${postsResult.docs.length} articles)\n\n`
    postsResult.docs.forEach((post) => {
      content += `- **${post.title}**\n`
      content += `  URL: ${baseUrl}/blog/${post.slug}\n`
      if (post.excerpt) {
        content += `  Summary: ${post.excerpt}\n`
      }
      content += `\n`
    })
  } catch (error) {
    console.error('[LLMS-FULL] Error fetching content:', error)
    content += `\n[Error loading full content: ${error instanceof Error ? error.message : 'Unknown error'}]\n`
  }

  content += `---\nGenerated: ${new Date().toISOString()}\n`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
