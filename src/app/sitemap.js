import { getPayload } from 'payload'
import config from '@payload-config'

export const revalidate = 3600

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.visvas.in'

export default async function sitemap() {
  const payload = await getPayload({ config })

  const urls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects/ongoing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects/completed`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  try {
    // Fetch all projects
    const projectsResult = await payload.find({
      collection: 'projects',
      limit: 1000,
      select: { slug: true, updatedAt: true },
    })

    projectsResult.docs.forEach((project) => {
      if (project.slug) {
        urls.push({
          url: `${baseUrl}/projects/${project.slug}`,
          lastModified: project.updatedAt || new Date(),
          changeFrequency: 'weekly',
          priority: 0.9,
        })
      }
    })

    // Fetch all blog posts
    const postsResult = await payload.find({
      collection: 'posts',
      limit: 1000,
      select: { slug: true, updatedAt: true },
    })

    postsResult.docs.forEach((post) => {
      if (post.slug) {
        urls.push({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: post.updatedAt || new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      }
    })
  } catch (error) {
    console.error('[SITEMAP] Error fetching content:', error)
  }

  return urls
}
