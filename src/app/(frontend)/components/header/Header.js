"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Header.module.scss";

const MobileLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="215"
    height="76"
    fill="none"
    viewBox="0 0 215 76"
  >
    <path fill="#F5F3EB" d="M34.028 0 0 76h214.75L180.722 0H34.028Z" />
    <g clip-path="url(#a)">
      <path fill="#1B5E30" d="M51.544 23 40.893 53h30.049L60.29 23h-8.747Z" />
      <path
        fill="#E09C26"
        d="m63.44 23-7.524 10.124L48.396 23h-7.521v2.596h1.928l13.113 17.653 13.116-17.653h1.928V23h-7.52Z"
      />
      <path
        fill="#1B5E30"
        d="M106.663 29.867v-.931h-6.686v.952c.725.023 1.81.423 1.813 1.676.024.24.05 12.547.047 13.143-.012 1.173-1.182 1.638-1.857 1.682v.932h6.686v-.953c-.725-.023-1.81-.423-1.813-1.675-.024-.241-.05-12.547-.047-13.144.012-1.173 1.182-1.637 1.857-1.682Zm14.398 8.046c-.97-.776-5.958-2.857-6.984-3.871-1.014-1.003-1.079-2.49-.197-3.555 1.223-1.475 4.911-1.749 6.108.547.212.409.375.841.548 1.267h.929l-.124-3.06c-.109-.082-1.81-.488-2.517-.597-1.914-.29-3.794-.214-5.563.647-1.722.838-2.854 2.114-2.998 4.057-.139 1.896.769 3.269 2.399 4.183 1.035.58 5.274 2.42 6.064 3.228 1.088 1.111 1.374 2.843.602 4.04-.994 1.622-2.751 2.098-4.643 1.851-1.675-.232-2.83-1.458-3.116-2.763-.104-.368-.177-.747-.272-1.114h-1.309v3.151c.9.662 2.562 1.29 3.93 1.508 2.311.247 4.873-.041 6.89-1.67 2.591-2.093 2.759-5.838.25-7.849h.003Zm51.025 0c-.97-.776-5.958-2.857-6.984-3.871-1.014-1.003-1.079-2.49-.198-3.555 1.224-1.475 4.912-1.749 6.108.547.213.409.375.841.549 1.267h.928l-.123-3.06c-.109-.082-1.81-.488-2.518-.597-1.913-.29-3.794-.214-5.563.647-1.722.838-2.854 2.114-2.998 4.057-.139 1.896.769 3.269 2.4 4.183 1.034.58 5.274 2.42 6.064 3.228 1.088 1.111 1.374 2.843.601 4.04-.993 1.622-2.75 2.098-4.643 1.851-1.674-.232-2.83-1.458-3.116-2.763-.103-.368-.177-.747-.271-1.114h-1.309v3.151c.899.662 2.562 1.29 3.93 1.508 2.311.247 4.873-.041 6.889-1.67 2.591-2.093 2.759-5.838.251-7.849h.003ZM95.225 28.92s-5.507 13.462-5.828 14.229h-.183c-.177-.409-5.76-14.229-5.76-14.229h-4.939v.944c1.067.059 1.89.597 2.247 1.47.256.632 4.646 10.98 6.568 15.99h1.654c.339-1.11 4.613-11.383 6.477-15.84.392-.935.99-1.57 2.087-1.605v-.959h-2.323Zm45.844 0s-5.506 13.462-5.828 14.229h-.183c-.176-.409-5.76-14.229-5.76-14.229h-4.938v.944c1.067.059 1.89.597 2.246 1.47.257.632 4.647 10.98 6.569 15.99h1.653c.339-1.11 4.614-11.383 6.477-15.84.392-.935.991-1.57 2.087-1.605v-.959h-2.323Zm15.814 15.99c-.257-.632-4.646-10.98-6.569-15.99h-1.653c-.339 1.109-4.614 11.383-6.477 15.84-.392.934-.991 1.57-2.087 1.605v.958h2.323s1.294-3.16 2.662-6.508h6.476c1.354 3.345 2.63 6.508 2.63 6.508h4.938v-.944c-1.067-.058-1.89-.596-2.246-1.47h.003Zm-11.338-5.227c1.303-3.187 2.553-6.235 2.7-6.588h.183c.082.19 1.347 3.316 2.674 6.588h-5.557Zm6.382-12.259h-4.882v-.838h4.882v.838Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M40.875 23h133v30h-133z" />
      </clipPath>
    </defs>
  </svg>
);

const DesktopLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="276"
    height="86"
    fill="none"
    viewBox="0 0 276 86"
  >
    <path fill="#F5F3EB" d="M34.028 0 0 86h276L241.972 0H34.028Z" />
    <g clip-path="url(#a)">
      <path fill="#1B5E30" d="M64.198 23 50.024 63h39.99L75.839 23h-11.64Z" />
      <path
        fill="#E09C26"
        d="M80.029 23 70.017 36.5 60.008 23H50v3.461h2.566l17.45 23.538L87.473 26.46h2.565V23H80.03Z"
      />
      <path
        fill="#1B5E30"
        d="M137.552 32.156v-1.242h-8.898v1.27c.966.031 2.409.564 2.413 2.234.032.321.067 16.729.063 17.525-.016 1.564-1.573 2.183-2.472 2.242v1.242h8.898v-1.27c-.965-.031-2.409-.564-2.412-2.234-.032-.321-.067-16.729-.063-17.525.015-1.564 1.573-2.183 2.471-2.242Zm19.162 10.728c-1.291-1.034-7.929-3.81-9.294-5.162-1.35-1.336-1.436-3.32-.263-4.739 1.628-1.967 6.536-2.332 8.129.73.282.544.498 1.12.73 1.689h1.235l-.164-4.08c-.145-.11-2.409-.651-3.351-.796-2.546-.388-5.049-.286-7.403.862-2.291 1.117-3.798 2.818-3.99 5.41-.185 2.527 1.024 4.358 3.193 5.577 1.378.772 7.019 3.226 8.071 4.304 1.447 1.481 1.828 3.79.8 5.385-1.322 2.164-3.66 2.799-6.179 2.47-2.229-.31-3.767-1.945-4.147-3.685-.137-.49-.235-.995-.361-1.485h-1.742v4.201c1.197.882 3.409 1.721 5.23 2.011 3.076.33 6.485-.055 9.169-2.226 3.448-2.791 3.672-7.785.333-10.466h.004Zm67.905 0c-1.291-1.034-7.929-3.81-9.295-5.162-1.349-1.336-1.436-3.32-.263-4.739 1.629-1.967 6.537-2.332 8.129.73.283.544.499 1.12.73 1.689h1.236l-.165-4.08c-.145-.11-2.409-.651-3.35-.796-2.547-.388-5.05-.286-7.404.862-2.291 1.117-3.797 2.818-3.99 5.41-.184 2.527 1.024 4.358 3.194 5.577 1.377.772 7.019 3.226 8.07 4.304 1.448 1.481 1.829 3.79.801 5.385-1.323 2.164-3.661 2.799-6.18 2.47-2.228-.31-3.766-1.945-4.147-3.685-.137-.49-.235-.995-.36-1.485h-1.742v4.201c1.196.882 3.409 1.721 5.229 2.011 3.076.33 6.486-.055 9.169-2.226 3.449-2.791 3.672-7.785.334-10.466h.004ZM122.33 30.894s-7.329 17.948-7.756 18.971h-.244c-.235-.545-7.666-18.97-7.666-18.97h-6.571v1.257c1.42.079 2.515.796 2.989 1.96.342.843 6.183 14.64 8.741 21.32h2.201c.452-1.479 6.14-15.178 8.62-21.12.522-1.246 1.318-2.093 2.778-2.14v-1.278h-3.092Zm61.011 0s-7.328 17.948-7.756 18.971h-.243c-.236-.545-7.666-18.97-7.666-18.97h-6.572v1.257c1.42.079 2.515.796 2.99 1.96.341.843 6.183 14.64 8.741 21.32h2.201c.451-1.479 6.14-15.178 8.619-21.12.522-1.246 1.319-2.093 2.778-2.14v-1.278h-3.092Zm21.045 21.319c-.341-.843-6.183-14.64-8.741-21.319h-2.201c-.451 1.478-6.14 15.177-8.62 21.12-.521 1.246-1.318 2.092-2.777 2.14v1.277h3.091s1.723-4.213 3.543-8.678h8.62c1.8 4.46 3.499 8.678 3.499 8.678h6.572v-1.258c-1.421-.078-2.515-.796-2.99-1.96h.004Zm-15.089-6.969c1.734-4.249 3.398-8.314 3.594-8.784h.243c.11.255 1.793 4.421 3.558 8.784h-7.395Zm8.494-16.344h-6.497v-1.118h6.497v1.117Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M50 23h177v40H50z" />
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
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.6l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"
              fill="#1B5E30"
            />
          </svg>
        </a>
      </div>

      {/* Mobile Drawer */}
      <nav
        className={`${styles["header__drawer"]} ${isMenuOpen ? styles["header__drawer--open"] : ""}`}
        ref={navRef}
      >
        <ul className={styles["header__drawer-menu"]}>
          <li className={styles["header__drawer-item"]}>
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
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
            <Link href="/about" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
          </li>
          <li className={styles["header__drawer-item"]}>
            <Link href="/community" onClick={() => setIsMenuOpen(false)}>
              Community
            </Link>
          </li>
          <li className={styles["header__drawer-item"]}>
            <Link href="/blog" onClick={() => setIsMenuOpen(false)}>
              Blog
            </Link>
          </li>
          <li className={styles["header__drawer-item"]}>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
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

      {/* Desktop Nav */}
      <nav className={styles["header__desktop-nav"]}>
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
                isActive("/community") ? styles["header__nav-link--active"] : ""
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
            <button className={styles["header__cta"]}>Enquiry</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
