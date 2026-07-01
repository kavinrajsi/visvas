/** @type {import('payload').CollectionConfig} */
const Widgets = {
  slug: 'widgets',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Media Gallery', value: 'media-gallery' },
        { label: 'Testimonial Carousel', value: 'testimonial-carousel' },
        { label: 'Project Showcase', value: 'project-showcase' },
        { label: 'Custom', value: 'custom' },
      ],
      defaultValue: 'custom',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'media',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      admin: {
        condition: (data) => data?.type === 'media-gallery',
      },
    },
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      admin: {
        condition: (data) => data?.type === 'testimonial-carousel',
      },
    },
    {
      name: 'projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      admin: {
        condition: (data) => data?.type === 'project-showcase',
      },
    },
    {
      name: 'customData',
      type: 'json',
      admin: {
        condition: (data) => data?.type === 'custom',
        description: 'Custom JSON data for widget',
      },
    },
  ],
}

export default Widgets
