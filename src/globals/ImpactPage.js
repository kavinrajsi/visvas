/** @type {import('payload').GlobalConfig} */
const ImpactPage = {
  slug: 'impact-page',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    // ── Hero ───────────────────────────────────────────────
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Hero Background Image',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },

    // ── Environmental Impact Section ───────────────────────
    {
      name: 'environmentalSection',
      type: 'group',
      label: 'Environmental Impact Section',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Section Label',
          defaultValue: 'OUR ENVIRONMENTAL IMPACT',
          admin: {
            description: 'Short label shown above the heading (e.g. OUR ENVIRONMENTAL IMPACT)',
          },
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
          defaultValue: 'Building with Nature in Mind',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Section Image',
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
      ],
    },

    // ── Social Impact Section ──────────────────────────────
    {
      name: 'socialSection',
      type: 'group',
      label: 'Social Impact Section',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Section Label',
          defaultValue: 'OUR SOCIAL IMPACT',
          admin: {
            description: 'Short label shown above the heading (e.g. OUR SOCIAL IMPACT)',
          },
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
          defaultValue: 'Strengthening Communities, Enriching Lives',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Section Image',
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
      ],
    },

    // ── Testimonials Carousel ──────────────────────────────
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials Carousel',
      admin: {
        description: 'Quotes shown in the carousel at the bottom of the page',
      },
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          label: 'Quote',
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Author Name',
          admin: {
            placeholder: 'e.g. Dr Suresh Pachaiappan',
          },
        },
        {
          name: 'company',
          type: 'text',
          label: 'Company / Designation',
          admin: {
            placeholder: 'e.g. Visvas Promotors',
          },
        },
      ],
    },
  ],
}

export default ImpactPage
