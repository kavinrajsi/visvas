import { getPayload } from 'payload'
import config from '../../../../../payload.config.js'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

function extractTextFromHtml(html) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&[^;]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function createLexicalContent(htmlContent) {
  const plainText = extractTextFromHtml(htmlContent)
  const excerpt = plainText.substring(0, 300)

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
              text: plainText,
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

export async function POST(req) {
  try {
    const wpXmlPath = path.join(process.cwd(), 'wp', 'visvas.WordPress.2026-07-02.xml')

    if (!fs.existsSync(wpXmlPath)) {
      return Response.json({ error: 'WordPress XML not found' }, { status: 404 })
    }

    const xmlContent = fs.readFileSync(wpXmlPath, 'utf-8')

    // Extract Amruta section using regex
    const amrutaMatch = xmlContent.match(
      /<h2>Amruta - 3 BHK Independent House[\s\S]*?<\/content:encoded>/
    )

    if (!amrutaMatch) {
      return Response.json({ error: 'Amruta content not found in XML' }, { status: 404 })
    }

    const amrutaHtml = amrutaMatch[0]
      .replace(/<\/content:encoded>$/, '')
      .replace(/^[\s\S]*?<h2>/, '<h2>')

    // Create Lexical content from HTML
    const contentJson = createLexicalContent(amrutaHtml)

    // Update post 41
    const payload = await getPayload({ config })

    // Get first media for cover image
    const media = await payload.find({
      collection: 'media',
      limit: 1,
    })

    // Try to update post 41, if not found, create new post
    let result
    try {
      result = await payload.update({
        collection: 'posts',
        id: '41',
        data: {
          content: contentJson,
        },
      })
      return Response.json({
        success: true,
        message: 'Post 41 updated with WordPress content',
        post: {
          id: result.id,
          title: result.title,
        },
      })
    } catch (updateErr) {
      // Create new post if 41 doesn't exist
      result = await payload.create({
        collection: 'posts',
        data: {
          title: 'Amruta - 3 BHK Independent House / Bungalow - Sale in Ponmeni',
          slug: 'amruta-3bhk-independent-house',
          excerpt: 'Premium 3 BHK independent villas in Ponmeni, Madurai with gated community amenities',
          coverImage: media.docs[0]?.id || 269,
          content: contentJson,
          author: 'Visvas Team',
          status: 'draft',
        },
      })
      return Response.json({
        success: true,
        message: 'New Amruta post created with WordPress content',
        post: {
          id: result.id,
          title: result.title,
        },
      })
    }
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
