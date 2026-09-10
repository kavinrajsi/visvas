/** @type {import('payload').GlobalConfig} */
const KumbabishekamPage = {
  slug: 'kumbabishekam-page',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    // ── SEO ─────────────────────────────────────────────────
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'group',
          label: 'Meta Title',
          fields: [
            { name: 'en', type: 'text', label: 'English' },
            { name: 'ta', type: 'text', label: 'Tamil' },
          ],
        },
        {
          name: 'metaDescription',
          type: 'group',
          label: 'Meta Description',
          fields: [
            { name: 'en', type: 'textarea', label: 'English' },
            { name: 'ta', type: 'textarea', label: 'Tamil' },
          ],
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Social Share Image',
          filterOptions: { mimeType: { contains: 'image' } },
        },
      ],
    },

    // ── Hero ────────────────────────────────────────────────
    {
      name: 'hero',
      type: 'group',
      label: 'Hero',
      fields: [
        {
          name: 'eventName',
          type: 'group',
          label: 'Event Name',
          fields: [
            { name: 'en', type: 'text', required: true, label: 'English' },
            { name: 'ta', type: 'text', required: true, label: 'Tamil' },
          ],
        },
        {
          name: 'eventDate',
          type: 'date',
          label: 'Event Date',
          admin: {
            description: 'Primary date used for scheduling/structured data',
          },
        },
        {
          name: 'eventDateLabel',
          type: 'group',
          label: 'Event Date Label',
          admin: {
            description: 'Display text, e.g. "16–17 September 2026"',
          },
          fields: [
            { name: 'en', type: 'text', label: 'English' },
            { name: 'ta', type: 'text', label: 'Tamil' },
          ],
        },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Background Image',
          filterOptions: { mimeType: { contains: 'image' } },
        },
        {
          name: 'heroVideoUrl',
          type: 'text',
          label: 'Hero Background Video URL',
          admin: {
            description: 'Optional — .mp4 URL played behind the hero instead of the image',
          },
        },
      ],
    },

    // ── Significance / Intro ───────────────────────────────
    {
      name: 'intro',
      type: 'group',
      label: 'Significance',
      fields: [
        {
          name: 'heading',
          type: 'group',
          label: 'Heading',
          fields: [
            { name: 'en', type: 'text', label: 'English' },
            { name: 'ta', type: 'text', label: 'Tamil' },
          ],
        },
        {
          name: 'paragraphs',
          type: 'array',
          label: 'Paragraphs',
          admin: {
            description: 'Descriptive paragraphs about the significance of the event',
          },
          fields: [
            { name: 'en', type: 'textarea', required: true, label: 'English' },
            { name: 'ta', type: 'textarea', required: true, label: 'Tamil' },
          ],
        },
      ],
    },

    // ── Schedule ────────────────────────────────────────────
    {
      name: 'schedule',
      type: 'group',
      label: 'Schedule',
      fields: [
        {
          name: 'heading',
          type: 'group',
          label: 'Heading',
          fields: [
            { name: 'en', type: 'text', label: 'English' },
            { name: 'ta', type: 'text', label: 'Tamil' },
          ],
        },
        {
          name: 'events',
          type: 'array',
          label: 'Key Events',
          admin: {
            description: 'Chronological list of ceremonies',
          },
          fields: [
            { name: 'date', type: 'date', label: 'Date' },
            {
              name: 'time',
              type: 'group',
              label: 'Time',
              fields: [
                { name: 'en', type: 'text', label: 'English', admin: { placeholder: 'e.g. 6:00 AM' } },
                { name: 'ta', type: 'text', label: 'Tamil' },
              ],
            },
            {
              name: 'ceremonyName',
              type: 'group',
              label: 'Ceremony Name',
              fields: [
                { name: 'en', type: 'text', required: true, label: 'English' },
                { name: 'ta', type: 'text', required: true, label: 'Tamil' },
              ],
            },
            {
              name: 'description',
              type: 'group',
              label: 'Description',
              admin: { description: 'Optional' },
              fields: [
                { name: 'en', type: 'textarea', label: 'English' },
                { name: 'ta', type: 'textarea', label: 'Tamil' },
              ],
            },
          ],
        },
      ],
    },

    // ── Closing CTA ─────────────────────────────────────────
    {
      name: 'cta',
      type: 'group',
      label: 'Closing CTA',
      fields: [
        {
          name: 'heading',
          type: 'group',
          label: 'Heading',
          fields: [
            { name: 'en', type: 'text', label: 'English' },
            { name: 'ta', type: 'text', label: 'Tamil' },
          ],
        },
        {
          name: 'body',
          type: 'group',
          label: 'Body',
          fields: [
            { name: 'en', type: 'textarea', label: 'English' },
            { name: 'ta', type: 'textarea', label: 'Tamil' },
          ],
        },
        {
          name: 'videos',
          type: 'array',
          label: 'Videos',
          admin: {
            description: 'YouTube video URLs shown as the closing video experience',
          },
          fields: [
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'YouTube URL',
              admin: { placeholder: 'https://www.youtube.com/watch?v=...' },
            },
          ],
        },
      ],
    },
  ],
}

export default KumbabishekamPage
