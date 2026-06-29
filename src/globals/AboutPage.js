/** @type {import('payload').GlobalConfig} */
const AboutPage = {
  slug: 'about-page',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    // ── Hero Banner (green background) ────────────────────
    {
      name: 'heroBanner',
      type: 'group',
      label: 'Hero Banner',
      fields: [
        {
          name: 'tagline',
          type: 'text',
          required: true,
          label: 'Tagline',
          defaultValue: 'Building Homes. Creating Trust. Shaping Communities.',
          admin: {
            description: 'Gold-coloured heading shown on the green hero banner',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
          admin: {
            description: 'White body text shown below the tagline',
          },
        },
      ],
    },

    // ── Hero Quote ─────────────────────────────────────────
    {
      name: 'heroQuote',
      type: 'group',
      label: 'Hero Quote',
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          label: 'Quote',
          defaultValue: 'Every Visvas project is built on a foundation of trust, transparency, and quality values that have guided us for over 25 years.',
          admin: {
            description: 'Large centred quote displayed over the background image',
          },
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
      ],
    },

    // ── Stats ──────────────────────────────────────────────
    {
      name: 'stats',
      type: 'array',
      label: 'Stats',
      admin: {
        description: 'Key numbers shown in the stats row (e.g. 20+ Completed Projects)',
      },
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
          label: 'Number',
          admin: {
            placeholder: 'e.g. 20, 4000',
          },
        },
        {
          name: 'suffix',
          type: 'text',
          label: 'Suffix',
          defaultValue: '+',
          admin: {
            placeholder: 'e.g. +',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
          admin: {
            placeholder: 'e.g. Completed Projects',
          },
        },
      ],
    },

    // ── Our Values Section ─────────────────────────────────
    {
      name: 'valuesSection',
      type: 'group',
      label: 'Our Values Section',
      fields: [
        {
          name: 'sectionHeading',
          type: 'text',
          label: 'Section Heading',
          defaultValue: 'Our Values',
          admin: {
            description: 'Heading shown on the left of the dark brown panel (e.g. Our Values)',
          },
        },
        {
          name: 'sectionImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Side Image',
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
        {
          name: 'values',
          type: 'array',
          label: 'Values',
          admin: {
            description: 'Mission, Vision, and any additional value items',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Title',
              admin: {
                placeholder: 'e.g. Mission, Vision',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              label: 'Description',
            },
          ],
        },
      ],
    },

    // ── Founder Story ──────────────────────────────────────
    {
      name: 'founderStory',
      type: 'group',
      label: 'Founder Story',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
          defaultValue: 'Founder Story',
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Content',
        },
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          label: 'Founder Photo',
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
      ],
    },

    // ── Testimonials Carousel ──────────────────────────────
    {
      name: 'testimonialsSectionHeading',
      type: 'text',
      label: 'Testimonials Section Heading',
      defaultValue: 'Stories Built on Trust',
    },
    {
      name: 'featuredTestimonials',
      type: 'relationship',
      relationTo: ['text-testimonials', 'video-testimonials'],
      hasMany: true,
      label: 'Featured Testimonials',
      admin: {
        description: 'Pick testimonials from the Text or Video Testimonials collections to feature in the carousel',
      },
    },
  ],
}

export default AboutPage
