import Image from "next/image";
import { getPayload } from "payload";
import config from "@payload-config";
import ContactForm from "./ContactForm";
import styles from "./page.module.scss";

export const revalidate = 3600;

export async function generateMetadata() {
  const payload = await getPayload({ config });
  const data = await payload.findGlobal({ slug: "contact-page", depth: 0 });

  const seo = data?.seo || {};
  return {
    title: seo.metaTitle || "Contact | Visvas",
    description:
      seo.metaDescription ||
      "Get in touch with Visvas. We would love to hear from you.",
    openGraph: {
      title: seo.ogTitle || "Contact | Visvas",
      description: seo.ogDescription || "Get in touch with Visvas.",
      image: seo.ogImage?.url || undefined,
    },
  };
}

export default async function ContactPage() {
  const payload = await getPayload({ config });
  const data = await payload.findGlobal({ slug: "contact-page", depth: 2 });

  const { heroImage, mobileHeroImage, contactDetails = {}, contactForm = {} } = data || {};
  const { successMessage = {} } = contactForm;

  const address =
    contactDetails.address || "84, TPK Main Road, Madurai, Tamil Nadu.";
  const email =
    contactDetails.email ||
    process.env.NEXT_PUBLIC_BUSINESS_EMAIL ||
    "contact@example.com";
  const phone =
    contactDetails.phone ||
    process.env.NEXT_PUBLIC_BUSINESS_PHONE ||
    "+91 94038 93898";
  const whatsapp = contactDetails.whatsapp || "";

  return (
    <main className={styles["contact"]}>
      {/* Hero Image */}
      {heroImage?.url && (
        <section className={styles["hero"]}>
          <picture>
            {mobileHeroImage?.url && (
              <source media="(max-width: 767px)" srcSet={mobileHeroImage.url} />
            )}
            <Image
              src={heroImage.url}
              alt="Contact Visvas"
              className={styles["hero__image"]}
              priority
              width={1920}
              height={600}
            />
          </picture>
        </section>
      )}

      {/* Contact Details + Form Layout */}
      <section className={styles["contact-section"]}>
        <div className={styles["contact-layout"]}>
          {/* Details */}
          <div className={styles["contact-details"]}>
            <div className={styles["contact-details__row"]}>
              <h3 className={styles["contact-details__label"]}>Location</h3>
              <p className={styles["contact-details__value"]}>{address}</p>
            </div>

            <div className={styles["contact-details__row"]}>
              <h3 className={styles["contact-details__label"]}>Email</h3>
              <a
                href={`mailto:${email}`}
                className={styles["contact-details__link"]}
              >
                {email}
              </a>
            </div>

            <div className={styles["contact-details__row"]}>
              <h3 className={styles["contact-details__label"]}>Phone Number</h3>
              <p className={styles["contact-details__value"]}>
                <a
                  href={`tel:${phone}`}
                  className={styles["contact-details__value-link"]}
                >
                  {phone}
                </a>
              </p>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.303152296404!2d78.10083417530177!3d9.908689974598648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00cf83b914e0a7%3A0x96cb8e879688f32b!2sVisvas%20Promoters%20P%20Ltd!5e0!3m2!1sen!2sin!4v1782937499457!5m2!1sen!2sin"
              width="600"
              height="452"
              style={{ border: '0' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>

          {/* Form */}
          <ContactForm
            heading={contactForm.heading || "What we can help you with"}
            disclaimer={
              contactForm.disclaimer ||
              "By submitting this form you agree to the Terms and Conditions and Privacy Policy"
            }
            successMessage={successMessage}
          />
        </div>
      </section>
    </main>
  );
}
