/** @type {import('payload').CollectionConfig} */
const Amenities = {
  slug: 'amenities',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'createdAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
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
