import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { EXPERIMENTAL_TableFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { fileURLToPath } from 'url'
import path from 'path'
import sharp from 'sharp'
import { sendEmail } from './src/lib/email/zoho.js'

import Users from './src/collections/Users.js'
import Media from './src/collections/Media.js'
import TextTestimonials from './src/collections/TextTestimonials.js'
import VideoTestimonials from './src/collections/VideoTestimonials.js'
import Amenities from './src/collections/Amenities.js'
import Projects from './src/collections/Projects.js'
import BlogCategories from './src/collections/BlogCategories.js'
import Posts from './src/collections/Posts.js'
import ImpactPage from './src/globals/ImpactPage.js'
import AboutPage from './src/globals/AboutPage.js'
import HomePage from './src/globals/HomePage.js'
import Policies from './src/collections/Policies.js'
import ContactPage from './src/globals/ContactPage.js'
import ContactSubmissions from './src/collections/ContactSubmissions.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const plugins = []

// Only enable R2 storage if credentials are configured
if (process.env.R2_BUCKET_NAME && process.env.R2_ENDPOINT && process.env.R2_ACCESS_KEY && process.env.R2_SECRET_KEY) {
  plugins.push(
    s3Storage({
      collections: { media: true },
      bucket: process.env.R2_BUCKET_NAME,
      config: {
        endpoint: process.env.R2_ENDPOINT,
        region: 'auto',
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY,
          secretAccessKey: process.env.R2_SECRET_KEY,
        },
      },
      acl: 'public-read',
    })
  )
}

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Amenities, TextTestimonials, VideoTestimonials, Projects, BlogCategories, Posts, Policies, ContactSubmissions],
  globals: [ImpactPage, AboutPage, HomePage, ContactPage],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      EXPERIMENTAL_TableFeature(),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  plugins,
  email: async () => ({
    fromName: 'Visvas Properties',
    fromAddress: process.env.ZOHO_ZEPTOMAIL_SENDER_EMAIL || 'noreply@visvas.com',
    transport: {
      send: async (message) => {
        return await sendEmail({
          to: message.to,
          subject: message.subject,
          html: message.html,
        })
      },
    },
  }),
  sharp,
})
