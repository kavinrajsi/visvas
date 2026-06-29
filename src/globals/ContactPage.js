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
          defaultValue: 'enquiry@visvaspromoters.com',
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

    // ── Testimonials Carousel ──────────────────────────────
    {
      name: 'featuredTestimonials',
      type: 'relationship',
      relationTo: ['text-testimonials', 'video-testimonials'],
      hasMany: true,
      label: 'Featured Testimonials',
      admin: {
        description:
          'Testimonials shown in the large-quote carousel on the contact page',
      },
    },
  ],
}

export default ContactPage
