// Blog snapshot store: JSON objects on Cloudflare R2, in the same bucket as
// media but under a `blog/` prefix. Enabled only when the R2 env vars exist;
// every helper is a no-op / null otherwise so callers fall back to the DB.
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'

const PREFIX = 'blog/'
export const INDEX_KEY = `${PREFIX}index.json`

let client = null

export function isSnapshotStoreEnabled() {
  return Boolean(
    process.env.R2_BUCKET_NAME &&
      process.env.R2_ENDPOINT &&
      process.env.R2_ACCESS_KEY &&
      process.env.R2_SECRET_KEY,
  )
}

function getClient() {
  if (!client) {
    client = new S3Client({
      endpoint: process.env.R2_ENDPOINT,
      region: 'auto',
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY,
        secretAccessKey: process.env.R2_SECRET_KEY,
      },
    })
  }
  return client
}

export function postKey(slug) {
  // Slugs are CMS-controlled but still keep the object key safe
  const safe = /^[a-zA-Z0-9_-]+$/.test(slug) ? slug : encodeURIComponent(slug)
  return `${PREFIX}posts/${safe}.json`
}

export async function readJson(key) {
  if (!isSnapshotStoreEnabled()) return null
  try {
    const res = await getClient().send(
      new GetObjectCommand({ Bucket: process.env.R2_BUCKET_NAME, Key: key }),
    )
    return JSON.parse(await res.Body.transformToString())
  } catch (error) {
    if (error?.name === 'NoSuchKey' || error?.$metadata?.httpStatusCode === 404) {
      return null
    }
    throw error
  }
}

export async function writeJson(key, data) {
  if (!isSnapshotStoreEnabled()) return false
  await getClient().send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: JSON.stringify(data),
      ContentType: 'application/json',
      CacheControl: 'no-cache',
    }),
  )
  return true
}

export async function deleteJson(key) {
  if (!isSnapshotStoreEnabled()) return false
  await getClient().send(
    new DeleteObjectCommand({ Bucket: process.env.R2_BUCKET_NAME, Key: key }),
  )
  return true
}
