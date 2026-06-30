import { S3Storage } from '@payloadcms/storage-s3'

/** @type {import('payload').CollectionConfig} */
const Media = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
  upload: {
    storage: new S3Storage({
      bucket: process.env.R2_BUCKET_NAME || '',
      config: {
        endpoint: process.env.R2_ENDPOINT || '',
        region: 'auto',
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY || '',
          secretAccessKey: process.env.R2_SECRET_KEY || '',
        },
      },
    }),
  },
}

export default Media
