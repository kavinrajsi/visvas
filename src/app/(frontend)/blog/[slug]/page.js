import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/blog/getPosts";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { toImageKitUrl } from "@/lib/image/imageKitUrl";
import BlogSidebar from "@/app/(frontend)/blog/BlogSidebar";
import styles from "./page.module.scss";
import "@/app/(frontend)/blog/[slug]/blog-content.scss";

// true so a post published after the last build renders on demand instead of 404ing
// until the next deploy (matches projects/[slug] and [slug])
export const dynamicParams = true;
export const revalidate = 3600;

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr));
}

// Slugs come from the R2 blog snapshot. If neither the snapshot nor the DB is
// reachable at build time, build with no prerendered posts; dynamicParams
// renders them on demand instead of failing the deploy.
export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.filter((p) => p.slug).map(({ slug }) => ({ slug }));
  } catch (error) {
    console.error("[BLOG] generateStaticParams fallback to none:", error.message);
    return [];
  }
}

// Full post document from the R2 snapshot (src/lib/blog/getPosts.js); no DB read.
async function getPost(slug) {
  return getPostBySlug(slug);
}

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
      return {
        title: "Post Not Found",
      };
    }

    const metaTitle = post.metaTitle || post.title;
    const metaDesc = post.metaDescription || post.excerpt;
    const ogSource = post.ogImage?.url || post.coverImage?.url;
    const ogImageUrl = ogSource ? toImageKitUrl(ogSource) : "/og-image.png";

    return {
      title: `${metaTitle} | Visvas Blog`,
      description: metaDesc,
      openGraph: {
        title: post.ogTitle || metaTitle,
        description: post.ogDescription || metaDesc,
        images: [{ url: ogImageUrl, width: 1200, height: 630, alt: metaTitle }],
        type: "article",
        publishedTime: post.publishedAt,
      },
      twitter: {
        card: post.twitterCard || "summary_large_image",
        title: post.twitterTitle || post.ogTitle || metaTitle,
        description: post.twitterDescription || post.ogDescription || metaDesc,
        // `twitter.image` (singular) is not a valid Metadata key
        images: [ogImageUrl],
      },
      alternates: {
        canonical: post.canonicalUrl || `/blog/${slug}`,
      },
    };
  } catch {
    return { title: "Blog Post | Visvas" };
  }
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className={styles["blog-detail"]}>
      {/* Layout */}
      <div className={styles["blog-detail__layout"]}>
        <div className={styles["blog-detail__main"]}>
          {/* Hero Image */}
          <div className={styles["blog-detail__hero"]}>
            <Image
              src={toImageKitUrl(post.coverImage?.url)}
              alt={post.title}
              className={styles["blog-detail__hero-img"]}
              priority
              width={1200}
              height={600}
            />
          </div>
          {/* Header */}
          <div className={styles["blog-detail__header"]}>
            <h1 className={styles["blog-detail__title"]}>{post.title}</h1>
            <p className={styles["blog-detail__date"]}>
              {formatDate(post.publishedAt)}
            </p>
            {post.author && (
              <p className={styles["blog-detail__author"]}>By {post.author}</p>
            )}
          </div>

          {/* Content */}
          {post.content && (
            <div className={styles["blog-detail__content"]}>
              <div className="blog-content">
                <RichText data={post.content} />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className={styles["blog-index__sidebar"]}>
          <BlogSidebar />
        </aside>
      </div>

      {/* JSON-LD Schemas */}
      {post.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              typeof post.structuredData === "object"
                ? post.structuredData
                : JSON.parse(post.structuredData || "{}"),
            ),
          }}
        />
      )}

      {!post.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description: post.excerpt,
              image: post.coverImage?.url || undefined,
              datePublished: post.publishedAt,
              author: {
                "@type": "Person",
                name: post.author || "Visvas",
              },
            }),
          }}
        />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.visvas.in",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://www.visvas.in/blog",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: `https://www.visvas.in/blog/${post.slug}`,
              },
            ],
          }),
        }}
      />
    </div>
  );
}
