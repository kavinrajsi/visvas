'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./ProjectCard.module.scss";
import { toImageKitUrl } from "@/lib/image/imageKitUrl";

export default function ProjectCard({ project }) {
  const [imageError, setImageError] = useState(false);

  if (!project) return null;

  const primaryStatus = project.status?.[0];
  const statusLabel = primaryStatus?.name || "";
  const coverImageUrl = toImageKitUrl(project.coverImage?.url);
  const projectName = project.name || "Untitled Project";
  const location = project.location || "Location TBD";
  const displayImageUrl = imageError ? "/placeholder.png" : coverImageUrl;

  const badgeModifiers = {
    upcoming: "onsale",
    completed: "completed",
  };
  const badgeModifier = badgeModifiers[primaryStatus?.value] || "";
  const badgeClass = badgeModifier
    ? styles[`project-card__badge--${badgeModifier}`]
    : "";

  return (
    <Link href={`/projects/${project.slug}`} className={styles["project-card"]}>
      <div className={styles["project-card__image-wrap"]}>
        <Image
          src={displayImageUrl}
          alt={projectName}
          width={320}
          height={414}
          className={styles["project-card__image"]}
          onError={() => setImageError(true)}
        />
        {statusLabel && (
          <span className={`${styles["project-card__badge"]} ${badgeClass}`}>
            {statusLabel}
          </span>
        )}
      </div>
      <div className={styles["project-card__body"]}>
        <div className={styles["project-card__location"]}>
          <svg
            width="17"
            height="24"
            viewBox="0 0 17 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles["project-card__location--icon"]}
          >
            <path
              d="M7.85245 23.6869C7.98286 23.8825 8.20242 24 8.4375 24C8.67258 24 8.89214 23.8825 9.02255 23.6869C10.6866 21.1909 13.1375 18.1084 14.8455 14.9733C16.2111 12.4666 16.875 10.3287 16.875 8.4375C16.875 3.78506 13.0899 0 8.4375 0C3.78506 0 0 3.78506 0 8.4375C0 10.3287 0.66389 12.4666 2.02955 14.9733C3.73622 18.106 6.19186 21.1961 7.85245 23.6869ZM8.4375 1.40625C12.3145 1.40625 15.4688 4.56047 15.4688 8.4375C15.4688 10.0877 14.8609 12.0055 13.6106 14.3006C12.1384 17.0029 10.0375 19.7441 8.4375 22.0485C6.8377 19.7444 4.73672 17.003 3.26442 14.3006C2.01408 12.0055 1.40625 10.0877 1.40625 8.4375C1.40625 4.56047 4.56047 1.40625 8.4375 1.40625Z"
              fill="#1E5F2F"
            />
            <path
              d="M8.4375 12.6562C10.7637 12.6562 12.6562 10.7637 12.6562 8.4375C12.6562 6.11128 10.7637 4.21875 8.4375 4.21875C6.11128 4.21875 4.21875 6.11128 4.21875 8.4375C4.21875 10.7637 6.11128 12.6562 8.4375 12.6562ZM8.4375 5.625C9.98831 5.625 11.25 6.88669 11.25 8.4375C11.25 9.98831 9.98831 11.25 8.4375 11.25C6.88669 11.25 5.625 9.98831 5.625 8.4375C5.625 6.88669 6.88669 5.625 8.4375 5.625Z"
              fill="#1E5F2F"
            />
          </svg>
          <span  className={styles["project-card__location--name"]}>{location}</span>
        </div>
        <p className={styles["project-card__title"]}>{projectName}</p>
      </div>
    </Link>
  );
}
