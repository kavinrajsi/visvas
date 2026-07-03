import { getPayload } from 'payload'
import config from '../../../../../payload.config.js'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

function extractTextFromHtml(html) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[^;]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function createLexicalContent(htmlContent) {
  const plainText = extractTextFromHtml(htmlContent)

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              mode: 'normal',
              text: plainText || 'No content',
              type: 'text',
              style: '',
              detail: 0,
              format: 0,
              version: 1,
            },
          ],
        },
      ],
    },
  }
}

function parseWordPressXml(xmlContent) {
  const posts = []

  // Extract all items
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let match

  while ((match = itemRegex.exec(xmlContent)) !== null) {
    const itemContent = match[1]

    // Skip attachments and other non-post types
    if (itemContent.includes('<wp:post_type><![CDATA[attachment]]>')) {
      continue
    }

    // Extract fields
    const titleMatch = itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)
    const contentMatch = itemContent.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/)
    const statusMatch = itemContent.match(/<wp:status><!\[CDATA\[(.*?)\]\]><\/wp:status>/)
    const dateMatch = itemContent.match(/<wp:post_date><!\[CDATA\[(.*?)\]\]><\/wp:post_date>/)
    const creatorMatch = itemContent.match(/<dc:creator><!\[CDATA\[(.*?)\]\]><\/dc:creator>/)

    const title = titleMatch ? titleMatch[1].trim() : 'Untitled'
    const content = contentMatch ? contentMatch[1].trim() : ''
    const status = statusMatch ? statusMatch[1].trim() : 'draft'
    const date = dateMatch ? dateMatch[1].trim() : new Date().toISOString()
    const author = creatorMatch ? creatorMatch[1].trim() : 'admin'

    // Skip empty content
    if (!content || content.length < 50) {
      continue
    }

    // Extract images from content
    const imageMatches = [...content.matchAll(/src="([^"]+\.(?:jpg|jpeg|png|gif|webp))"/gi)]
    const imageFilenames = imageMatches.map(m => {
      const filename = m[1].split('/').pop().toLowerCase()
      return filename
    })

    // Create slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 100)

    // Create excerpt
    const excerpt = extractTextFromHtml(content).substring(0, 200)

    posts.push({
      title,
      slug: slug || 'untitled-post',
      excerpt,
      content,
      contentJson: createLexicalContent(content),
      status: status === 'publish' ? 'published' : 'draft',
      author,
      publishedAt: new Date(date),
      imageFilenames,
    })
  }

  return posts
}

export async function POST(req) {
  try {
    const wpXmlPath = path.join(process.cwd(), 'wp', 'visvas.WordPress.2026-07-02.xml')

    if (!fs.existsSync(wpXmlPath)) {
      return Response.json({ error: 'WordPress XML not found' }, { status: 404 })
    }

    const xmlContent = fs.readFileSync(wpXmlPath, 'utf-8')
    const posts = parseWordPressXml(xmlContent)

    console.log(`Found ${posts.length} posts to import`)

    const payload = await getPayload({ config })

    // Get all media files for matching
    const allMedia = await payload.find({
      collection: 'media',
      limit: 1000,
    })

    const mediaMap = {}
    allMedia.docs.forEach(m => {
      mediaMap[m.filename.toLowerCase()] = m.id
    })

    // Create posts
    const created = []
    const failed = []

    // Get existing slugs from DB
    const existingPosts = await payload.find({
      collection: 'posts',
      limit: 1000,
      select: { slug: true },
    })

    const usedSlugs = new Set(existingPosts.docs.map(p => p.slug))

    for (const post of posts) {
      try {
        // Ensure unique slug
        let slug = post.slug
        let counter = 1
        while (usedSlugs.has(slug)) {
          slug = `${post.slug}-${counter}`
          counter++
        }
        usedSlugs.add(slug)

        // Find first matching cover image
        let coverImageId = null
        for (const img of post.imageFilenames) {
          if (mediaMap[img]) {
            coverImageId = mediaMap[img]
            break
          }
        }

        // Fallback to first media if no match found
        if (!coverImageId && allMedia.docs.length > 0) {
          coverImageId = allMedia.docs[0].id
        }

        const result = await payload.create({
          collection: 'posts',
          data: {
            title: post.title,
            slug: slug,
            excerpt: post.excerpt,
            coverImage: coverImageId,
            content: post.contentJson,
            author: post.author,
            status: post.status,
            publishedAt: post.publishedAt,
          },
        })
        created.push({
          id: result.id,
          title: result.title,
          slug: result.slug,
          coverImageId,
        })
      } catch (err) {
        failed.push({
          title: post.title,
          error: err.message,
        })
      }
    }

    return Response.json({
      success: true,
      message: `Imported ${created.length} posts`,
      stats: {
        total: posts.length,
        created: created.length,
        failed: failed.length,
      },
      created: created.slice(0, 10), // Show first 10
      failed: failed.slice(0, 5), // Show first 5 errors
    })
  } catch (error) {
    return Response.json(
      {
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}
