"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEnquiryModal } from "@/app/(frontend)/components/enquiry-modal/EnquiryModalProvider";
import { MobileLogo, DesktopLogo } from "./Logo";
import styles from "./Header.module.scss";

const Hamburger = ({ isOpen }) => (
  <div
    className={`${styles["header__hamburger"]} ${isOpen ? styles["header__hamburger--open"] : ""}`}
  >
    <span></span>
    <span></span>
    <span></span>
  </div>
);

export default function Header({ phone = "+91 95432 24411" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDrawerProjectsOpen, setIsDrawerProjectsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navRef = useRef(null);
  const pathname = usePathname();
  const { openEnquiryModal } = useEnquiryModal();

  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.classList.add("open-menu");
      document.body.classList.add("open-menu");
    } else {
      document.documentElement.classList.remove("open-menu");
      document.body.classList.remove("open-menu");
      setIsDrawerProjectsOpen(false);
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
        setIsDrawerProjectsOpen(false);
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
            href={`tel:${String(phone).replace(/\s/g, "")}`}
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
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Ongoing Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/projects/completed"
                      className={styles["header__dropdown-link"]}
                      onClick={() => setIsDropdownOpen(false)}
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
              <a
                href="/contact"
                className={styles["header__cta"]}
                onClick={(e) => {
                  e.preventDefault();
                  openEnquiryModal();
                }}
              >
                Enquiry Now
              </a>
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
              onClick={() => setIsDrawerProjectsOpen(!isDrawerProjectsOpen)}
              aria-expanded={isDrawerProjectsOpen}
              className={styles["header__drawer-toggle"]}
            >
              Projects
              <svg
                className={`${styles["header__dropdown-icon"]} ${isDrawerProjectsOpen ? styles["header__dropdown-icon--open"] : ""}`}
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
            {isDrawerProjectsOpen && (
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
                      setIsDrawerProjectsOpen(false);
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
                      setIsDrawerProjectsOpen(false);
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
