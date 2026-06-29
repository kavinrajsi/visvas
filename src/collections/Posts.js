/** @type {import('payload').CollectionConfig} */
const Posts = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'status', 'publishedAt', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                placeholder: 'e.g. why-invest-in-madurai-real-estate',
              },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              label: 'Excerpt',
              admin: {
                placeholder: 'Short summary shown on blog listing pages',
              },
            },
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Cover Image',
              filterOptions: {
                mimeType: { contains: 'image' },
              },
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Blog Content',
            },
            {
              name: 'author',
              type: 'text',
              label: 'Author Name',
            },
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'blog-categories',
              hasMany: true,
              label: 'Categories',
            },
            {
              name: 'status',
              type: 'select',
              required: true,
              defaultValue: 'draft',
              options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
                { label: 'Archived', value: 'archived' },
              ],
            },
            {
              name: 'publishedAt',
              type: 'date',
              label: 'Published Date',
              admin: {
                condition: (data) => data?.status === 'published',
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            // ── Meta Tags ──────────────────────────────────
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              admin: {
                placeholder: 'Keep under 60 characters for best results',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              admin: {
                placeholder: 'Keep under 160 characters for best results',
              },
            },
            {
              name: 'metaKeywords',
              type: 'text',
              label: 'Meta Keywords',
              admin: {
                placeholder: 'e.g. real estate madurai, apartments, buy flat',
              },
            },
            {
              name: 'canonicalUrl',
              type: 'text',
              label: 'Canonical URL',
              admin: {
                placeholder: 'https://visvas.in/blog/your-post-slug (leave blank to use default)',
              },
            },
            // ── Crawl Control ──────────────────────────────
            {
              name: 'noIndex',
              type: 'checkbox',
              label: 'No Index',
              defaultValue: false,
              admin: {
                description: 'Tell search engines not to index this page',
              },
            },
            {
              name: 'noFollow',
              type: 'checkbox',
              label: 'No Follow',
              defaultValue: false,
              admin: {
                description: 'Tell search engines not to follow links on this page',
              },
            },
            // ── Open Graph ─────────────────────────────────
            {
              name: 'ogTitle',
              type: 'text',
              label: 'OG Title (Facebook / WhatsApp / LinkedIn)',
              admin: {
                placeholder: 'Defaults to Meta Title if left blank',
              },
            },
            {
              name: 'ogDescription',
              type: 'textarea',
              label: 'OG Description',
              admin: {
                placeholder: 'Defaults to Meta Description if left blank',
              },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'OG Share Image',
              admin: {
                description: 'Recommended size: 1200×630px. Defaults to Cover Image if left blank.',
              },
              filterOptions: {
                mimeType: { contains: 'image' },
              },
            },
            // ── Twitter Card ───────────────────────────────
            {
              name: 'twitterCard',
              type: 'select',
              label: 'Twitter Card Type',
              defaultValue: 'summary_large_image',
              options: [
                { label: 'Summary (small image)', value: 'summary' },
                { label: 'Summary Large Image', value: 'summary_large_image' },
              ],
            },
            {
              name: 'twitterTitle',
              type: 'text',
              label: 'Twitter Title',
              admin: {
                placeholder: 'Defaults to OG Title if left blank',
              },
            },
            {
              name: 'twitterDescription',
              type: 'textarea',
              label: 'Twitter Description',
              admin: {
                placeholder: 'Defaults to OG Description if left blank',
              },
            },
          ],
        },
        {
          label: 'Schema',
          fields: [
            {
              name: 'structuredData',
              type: 'textarea',
              label: 'JSON-LD Structured Data',
              admin: {
                description: 'Paste raw JSON-LD here for Article or BreadcrumbList schema. This will be injected into <script type="application/ld+json"> on the page.',
                placeholder: '{\n  "@context": "https://schema.org",\n  "@type": "Article",\n  "headline": "Your Post Title"\n}',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default Posts
