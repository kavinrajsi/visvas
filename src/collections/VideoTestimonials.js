/** @type {import('payload').CollectionConfig} */
const VideoTestimonials = {
  slug: 'video-testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'location', 'createdAt'],
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
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: {
        mimeType: { contains: 'video' },
      },
    },
  ],
}

export default VideoTestimonials
