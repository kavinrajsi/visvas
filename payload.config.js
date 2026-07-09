import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { EXPERIMENTAL_TableFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { fileURLToPath } from 'url'
import path from 'path'
import sharp from 'sharp'
import { sendEmail } from './src/lib/email/gmail.js'

import Users from './src/collections/Users.js'
import Media from './src/media/Media.js'
import Widgets from './src/collections/Widgets.js'
import Testimonials from './src/collections/Testimonials.js'
import Amenities from './src/collections/Amenities.js'
import Projects from './src/collections/Projects.js'
import ProjectTypes from './src/collections/ProjectTypes.js'
import ProjectStatuses from './src/collections/ProjectStatuses.js'
import BhkTypes from './src/collections/BhkTypes.js'
import BlogCategories from './src/collections/BlogCategories.js'
import Posts from './src/collections/Posts.js'
import ImpactPage from './src/globals/ImpactPage.js'
import AboutPage from './src/globals/AboutPage.js'
import HomePage from './src/globals/HomePage.js'
import Policies from './src/collections/Policies.js'
import ContactPage from './src/globals/ContactPage.js'
import BlogPage from './src/globals/BlogPage.js'
import ContactSubmissions from './src/collections/ContactSubmissions.js'
import FormSubmissionLogs from './src/collections/FormSubmissionLogs.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const plugins = []

// Only enable R2 storage if credentials are configured
if (process.env.R2_BUCKET_NAME && process.env.R2_ENDPOINT && process.env.R2_ACCESS_KEY && process.env.R2_SECRET_KEY) {
  plugins.push(
    s3Storage({
      collections: { media: { prefix: 'project' } },
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
    nav: [
      {
        label: 'Media',
        path: '/admin/collections/media',
      },
      {
        label: 'Widgets',
        children: [
          {
            label: 'Widgets',
            path: '/admin/collections/widgets',
          },
        ],
      },
      {
        label: 'Collections',
        children: [
          {
            label: 'Users',
            path: '/admin/collections/users',
          },
          {
            label: 'Testimonials',
            path: '/admin/collections/testimonials',
          },
          {
            label: 'Projects',
            path: '/admin/collections/projects',
          },
          {
            label: 'Blog Categories',
            path: '/admin/collections/blog-categories',
          },
          {
            label: 'Posts',
            path: '/admin/collections/posts',
          },
          {
            label: 'Amenities',
            path: '/admin/collections/amenities',
          },
          {
            label: 'Project Types',
            path: '/admin/collections/project-types',
          },
          {
            label: 'Project Statuses',
            path: '/admin/collections/project-statuses',
          },
          {
            label: 'BHK Types',
            path: '/admin/collections/bhk-types',
          },
          {
            label: 'Policies',
            path: '/admin/collections/policies',
          },
          {
            label: 'Contact Submissions',
            path: '/admin/collections/contact-submissions',
          },
          {
            label: 'Form Submission Logs',
            path: '/admin/collections/form-submission-logs',
          },
        ],
      },
      {
        label: 'Pages',
        children: [
          {
            label: 'Home',
            path: '/admin/globals/home-page',
          },
          {
            label: 'About',
            path: '/admin/globals/about-page',
          },
          {
            label: 'Blog',
            path: '/admin/globals/blog-page',
          },
          {
            label: 'Contact',
            path: '/admin/globals/contact-page',
          },
          {
            label: 'Impact',
            path: '/admin/globals/impact-page',
          },
        ],
      },
    ],
  },
  collections: [Users, Media, Widgets, Amenities, ProjectTypes, ProjectStatuses, BhkTypes, Testimonials, Projects, BlogCategories, Posts, Policies, ContactSubmissions, FormSubmissionLogs],
  globals: [ImpactPage, AboutPage, HomePage, ContactPage, BlogPage],
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
    fromName: process.env.GMAIL_SENDER_NAME,
    fromAddress: process.env.GMAIL_SENDER_EMAIL,
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
