/** @type {import('payload').CollectionConfig} */
const Amenities = {
  slug: 'amenities',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'createdAt'],
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
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'svg',
      type: 'code',
      required: false,
      admin: {
        language: 'xml',
        description: 'Optional SVG code for the amenity icon',
      },
    },
  ],
}

export default Amenities
