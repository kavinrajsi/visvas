import Image from "next/image";
import { getPayload } from "payload";
import { RichText } from "@payloadcms/richtext-lexical/react";
import config from "@payload-config";
import Counter from "@/components/animation/Counter";
import FounderSignature from "@/components/animation/FounderSignature";
import styles from "./page.module.scss";

export const revalidate = 3600;

export async function generateMetadata() {
  const payload = await getPayload({ config });
  const data = await payload.findGlobal({ slug: "about-page", depth: 0 });

  const seo = data?.seo || {};
  return {
    title: seo.metaTitle || "About | Visvas",
    description:
      seo.metaDescription ||
      "Learn about Visvas and our mission to build luxury properties in Madurai.",
    openGraph: {
      title: seo.ogTitle || "About | Visvas",
      description: seo.ogDescription || "Learn about Visvas and our mission.",
      image: seo.ogImage?.url || undefined,
    },
  };
}

export default async function AboutPage() {
  const payload = await getPayload({ config });
  const data = await payload.findGlobal({ slug: "about-page", depth: 2 });

  const {
    heroBanner = {},
    heroQuote = {},
    stats = [],
    valuesSection = {},
    founderStory = {},
    testimonialsSectionHeading = "Stories Built on Trust",
    featuredTestimonials = [],
  } = data || {};

  return (
    <main className={styles["about"]}>
      <section className={styles["about__hero"]}>
        <h1 className={styles["about__hero-title"]}>We build homes that feel right.</h1>
        <p className={styles["about__hero-text"]}>
          For over 30 years, Visvas has been more than a real estate developer.
          We have been a part of thousands of family stories built on trust,
          care, and lasting relationships in Madurai.
        </p>
      </section>
      <section className={styles["about__hero-image"]}>
        <Image
          src="/river.png"
          alt="Visvas heritage river view"
          width={1400}
          height={600}
          quality={85}
          priority
          className={styles["about__hero-image-img"]}
        />
      </section>
      <section className={styles["about__intro"]}>
        <div className={styles["about__intro-content"]}>
        <h2 className={styles["about__intro-title"]}>Who we are</h2>
        <p className={styles["about__intro-text"]}>
          Visvas means trust. We do not say it. We build so you feel it and
          decide to stay. We are the one who already knows what your family will
          need three years after possession, and has built for it.
        </p>
        </div>
      </section>
      <section className={styles["about__stats"]}>
        <ul className={styles["about__stats-list"]}>
          <li className={styles["about__stats-item"]}>
            <p className={styles["about__stats-number"]}>
              <Counter value={20} className={styles["about__stats-count"]} />
              <sup className={styles["about__stats-suffix"]}>+</sup>
            </p>
            <p className={styles["about__stats-label"]}>Completed <br />Projects </p>
          </li>
          <li className={styles["about__stats-item"]}>
            <p className={styles["about__stats-number"]}>
              <Counter value={15} className={styles["about__stats-count"]} />
              <sup className={styles["about__stats-suffix"]}>+</sup>
            </p>
            <p className={styles["about__stats-label"]}>Projects in  <br />development </p>
          </li>
          <li className={styles["about__stats-item"]}>
            <p className={styles["about__stats-number"]}>
              <Counter value={4000} className={styles["about__stats-count"]} />
              <sup className={styles["about__stats-suffix"]}>+</sup>
            </p>
            <p className={styles["about__stats-label"]}>Happy <br />Customers </p>
          </li>
          <li className={styles["about__stats-item"]}>
            <p className={styles["about__stats-number"]}>
              <Counter value={4} className={styles["about__stats-count"]} />
              <sup className={styles["about__stats-suffix"]}>+</sup>
            </p>
            <p className={styles["about__stats-label"]}>Million Sqft <br />Built</p>
          </li>
          <li className={styles["about__stats-item"]}>
            <p className={styles["about__stats-number"]}>
              <Counter value={40} className={styles["about__stats-count"]} />
              <sup className={styles["about__stats-suffix"]}>+</sup>
            </p>
            <p className={styles["about__stats-label"]}>Sqft Built</p>
          </li>
        </ul>
      </section>

      <section className={styles["about__values"]}>
        <div className={`${styles["about__values-block"]} ${styles["about__values-block--mission"]}`}>
          <h2 className={styles["about__values-title"]}>Mission</h2>
          <p className={styles["about__values-text"]}>
            So families never have to regret the most important decision of
            their lives. We think ahead, so home buyers don&apos;t have to.
          </p>
        </div>
        <div className={styles["about__values-image-wrapper"]}>
          <Image
            src="/temple.png"
            alt="Visvas community image"
            width={720}
            height={360}
            quality={85}
            className={styles["about__values-image"]}
          />
        </div>
        <div className={`${styles["about__values-block"]} ${styles["about__values-block--vision"]}`}>
          <h2 className={styles["about__values-title"]}>Vision</h2>
          <p className={styles["about__values-text"]}>
            To be the builder families trust without question. Not because of
            what we say. Because of what they feel when they walk in and decide
            to stay.
          </p>
        </div>
      </section>

      <section className={styles["about__founder"]}>
        <div className={styles["about__founder-image-wrapper"]}>
          <Image
            src="/founder.png"
            alt="founder"
            width={547}
            height={547}
            quality={85}
            className={styles["about__founder-image"]}
          />
        </div>
        <div className={styles["about__founder-content"]}>
          <h3 className={styles["about__founder-name"]}>Sankara Seetharaman</h3>
          <p className={styles["about__founder-text"]}>
            At Visvas, we believe in building homes with purpose. Every decision
            we make begins with the families who will one day live there and
            make it their world. A home holds their dreams, their comfort, their
            peace of mind and their future. The greatest amenities we offer are
            peace of mind, happiness and a true sense of belonging, and we
            remain committed to creating them for generations to come.
          </p>
          <div className={styles["about__founder-signature"]}>
            <FounderSignature />
          </div>
        </div>
      </section>
    </main>
  );
}
