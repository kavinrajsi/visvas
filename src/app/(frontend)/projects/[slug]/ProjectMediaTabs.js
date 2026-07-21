"use client";

import Image from "next/image";
import { useState } from "react";
import { toImageKitUrl } from "@/lib/image/imageKitUrl";
import "photoswipe/style.css";
import styles from "./ProjectMediaTabs.module.scss";

// Longest edge served to the lightbox. Originals run as large as 7680x4320, so
// they go through the Next optimiser rather than straight from R2.
const LIGHTBOX_MAX_EDGE = 2048;

// next.config.mjs restricts qualities to [75, 85]; any other value is rejected.
const LIGHTBOX_QUALITY = 85;

// Photos are flat Media objects (images is a hasMany upload), floor plans and
// the old array shape nest theirs one level down.
const resolveMedia = (item) => item?.image || item?.plan || item;

const buildLightboxSlide = (item) => {
  const media = resolveMedia(item);
  if (!media?.url) return null;

  const width = media.width || LIGHTBOX_MAX_EDGE;
  const height = media.height || LIGHTBOX_MAX_EDGE;
  const scale = Math.min(1, LIGHTBOX_MAX_EDGE / Math.max(width, height));

  return {
    src: `/_next/image?url=${encodeURIComponent(media.url)}&w=${LIGHTBOX_MAX_EDGE}&q=${LIGHTBOX_QUALITY}`,
    // Dimensions must match the pixels actually served or zooming misbehaves.
    width: Math.round(width * scale),
    height: Math.round(height * scale),
    alt: media.alt || "",
  };
};

