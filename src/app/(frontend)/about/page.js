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
  const metaTitle = seo.metaTitle || "About | Visvas";
  // `openGraph.image` (singular) is not a valid Metadata key and is silently dropped
  const ogImageUrl = seo.ogImage?.url || "/og-image.png";

  return {
    title: metaTitle,
    description:
      seo.metaDescription ||
      "Learn about Visvas and our mission to build luxury properties in Madurai.",
    openGraph: {
      title: seo.ogTitle || metaTitle,
      description: seo.ogDescription || "Learn about Visvas and our mission.",
      type: "website",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: metaTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.twitterTitle || seo.ogTitle || metaTitle,
      description:
        seo.twitterDescription ||
        seo.ogDescription ||
        "Learn about Visvas and our mission.",
      images: [ogImageUrl],
    },
    alternates: {
      canonical: "/about",
    },
  };
}

// The copy the page shipped with, kept as the fallback for any field an editor
// leaves empty. The CMS is seeded with these same values, so a normal render is
// CMS-driven and identical to what was hardcoded here before.
const FALLBACK = {
  heroTitle: "We build homes that feel right.",
  heroText:
    "For over 30 years, Visvas has been more than a real estate developer. We have been a part of thousands of family stories built on trust, care, and lasting relationships in Madurai.",
  introHeading: "Who we are",
  introText:
    "Visvas means trust. We do not say it. We build so you feel it and decide to stay. We are the one who already knows what your family will need three years after possession, and has built for it.",
  stats: [
    { number: "20", suffix: "+", label: "Completed\nProjects" },
    { number: "15", suffix: "+", label: "Projects in\ndevelopment" },
    { number: "4000", suffix: "+", label: "Happy\nCustomers" },
    { number: "4", suffix: "+", label: "Million Sqft\nBuilt" },
    { number: "40", suffix: "+", label: "Sqft Built" },
  ],
  values: [
    {
      title: "Mission",
      description:
        "So families never have to regret the most important decision of their lives. We think ahead, so home buyers don't have to.",
    },
    {
      title: "Vision",
      description:
        "To be the builder families trust without question. Not because of what we say. Because of what they feel when they walk in and decide to stay.",
    },
  ],
  heroImage: "/river.png",
  valuesImage: "/temple.png",
  founderPhoto: "/founder.png",
  founderName: "Sankara Seetharaman",
  founderText:
    "At Visvas, we believe in building homes with purpose. Every decision we make begins with the families who will one day live there and make it their world. A home holds their dreams, their comfort, their peace of mind and their future. The greatest amenities we offer are peace of mind, happiness and a true sense of belonging, and we remain committed to creating them for generations to come.",
};

// Labels may carry newlines to force a line break in the stats row
function withLineBreaks(text) {
  const lines = String(text ?? "").split("\n");
  return lines.map((line, i) => (
    <span key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </span>
  ));
}

export default async function AboutPage() {
  const payload = await getPayload({ config });
  const data = await payload.findGlobal({ slug: "about-page", depth: 2 });

  const {
    heroBanner = {},
    introSection = {},
    stats = [],
    valuesSection = {},
    founderStory = {},
  } = data || {};

  const heroTitle = heroBanner.tagline || FALLBACK.heroTitle;
  const heroText = heroBanner.description || FALLBACK.heroText;
  const introHeading = introSection.heading || FALLBACK.introHeading;
  const introText = introSection.text || FALLBACK.introText;
  const statsList = stats?.length ? stats : FALLBACK.stats;
  const valuesList = valuesSection.values?.length
    ? valuesSection.values
    : FALLBACK.values;
  const valuesImage = valuesSection.sectionImage?.url || FALLBACK.valuesImage;
  const founderName = founderStory.name || FALLBACK.founderName;
  const founderPhoto = founderStory.photo?.url || FALLBACK.founderPhoto;
  const [primaryValue, ...secondaryValues] = valuesList;

  return (
    <main className={styles["about"]}>
      <section className={styles["about__hero"]}>
        <h1 className={styles["about__hero-title"]}>{heroTitle}</h1>
        <p className={styles["about__hero-text"]}>{heroText}</p>
      </section>
      <section className={styles["about__hero-image"]}>
        <Image
          src={FALLBACK.heroImage}
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
        <h2 className={styles["about__intro-title"]}>{introHeading}</h2>
        <p className={styles["about__intro-text"]}>{introText}</p>
        </div>
      </section>
      <section className={styles["about__stats"]}>
        <ul className={styles["about__stats-list"]}>
          {statsList.map((stat, i) => {
            const numeric = Number(stat.number);
            return (
              <li className={styles["about__stats-item"]} key={stat.id || i}>
                <p className={styles["about__stats-number"]}>
                  {Number.isFinite(numeric) ? (
                    <Counter
                      value={numeric}
                      className={styles["about__stats-count"]}
                    />
                  ) : (
                    <span className={styles["about__stats-count"]}>
                      {stat.number}
                    </span>
                  )}
                  {stat.suffix && (
                    <sup className={styles["about__stats-suffix"]}>
                      {stat.suffix}
                    </sup>
                  )}
                </p>
                <p className={styles["about__stats-label"]}>
                  {withLineBreaks(stat.label)}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={styles["about__values"]}>
        {primaryValue && (
          <div
            className={`${styles["about__values-block"]} ${styles["about__values-block--mission"]}`}
          >
            <h2 className={styles["about__values-title"]}>
              {primaryValue.title}
            </h2>
            <p className={styles["about__values-text"]}>
              {primaryValue.description}
            </p>
          </div>
        )}
        <div className={styles["about__values-image-wrapper"]}>
          <Image
            src={valuesImage}
            alt={valuesSection.sectionImage?.alt || "Visvas community image"}
            width={720}
            height={360}
            quality={85}
            className={styles["about__values-image"]}
          />
        </div>
        {secondaryValues.map((value, i) => (
          <div
            key={value.id || i}
            className={`${styles["about__values-block"]} ${styles["about__values-block--vision"]}`}
          >
            <h2 className={styles["about__values-title"]}>{value.title}</h2>
            <p className={styles["about__values-text"]}>{value.description}</p>
          </div>
        ))}
      </section>

      <section className={styles["about__founder"]}>
        <div className={styles["about__founder-image-wrapper"]}>
          <Image
            src={founderPhoto}
            alt={founderStory.photo?.alt || founderName}
            width={547}
            height={547}
            quality={85}
            className={styles["about__founder-image"]}
          />
        </div>
        <div className={styles["about__founder-content"]}>
          <h3 className={styles["about__founder-name"]}>{founderName}</h3>
          {founderStory.content ? (
            <div className={styles["about__founder-text"]}>
              <RichText data={founderStory.content} />
            </div>
          ) : (
            <p className={styles["about__founder-text"]}>
              {FALLBACK.founderText}
            </p>
          )}
          <div className={styles["about__founder-signature"]}>
            <FounderSignature />
          </div>
        </div>
      </section>
    </main>
  );
}
