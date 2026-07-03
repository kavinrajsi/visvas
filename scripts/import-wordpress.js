import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import config from '../payload.config.js'
import xml2js from 'xml2js'
import fetch from 'node-fetch'

const WORDPRESS_XML_PATH = path.join(process.cwd(), 'wp/visvas.WordPress.2026-07-02.xml')
const DOWNLOADS_DIR = path.join(process.cwd(), 'public/wp-imports')

async function downloadImage(url, filename) {
  if (!fs.existsSync(DOWNLOADS_DIR)) {
    fs.mkdirSync(DOWNLOADS_DIR, { recursive: true })
  }

  const filepath = path.join(DOWNLOADS_DIR, filename)

  const response = await fetch(url)
  const buffer = await response.arrayBuffer()
  fs.writeFileSync(filepath, Buffer.from(buffer))

  return filepath
}

function htmlToLexical(html) {
  // Simple HTML to Lexical conversion
  // This is a basic implementation - real HTML would need more sophisticated parsing
  const root = {
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
              text: html
                .replace(/<[^>]*>/g, '')
                .replace(/&[^;]+;/g, ' ')
                .substring(0, 500),
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
  return root
}

async function importWordPress() {
  console.log('Reading WordPress XML...')
  const xmlData = fs.readFileSync(WORDPRESS_XML_PATH, 'utf-8')

  const parser = new xml2js.Parser({
    mergeAttrs: true,
    explicitArray: false,
  })

  const result = await parser.parseStringPromise(xmlData)
  const items = result.rss.channel.item

  // Find the "Properties for sale in Madurai" post with Amruta content
  const properties = Array.isArray(items)
    ? items.find(item => item.title?.[0]?.includes('Properties for sale in Madurai'))
    : items?.title?.[0]?.includes('Properties for sale in Madurai') ? items : null

  if (!properties) {
    console.error('Post not found')
    return
  }

  console.log('Found post:', properties.title[0])

  const content = properties['content:encoded']?.[0] || ''

  // Extract Amruta section
  const amrutaMatch = content.match(
    /<h2>Amruta.*?(?=<h2>|$)/s
  )

  if (!amrutaMatch) {
    console.error('Amruta section not found')
    return
  }

  const amrutaContent = amrutaMatch[0]
  console.log('Extracted Amruta content, length:', amrutaContent.length)

  // Extract images
  const imageMatches = [...amrutaContent.matchAll(/src="(https?:\/\/[^"]+)"/g)]
  console.log('Found images:', imageMatches.length)

  const payload = await getPayload({ config })

  // Download images and create Media entries
  const images = []
  for (const match of imageMatches) {
    const imageUrl = match[1]
    const filename = path.basename(new URL(imageUrl).pathname)

    try {
      console.log('Downloading:', filename)
      await downloadImage(imageUrl, filename)
      images.push({ url: imageUrl, filename })
    } catch (err) {
      console.error('Failed to download:', filename, err.message)
    }
  }

  // Create Lexical content
  const lexicalContent = htmlToLexical(amrutaContent)

  console.log('\nReady to import. Summary:')
  console.log('- Title: Amruta - 3 BHK Independent House')
  console.log('- Images downloaded:', images.length)
  console.log('- Content length:', JSON.stringify(lexicalContent).length)
  console.log('\nTo complete import, update post 41 with this data manually or via API.')
}

importWordPress().catch(console.error)
