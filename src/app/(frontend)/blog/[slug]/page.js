import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import BlogSidebar from '@/app/(frontend)/blog/BlogSidebar'
import styles from './page.module.css'
import '@/app/(frontend)/blog/[slug]/blog-content.css'

export const dynamic = 'auto'
export const revalidate = 3600

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateStr))
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
  const post = await getPost(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.metaTitle || post.title} | Visvas Blog`,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.ogTitle || post.metaTitle || post.title,
      description: post.ogDescription || post.metaDescription,
      image: post.ogImage?.url || post.coverImage?.url,
    },
  }
}

export default async function BlogDetailPage({ params }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className={styles['blog-detail']}>
      {/* Hero Image */}
      <div className={styles['blog-detail__hero']}>
        <img
          src={post.coverImage?.url || '/placeholder.jpg'}
          alt={post.title}
          className={styles['blog-detail__hero-img']}
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
    </div>
  )
}
