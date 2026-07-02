import Image from "next/image";
import { getPayload } from "payload";
import config from "@payload-config";
import styles from "./page.module.scss";

export const revalidate = 3600;

export async function generateMetadata() {
  const payload = await getPayload({ config });
  const data = await payload.findGlobal({ slug: "impact-page", depth: 0 });

  const seo = data?.seo || {};
  return {
    title: seo.metaTitle || "Community Impact | Visvas",
    description:
      seo.metaDescription ||
      "Discover our environmental and social impact initiatives.",
    openGraph: {
      title: seo.ogTitle || "Community Impact | Visvas",
      description: seo.ogDescription || "Discover our impact.",
      image: seo.ogImage?.url || undefined,
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

  return (
    <main className={styles["community"]}>
      <section className={styles["community__hero"]}>
        <h1 className={styles["community__hero-title"]}>Homes Connected by Community</h1>
        <p className={styles["community__hero-text"]}>
          A home is something you buy. A neighbourhood is something you belong
          to.
        </p>
      </section>
      <section className={styles["community__video-section"]}>
        <video
          poster="./video/visvas-community-video-poster.png"
          loop
          muted
          autoPlay
          playsInline
          preload="metadata"
          className={styles["community__video"]}
        >
          <source src="./video/visvas-community-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
      <section className={styles["community__about"]}>
        <div className={styles["community__about-video-section"]}>
          <video
            poster="/visvas-community-video-1-poster.png"
            loop
            muted
            autoPlay
            playsInline
            preload="metadata"
            className={styles["community__about-video"]}
          >
            <source src="./video/visvas-community-video-1.mp4" type="video/mp4" />
          </video>
          <div className={styles["community__about-overlay"]} />
          <div className={styles["community__about-content"]}>
            <h2 className={styles["community__about-title"]}>What a Visvas community is</h2>
            <p className={styles["community__about-text"]}>
              A hundred homes built to the same standard eventually become something
              more than buildings. They become a neighbourhood. You know who lives
              next door. Your children grow up together. Your parents find company
              on their evening walks.
            </p>
          </div>
        </div>
        <div className={styles["community__about-right"]} />
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
      </section>
      <section className={styles["community__shared-life"]}>
        <h2 className={styles["community__shared-life-title"]}>Built around shared life</h2>
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
