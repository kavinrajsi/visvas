/** @type {import('payload').CollectionConfig} */
const Policies = {
  slug: 'policies',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'lastUpdated', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'e.g. Privacy Policy, Terms & Conditions',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        placeholder: 'e.g. privacy-policy, terms-and-conditions',
        description: 'Used in the page URL — use lowercase with hyphens',
      },
    },
    {
      name: 'lastUpdated',
      type: 'date',
      label: 'Last Updated Date',
      admin: {
        description: 'Date displayed to users as "Last Updated" on the policy page',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Policy Content',
    },
  ],
}

export default Policies
