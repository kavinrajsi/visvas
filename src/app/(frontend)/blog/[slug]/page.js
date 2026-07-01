import Image from 'next/image'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { toImageKitUrl } from '@/lib/image/imageKitUrl'
import BlogSidebar from '@/app/(frontend)/blog/BlogSidebar'
import styles from './page.module.scss'
import '@/app/(frontend)/blog/[slug]/blog-content.scss'

export const dynamic = 'force-dynamic'
export const dynamicParams = false
export const revalidate = 3600

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateStr))
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'posts',
    limit: 1000,
    select: { slug: true },
  })
  return result.docs.map(({ slug }) => ({ slug }))
}

async function getPost(slug) {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })

  return result.docs[0]
}

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) {
      return {
        title: 'Post Not Found',
      }
    }

    const metaTitle = post.metaTitle || post.title
    const metaDesc = post.metaDescription || post.excerpt

    return {
      title: `${metaTitle} | Visvas Blog`,
      description: metaDesc,
      openGraph: {
        title: post.ogTitle || metaTitle,
        description: post.ogDescription || metaDesc,
        images: [
          {
            url: toImageKitUrl(post.ogImage?.url || post.coverImage?.url),
            width: 1200,
            height: 630,
          },
        ],
        type: 'article',
        publishedTime: post.publishedAt,
      },
      twitter: {
        card: post.twitterCard || 'summary_large_image',
        title: post.twitterTitle || post.ogTitle || metaTitle,
        description: post.twitterDescription || post.ogDescription || metaDesc,
        image: toImageKitUrl(post.ogImage?.url || post.coverImage?.url),
      },
      alternates: {
        canonical: post.canonicalUrl || `/blog/${slug}`,
      },
      robots: {
        index: !post.noIndex,
        follow: !post.noFollow,
      },
    }
  } catch {
    return { title: 'Blog Post | Visvas' }
  }
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className={styles['blog-detail']}>
      {/* Hero Image */}
      <div className={styles['blog-detail__hero']}>
        <Image
          src={toImageKitUrl(post.coverImage?.url)}
          alt={post.title}
          className={styles['blog-detail__hero-img']}
          priority
          fill
          sizes="100vw"
        />
      </div>

      {/* Layout */}
      <div className={styles['blog-detail__layout']}>
        <div className={styles['blog-detail__main']}>
          {/* Header */}
          <div className={styles['blog-detail__header']}>
            <h1 className={styles['blog-detail__title']}>{post.title}</h1>
            <p className={styles['blog-detail__date']}>
              {formatDate(post.publishedAt)}
            </p>
            {post.author && (
              <p className={styles['blog-detail__author']}>By {post.author}</p>
            )}
          </div>

          {/* Content */}
          {post.content && (
            <div className={styles['blog-detail__content']}>
              <div className="blog-content">
                <RichText data={post.content} />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <BlogSidebar />
      </div>

      {/* JSON-LD Schemas */}
      {post.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(typeof post.structuredData === 'object' ? post.structuredData : JSON.parse(post.structuredData || '{}')),
          }}
        />
      )}

      {!post.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: post.title,
              description: post.excerpt,
              image: post.coverImage?.url || undefined,
              datePublished: post.publishedAt,
              author: {
                '@type': 'Person',
                name: post.author || 'Visvas',
              },
            }),
          }}
        />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.visvas.in',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: 'https://www.visvas.in/blog',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: `https://www.visvas.in/blog/${post.slug}`,
              },
            ],
          }),
        }}
      />
    </div>
  )
}
