/** @type {import('payload').CollectionConfig} */
const ContactSubmissions = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'createdAt'],
    description: 'Enquiry form submissions from the Contact page',
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => false,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Mobile Number',
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
  ],
}

export default ContactSubmissions
