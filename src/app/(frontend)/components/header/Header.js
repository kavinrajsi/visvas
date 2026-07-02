"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Header.module.scss";

const MobileLogo = () => (
  <svg
    width="215"
    height="76"
    viewBox="0 0 215 76"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M34.0281 0L0 76H214.75L180.722 0L34.0281 0Z" fill="#F5F3EB" />
    <g clipPath="url(#clip0_880_4494)">
      <path
        d="M51.5439 23L40.8927 53H70.9419L60.2907 23H51.5439Z"
        fill="#1B5E30"
      />
      <path
        d="M63.4392 23L55.9158 33.1244L48.3954 23H40.875V25.5958H42.803L55.9158 43.2489L69.0316 25.5958H70.9596V23H63.4392Z"
        fill="#E09C26"
      />
      <path
        d="M106.663 29.8674V28.9355H99.9769V29.888C100.702 29.9115 101.787 30.3113 101.79 31.5637C101.814 31.8047 101.84 44.1105 101.837 44.7072C101.825 45.8802 100.655 46.3447 99.9799 46.3888V47.3207H106.666V46.3682C105.941 46.3447 104.856 45.9449 104.853 44.6925C104.829 44.4515 104.803 32.1457 104.806 31.549C104.818 30.376 105.988 29.9115 106.663 29.8674Z"
        fill="#1B5E30"
      />
      <path
        d="M121.061 37.9133C120.091 37.1372 115.103 35.0559 114.077 34.0416C113.063 33.0392 112.998 31.5517 113.88 30.4875C115.103 29.0118 118.791 28.7384 119.988 31.0343C120.2 31.4429 120.363 31.8751 120.536 32.3013H121.465L121.341 29.2411C121.232 29.1587 119.531 28.7531 118.824 28.6443C116.91 28.3533 115.03 28.4297 113.261 29.291C111.539 30.1289 110.407 31.4047 110.263 33.3479C110.124 35.244 111.032 36.6169 112.662 37.5311C113.697 38.1102 117.936 39.9505 118.726 40.7589C119.814 41.8702 120.1 43.6017 119.328 44.7981C118.334 46.4209 116.577 46.8971 114.685 46.6502C113.01 46.4179 111.855 45.1921 111.569 43.8868C111.465 43.5194 111.392 43.1401 111.297 42.7727H109.988V45.9241C110.888 46.5855 112.55 47.2146 113.918 47.4321C116.229 47.6791 118.791 47.391 120.808 45.7624C123.399 43.6693 123.567 39.9241 121.058 37.9133H121.061Z"
        fill="#1B5E30"
      />
      <path
        d="M172.086 37.9133C171.116 37.1372 166.128 35.0559 165.102 34.0416C164.088 33.0392 164.023 31.5517 164.904 30.4875C166.128 29.0118 169.816 28.7384 171.012 31.0343C171.225 31.4429 171.387 31.8751 171.561 32.3013H172.489L172.366 29.2411C172.257 29.1587 170.556 28.7531 169.848 28.6443C167.935 28.3533 166.054 28.4297 164.285 29.291C162.563 30.1289 161.431 31.4047 161.287 33.3479C161.148 35.244 162.056 36.6169 163.687 37.5311C164.721 38.1102 168.961 39.9505 169.751 40.7589C170.839 41.8702 171.125 43.6017 170.352 44.7981C169.359 46.4209 167.602 46.8971 165.709 46.6502C164.035 46.4179 162.879 45.1921 162.593 43.8868C162.49 43.5194 162.416 43.1401 162.322 42.7727H161.013V45.9241C161.912 46.5855 163.575 47.2146 164.943 47.4321C167.254 47.6791 169.816 47.391 171.832 45.7624C174.423 43.6693 174.591 39.9241 172.083 37.9133H172.086Z"
        fill="#1B5E30"
      />
      <path
        d="M95.2247 28.9204C95.2247 28.9204 89.7178 42.3815 89.3965 43.1487H89.2137C89.0368 42.7401 83.4533 28.9204 83.4533 28.9204H78.5154V29.8641C79.5825 29.9229 80.405 30.4608 80.7617 31.3339C81.0182 31.966 85.4078 42.3138 87.3299 47.3232H88.9838C89.3228 46.2149 93.5974 35.9405 95.4606 31.4839C95.8527 30.549 96.4511 29.914 97.5478 29.8788V28.9204H95.2247Z"
        fill="#1B5E30"
      />
      <path
        d="M141.069 28.9204C141.069 28.9204 135.563 42.3815 135.241 43.1487H135.058C134.882 42.7401 129.298 28.9204 129.298 28.9204H124.36V29.8641C125.427 29.9229 126.25 30.4608 126.606 31.3339C126.863 31.966 131.253 42.3138 133.175 47.3232H134.828C135.167 46.2149 139.442 35.9405 141.305 31.4839C141.697 30.549 142.296 29.914 143.392 29.8788V28.9204H141.069Z"
        fill="#1B5E30"
      />
      <path
        d="M156.883 44.9096C156.626 44.2776 152.237 33.9297 150.314 28.9204H148.661C148.322 30.0287 144.047 40.3031 142.184 44.7597C141.792 45.6945 141.193 46.3295 140.097 46.3648V47.3232H142.42C142.42 47.3232 143.714 44.1629 145.082 40.8146H151.558C152.912 44.16 154.188 47.3232 154.188 47.3232H159.126V46.3795C158.059 46.3207 157.236 45.7827 156.88 44.9096H156.883ZM145.545 39.6828C146.848 36.4961 148.098 33.4476 148.245 33.0948H148.428C148.51 33.2859 149.775 36.4109 151.102 39.6828H145.545Z"
        fill="#1B5E30"
      />
      <path
        d="M151.927 27.4243H147.045V26.5864H151.927V27.4243Z"
        fill="#1B5E30"
      />
    </g>
    <defs>
      <clipPath id="clip0_880_4494">
        <rect
          width="133"
          height="30"
          fill="white"
          transform="translate(40.875 23)"
        />
      </clipPath>
    </defs>
  </svg>
);

