/** @type {import('payload').CollectionConfig} */
const Projects = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'displayOrder', 'location', 'status', 'projectType', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return true
    },
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
            },
            {
              name: 'status',
              type: 'relationship',
              relationTo: 'project-statuses',
              label: 'Status',
            },
            {
              name: 'projectType',
              type: 'relationship',
              relationTo: 'project-types',
              label: 'Type of Project',
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
              name: 'displayOrder',
              type: 'number',
              label: 'Display Order',
              admin: {
                position: 'sidebar',
                description: 'Lower numbers appear first. Ties fall back to newest.',
                step: 1,
              },
            },
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Project Cover Image',
              filterOptions: {
                mimeType: { contains: 'image' },
              },
            },
            {
              name: 'detailCoverImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Project Detail Cover',
              filterOptions: {
                mimeType: { contains: 'image' },
              },
            },
            {
              name: 'contentImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Project Content Image',
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
              type: 'relationship',
              relationTo: 'bhk-types',
              hasMany: true,
              label: 'Type of BHK',
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
              name: 'latitude',
              type: 'number',
              label: 'Latitude',
              admin: {
                placeholder: 'e.g. 9.9877893',
              },
            },
            {
              name: 'longitude',
              type: 'number',
              label: 'Longitude',
              admin: {
                placeholder: 'e.g. 78.0204903',
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
                  label: 'Type',
                  admin: {
                    placeholder: 'e.g. College, Temple, Bus Stand, Hospital',
                  },
                },
                {
                  name: 'name',
                  type: 'text',
                  label: 'Name',
                  admin: {
                    placeholder: 'e.g. The Madura College',
                  },
                },
                {
                  name: 'distance',
                  type: 'text',
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
              name: 'videoUrl',
              type: 'text',
              label: 'Video URL',
              admin: {
                placeholder: 'e.g. https://www.youtube.com/watch?v=...',
              },
            },
            {
              name: 'images',
              type: 'array',
              label: 'Project Images',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
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
                {
                  name: 'rooms',
                  type: 'number',
                  label: 'Bedrooms',
                },
                {
                  name: 'bathrooms',
                  type: 'number',
                  label: 'Bathrooms',
                },
                {
                  name: 'size',
                  type: 'text',
                  label: 'Size (with unit)',
                  admin: {
                    placeholder: 'e.g. 950 Sq.ft',
                  },
                },
                {
                  name: 'price',
                  type: 'number',
                  label: 'Price (₹)',
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
                },
                {
                  name: 'answer',
                  type: 'textarea',
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              admin: {
                placeholder: 'Keep under 60 characters for best results',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              admin: {
                placeholder: 'Keep under 160 characters for best results',
              },
            },
            {
              name: 'metaKeywords',
              type: 'text',
              label: 'Meta Keywords',
              admin: {
                placeholder: 'e.g. luxury apartments madurai, villas, ready to move',
              },
            },
            {
              name: 'canonicalUrl',
              type: 'text',
              label: 'Canonical URL',
              admin: {
                placeholder: 'https://www.visvas.in/projects/your-project-slug (leave blank to use default)',
              },
            },
            {
              name: 'ogTitle',
              type: 'text',
              label: 'OG Title (Facebook / WhatsApp / LinkedIn)',
              admin: {
                placeholder: 'Defaults to Meta Title if left blank',
              },
            },
            {
              name: 'ogDescription',
              type: 'textarea',
              label: 'OG Description',
              admin: {
                placeholder: 'Defaults to Meta Description if left blank',
              },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'OG Share Image',
              admin: {
                description: 'Recommended size: 1200×630px. Defaults to Cover Image if left blank.',
              },
              filterOptions: {
                mimeType: { contains: 'image' },
              },
            },
            {
              name: 'twitterCard',
              type: 'select',
              label: 'Twitter Card Type',
              defaultValue: 'summary_large_image',
              options: [
                { label: 'Summary (small image)', value: 'summary' },
                { label: 'Summary Large Image', value: 'summary_large_image' },
              ],
            },
            {
              name: 'twitterTitle',
              type: 'text',
              label: 'Twitter Title',
              admin: {
                placeholder: 'Defaults to OG Title if left blank',
              },
            },
            {
              name: 'twitterDescription',
              type: 'textarea',
              label: 'Twitter Description',
              admin: {
                placeholder: 'Defaults to OG Description if left blank',
              },
            },
            {
              name: 'structuredData',
              type: 'textarea',
              label: 'JSON-LD Structured Data',
              admin: {
                description: 'Paste raw JSON-LD here for RealEstateListing or custom schema. This will be injected into <script type="application/ld+json"> on the page.',
                placeholder: '{\n  "@context": "https://schema.org",\n  "@type": "RealEstateListing",\n  "name": "Your Project Name"\n}',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default Projects
