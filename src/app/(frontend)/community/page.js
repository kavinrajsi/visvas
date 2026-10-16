import Image from "next/image";
import { preload } from "react-dom";
import { getPayload } from "payload";
import config from "@payload-config";
import ResponsiveVideo from "@/app/(frontend)/components/responsive-video/ResponsiveVideo";
import styles from "./page.module.scss";

export const revalidate = 3600;

export async function generateMetadata() {
  const payload = await getPayload({ config });
  const data = await payload.findGlobal({ slug: "impact-page", depth: 0 });

  const seo = data?.seo || {};
  const metaTitle = seo.metaTitle || "Community Impact | Visvas";
  // `openGraph.image` (singular) is not a valid Metadata key and is silently dropped
  const ogImageUrl = seo.ogImage?.url || "/og-image.png";

  return {
    title: metaTitle,
    description:
      seo.metaDescription ||
      "Discover our environmental and social impact initiatives.",
    openGraph: {
      title: seo.ogTitle || metaTitle,
      description: seo.ogDescription || "Discover our impact.",
      type: "website",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: metaTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.twitterTitle || seo.ogTitle || metaTitle,
      description:
        seo.twitterDescription || seo.ogDescription || "Discover our impact.",
      images: [ogImageUrl],
    },
    alternates: {
      canonical: "/community",
    },
  };
}

export default async function CommunityPage() {
  const payload = await getPayload({ config });
  const data = await payload.findGlobal({ slug: "impact-page", depth: 2 });

  const {
    heroImage,
    environmentalSection = {},
    socialSection = {},
    testimonials = [],
  } = data || {};

  preload("/video/visvas-community-video-poster.webp", { as: "image", fetchPriority: "high" });

  return (
    <main className={styles["community"]}>
      <section className={styles["community__hero"]}>
        <h1 className={styles["community__hero-title"]}>
          Homes Connected by Community
        </h1>
        <p className={styles["community__hero-text"]}>
          A home is something you buy. A neighbourhood is something you belong
          to.
        </p>
      </section>
      <section className={styles["community__video-section"]}>
        <ResponsiveVideo
          mobileSrc="/video/visvas-community-video-720.mp4"
          desktopSrc="/video/visvas-community-video-1080.mp4"
          poster="/video/visvas-community-video-poster.webp"
          className={styles["community__video"]}
        />
      </section>
      <section className={styles["community__about"]}>
        <div className={styles["community__about-video-sectionWrapper"]}>
          <div className={styles["community__about-video-section"]}>
            <ResponsiveVideo
              mobileSrc="/video/visvas-community-video-1-720.mp4"
              desktopSrc="/video/visvas-community-video-1-720.mp4"
              poster="/video/visvas-community-video-1-poster.webp"
              className={styles["community__about-video"]}
            />
            <div className={styles["community__about-overlay"]} />
          </div>
          <div className={styles["community__about-right"]} />
        </div>
        <div className={styles["community__about-contentWrapper"]}>
          <div className={styles["community__about-content"]}>
            <h2 className={styles["community__about-title"]}>
              What a Visvas community is
            </h2>
            <p className={styles["community__about-text"]}>
              A hundred homes built to the same standard eventually become
              something more than buildings. They become a neighbourhood. You
              know who lives next door. Your children grow up together. Your
              parents find company on their evening walks.
            </p>
          </div>
          <div className={styles["community__about-wrapper"]}>
            <Image
              src="/visvas-community-image-1.png"
              alt="Visvas community image"
              width={600}
              height={400}
              quality={85}
              className={styles["community__about-image"]}
            />
          </div>
        </div>
      </section>
      <section className={styles["community__shared-life"]}>
        <h2 className={styles["community__shared-life-title"]}>
          Built around shared life
        </h2>
        <p className={styles["community__shared-life-text"]}>
          Festivals happen in the open space, together. Children play where you
          can see them. The walking track fills up in the morning, before the
          heat. These are not amenities on a brochure. They are the moments that
          turn neighbours into a community.
        </p>
      </section>
    </main>
  );
}
