/** @type {import('payload').CollectionConfig} */
const Testimonials = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'createdAt'],
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
      name: 'type',
      type: 'select',
      options: [
        { label: 'Text', value: 'text' },
        { label: 'Video', value: 'video' },
      ],
      defaultValue: 'text',
      required: true,
      admin: {
        description: 'Testimonial type',
      },
    },
    {
      name: 'textContent',
      type: 'textarea',
      admin: {
        condition: (data) => data?.type === 'text',
      },
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      admin: {
        condition: (data) => data?.type === 'text',
        step: 0.5,
      },
    },
    {
      name: 'videoSource',
      type: 'select',
      options: [
        { label: 'Uploaded Video', value: 'upload' },
        { label: 'YouTube', value: 'youtube' },
        { label: 'Vimeo', value: 'vimeo' },
      ],
      defaultValue: 'upload',
      admin: {
        condition: (data) => data?.type === 'video',
        description: 'Choose video source',
      },
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'video' },
      },
      admin: {
        condition: (data) => data?.type === 'video' && data?.videoSource === 'upload',
      },
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      admin: {
        description: 'Poster/cover image for video',
        condition: (data) => data?.type === 'video',
      },
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      label: 'YouTube URL',
      admin: {
        placeholder: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        condition: (data) => data?.type === 'video' && data?.videoSource === 'youtube',
      },
    },
    {
      name: 'vimeoUrl',
      type: 'text',
      label: 'Vimeo URL',
      admin: {
        placeholder: 'https://vimeo.com/123456789',
        condition: (data) => data?.type === 'video' && data?.videoSource === 'vimeo',
      },
    },
  ],
}

export default Testimonials