export default function ProjectMediaTabs({ project }) {
  const hasPhotos = (project.images?.length || 0) > 0;
  const hasPlans = (project.floorPlans?.length || 0) > 0;
  const hasVideos = (project.videos?.length || 0) > 0;

  // The section only renders when at least one of these has content, so the
  // chain always lands on a tab that has something to show.
  const [activeTab, setActiveTab] = useState(() =>
    hasPhotos ? "photos" : hasPlans ? "plans" : "videos"
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const getMediaList = () => {
    switch (activeTab) {
      case "plans":
        return project.floorPlans || [];
      case "videos":
        return project.videos || [];
      case "photos":
      default:
        return project.images || [];
    }
  };

  const mediaList = getMediaList();
  const len = mediaList.length;
  const isVideoTab = activeTab === "videos";
  const currentMedia = mediaList[currentIndex];

  const handleTabSwitch = (tabName) => {
    setActiveTab(tabName);
    setCurrentIndex(0);
  };

  // Built fresh on click so it always reflects the active tab. Loaded lazily to
  // keep PhotoSwipe out of the initial bundle.
  const openLightbox = async (index) => {
    const slides = mediaList.map(buildLightboxSlide).filter(Boolean);
    if (slides.length === 0) return;

    const { default: PhotoSwipeLightbox } = await import("photoswipe/lightbox");
    const lightbox = new PhotoSwipeLightbox({
      dataSource: slides,
      pswpModule: () => import("photoswipe"),
    });
    lightbox.on("destroy", () => lightbox.destroy());
    lightbox.init();
    lightbox.loadAndOpen(index);
  };

  // Render single slide (used for mobile and videos tab single-view)
  const renderSlide = (media, isActive = true, isVideo = false, index = currentIndex) => {
    if (!media) return null;

    if (isVideo && media.video?.url) {
      return (
        <video
          key={`video-${mediaList.indexOf(media)}`}
          className={styles["media-tabs__video"]}
          controls
          controlsList="nodownload"
          preload="metadata"
        >
          <source
            src={media.video.url}
            type={media.video.mimeType || "video/mp4"}
          />
          Your browser does not support the video tag.
        </video>
      );
    }

    const imageUrl = isVideo
      ? media.video?.url
      : media.image?.url || media.plan?.url || media.url;
    if (!imageUrl) {
      return (
        <Image
          src="/placeholder.png"
          alt={`${activeTab} placeholder`}
          className={styles["media-tabs__image"]}
          sizes="(max-width: 768px) 100vw, 60vw"
          width={800}
          height={600}
        />
      );
    }

    return (
      <Image
        src={toImageKitUrl(imageUrl)}
        alt={resolveMedia(media)?.alt || `${activeTab} ${index + 1}`}
        className={styles["media-tabs__image"]}
        sizes="(max-width: 768px) 100vw, 60vw"
        width={800}
        height={600}
      />
    );
  };

  return (
    <div className={styles["media-tabs"]}>
      {/* Tab Buttons */}
      <div className={styles["media-tabs__buttons"]}>
        {hasPhotos && (
        <button
          className={`${styles["media-tabs__btn"]} ${
            activeTab === "photos" ? styles["media-tabs__btn--active"] : ""
          }`}
          onClick={() => handleTabSwitch("photos")}
        >
          <svg
            width="19"
            height="16"
            viewBox="0 0 19 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.24496 5.64734C8.21655 5.64734 7.38281 6.48103 7.38281 7.50949C7.38281 8.5379 8.21651 9.37163 9.24496 9.37163C10.2734 9.37163 11.1071 8.53794 11.1071 7.50949C11.1071 6.48103 10.2734 5.64734 9.24496 5.64734ZM9.24496 8.48486C8.70625 8.48486 8.26954 8.04815 8.26954 7.50944C8.26954 6.97073 8.70625 6.53403 9.24496 6.53403C9.78367 6.53403 10.2204 6.97073 10.2204 7.50944C10.2204 8.04815 9.78367 8.48486 9.24496 8.48486Z"
              fill="#303030"
            />
            <path
              d="M16.6711 1.39096L4.56728 0.0165599C4.09752 -0.0502272 3.62157 0.0869112 3.25938 0.393436C2.89722 0.674247 2.66508 1.0905 2.6165 1.54617L2.39484 3.36398H1.70757C0.732159 3.36398 0.000599086 4.22852 0.000599086 5.20393V14.2707C-0.0239687 15.2009 0.710137 15.9749 1.64032 15.9994C1.66272 16 1.68517 16.0001 1.70757 15.9998H13.8779C14.8533 15.9998 15.7401 15.2461 15.7401 14.2707V13.916C16.0425 13.8576 16.3294 13.7368 16.5825 13.5614C16.9416 13.2589 17.1716 12.8307 17.2253 12.3643L18.2451 3.36398C18.3491 2.38631 17.6475 1.50684 16.6711 1.39096ZM14.8533 14.2707C14.8533 14.7584 14.3656 15.1131 13.8779 15.1131H1.70757C1.26701 15.1261 0.899382 14.7794 0.88644 14.3388C0.885761 14.3161 0.886058 14.2934 0.887331 14.2707V12.6303L4.32343 10.1031C4.7362 9.78619 5.3176 9.81436 5.69787 10.1696L8.11421 12.2977C8.48116 12.6058 8.94307 12.7781 9.42216 12.7855C9.79674 12.79 10.1652 12.6903 10.4863 12.4973L14.8534 9.97008L14.8533 14.2707ZM14.8533 8.92818L10.0207 11.7435C9.60567 11.9894 9.08042 11.9449 8.71271 11.6327L6.27421 9.48238C5.57533 8.88184 4.55383 8.84501 3.81353 9.39369L0.887331 11.5218V5.20393C0.887331 4.71622 1.21987 4.25071 1.70757 4.25071H13.8779C14.399 4.27231 14.8198 4.68355 14.8533 5.20393V8.92818ZM17.3592 3.24428C17.3589 3.2472 17.3587 3.25017 17.3583 3.2531L16.3164 12.2534C16.3182 12.4868 16.2118 12.7078 16.0282 12.8519C15.9395 12.9406 15.74 12.985 15.74 13.0293V5.20393C15.705 4.19402 14.8881 3.38685 13.8779 3.36398H3.28152L3.48104 1.63485C3.52432 1.41094 3.64139 1.20803 3.81357 1.05846C4.00799 0.924041 4.24306 0.86137 4.47864 0.8811L16.5604 2.27769C17.0478 2.32398 17.4055 2.75674 17.3592 3.24428Z"
              fill="#303030"
            />
          </svg>
          Photos
        </button>
        )}
        {hasPlans && (
        <button
          className={`${styles["media-tabs__btn"]} ${
            activeTab === "plans" ? styles["media-tabs__btn--active"] : ""
          }`}
          onClick={() => handleTabSwitch("plans")}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.557243 4.83583C0.865064 4.83583 1.11449 4.58633 1.11449 4.27858V1.90265L4.7035 5.49092C4.81235 5.5997 4.95493 5.65408 5.09751 5.65408C5.24016 5.65408 5.38282 5.5997 5.49159 5.49085C5.70921 5.27323 5.70921 4.92038 5.49152 4.70283L1.90235 1.11449H4.27881C4.58655 1.11449 4.83605 0.864989 4.83605 0.557243C4.83605 0.249496 4.58663 0 4.27881 0H0.557243C0.249422 0 0 0.249496 0 0.557243V4.27866C0 4.58633 0.249422 4.83583 0.557243 4.83583Z"
              fill="#303030"
            />
            <path
              d="M15.4424 11.1642C15.1346 11.1642 14.8852 11.4137 14.8852 11.7214V14.0975L11.1857 10.398C10.968 10.1803 10.6152 10.1803 10.3976 10.398C10.18 10.6156 10.18 10.9684 10.3976 11.186L14.097 14.8854H11.7212C11.4133 14.8854 11.1639 15.1349 11.1639 15.4426C11.1639 15.7504 11.4133 15.9999 11.7212 15.9999H15.4425C15.7503 15.9999 15.9997 15.7504 15.9997 15.4426V11.7214C15.9997 11.4137 15.7502 11.1642 15.4424 11.1642Z"
              fill="#303030"
            />
            <path
              d="M4.81361 10.3979L1.11449 14.0973V11.7214C1.11449 11.4136 0.865064 11.1642 0.557243 11.1642C0.249422 11.1642 0 11.4136 0 11.7214V15.4427C0 15.7505 0.249422 16 0.557243 16H4.27844C4.58618 16 4.83568 15.7505 4.83568 15.4427C4.83568 15.135 4.58626 14.8855 4.27844 14.8855H1.9025L5.6017 11.1859C5.81932 10.9683 5.81932 10.6155 5.60163 10.3978C5.38415 10.1803 5.03131 10.1803 4.81361 10.3979Z"
              fill="#303030"
            />
            <path
              d="M15.4427 0H11.7214C11.4136 0 11.1642 0.249496 11.1642 0.557243C11.1642 0.864989 11.4136 1.11449 11.7214 1.11449H14.0974L10.5089 4.7032C10.2913 4.92083 10.2913 5.27367 10.509 5.49129C10.6178 5.60007 10.7604 5.65445 10.903 5.65445C11.0456 5.65445 11.1882 5.59999 11.2971 5.49122L14.8856 1.9025V4.27858C14.8856 4.58633 15.135 4.83583 15.4428 4.83583C15.7506 4.83583 16.0001 4.58633 16.0001 4.27858V0.557243C16 0.249422 15.7505 0 15.4427 0Z"
              fill="#303030"
            />
          </svg>
          Plans
        </button>
        )}
        {hasVideos && (
        <button
          className={`${styles["media-tabs__btn"]} ${
            activeTab === "videos" ? styles["media-tabs__btn--active"] : ""
          }`}
          onClick={() => handleTabSwitch("videos")}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_3028_3461)">
              <path
                d="M11.3029 5.64524L5.54465 2.65771C5.42608 2.59604 5.28457 2.602 5.1711 2.67248C5.05764 2.74296 4.98828 2.86862 4.98828 3.00388V8.97946C4.98828 9.11471 5.05738 9.24038 5.1711 9.31086C5.2323 9.34869 5.3014 9.36812 5.37075 9.36812C5.43016 9.36812 5.48983 9.35387 5.54465 9.32563L11.3031 6.33758C11.4311 6.27125 11.5114 6.13755 11.5114 5.99141C11.5114 5.84527 11.4309 5.71157 11.3029 5.64524ZM5.75322 8.34464V3.6387L10.288 5.99141L5.75322 8.34464Z"
                fill="#303030"
              />
              <path
                d="M13.8564 0.0108643H2.14495C0.9774 0.0108643 0.0273438 0.976306 0.0273438 2.16277V9.82126C0.0273438 11.008 0.9774 11.9737 2.14495 11.9737H13.8564C15.0235 11.9737 15.9733 11.008 15.9733 9.82126V2.16277C15.9733 0.976306 15.0235 0.0108643 13.8564 0.0108643ZM15.2083 9.821C15.2083 10.5792 14.602 11.1961 13.8564 11.1961H2.14495C1.39914 11.1961 0.792284 10.5792 0.792284 9.821V2.16277C0.792284 1.40487 1.39914 0.788192 2.14495 0.788192H13.8564C14.602 0.788192 15.2083 1.40487 15.2083 2.16277V9.821Z"
                fill="#303030"
              />
              <path
                d="M15.5908 13.8041H4.81714C4.64172 12.9998 3.93542 12.3961 3.09195 12.3961C2.24848 12.3961 1.54218 12.9998 1.36675 13.8041H0.409814C0.198435 13.8041 0.0273438 13.9782 0.0273438 14.1927C0.0273438 14.4073 0.198435 14.5814 0.409814 14.5814H1.36675C1.54218 15.3854 2.24848 15.9891 3.09195 15.9891C3.93542 15.9891 4.64172 15.3854 4.81714 14.5814H15.5906C15.8017 14.5814 15.973 14.4073 15.973 14.1927C15.973 13.9782 15.8019 13.8041 15.5908 13.8041ZM3.09195 15.2118C2.5389 15.2118 2.08886 14.7545 2.08886 14.1927C2.08886 13.6307 2.5389 13.1734 3.09195 13.1734C3.645 13.1734 4.09504 13.6307 4.09504 14.1927C4.09504 14.7545 3.645 15.2118 3.09195 15.2118Z"
                fill="#303030"
              />
            </g>
            <defs>
              <clipPath id="clip0_3028_3461">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Videos
        </button>
        )}
      </div>

      {/* Videos keep the single-slide player; images render as a grid */}
      {len > 0 && isVideoTab && (
        <div className={styles["media-tabs__carousel"]}>
          <div className={styles["media-tabs__slide"]}>
            {renderSlide(currentMedia, true, true)}
          </div>
        </div>
      )}

      {len > 0 && !isVideoTab && (
        <div className={styles["media-tabs__grid"]}>
          {mediaList.map((media, index) => {
            const hasImage = Boolean(resolveMedia(media)?.url);

            if (!hasImage) {
              return (
                <div
                  className={styles["media-tabs__grid-item"]}
                  key={`media-${index}`}
                >
                  {renderSlide(media, true, false, index)}
                </div>
              );
            }

            return (
              <button
                type="button"
                className={styles["media-tabs__grid-item"]}
                key={`media-${index}`}
                onClick={() => openLightbox(index)}
                aria-label={`View ${activeTab === "plans" ? "floor plan" : "image"} ${index + 1} of ${len}`}
              >
                {renderSlide(media, true, false, index)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
