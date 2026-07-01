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
      name: 'videoSource',
      type: 'select',
      options: [
        { label: 'Uploaded Video', value: 'upload' },
        { label: 'YouTube', value: 'youtube' },
        { label: 'Vimeo', value: 'vimeo' },
      ],
      defaultValue: 'upload',
      required: true,
      admin: {
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
        condition: (data) => data?.videoSource === 'upload',
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
        description: 'Poster/cover image for uploaded video or iframe',
        condition: (data) => data?.videoSource === 'upload' || data?.videoSource === 'youtube' || data?.videoSource === 'vimeo',
      },
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      label: 'YouTube URL',
      admin: {
        placeholder: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        condition: (data) => data?.videoSource === 'youtube',
      },
    },
    {
      name: 'vimeoUrl',
      type: 'text',
      label: 'Vimeo URL',
      admin: {
        placeholder: 'https://vimeo.com/123456789',
        condition: (data) => data?.videoSource === 'vimeo',
      },
    },
  ],
}

export default VideoTestimonials
