/** @type {import('payload').CollectionConfig} */
const ContactSubmissions = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'isSpam', 'createdAt'],
    description: 'Form submissions from Contact & Project Enquiry forms',
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => false,
  },
  fields: [
    {
      name: 'formType',
      type: 'select',
      options: [
        { label: 'Contact', value: 'contact' },
        { label: 'Enquiry', value: 'enquiry' },
        { label: 'Newsletter', value: 'newsletter' },
      ],
      label: 'Form Type',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'phone',
      type: 'text',
      required: false,
      label: 'Mobile Number',
      admin: {
        description: 'Required for contact/enquiry, optional for newsletter',
      },
    },
    {
      name: 'whatsappActivated',
      type: 'checkbox',
      label: 'WhatsApp Active on This Number',
      defaultValue: false,
    },
    {
      name: 'email',
      type: 'text',
      required: true,
      label: 'Email Address',
    },
    {
      name: 'budget',
      type: 'text',
      label: 'Budget',
      admin: {
        placeholder: 'e.g. 50 Lakhs, 1 Crore',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Message',
    },
    {
      name: 'project',
      type: 'text',
      label: 'Project Name (Enquiry only)',
      admin: {
        condition: (data) => data?.formType === 'enquiry',
      },
    },
    {
      name: 'isSpam',
      type: 'checkbox',
      label: 'Flagged as Spam (Honeypot)',
      defaultValue: false,
    },
    {
      name: 'delivery',
      type: 'group',
      label: 'Delivery Status',
      admin: {
        description: 'Success/fail of each pipeline step for this submission',
      },
      fields: [
        {
          name: 'sheetsStored',
          type: 'checkbox',
          label: 'Google Sheets Stored',
          defaultValue: false,
        },
        {
          name: 'sheetsError',
          type: 'text',
          label: 'Sheets Error',
        },
        {
          name: 'adminEmailSent',
          type: 'checkbox',
          label: 'Admin Email Sent',
          defaultValue: false,
        },
        {
          name: 'userEmailSent',
          type: 'checkbox',
          label: 'User Email Sent',
          defaultValue: false,
        },
        {
          name: 'emailError',
          type: 'text',
          label: 'Email Error',
        },
      ],
    },
    {
      name: 'tracking',
      type: 'group',
      label: 'Tracking Data',
      fields: [
        {
          name: 'ip',
          type: 'text',
          label: 'Client IP',
        },
        {
          name: 'userAgent',
          type: 'text',
          label: 'User Agent',
          admin: {
            description: 'Browser user agent string',
          },
        },
        {
          name: 'referrer',
          type: 'text',
          label: 'HTTP Referer',
          admin: {
            description: 'Immediate HTTP Referer header from form submission',
          },
        },
        {
          name: 'referrerDomain',
          type: 'text',
          label: 'Referrer Domain',
          admin: {
            description: 'Hostname extracted from first-touch referrer',
          },
        },
        {
          name: 'previousPage',
          type: 'text',
          label: 'Previous Page',
          admin: {
            description: 'Page path before form submit',
          },
        },
        {
          name: 'pageHistory',
          type: 'textarea',
          label: 'Page History (JSON)',
          admin: {
            description: 'User\'s last 20 page visits in this session',
          },
        },
      ],
    },
    {
      name: 'firstTouch',
      type: 'group',
      label: 'First-Touch Attribution',
      fields: [
        {
          name: 'utmSource',
          type: 'text',
          label: 'UTM Source',
        },
        {
          name: 'utmMedium',
          type: 'text',
          label: 'UTM Medium',
        },
        {
          name: 'utmCampaign',
          type: 'text',
          label: 'UTM Campaign',
        },
        {
          name: 'utmTerm',
          type: 'text',
          label: 'UTM Term',
        },
        {
          name: 'utmContent',
          type: 'text',
          label: 'UTM Content',
        },
        {
          name: 'gclId',
          type: 'text',
          label: 'Google Click ID (GCLID)',
        },
        {
          name: 'fbClId',
          type: 'text',
          label: 'Facebook Click ID (FBCLID)',
        },
        {
          name: 'landingPage',
          type: 'text',
          label: 'Landing Page URL',
        },
        {
          name: 'timestamp',
          type: 'text',
          label: 'First Touch Timestamp',
        },
      ],
    },
    {
      name: 'lastTouch',
      type: 'group',
      label: 'Last-Touch Attribution',
      fields: [
        {
          name: 'utmSource',
          type: 'text',
          label: 'UTM Source',
        },
        {
          name: 'utmMedium',
          type: 'text',
          label: 'UTM Medium',
        },
        {
          name: 'utmCampaign',
          type: 'text',
          label: 'UTM Campaign',
        },
        {
          name: 'utmTerm',
          type: 'text',
          label: 'UTM Term',
        },
        {
          name: 'utmContent',
          type: 'text',
          label: 'UTM Content',
        },
        {
          name: 'gclId',
          type: 'text',
          label: 'Google Click ID (GCLID)',
        },
        {
          name: 'fbClId',
          type: 'text',
          label: 'Facebook Click ID (FBCLID)',
        },
        {
          name: 'currentPage',
          type: 'text',
          label: 'Current Page (when params present)',
        },
        {
          name: 'timestamp',
          type: 'text',
          label: 'Last Touch Timestamp',
        },
      ],
    },
  ],
}

export default ContactSubmissions
