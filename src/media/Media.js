/** @type {import('payload').CollectionConfig} */
const Media = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
  upload: {
    disableLocalStorage: false,
  },
}

export default Media
