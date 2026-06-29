import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  turbopack: {
    resolveAlias: {
      '@payload-config': './payload.config.js',
    },
  },
}

export default withPayload(nextConfig)
