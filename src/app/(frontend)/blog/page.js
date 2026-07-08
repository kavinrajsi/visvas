import Image from "next/image";
import { getPayload } from "payload";
import config from "@payload-config";
import Link from "next/link";
import { toImageKitUrl } from "@/lib/image/imageKitUrl";
import BlogSidebar from "./BlogSidebar";
import Pagination from "@/app/(frontend)/projects/Pagination";
import styles from "./page.module.scss";

export const revalidate = 1800;

export const metadata = {
  title: "Blog & Insights | Visvas",
  description:
    "Read latest insights and tips on real estate and property development in Madurai.",
  openGraph: {
    title: "Blog & Insights | Visvas",
    description:
      "Read latest insights and tips on real estate and property development in Madurai.",
    type: "website",
    url: "https://www.visvas.in/blog",
  },
  twitter: {
    title: "Blog & Insights | Visvas",
    description:
      "Read latest insights and tips on real estate and property development in Madurai.",
  },
  alternates: {
    canonical: "https://www.visvas.in/blog",
  },
};

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr));
}

async function getPosts(page = 1) {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "posts",
    limit: 10,
    page,
    depth: 1,
    where: { status: { equals: "published" } },
    sort: "-publishedAt",
  });

  return result;
}

export default async function BlogPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const { docs: posts, totalPages } = await getPosts(currentPage);

  const payload = await getPayload({ config });
  const blogPageData = await payload.findGlobal({
    slug: "blog-page",
    depth: 0,
  });
  const { heroImage, mobileHeroImage } = blogPageData || {};

  const buildPaginationHref = (pageNum) => {
    const params = new URLSearchParams(resolvedSearchParams);
    params.set("page", String(pageNum));
    return `?${params.toString()}`;
  };

  return (
    <main className={styles["blog-index"]}>
      {/* Hero Banner */}
      {heroImage?.url && (
        <section className={styles["blog-index__banner"]}>
          <picture>
            {mobileHeroImage?.url && (
              <source media="(max-width: 767px)" srcSet={mobileHeroImage.url} />
            )}
            <Image
              src={heroImage.url}
              alt="Blog & Insights"
              className={styles["blog-index__banner-image"]}
              priority
              width={1920}
              height={600}
            />
          </picture>
        </section>
      )}

      <div className={styles["blog-index__container"]}>
        {/* Main Layout */}
        <div className={styles["blog-index__layout"]}>
          <div className={styles["blog-index__main"]}>
            {/* Post List */}
            <div className={styles["blog-index__post-list"]}>
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className={styles["blog-index__post-card"]}
                >
                  {/* Image */}
                  <div className={styles["blog-index__post-image"]}>
                    <Image
                      src={toImageKitUrl(post.coverImage?.url)}
                      alt={post.title}
                      className={styles["blog-index__post-img"]}
                      width={434}
                      height={220}
                    />
                  </div>

                  {/* Content */}
                  <div className={styles["blog-index__post-body"]}>
                    <div className={styles["blog-index__post-content"]}>
                      <h2 className={styles["blog-index__post-title"]}>
                        {post.title}
                      </h2>
                      <p className={styles["blog-index__post-excerpt"]}>
                        {post.excerpt || "No excerpt available"}
                      </p>
                    </div>
                    <p className={styles["blog-index__post-date"]}>
                      {formatDate(post.publishedAt)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                buildHref={buildPaginationHref}
              />
            )}
          </div>

          {/* Sidebar */}
          <aside className={styles["blog-index__sidebar"]}>
            <BlogSidebar />
          </aside>
        </div>

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Blog & Insights",
              url: "https://www.visvas.in/blog",
              description:
                "Read latest insights and tips on real estate and property development in Madurai.",
              mainEntity: {
                "@type": "ItemList",
                itemListElement: posts.map((post, idx) => ({
                  "@type": "ListItem",
                  position: idx + 1,
                  url: `https://www.visvas.in/blog/${post.slug}`,
                  name: post.title,
                  description: post.excerpt,
                  image: post.coverImage?.url,
                })),
              },
            }),
          }}
        />
      </div>
    </main>
  );
}
