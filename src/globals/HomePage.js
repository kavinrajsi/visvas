/** @type {import('payload').GlobalConfig} */
const HomePage = {
  slug: 'home-page',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    // ── Hero ──────────────────────────────────────────────
    {
      name: 'hero',
      type: 'group',
      label: 'Hero',
      fields: [
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Background Image',
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
      ],
    },

    // ── Latest Projects Section ────────────────────────────
    {
      name: 'latestProjectsSection',
      type: 'group',
      label: 'Latest Projects Section',
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          label: 'Section Label',
          defaultValue: 'LATEST PROJECTS',
          admin: {
            description: 'Small label shown above the heading (e.g. LATEST PROJECTS)',
          },
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
          defaultValue: 'Discover luxury living at an affordable price',
        },
        {
          name: 'buttonLabel',
          type: 'text',
          label: 'Button Label',
          defaultValue: 'View All projects',
        },
        {
          name: 'featuredProjects',
          type: 'relationship',
          relationTo: 'projects',
          hasMany: true,
          label: 'Featured Projects',
          admin: {
            description: 'Projects shown in the home page carousel',
          },
        },
      ],
    },

    // ── Who We Are Section ─────────────────────────────────
    {
      name: 'whoWeAreSection',
      type: 'group',
      label: 'Who We Are Section',
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          label: 'Section Label',
          defaultValue: 'WHO WE ARE',
          admin: {
            description: 'Small label shown above the heading (e.g. WHO WE ARE)',
          },
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
          defaultValue:
            'Built on trust for generations, designed around modern living, crafted for meaningful experiences, and made to feel right every day.',
          admin: {
            description: 'Large centred heading shown on the green background section',
          },
        },
        {
          name: 'featureCards',
          type: 'array',
          label: 'Feature Cards',
          admin: {
            description: 'Exactly 3 cards — e.g. What we do, Our Impact, Core Values',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Title',
              admin: {
                placeholder: 'e.g. What we do',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              label: 'Description',
            },
            {
              name: 'buttonLabel',
              type: 'text',
              required: true,
              label: 'Button Label',
              admin: {
                placeholder: 'e.g. OUR SOLUTIONS',
              },
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Card Background Image',
              filterOptions: {
                mimeType: { contains: 'image' },
              },
            },
          ],
        },
        {
          name: 'stats',
          type: 'array',
          label: 'Stats Row',
          admin: {
            description: 'Counter stats shown below the feature cards (e.g. 20+ Completed Projects)',
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
      ],
    },

    // ── Ongoing Projects Map Section ───────────────────────
    {
      name: 'ongoingProjectsSection',
      type: 'group',
      label: 'Ongoing Projects Map Section',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
          defaultValue: 'Ongoing Projects',
        },
        {
          name: 'projects',
          type: 'relationship',
          relationTo: 'projects',
          hasMany: true,
          label: 'Ongoing Projects',
          admin: {
            description: 'Projects listed on the left of the map and pinned on the map',
          },
        },
      ],
    },

    // ── Our Commitment Section ─────────────────────────────
    {
      name: 'commitmentSection',
      type: 'group',
      label: 'Our Commitment Section',
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          label: 'Section Label',
          defaultValue: 'OUR COMMITMENT',
          admin: {
            description: 'Small label shown above the heading (e.g. OUR COMMITMENT)',
          },
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
          defaultValue: 'What makes us different',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
          admin: {
            placeholder:
              'Designing with purpose, innovating with vision, and collaborating with passion…',
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
          admin: {
            description: 'Large building photo shown behind the commitment cards',
          },
        },
        {
          name: 'commitments',
          type: 'array',
          label: 'Commitment Cards',
          admin: {
            description:
              '3 cards — e.g. Corporate Responsibility, Experts with Team Spirit, Security & Compliance',
          },
          fields: [
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              label: 'Icon',
              filterOptions: {
                mimeType: { contains: 'image' },
              },
              admin: {
                description: 'Icon shown in the green circle (SVG or PNG, 30×30)',
              },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Title',
              admin: {
                placeholder: 'e.g. Corporate Responsibility',
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

    // ── How We Build Section ───────────────────────────────
    {
      name: 'howWeBuildSection',
      type: 'group',
      label: 'How We Build Section',
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          label: 'Section Label',
          defaultValue: 'OUR PROCESS',
          admin: {
            description: 'Small label shown above the heading',
          },
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
          defaultValue: 'How We Build',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          admin: {
            placeholder: 'Brief description of the building process',
          },
        },
        {
          name: 'steps',
          type: 'array',
          label: 'Process Steps',
          admin: {
            description: 'Steps shown in the process timeline (e.g. Planning, Design, Construction, Delivery)',
          },
          fields: [
            {
              name: 'stepNumber',
              type: 'number',
              required: true,
              label: 'Step Number',
              admin: {
                placeholder: 'e.g. 1, 2, 3, 4',
              },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Step Title',
              admin: {
                placeholder: 'e.g. Planning & Design',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              label: 'Step Description',
            },
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              label: 'Step Icon',
              filterOptions: {
                mimeType: { contains: 'image' },
              },
              admin: {
                description: 'Icon for this step (SVG or PNG)',
              },
            },
          ],
        },
      ],
    },

    // ── Completed Projects Section ─────────────────────────
    {
      name: 'completedProjectsSection',
      type: 'group',
      label: 'Completed Projects Section',
      fields: [
        {
          name: 'sectionLabel',
          type: 'text',
          label: 'Section Label',
          defaultValue: 'COMPLETED PROJECTS',
          admin: {
            description: 'Small label shown above the heading (e.g. COMPLETED PROJECTS)',
          },
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
          defaultValue: 'Top gated communities in Madurai',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
        {
          name: 'buttonLabel',
          type: 'text',
          label: 'Button Label',
          defaultValue: 'View All projects',
        },
        {
          name: 'featuredProjects',
          type: 'relationship',
          relationTo: 'projects',
          hasMany: true,
          label: 'Featured Completed Projects',
          admin: {
            description: 'Projects shown in the completed projects grid (typically 3)',
          },
        },
      ],
    },

    // ── Testimonials Section ───────────────────────────────
    {
      name: 'testimonialsSectionHeading',
      type: 'text',
      label: 'Testimonials Section Heading',
      defaultValue: 'Stories Built on Trust',
    },
    {
      name: 'featuredTestimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      label: 'Featured Testimonials',
      admin: {
        description:
          'Mix of text and video testimonials to show in the home page carousel',
      },
    },

    // ── SEO ────────────────────────────────────────────────
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
            description: 'Recommended size: 1200×630px',
          },
          filterOptions: {
            mimeType: { contains: 'image' },
          },
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
  ],
}

export default HomePage
