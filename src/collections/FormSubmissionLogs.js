/** @type {import('payload').CollectionConfig} */
const FormSubmissionLogs = {
  slug: 'form-submission-logs',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['formType', 'email', 'success', 'processingTime', 'createdAt'],
    description: 'Durable status log of every form submission attempt (one row per attempt)',
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => false,
    update: () => false,
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
      label: 'Full Name',
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email Address',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Mobile Number',
    },
    {
      name: 'success',
      type: 'checkbox',
      label: 'Pipeline Succeeded',
      defaultValue: false,
    },
    {
      name: 'errors',
      type: 'textarea',
      label: 'Errors',
    },
    {
      name: 'processingTime',
      type: 'number',
      label: 'Processing Time (ms)',
    },
    {
      name: 'isSpam',
      type: 'checkbox',
      label: 'Flagged as Spam (Honeypot)',
      defaultValue: false,
    },
    {
      name: 'ip',
      type: 'text',
      label: 'Client IP',
    },
    {
      name: 'submission',
      type: 'relationship',
      relationTo: 'contact-submissions',
      label: 'CMS Submission',
      admin: {
        description: 'Linked contact-submissions record (empty if that create failed)',
      },
    },
    {
      name: 'channels',
      type: 'group',
      label: 'Channel Results',
      fields: [
        {
          name: 'sheetsStored',
          type: 'checkbox',
          label: 'Google Sheets Stored',
          defaultValue: false,
        },
        {
          name: 'zohoPushed',
          type: 'checkbox',
          label: 'Zoho CRM Pushed',
          defaultValue: false,
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
      ],
    },
  ],
}

export default FormSubmissionLogs
