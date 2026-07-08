/** @type {import('payload').GlobalConfig} */
const BlogPage = {
  slug: 'blog-page',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Background Image',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      admin: {
        description: 'Hero banner image shown on blog listing page (desktop)',
      },
    },

    {
      name: 'mobileHeroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Mobile Hero Background Image',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      admin: {
        description: 'Mobile-optimized hero banner image (optional, falls back to heroImage if not set)',
      },
    },

    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
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
          name: 'ogTitle',
          type: 'text',
          label: 'OG Title',
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
            description: 'Recommended size: 1200×630px',
          },
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
      ],
    },
  ],
}

export default BlogPage
