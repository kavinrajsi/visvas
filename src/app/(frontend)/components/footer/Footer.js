import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";
import Testimonial from "../Testimonial";
import styles from "./Footer.module.scss";

const Logo = () => (
  <svg
    width="177"
    height="40"
    viewBox="0 0 177 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles["footer__logo-svg"]}
  >
    <g clipPath="url(#clip0_footer_logo)">
      <path
        d="M14.1984 0L0.0235405 40H40.0138L25.8389 0H14.1984Z"
        fill="#1B5E30"
      />
      <path
        d="M30.029 0L20.0167 13.4993L10.0084 0H0V3.46105H2.56584L20.0167 26.9985L37.4715 3.46105H40.0373V0H30.029Z"
        fill="#E09C26"
      />
      <path
        d="M87.5525 9.1561V7.91357H78.6545V9.18354C79.6196 9.2149 81.0634 9.74797 81.0673 11.4177C81.0987 11.7391 81.134 28.1468 81.1301 28.9425C81.1144 30.5064 79.5568 31.1257 78.6584 31.1845V32.427H87.5564V31.1571C86.5913 31.1257 85.1475 30.5927 85.1436 28.9229C85.1122 28.6015 85.0769 12.1938 85.0808 11.3981C85.0965 9.8342 86.6541 9.2149 87.5525 9.1561Z"
        fill="#1B5E30"
      />
      <path
        d="M106.714 19.884C105.423 18.8493 98.7849 16.0742 97.4196 14.7219C96.07 13.3853 95.9837 11.4019 97.1568 9.98302C98.7849 8.01536 103.693 7.65083 105.286 10.7121C105.568 11.2569 105.784 11.8331 106.016 12.4014H107.251L107.087 8.32109C106.942 8.21134 104.678 7.67043 103.736 7.5254C101.19 7.13736 98.6869 7.23927 96.3329 8.38772C94.0417 9.50482 92.5351 11.206 92.3429 13.7968C92.1585 16.325 93.3669 18.1555 95.5364 19.3745C96.9135 20.1467 102.555 22.6004 103.607 23.6783C105.054 25.1599 105.435 27.4686 104.407 29.0639C103.085 31.2275 100.747 31.8625 98.2278 31.5332C95.9994 31.2236 94.4615 29.5891 94.0809 27.8488C93.9436 27.3588 93.8455 26.8532 93.72 26.3632H91.978V30.5651C93.1746 31.447 95.3874 32.2858 97.2078 32.5759C100.284 32.9051 103.693 32.521 106.377 30.3495C109.825 27.5587 110.049 22.5651 106.71 19.884H106.714Z"
        fill="#1B5E30"
      />
      <path
        d="M174.619 19.884C173.328 18.8493 166.69 16.0742 165.324 14.7219C163.975 13.3853 163.888 11.4019 165.061 9.98302C166.69 8.01536 171.598 7.65083 173.19 10.7121C173.473 11.2569 173.689 11.8331 173.92 12.4014H175.156L174.991 8.32109C174.846 8.21134 172.582 7.67043 171.641 7.5254C169.095 7.13736 166.591 7.23927 164.237 8.38772C161.946 9.50482 160.44 11.206 160.247 13.7968C160.063 16.325 161.271 18.1555 163.441 19.3745C164.818 20.1467 170.46 22.6004 171.511 23.6783C172.959 25.1599 173.34 27.4686 172.312 29.0639C170.99 31.2275 168.651 31.8625 166.132 31.5332C163.904 31.2236 162.366 29.5891 161.986 27.8488C161.848 27.3588 161.75 26.8532 161.625 26.3632H159.883V30.5651C161.079 31.447 163.292 32.2858 165.112 32.5759C168.188 32.9051 171.598 32.521 174.281 30.3495C177.73 27.5587 177.953 22.5651 174.615 19.884H174.619Z"
        fill="#1B5E30"
      />
      <path
        d="M72.3301 7.89404C72.3301 7.89404 65.0014 25.8421 64.5737 26.8651H64.3305C64.0951 26.3203 56.6643 7.89404 56.6643 7.89404H50.0928V9.15225C51.513 9.23064 52.6076 9.94794 53.0823 11.1121C53.4237 11.9548 59.2655 25.752 61.8235 32.431H64.0245C64.4756 30.9533 70.1644 17.2542 72.644 11.312C73.1658 10.0655 73.9622 9.21888 75.4217 9.17185V7.89404H72.3301Z"
        fill="#1B5E30"
      />
      <path
        d="M133.341 7.89404C133.341 7.89404 126.013 25.8421 125.585 26.8651H125.342C125.106 26.3203 117.676 7.89404 117.676 7.89404H111.104V9.15225C112.524 9.23064 113.619 9.94794 114.094 11.1121C114.435 11.9548 120.277 25.752 122.835 32.431H125.036C125.487 30.9533 131.176 17.2542 133.655 11.312C134.177 10.0655 134.974 9.21888 136.433 9.17185V7.89404H133.341Z"
        fill="#1B5E30"
      />
      <path
        d="M154.386 29.213C154.045 28.3703 148.203 14.5731 145.645 7.89404H143.444C142.993 9.37175 137.304 23.0709 134.824 29.0131C134.303 30.2596 133.506 31.1062 132.047 31.1532V32.431H135.138C135.138 32.431 136.861 28.2174 138.681 23.7529H147.301C149.101 28.2135 150.8 32.431 150.8 32.431H157.372V31.1728C155.951 31.0944 154.857 30.3771 154.382 29.213H154.386ZM139.297 22.2439C141.031 17.995 142.695 13.9303 142.891 13.4599H143.134C143.244 13.7147 144.927 17.8813 146.692 22.2439H139.297Z"
        fill="#1B5E30"
      />
      <path
        d="M147.791 5.89884H141.294V4.78174H147.791V5.89884Z"
        fill="#1B5E30"
      />
    </g>
    <defs>
      <clipPath id="clip0_footer_logo">
        <rect width="177" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const LinkedinIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.1164 8.73913C10.1164 9.69983 9.34427 10.4783 8.39123 10.4783C7.43819 10.4783 6.66601 9.69983 6.66601 8.73913C6.66601 7.77913 7.43819 7 8.39123 7C9.34427 7 10.1164 7.77913 10.1164 8.73913ZM10.1304 11.8696H6.6521V23H10.1304V11.8696ZM15.6831 11.8696H12.2271V23H15.6838V17.1572C15.6838 13.9085 19.8778 13.6428 19.8778 17.1572V23H23.3478V15.9523C23.3478 10.4706 17.1411 10.6703 15.6831 13.3687V11.8696Z"
      fill="#303030"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.6867 7.05595C10.8355 7.09611 10.2543 7.23195 9.7461 7.43163C9.22018 7.63659 8.77442 7.91163 8.3309 8.35675C7.88738 8.80188 7.61426 9.24796 7.41073 9.77468C7.21377 10.284 7.08033 10.8657 7.04273 11.7174C7.00513 12.5691 6.99681 12.8429 7.00097 15.0153C7.00513 17.1878 7.01473 17.4601 7.05601 18.3136C7.09665 19.1646 7.23201 19.7458 7.43169 20.2541C7.63698 20.78 7.9117 21.2256 8.35698 21.6693C8.80226 22.113 9.24802 22.3854 9.77602 22.5893C10.2848 22.7859 10.8667 22.92 11.7183 22.9573C12.5698 22.9946 12.8439 23.0032 15.0157 22.999C17.1876 22.9949 17.461 22.9853 18.3143 22.9448C19.1676 22.9043 19.7457 22.768 20.2541 22.5693C20.7801 22.3635 21.226 22.0893 21.6693 21.6438C22.1127 21.1984 22.3857 20.752 22.589 20.225C22.7861 19.7162 22.9201 19.1342 22.957 18.2833C22.9943 17.4294 23.0031 17.1568 22.9989 14.9846C22.9948 12.8125 22.985 12.5401 22.9445 11.687C22.9041 10.8339 22.7685 10.2545 22.569 9.74588C22.3634 9.21996 22.089 8.77468 21.6439 8.33067C21.1988 7.88667 20.7521 7.61387 20.2252 7.41099C19.7161 7.21403 19.1345 7.07979 18.2829 7.04299C17.4314 7.00619 17.1573 6.99675 14.9847 7.00091C12.812 7.00507 12.54 7.01435 11.6867 7.05595ZM11.7802 21.5181C11.0002 21.4842 10.5767 21.3546 10.2944 21.2461C9.92066 21.1021 9.65442 20.928 9.37314 20.6494C9.09186 20.3709 8.91906 20.1037 8.77314 19.7307C8.66354 19.4485 8.53154 19.0254 8.49506 18.2454C8.45538 17.4024 8.44706 17.1493 8.44242 15.0134C8.43778 12.8776 8.44594 12.6248 8.4829 11.7814C8.51618 11.002 8.64658 10.578 8.7549 10.296C8.8989 9.92172 9.07234 9.65596 9.35154 9.37484C9.63074 9.09372 9.89714 8.9206 10.2704 8.77468C10.5523 8.6646 10.9754 8.53372 11.7551 8.4966C12.5988 8.4566 12.8516 8.4486 14.9871 8.44396C17.1226 8.43932 17.376 8.44732 18.2201 8.48444C18.9994 8.51836 19.4236 8.64748 19.7053 8.75644C20.0793 8.90044 20.3453 9.0734 20.6265 9.35308C20.9076 9.63276 21.0809 9.8982 21.2268 10.2723C21.337 10.5534 21.4679 10.9763 21.5047 11.7564C21.5449 12.6001 21.554 12.8531 21.5578 14.9885C21.5617 17.1238 21.5541 17.3774 21.5172 18.2205C21.4831 19.0005 21.3538 19.4242 21.2452 19.7067C21.1012 20.0803 20.9276 20.3467 20.6482 20.6277C20.3689 20.9086 20.1028 21.0818 19.7293 21.2277C19.4477 21.3376 19.0242 21.4688 18.2452 21.5059C17.4015 21.5456 17.1487 21.5539 15.0124 21.5586C12.876 21.5632 12.6239 21.5546 11.7802 21.5181ZM18.302 10.7243C18.3023 10.9142 18.3589 11.0997 18.4647 11.2574C18.5704 11.4151 18.7206 11.5379 18.8962 11.6102C19.0717 11.6826 19.2648 11.7013 19.4509 11.6639C19.6371 11.6265 19.808 11.5348 19.942 11.4003C20.0761 11.2657 20.1672 11.0945 20.2039 10.9082C20.2406 10.7219 20.2212 10.5289 20.1482 10.3536C20.0752 10.1783 19.9518 10.0286 19.7938 9.92343C19.6357 9.81824 19.4499 9.7623 19.2601 9.76268C19.0055 9.76319 18.7616 9.86478 18.5819 10.0451C18.4022 10.2254 18.3015 10.4697 18.302 10.7243ZM10.8923 15.008C10.8968 17.2768 12.7394 19.1118 15.0077 19.1075C17.276 19.1032 19.1124 17.2608 19.1081 14.992C19.1037 12.7232 17.2607 10.8876 14.992 10.8921C12.7234 10.8966 10.888 12.7395 10.8923 15.008ZM12.3333 15.0051C12.3323 14.4777 12.4876 13.9618 12.7798 13.5227C13.072 13.0835 13.4878 12.7409 13.9746 12.5381C14.4615 12.3353 14.9976 12.2814 15.5151 12.3833C16.0326 12.4852 16.5083 12.7382 16.882 13.1104C17.2556 13.4826 17.5106 13.9573 17.6145 14.4744C17.7184 14.9915 17.6667 15.5278 17.4658 16.0155C17.2649 16.5031 16.9239 16.9203 16.486 17.2142C16.048 17.5081 15.5327 17.6655 15.0053 17.6665C14.6551 17.6673 14.3082 17.599 13.9844 17.4657C13.6605 17.3323 13.3661 17.1365 13.118 16.8893C12.8699 16.6422 12.6729 16.3486 12.5382 16.0253C12.4036 15.702 12.334 15.3553 12.3333 15.0051Z"
      fill="#303030"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.7174 12.1809H16.1854V10.5203C16.1854 9.89663 16.5987 9.75123 16.8898 9.75123C17.1803 9.75123 18.6766 9.75123 18.6766 9.75123V7.0096L16.2159 7C13.4842 7 12.8625 9.04479 12.8625 10.3533V12.1809H11.2827V15.006H12.8625C12.8625 18.6315 12.8625 23 12.8625 23H16.1854C16.1854 23 16.1854 18.5885 16.1854 15.006H18.4276L18.7174 12.1809Z"
      fill="#303030"
    />
  </svg>
);

const YoutubeIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M26.5345 12.6389C26.5864 11.1584 26.2582 9.68898 25.5805 8.36707C25.1206 7.82466 24.4825 7.45862 23.7772 7.33273C20.86 7.07159 17.9307 6.96455 15.0019 7.01208C12.0837 6.96239 9.16498 7.06597 6.25801 7.32239C5.68329 7.42553 5.15142 7.69148 4.72731 8.0878C3.78373 8.9463 3.67889 10.4151 3.57405 11.6563C3.42193 13.8879 3.42193 16.1272 3.57405 18.3588C3.60438 19.0574 3.70981 19.7509 3.88857 20.4275C4.01499 20.9499 4.27075 21.4332 4.63295 21.8342C5.05994 22.2515 5.6042 22.5326 6.19511 22.641C8.45542 22.9162 10.7329 23.0303 13.0099 22.9823C16.6793 23.034 19.898 22.9823 23.7038 22.6927C24.3092 22.591 24.8688 22.3095 25.3079 21.8859C25.6014 21.5962 25.8206 21.2416 25.9474 20.8516C26.3224 19.7165 26.5065 18.5286 26.4926 17.3348C26.5345 16.7556 26.5345 13.2595 26.5345 12.6389ZM12.6324 17.9554V11.5528L18.8391 14.7696C17.0987 15.7212 14.8027 16.797 12.6324 17.9554Z"
      fill="#303030"
    />
  </svg>
);

const XIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.524 13.7756L22.481 7H21.0696L15.8948 12.882L11.7647 7H7L13.2469 15.8953L7 23H8.41143L13.8728 16.787L18.2353 23H23L16.524 13.7756ZM14.5902 15.9734L13.9563 15.0871L8.92043 8.04117H11.0887L15.154 13.7296L15.7852 14.6159L21.0689 22.0096H18.9006L14.5902 15.9734Z"
      fill="#303030"
    />
  </svg>
);

async function getRecentProjects() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "projects",
      limit: 6,
      sort: "-createdAt",
      depth: 0,
      select: { name: true, slug: true },
    });
    return result.docs.filter((p) => p.slug);
  } catch {
    return [];
  }
}

async function getContactDetails() {
  try {
    const payload = await getPayload({ config });
    const data = await payload.findGlobal({ slug: "contact-page", depth: 0 });
    return data?.contactDetails || {};
  } catch {
    return {};
  }
}

async function getTestimonials() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "testimonials",
      limit: 100,
    });
    return result.docs;
  } catch {
    return [];
  }
}

export default async function Footer() {
  const [projects, contactDetails, testimonials] = await Promise.all([
    getRecentProjects(),
    getContactDetails(),
    getTestimonials(),
  ]);

  const phone =
    contactDetails.phone ||
    process.env.NEXT_PUBLIC_BUSINESS_PHONE ||
    "+91 94038 93898";
  const address = contactDetails.address || "84, TPK Road, Andalpuram, Madurai";

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Our Impact", href: "/community" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles["footer__container"]}>
        <div className={styles["footer_links-columns"]}>
          <div className={styles["footer__logo"]}>
            <Link href="/" aria-label="Visvas Properties home">
              <Logo />
            </Link>
          </div>

          <div className={styles["footer__projects-column"]}>
            <h3
              className={`${styles["footer__projects-heading"]} gtm-tracking`}
            >
              Recent Projects
            </h3>
            <ul className={styles["footer__projects-list"]}>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <li
                    key={project.id}
                    className={styles["footer__projects-item"]}
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      className={styles["footer__projects-link"]}
                    >
                      {project.name}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li className={styles["footer__projects-item"]}>
                    <span className={styles["footer__projects-link"]}>
                      Ajita
                    </span>
                  </li>
                  <li className={styles["footer__projects-item"]}>
                    <span className={styles["footer__projects-link"]}>
                      Amita
                    </span>
                  </li>
                  <li className={styles["footer__projects-item"]}>
                    <span className={styles["footer__projects-link"]}>
                      Vidhatri
                    </span>
                  </li>
                  <li className={styles["footer__projects-item"]}>
                    <span className={styles["footer__projects-link"]}>
                      Agrini
                    </span>
                  </li>
                  <li className={styles["footer__projects-item"]}>
                    <span className={styles["footer__projects-link"]}>
                      Vajra
                    </span>
                  </li>
                  <li className={styles["footer__projects-item"]}>
                    <span className={styles["footer__projects-link"]}>
                      Vasughara
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className={styles["footer__quick-links-column"]}>
            <h3
              className={`${styles["footer__quick-links-heading"]} gtm-tracking`}
            >
              Quick links
            </h3>
            <ul className={styles["footer__quick-links-list"]}>
              {quickLinks.map((link) => (
                <li
                  key={link.href}
                  className={styles["footer__quick-links-item"]}
                >
                  <Link
                    href={link.href}
                    className={styles["footer__quick-links-link"]}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles["footer__contact"]}>
            <div className={styles["footer__contact-info"]}>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className={styles["footer__contact-phone"]}
              >
                {phone}
              </a>
              <p className={styles["footer__contact-address"]}>{address}</p>
            </div>
            <div className={styles["footer__social"]}>
              <a
                href="#"
                aria-label="LinkedIn"
                className={styles["footer__social-icon"]}
              >
                <LinkedinIcon />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className={styles["footer__social-icon"]}
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className={styles["footer__social-icon"]}
              >
                <FacebookIcon />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className={styles["footer__social-icon"]}
              >
                <YoutubeIcon />
              </a>
              <a
                href="#"
                aria-label="X (Twitter)"
                className={styles["footer__social-icon"]}
              >
                <XIcon />
              </a>
            </div>
          </div>
        </div>

        {testimonials.length > 0 && (
          <div className={styles["footer__testimonials"]}>
            <h3 className={`${styles["footer__testimonials-heading"]} gtm-tracking`}>
              Testimonials
            </h3>
            <div className={styles["footer__testimonials-grid"]}>
              {testimonials.map((testimonial) => (
                <Testimonial
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>
        )}

        <div className={styles["footer__bottom"]}>
          <p className={styles["footer__copyright"]}>
            &copy; 2024 Copyrights Visvas promoters
          </p>
          <p className={styles["footer__credit"]}>
            Made by{" "}
            <a
              href="https://madarth.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles["footer__credit-link"]}
            >
              Madarth
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
