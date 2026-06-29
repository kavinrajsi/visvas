import Link from 'next/link'
import styles from './ProjectCard.module.css'
import { STATUS_LABELS } from '@/app/(frontend)/projects/helpers'

export default function ProjectCard({ project }) {
  if (!project) return null

  const statusLabel = STATUS_LABELS[project.status] || project.status
  const coverImageUrl = project.coverImage?.url || '/placeholder.jpg'
  const projectName = project.name || 'Untitled Project'
  const location = project.location || 'Location TBD'

  return (
    <Link href={`/projects/${project.slug}`} className={styles['project-card']}>
      <div className={styles['project-card__image-wrap']}>
        <img
          src={coverImageUrl}
          alt={projectName}
          className={styles['project-card__image']}
        />
        <span className={styles['project-card__badge']}>
          {statusLabel}
        </span>
      </div>
      <div className={styles['project-card__body']}>
        <div className={styles['project-card__location']}>
          <svg
            className={styles['project-card__location-icon']}
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0C3.6 0 0 3.6 0 8c0 6 8 16 8 16s8-10 8-16c0-4.4-3.6-8-8-8zm0 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"
              fill="currentColor"
            />
          </svg>
          <span>{location}</span>
        </div>
        <p className={styles['project-card__title']}>{projectName}</p>
      </div>
    </Link>
  )
}
