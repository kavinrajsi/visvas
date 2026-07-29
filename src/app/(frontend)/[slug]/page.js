import { getPayload } from "payload";
import { notFound } from "next/navigation";
import config from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import styles from "./page.module.scss";
// Shared document-prose stylesheet (global `.blog-content` class), reused here
// so policy rich text picks up the same heading/list/table treatment as posts.
import "@/app/(frontend)/blog/[slug]/blog-content.scss";

// Keep dynamicParams on: policies are authored in the admin by non-developers,
// so a newly added policy must resolve via ISR without a rebuild.
export const dynamicParams = true;
export const revalidate = 3600;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.visvas.in";

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "policies",
      limit: 100,
      select: { slug: true },
    });
    return result.docs.filter((doc) => doc.slug).map(({ slug }) => ({ slug }));
  } catch {
    return [];
  }
}

async function getPolicy(slug) {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "policies",
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  });

  return result.docs[0];
}

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    const policy = await getPolicy(slug);

    if (!policy) {
      return { title: "Page Not Found" };
    }

    const title = `${policy.title} | Visvas Promoters`;
    const description = `${policy.title} for Visvas Promoters, Madurai. Read how we operate, what we disclose, and how we handle the information you share with us.`;

    return {
      title,
      description,
      alternates: {
        canonical: `/${policy.slug}`,
      },
      openGraph: {
        title,
        description,
        type: "article",
        url: `${baseUrl}/${policy.slug}`,
        modifiedTime: policy.lastUpdated || policy.updatedAt,
      },
      twitter: {
        card: "summary",
        title,
        description,
      },
    };
  } catch {
    return { title: "Visvas Promoters" };
  }
}

export default async function PolicyPage({ params }) {
  const { slug } = await params;
  const policy = await getPolicy(slug);

  if (!policy) {
    notFound();
  }

  const lastUpdated = policy.lastUpdated || policy.updatedAt;

  return (
    <div className={styles["policy"]}>
      <div className={styles["policy__header"]}>
        <h1 className={styles["policy__title"]}>{policy.title}</h1>
        {lastUpdated && (
          <p className={styles["policy__date"]}>
            Last updated: {formatDate(lastUpdated)}
          </p>
        )}
      </div>

      <div className={styles["policy__content"]}>
        <div className="blog-content">
          <RichText data={policy.content} />
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: policy.title,
            url: `${baseUrl}/${policy.slug}`,
            dateModified: lastUpdated,
            publisher: {
              "@type": "Organization",
              name: "Visvas Promoters",
              url: baseUrl,
            },
          }),
        }}
      />

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
                item: baseUrl,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: policy.title,
                item: `${baseUrl}/${policy.slug}`,
              },
            ],
          }),
        }}
      />
    </div>
  );
}
