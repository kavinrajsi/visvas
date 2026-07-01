/** @type {import('payload').GlobalConfig} */
const ContactPage = {
  slug: 'contact-page',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
  },
  fields: [
    // ── Hero ──────────────────────────────────────────────
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Hero Background Image',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      admin: {
        description: 'Building/property photo shown as the hero background',
      },
    },

    // ── Contact Details ────────────────────────────────────
    {
      name: 'contactDetails',
      type: 'group',
      label: 'Contact Details',
      fields: [
        {
          name: 'address',
          type: 'textarea',
          required: true,
          label: 'Address',
          defaultValue: '84, TPK Main Road, Madurai, Tamil Nadu.',
          admin: {
            description: 'Full mailing address displayed on the contact page',
          },
        },
        {
          name: 'email',
          type: 'text',
          required: true,
          label: 'Email',
          defaultValue: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'contact@example.com',
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
          label: 'Phone Number',
          defaultValue: '+91 94038 93898',
          admin: {
            description: 'Primary phone number',
          },
        },
        {
          name: 'whatsapp',
          type: 'text',
          label: 'WhatsApp Number',
          defaultValue: '73388 47827',
          admin: {
            description: 'WhatsApp number (if different from the primary phone)',
          },
        },
        {
          name: 'mapImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Location Photo',
          filterOptions: {
            mimeType: { contains: 'image' },
          },
          admin: {
            description: 'Location/building photo shown below the contact details',
          },
        },
      ],
    },

    // ── Contact Form Labels ────────────────────────────────
    {
      name: 'contactForm',
      type: 'group',
      label: 'Contact Form',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Form Heading',
          defaultValue: 'What we can help you with',
          admin: {
            description: 'Heading shown above the enquiry form',
          },
        },
        {
          name: 'disclaimer',
          type: 'textarea',
          label: 'Disclaimer Text',
          defaultValue:
            'By submitting this form you agree to the Terms and Conditions and Privacy Policy',
          admin: {
            description: 'Small text shown below the Message field',
          },
        },
      ],
    },

    // ── SEO ────────────────────────────────────────────────
    {
      name: 'seo',
      type: 'group',
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
            description: 'Recommended size: 1200×630px',
          },
          filterOptions: {
            mimeType: { contains: 'image' },
          },
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
          name: 'noIndex',
          type: 'checkbox',
          label: 'No Index',
          defaultValue: false,
          admin: {
            description: 'Tell search engines not to index this page',
          },
        },
        {
          name: 'noFollow',
          type: 'checkbox',
          label: 'No Follow',
          defaultValue: false,
          admin: {
            description: 'Tell search engines not to follow links on this page',
          },
        },
      ],
    },
  ],
}

export default ContactPage