const DesktopLogo = () => (
  <svg
    width="276"
    height="86"
    viewBox="0 0 276 86"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M34.0281 0L0 86H276L241.972 0H34.0281Z" fill="#F5F3EB" />
    <g clipPath="url(#clip0_2015_1856)">
      <path
        d="M64.1985 23L50.0236 63H90.0138L75.8389 23H64.1985Z"
        fill="#1B5E30"
      />
      <path
        d="M80.029 23L70.0167 36.4993L60.0084 23H50V26.461H52.5658L70.0167 49.9985L87.4715 26.461H90.0373V23H80.029Z"
        fill="#E09C26"
      />
      <path
        d="M137.552 32.1563V30.9138H128.654V32.1837C129.62 32.2151 131.063 32.7482 131.067 34.4179C131.099 34.7393 131.134 51.147 131.13 51.9427C131.114 53.5066 129.557 54.1259 128.658 54.1847V55.4272H137.556V54.1573C136.591 54.1259 135.147 53.5928 135.144 51.9231C135.112 51.6017 135.077 35.194 135.081 34.3983C135.096 32.8344 136.654 32.2151 137.552 32.1563Z"
        fill="#1B5E30"
      />
      <path
        d="M156.714 42.8844C155.423 41.8496 148.785 39.0745 147.42 37.7222C146.07 36.3856 145.984 34.4023 147.157 32.9833C148.785 31.0157 153.693 30.6512 155.286 33.7124C155.568 34.2572 155.784 34.8334 156.016 35.4018H157.251L157.087 31.3214C156.942 31.2117 154.678 30.6708 153.736 30.5257C151.19 30.1377 148.687 30.2396 146.333 31.388C144.042 32.5051 142.535 34.2063 142.343 36.7972C142.158 39.3253 143.367 41.1558 145.536 42.3748C146.914 43.147 152.555 45.6007 153.607 46.6786C155.054 48.1602 155.435 50.4689 154.407 52.0642C153.085 54.2278 150.747 54.8628 148.228 54.5336C145.999 54.2239 144.461 52.5894 144.081 50.8491C143.944 50.3591 143.846 49.8535 143.72 49.3636H141.978V53.5654C143.175 54.4473 145.387 55.2861 147.208 55.5762C150.284 55.9054 153.693 55.5213 156.377 53.3498C159.825 50.559 160.049 45.5654 156.71 42.8844H156.714Z"
        fill="#1B5E30"
      />
      <path
        d="M224.619 42.8844C223.328 41.8496 216.69 39.0745 215.324 37.7222C213.975 36.3856 213.888 34.4023 215.061 32.9833C216.69 31.0157 221.598 30.6512 223.19 33.7124C223.473 34.2572 223.689 34.8334 223.92 35.4018H225.156L224.991 31.3214C224.846 31.2117 222.582 30.6708 221.641 30.5257C219.094 30.1377 216.591 30.2396 214.237 31.388C211.946 32.5051 210.44 34.2063 210.247 36.7972C210.063 39.3253 211.271 41.1558 213.441 42.3748C214.818 43.147 220.46 45.6007 221.511 46.6786C222.959 48.1602 223.34 50.4689 222.312 52.0642C220.989 54.2278 218.651 54.8628 216.132 54.5336C213.904 54.2239 212.366 52.5894 211.985 50.8491C211.848 50.3591 211.75 49.8535 211.625 49.3636H209.883V53.5654C211.079 54.4473 213.292 55.2861 215.112 55.5762C218.188 55.9054 221.598 55.5213 224.281 53.3498C227.73 50.559 227.953 45.5654 224.615 42.8844H224.619Z"
        fill="#1B5E30"
      />
      <path
        d="M122.33 30.8942C122.33 30.8942 115.001 48.8422 114.574 49.8653H114.33C114.095 49.3204 106.664 30.8942 106.664 30.8942H100.093V32.1524C101.513 32.2308 102.608 32.9481 103.082 34.1122C103.424 34.9549 109.265 48.7521 111.823 55.4312H114.024C114.476 53.9535 120.164 40.2543 122.644 34.3121C123.166 33.0657 123.962 32.219 125.422 32.172V30.8942H122.33Z"
        fill="#1B5E30"
      />
      <path
        d="M183.341 30.8942C183.341 30.8942 176.013 48.8422 175.585 49.8653H175.342C175.106 49.3204 167.676 30.8942 167.676 30.8942H161.104V32.1524C162.524 32.2308 163.619 32.9481 164.094 34.1122C164.435 34.9549 170.277 48.7521 172.835 55.4312H175.036C175.487 53.9535 181.176 40.2543 183.655 34.3121C184.177 33.0657 184.974 32.219 186.433 32.172V30.8942H183.341Z"
        fill="#1B5E30"
      />
      <path
        d="M204.386 52.2131C204.045 51.3704 198.203 37.5733 195.645 30.8942H193.444C192.993 32.3719 187.304 46.071 184.824 52.0132C184.303 53.2597 183.506 54.1063 182.047 54.1534V55.4312H185.138C185.138 55.4312 186.861 51.2175 188.681 46.7531H197.301C199.101 51.2136 200.8 55.4312 200.8 55.4312H207.372V54.173C205.951 54.0946 204.857 53.3773 204.382 52.2131H204.386ZM189.297 45.244C191.031 40.9951 192.695 36.9304 192.891 36.4601H193.134C193.244 36.7148 194.927 40.8814 196.692 45.244H189.297Z"
        fill="#1B5E30"
      />
      <path
        d="M197.791 28.8991H191.294V27.782H197.791V28.8991Z"
        fill="#1B5E30"
      />
    </g>
    <defs>
      <clipPath id="clip0_2015_1856">
        <rect
          width="177"
          height="40"
          fill="white"
          transform="translate(50 23)"
        />
      </clipPath>
    </defs>
  </svg>
);

