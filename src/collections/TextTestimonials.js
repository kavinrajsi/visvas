/** @type {import('payload').CollectionConfig} */
const TextTestimonials = {
  slug: 'text-testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'location', 'star', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'star',
      type: 'select',
      required: true,
      options: [
        { label: '⭐ 1 Star', value: '1' },
        { label: '⭐⭐ 2 Stars', value: '2' },
        { label: '⭐⭐⭐ 3 Stars', value: '3' },
        { label: '⭐⭐⭐⭐ 4 Stars', value: '4' },
        { label: '⭐⭐⭐⭐⭐ 5 Stars', value: '5' },
      ],
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
  ],
}

export default TextTestimonials
