/** @type {import('payload').CollectionConfig} */
const BlogCategories = {
  slug: 'blog-categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'createdAt'],
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
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'e.g. real-estate-tips',
      },
    },
  ],
}

export default BlogCategories
