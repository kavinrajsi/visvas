import { getPayload } from 'payload'
import config from '@payload-config'
import KumbabishekamPageClient from '../KumbabishekamPageClient'

export const revalidate = 3600

const LANGUAGE = 'ta'

async function getData() {
  const payload = await getPayload({ config })
  return payload.findGlobal({ slug: 'kumbabishekam-page', depth: 1 })
}

export async function generateMetadata() {
  const data = await getData()
  const seo = data?.seo || {}
  const metaTitle = seo.metaTitle?.ta || 'கும்பாபிஷேகம் | Visvas'
  const metaDescription =
    seo.metaDescription?.ta || 'கும்பாபிஷேக நிகழ்ச்சியில் எங்களுடன் இணையுங்கள்.'
  const ogImageUrl = seo.ogImage?.url || '/og-image.png'

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'website',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: metaTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: '/kumbabishekam/ta',
      languages: {
        en: '/kumbabishekam',
        ta: '/kumbabishekam/ta',
      },
    },
  }
}

export default async function KumbabishekamPageTamil() {
  const data = await getData()
  return <KumbabishekamPageClient data={data} language={LANGUAGE} />
}
