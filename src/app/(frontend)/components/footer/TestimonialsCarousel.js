"use client";

import { useRef, useState, useEffect } from "react";
import Testimonial from "../Testimonial";
import { VideoPlaybackProvider } from "../VideoPlaybackContext";
import styles from "./Footer.module.scss";

export default function TestimonialsCarousel({ testimonials }) {
  const scrollContainerRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  if (testimonials.length === 0) return null;

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const updateScrollState = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollPrev(scrollLeft > 0);
      setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 10);
    };

    updateScrollState();
    container.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      container.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.6 + 24;
    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <VideoPlaybackProvider>
      <div className={styles["footer__testimonials-carousel"]}>
        <div className={styles["footer__testimonials-slider-wrapper"]}>
          <div
            className={styles["footer__testimonials-slider"]}
            ref={scrollContainerRef}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className={styles["footer__testimonials-item"]}
              >
                <Testimonial testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles["footer__testimonials-nav"]}>
          <button
            className={`${styles["footer__testimonials-arrow"]} ${styles["footer__testimonials-arrow--prev"]}`}
            onClick={() => handleScroll("prev")}
            disabled={!canScrollPrev}
            aria-label="Previous testimonials"
          >
            <svg
              width="25"
              height="16"
              viewBox="0 0 25 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_3002_1899"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="25"
                height="16"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M25 8C25 7.76429 24.9059 7.53823 24.7385 7.37155C24.5711 7.20487 24.344 7.11124 24.1072 7.11124H3.04962L8.6689 1.51913C8.75191 1.4365 8.81775 1.3384 8.86268 1.23043C8.9076 1.12247 8.93073 1.00675 8.93073 0.889887C8.93073 0.773025 8.9076 0.657308 8.86268 0.549342C8.81775 0.441376 8.75191 0.343275 8.6689 0.260642C8.58589 0.178008 8.48734 0.11246 8.37889 0.0677387C8.27043 0.0230177 8.15419 0 8.0368 0C7.9194 0 7.80316 0.0230177 7.69471 0.0677387C7.58625 0.11246 7.4877 0.178008 7.40469 0.260642L0.262294 7.37075C0.17915 7.45331 0.113185 7.55139 0.0681764 7.65937C0.0231678 7.76734 0 7.8831 0 8C0 8.1169 0.0231678 8.23266 0.0681764 8.34063C0.113185 8.44861 0.17915 8.54669 0.262294 8.62924L7.40469 15.7394C7.4877 15.822 7.58625 15.8875 7.69471 15.9323C7.80316 15.977 7.9194 16 8.0368 16C8.15419 16 8.27043 15.977 8.37889 15.9323C8.48734 15.8875 8.58589 15.822 8.6689 15.7394C8.75191 15.6567 8.81775 15.5586 8.86268 15.4507C8.9076 15.3427 8.93073 15.227 8.93073 15.1101C8.93073 14.9933 8.9076 14.8775 8.86268 14.7696C8.81775 14.6616 8.75191 14.5635 8.6689 14.4809L3.04962 8.88876H24.1072C24.344 8.88876 24.5711 8.79513 24.7385 8.62845C24.9059 8.46178 25 8.23571 25 8Z"
                  fill="#1E5F2F"
                />
              </mask>
              <g mask="url(#mask0_3002_1899)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M25 8C25 7.76429 24.9059 7.53823 24.7385 7.37155C24.5711 7.20487 24.344 7.11124 24.1072 7.11124H3.04962L8.6689 1.51913C8.75191 1.4365 8.81775 1.3384 8.86268 1.23043C8.9076 1.12247 8.93073 1.00675 8.93073 0.889887C8.93073 0.773025 8.9076 0.657308 8.86268 0.549342C8.81775 0.441376 8.75191 0.343275 8.6689 0.260642C8.58589 0.178008 8.48734 0.11246 8.37889 0.0677387C8.27043 0.0230177 8.15419 0 8.0368 0C7.9194 0 7.80316 0.0230177 7.69471 0.0677387C7.58625 0.11246 7.4877 0.178008 7.40469 0.260642L0.262294 7.37075C0.17915 7.45331 0.113185 7.55139 0.0681764 7.65937C0.0231678 7.76734 0 7.8831 0 8C0 8.1169 0.0231678 8.23266 0.0681764 8.34063C0.113185 8.44861 0.17915 8.54669 0.262294 8.62924L7.40469 15.7394C7.4877 15.822 7.58625 15.8875 7.69471 15.9323C7.80316 15.977 7.9194 16 8.0368 16C8.15419 16 8.27043 15.977 8.37889 15.9323C8.48734 15.8875 8.58589 15.822 8.6689 15.7394C8.75191 15.6567 8.81775 15.5586 8.86268 15.4507C8.9076 15.3427 8.93073 15.227 8.93073 15.1101C8.93073 14.9933 8.9076 14.8775 8.86268 14.7696C8.81775 14.6616 8.75191 14.5635 8.6689 14.4809L3.04962 8.88876H24.1072C24.344 8.88876 24.5711 8.79513 24.7385 8.62845C24.9059 8.46178 25 8.23571 25 8Z"
                  fill="#1E5F2F"
                />
              </g>
            </svg>
          </button>

          <button
            className={`${styles["footer__testimonials-arrow"]} ${styles["footer__testimonials-arrow--next"]}`}
            onClick={() => handleScroll("next")}
            disabled={!canScrollNext}
            aria-label="Next testimonials"
          >
            <svg
              width="25"
              height="16"
              viewBox="0 0 25 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_3002_1903"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="25"
                height="16"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 8C0 7.76429 0.0940628 7.53823 0.261494 7.37155C0.428926 7.20487 0.656015 7.11124 0.892799 7.11124H21.9504L16.3311 1.51913C16.2481 1.4365 16.1822 1.3384 16.1373 1.23043C16.0924 1.12247 16.0693 1.00675 16.0693 0.889887C16.0693 0.773025 16.0924 0.657308 16.1373 0.549342C16.1822 0.441376 16.2481 0.343275 16.3311 0.260642C16.4141 0.178008 16.5127 0.11246 16.6211 0.0677387C16.7296 0.0230177 16.8458 0 16.9632 0C17.0806 0 17.1968 0.0230177 17.3053 0.0677387C17.4138 0.11246 17.5123 0.178008 17.5953 0.260642L24.7377 7.37075C24.8208 7.45331 24.8868 7.55139 24.9318 7.65937C24.9768 7.76734 25 7.8831 25 8C25 8.1169 24.9768 8.23266 24.9318 8.34063C24.8868 8.44861 24.8208 8.54669 24.7377 8.62924L17.5953 15.7394C17.5123 15.822 17.4138 15.8875 17.3053 15.9323C17.1968 15.977 17.0806 16 16.9632 16C16.8458 16 16.7296 15.977 16.6211 15.9323C16.5127 15.8875 16.4141 15.822 16.3311 15.7394C16.2481 15.6567 16.1822 15.5586 16.1373 15.4507C16.0924 15.3427 16.0693 15.227 16.0693 15.1101C16.0693 14.9933 16.0924 14.8775 16.1373 14.7696C16.1822 14.6616 16.2481 14.5635 16.3311 14.4809L21.9504 8.88876H0.892799C0.656015 8.88876 0.428926 8.79513 0.261494 8.62845C0.0940628 8.46178 0 8.23571 0 8Z"
                  fill="#1E5F2F"
                />
              </mask>
              <g mask="url(#mask0_3002_1903)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 8C0 7.76429 0.0940628 7.53823 0.261494 7.37155C0.428926 7.20487 0.656015 7.11124 0.892799 7.11124H21.9504L16.3311 1.51913C16.2481 1.4365 16.1822 1.3384 16.1373 1.23043C16.0924 1.12247 16.0693 1.00675 16.0693 0.889887C16.0693 0.773025 16.0924 0.657308 16.1373 0.549342C16.1822 0.441376 16.2481 0.343275 16.3311 0.260642C16.4141 0.178008 16.5127 0.11246 16.6211 0.0677387C16.7296 0.0230177 16.8458 0 16.9632 0C17.0806 0 17.1968 0.0230177 17.3053 0.0677387C17.4138 0.11246 17.5123 0.178008 17.5953 0.260642L24.7377 7.37075C24.8208 7.45331 24.8868 7.55139 24.9318 7.65937C24.9768 7.76734 25 7.8831 25 8C25 8.1169 24.9768 8.23266 24.9318 8.34063C24.8868 8.44861 24.8208 8.54669 24.7377 8.62924L17.5953 15.7394C17.5123 15.822 17.4138 15.8875 17.3053 15.9323C17.1968 15.977 17.0806 16 16.9632 16C16.8458 16 16.7296 15.977 16.6211 15.9323C16.5127 15.8875 16.4141 15.822 16.3311 15.7394C16.2481 15.6567 16.1822 15.5586 16.1373 15.4507C16.0924 15.3427 16.0693 15.227 16.0693 15.1101C16.0693 14.9933 16.0924 14.8775 16.1373 14.7696C16.1822 14.6616 16.2481 14.5635 16.3311 14.4809L21.9504 8.88876H0.892799C0.656015 8.88876 0.428926 8.79513 0.261494 8.62845C0.0940628 8.46178 0 8.23571 0 8Z"
                  fill="#1E5F2F"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </VideoPlaybackProvider>
  );
}
