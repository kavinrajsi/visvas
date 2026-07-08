/** @type {import('payload').CollectionConfig} */
const BhkTypes = {
  slug: 'bhk-types',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'value', 'createdAt'],
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
      name: 'value',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Stable key used in URLs and filters. Auto-generated from name if left blank.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.name) {
              return data.name
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '_')
                .trim()
            }
            return value
          },
        ],
      },
    },
  ],
}

export default BhkTypes