const Hamburger = ({ isOpen }) => (
  <div
    className={`${styles["header__hamburger"]} ${isOpen ? styles["header__hamburger--open"] : ""}`}
  >
    <span></span>
    <span></span>
    <span></span>
  </div>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.classList.add("open-menu");
      document.body.classList.add("open-menu");
    } else {
      document.documentElement.classList.remove("open-menu");
      document.body.classList.remove("open-menu");
    }

    return () => {
      document.documentElement.classList.remove("open-menu");
      document.body.classList.remove("open-menu");
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const isActive = (href) => pathname === href;

  return (
    <>
      <header className={styles.header}>
        {/* Mobile Bar */}
        <div className={styles["header__mobile-bar"]}>
          <button
            className={styles["header__hamburger-btn"]}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            <Hamburger isOpen={isMenuOpen} />
          </button>

          <Link href="/" className={styles["header__logo--mobile"]}>
            <MobileLogo />
          </Link>

          <a
            href="tel:+919543224411"
            className={styles["header__phone-icon"]}
            aria-label="Call"
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.3952 21.1277C25.1707 21.1277 23.9684 20.9362 22.8291 20.5597C22.2708 20.3693 21.5845 20.544 21.2438 20.8939L18.995 22.5915C16.387 21.1994 14.7806 19.5934 13.4074 17.0051L15.0551 14.8148C15.4832 14.3873 15.6367 13.7629 15.4528 13.1769C15.0746 12.0316 14.8826 10.8299 14.8826 9.6049C14.8826 8.71995 14.1627 8 13.2778 8H9.60484C8.71995 8 8 8.71995 8 9.60484C8 19.7481 16.252 28 26.3952 28C27.2801 28 28.0001 27.2801 28.0001 26.3952V22.7325C28 21.8477 27.2801 21.1277 26.3952 21.1277Z"
                fill="white"
              />
            </svg>
          </a>
        </div>

        {/* Desktop Nav */}
        <div className={styles["header__desktop-nav"]}>
          {/* Left menu */}
          <ul
            className={`${styles["header__nav-list"]} ${styles["header__nav-list--left"]}`}
          >
            <li className={styles["header__nav-item"]}>
              <Link
                href="/"
                className={
                  isActive("/") ? styles["header__nav-link--active"] : ""
                }
              >
                Home
              </Link>
            </li>
            <li ref={dropdownRef} className={styles["header__nav-item"]}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
                className={styles["header__nav-link"]}
              >
                Projects
                <svg
                  className={`${styles["header__dropdown-icon"]} ${isDropdownOpen ? styles["header__dropdown-icon--open"] : ""}`}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 6L8 11L13 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <ul className={styles["header__dropdown"]}>
                  <li>
                    <Link
                      href="/projects/ongoing"
                      className={styles["header__dropdown-link"]}
                    >
                      Ongoing Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/projects/completed"
                      className={styles["header__dropdown-link"]}
                    >
                      Completed Projects
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className={styles["header__nav-item"]}>
              <Link
                href="/about"
                className={
                  isActive("/about") ? styles["header__nav-link--active"] : ""
                }
              >
                About
              </Link>
            </li>
            <li className={styles["header__nav-item"]}>
              <Link
                href="/community"
                className={
                  isActive("/community")
                    ? styles["header__nav-link--active"]
                    : ""
                }
              >
                Community
              </Link>
            </li>
          </ul>

          {/* Center logo */}
          <Link href="/" className={styles["header__logo"]}>
            <DesktopLogo />
          </Link>

          {/* Right menu */}
          <ul
            className={`${styles["header__nav-list"]} ${styles["header__nav-list--right"]}`}
          >
            <li className={styles["header__nav-item"]}>
              <Link
                href="/blog"
                className={
                  isActive("/blog") ? styles["header__nav-link--active"] : ""
                }
              >
                Blog
              </Link>
            </li>
            <li className={styles["header__nav-item"]}>
              <Link
                href="/contact"
                className={
                  isActive("/contact") ? styles["header__nav-link--active"] : ""
                }
              >
                Contact
              </Link>
            </li>
            <li className={styles["header__nav-item"]}>
              <Link href="/contact" className={styles["header__cta"]}>Enquiry Now</Link>
            </li>
          </ul>
        </div>
      </header>

      {/* Mobile Drawer */}
      <nav
        className={`${styles["header__drawer"]} ${isMenuOpen ? styles["header__drawer--open"] : ""}`}
        ref={navRef}
      >
        <ul className={styles["header__drawer-menu"]}>
          <li className={styles["header__drawer-item"]}>
            <Link
              href="/"
              className={
                isActive("/") ? styles["header__nav-link--active"] : ""
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className={styles["header__drawer-item"]}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
              className={styles["header__drawer-toggle"]}
            >
              Projects
              <svg
                className={`${styles["header__dropdown-icon"]} ${isDropdownOpen ? styles["header__dropdown-icon--open"] : ""}`}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 6L8 11L13 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <ul className={styles["header__drawer-submenu"]}>
                <li className={styles["header__drawer-item"]}>
                  <Link
                    href="/projects/ongoing"
                    className={
                      isActive("/projects/ongoing")
                        ? styles["header__nav-link--active"]
                        : ""
                    }
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Ongoing Projects
                  </Link>
                </li>
                <li className={styles["header__drawer-item"]}>
                  <Link
                    href="/projects/completed"
                    className={
                      isActive("/projects/completed")
                        ? styles["header__nav-link--active"]
                        : ""
                    }
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Completed Projects
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className={styles["header__drawer-item"]}>
            <Link
              href="/about"
              className={
                isActive("/about") ? styles["header__nav-link--active"] : ""
              }
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li className={styles["header__drawer-item"]}>
            <Link
              href="/community"
              className={
                isActive("/community") ? styles["header__nav-link--active"] : ""
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
          </li>
          <li className={styles["header__drawer-item"]}>
            <Link
              href="/blog"
              className={
                isActive("/blog") ? styles["header__nav-link--active"] : ""
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
          </li>
          <li className={styles["header__drawer-item"]}>
            <Link
              href="/contact"
              className={
                isActive("/contact") ? styles["header__nav-link--active"] : ""
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
        {/* mobile header social icon */}
        <ul className={styles["header__drawer-social"]}>
          <li className={styles["header__drawer-social-item"]}>
            <a href="https://www.instagram.com/visvas_promoters_madurai/" className={styles["header__drawer-social-link"]}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.408 4.152C18.1232 4.152 17.8448 4.23645 17.608 4.39468C17.3712 4.55291 17.1866 4.77781 17.0776 5.04094C16.9686 5.30406 16.9401 5.5936 16.9957 5.87293C17.0512 6.15226 17.1884 6.40885 17.3898 6.61023C17.5912 6.81162 17.8477 6.94877 18.1271 7.00433C18.4064 7.05989 18.6959 7.03138 18.9591 6.92239C19.2222 6.8134 19.4471 6.62883 19.6053 6.39202C19.7635 6.15521 19.848 5.87681 19.848 5.592C19.848 5.21009 19.6963 4.84382 19.4262 4.57377C19.1562 4.30371 18.7899 4.152 18.408 4.152ZM23.928 7.056C23.9047 6.06036 23.7182 5.07528 23.376 4.14C23.0709 3.33976 22.596 2.61513 21.984 2.016C21.3898 1.40091 20.6635 0.929012 19.86 0.636C18.9272 0.283393 17.941 0.092652 16.944 0.0719999C15.672 -6.70552e-08 15.264 0 12 0C8.736 0 8.328 -6.70552e-08 7.056 0.0719999C6.05898 0.092652 5.07281 0.283393 4.14 0.636C3.33801 0.931978 2.61232 1.40347 2.016 2.016C1.40091 2.61021 0.929012 3.33653 0.636 4.14C0.283393 5.07281 0.092652 6.05898 0.0719999 7.056C-6.70552e-08 8.328 0 8.736 0 12C0 15.264 -6.70552e-08 15.672 0.0719999 16.944C0.092652 17.941 0.283393 18.9272 0.636 19.86C0.929012 20.6635 1.40091 21.3898 2.016 21.984C2.61232 22.5965 3.33801 23.068 4.14 23.364C5.07281 23.7166 6.05898 23.9073 7.056 23.928C8.328 24 8.736 24 12 24C15.264 24 15.672 24 16.944 23.928C17.941 23.9073 18.9272 23.7166 19.86 23.364C20.6635 23.071 21.3898 22.5991 21.984 21.984C22.5987 21.3871 23.074 20.6618 23.376 19.86C23.7182 18.9247 23.9047 17.9396 23.928 16.944C23.928 15.672 24 15.264 24 12C24 8.736 24 8.328 23.928 7.056ZM21.768 16.8C21.7593 17.5617 21.6213 18.3164 21.36 19.032C21.1684 19.5542 20.8607 20.0261 20.46 20.412C20.0708 20.8086 19.5999 21.1157 19.08 21.312C18.3644 21.5733 17.6097 21.7113 16.848 21.72C15.648 21.78 15.204 21.792 12.048 21.792C8.892 21.792 8.448 21.792 7.248 21.72C6.45707 21.7348 5.66951 21.613 4.92 21.36C4.42294 21.1537 3.97363 20.8473 3.6 20.46C3.20171 20.0745 2.89781 19.6022 2.712 19.08C2.41903 18.3542 2.25653 17.5823 2.232 16.8C2.232 15.6 2.16 15.156 2.16 12C2.16 8.844 2.16 8.4 2.232 7.2C2.23738 6.42127 2.37954 5.64953 2.652 4.92C2.86326 4.41349 3.18752 3.96199 3.6 3.6C3.96458 3.1874 4.41515 2.85971 4.92 2.64C5.65146 2.37605 6.4224 2.2381 7.2 2.232C8.4 2.232 8.844 2.16 12 2.16C15.156 2.16 15.6 2.16 16.8 2.232C17.5617 2.24074 18.3164 2.3787 19.032 2.64C19.5773 2.84238 20.0668 3.17142 20.46 3.6C20.8532 3.96861 21.1605 4.41928 21.36 4.92C21.6267 5.65072 21.7647 6.42214 21.768 7.2C21.828 8.4 21.84 8.844 21.84 12C21.84 15.156 21.828 15.6 21.768 16.8ZM12 5.844C10.783 5.84637 9.59396 6.20943 8.58319 6.8873C7.57242 7.56517 6.78525 8.52744 6.32116 9.6525C5.85707 10.7776 5.73687 12.015 5.97575 13.2083C6.21464 14.4017 6.80188 15.4974 7.66329 16.3572C8.5247 17.2169 9.62161 17.802 10.8154 18.0386C12.0092 18.2751 13.2464 18.1525 14.3706 17.6862C15.4947 17.22 16.4555 16.4309 17.1314 15.4188C17.8073 14.4068 18.168 13.217 18.168 12C18.1696 11.1901 18.011 10.3879 17.7015 9.63955C17.3919 8.89117 16.9375 8.21137 16.3642 7.63926C15.791 7.06715 15.1103 6.61401 14.3614 6.30592C13.6124 5.99782 12.8099 5.84084 12 5.844ZM12 15.996C11.2097 15.996 10.4371 15.7616 9.77994 15.3226C9.1228 14.8835 8.61063 14.2594 8.30818 13.5292C8.00573 12.799 7.9266 11.9956 8.08078 11.2204C8.23497 10.4453 8.61555 9.73325 9.1744 9.1744C9.73325 8.61555 10.4453 8.23497 11.2204 8.08078C11.9956 7.9266 12.799 8.00573 13.5292 8.30818C14.2594 8.61063 14.8835 9.1228 15.3226 9.77994C15.7616 10.4371 15.996 11.2097 15.996 12C15.996 12.5248 15.8926 13.0444 15.6918 13.5292C15.491 14.014 15.1967 14.4545 14.8256 14.8256C14.4545 15.1967 14.014 15.491 13.5292 15.6918C13.0444 15.8926 12.5248 15.996 12 15.996Z"
                  fill="#2A2A29"
                />
              </svg>
            </a>
          </li>

          <li className={styles["header__drawer-social-item"]}>
            <a href="https://www.facebook.com/visvaspromoters/" className={styles["header__drawer-social-link"]}>
              <svg
                width="13"
                height="24"
                viewBox="0 0 13 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.6477 3.98403H13V0.168036C11.8611 0.0544523 10.7168 -0.00162514 9.5717 3.58369e-05C6.16843 3.58369e-05 3.84119 1.99203 3.84119 5.64003V8.78402H0V13.056H3.84119V24H8.44562V13.056H12.2743L12.8499 8.78402H8.44562V6.06003C8.44562 4.80003 8.79596 3.98403 10.6477 3.98403Z"
                  fill="#2A2A29"
                />
              </svg>
            </a>
          </li>
          <li className={styles["header__drawer-social-item"]}>
            <a href="https://www.youtube.com/@visvaspromoters" className={styles["header__drawer-social-link"]}>
              <svg
                width="35"
                height="24"
                viewBox="0 0 35 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M34.9919 8.45835C35.0706 6.2376 34.5729 4.03347 33.5451 2.05061C32.8478 1.23699 31.88 0.68793 30.8105 0.499095C26.3866 0.107378 21.9444 -0.0531743 17.503 0.0181268C13.0777 -0.0564105 8.65151 0.0989608 4.24317 0.483581C3.37161 0.638292 2.56505 1.03723 1.9219 1.6317C0.490988 2.91945 0.331998 5.1226 0.173007 6.98442C-0.057669 10.3319 -0.057669 13.6907 0.173007 17.0382C0.219003 18.0861 0.37889 19.1263 0.649979 20.1412C0.841682 20.9249 1.22954 21.6498 1.77881 22.2513C2.42633 22.8773 3.25168 23.2989 4.14777 23.4615C7.57547 23.8744 11.0292 24.0455 14.4822 23.9735C20.0468 24.0511 24.9278 23.9735 30.6992 23.5391C31.6173 23.3865 32.4659 22.9643 33.1318 22.3289C33.5769 21.8943 33.9093 21.3624 34.1016 20.7774C34.6702 19.0748 34.9495 17.2928 34.9283 15.5022C34.9919 14.6334 34.9919 9.38926 34.9919 8.45835ZM13.9098 16.4331V6.82927L23.322 11.6545C20.6828 13.0819 17.2009 14.6954 13.9098 16.4331Z"
                  fill="#2A2A29"
                />
              </svg>
            </a>
          </li>
        </ul>
      </nav>

      {/* Mobile Scrim */}
      {isMenuOpen && (
        <div
          className={styles["header__scrim"]}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
