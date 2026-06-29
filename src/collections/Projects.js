/** @type {import('payload').CollectionConfig} */
const Projects = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'location', 'status', 'projectType', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Basic Info',
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
              name: 'status',
              type: 'select',
              required: true,
              options: [
                { label: 'Upcoming', value: 'upcoming' },
                { label: 'Under Construction', value: 'under_construction' },
                { label: 'Ready to Move', value: 'ready_to_move' },
                { label: 'Completed', value: 'completed' },
              ],
            },
            {
              name: 'projectType',
              type: 'select',
              required: true,
              label: 'Type of Project',
              options: [
                { label: 'Apartment', value: 'apartment' },
                { label: 'Villa', value: 'villa' },
                { label: 'Plotted Development', value: 'plotted' },
                { label: 'Commercial', value: 'commercial' },
                { label: 'Mixed Use', value: 'mixed_use' },
              ],
            },
            {
              name: 'slug',
              type: 'text',
              unique: true,
              admin: { position: 'sidebar' },
              hooks: {
                beforeValidate: [
                  ({ value, data }) => {
                    if (!value && data?.name) {
                      return data.name
                        .toLowerCase()
                        .replace(/[^a-z0-9\s-]/g, '')
                        .replace(/\s+/g, '-')
                        .trim()
                    }
                    return value
                  },
                ],
              },
            },
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Project Cover Image',
              filterOptions: {
                mimeType: { contains: 'image' },
              },
            },
            {
              name: 'reraNo',
              type: 'text',
              label: 'RERA No.',
            },
            {
              name: 'projectArea',
              type: 'text',
              label: 'Project Area',
              admin: {
                placeholder: 'e.g. 26,346.74 Sq. Ft.',
              },
            },
            {
              name: 'priceRangeStartFrom',
              type: 'number',
              label: 'Price Range Starts From (₹)',
            },
            {
              name: 'bhkTypes',
              type: 'select',
              label: 'Type of BHK',
              hasMany: true,
              options: [
                { label: 'Studio', value: 'studio' },
                { label: '1 BHK', value: '1bhk' },
                { label: '2 BHK', value: '2bhk' },
                { label: '3 BHK', value: '3bhk' },
                { label: '4 BHK', value: '4bhk' },
                { label: '5 BHK', value: '5bhk' },
                { label: 'Penthouse', value: 'penthouse' },
                { label: 'Villa', value: 'villa' },
              ],
            },
          ],
        },
        {
          label: 'Description',
          fields: [
            {
              name: 'description',
              type: 'richText',
              label: 'Project Description',
            },
          ],
        },
        {
          label: 'Amenities',
          fields: [
            {
              name: 'amenities',
              type: 'relationship',
              relationTo: 'amenities',
              hasMany: true,
              label: 'Select Amenities',
            },
          ],
        },
        {
          label: 'Location',
          fields: [
            {
              name: 'locationAddress',
              type: 'textarea',
              label: 'Location Address',
              admin: {
                placeholder: 'e.g. Ellis Nagar, Madurai, Tamil Nadu 625016',
              },
            },
            {
              name: 'locationMapUrl',
              type: 'text',
              label: 'Google Maps URL',
              admin: {
                placeholder: 'https://maps.google.com/?q=...',
              },
            },
            {
              name: 'keyTransports',
              type: 'array',
              label: 'Key Nearby Locations',
              fields: [
                {
                  name: 'type',
                  type: 'text',
                  required: true,
                  label: 'Type',
                  admin: {
                    placeholder: 'e.g. College, Temple, Bus Stand, Hospital',
                  },
                },
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  label: 'Name',
                  admin: {
                    placeholder: 'e.g. The Madura College',
                  },
                },
                {
                  name: 'distance',
                  type: 'text',
                  required: true,
                  label: 'Distance',
                  admin: {
                    placeholder: 'e.g. 2 kms, 500 m',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              name: 'images',
              type: 'array',
              label: 'Project Images',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  filterOptions: {
                    mimeType: { contains: 'image' },
                  },
                },
                {
                  name: 'caption',
                  type: 'text',
                },
              ],
            },
            {
              name: 'floorPlans',
              type: 'array',
              label: 'Floor Plans',
              fields: [
                {
                  name: 'plan',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  filterOptions: {
                    mimeType: { contains: 'image' },
                  },
                },
                {
                  name: 'label',
                  type: 'text',
                  admin: {
                    placeholder: 'e.g. 2 BHK Floor Plan',
                  },
                },
              ],
            },
            {
              name: 'videos',
              type: 'array',
              label: 'Project Videos',
              fields: [
                {
                  name: 'video',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  filterOptions: {
                    mimeType: { contains: 'video' },
                  },
                },
                {
                  name: 'caption',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'FAQ',
          fields: [
            {
              name: 'faq',
              type: 'array',
              label: 'Frequently Asked Questions',
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'answer',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default Projects
