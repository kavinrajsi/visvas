import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import ProjectCard from '@/app/(frontend)/components/project-card/ProjectCard'
import styles from './LatestProjectsSection.module.scss'

async function getLatestProjects() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'projects',
      limit: 6,
      sort: '-createdAt',
      depth: 1,
    })
    return result.docs || []
  } catch (error) {
    console.error('Error fetching latest projects:', error)
    return []
  }
}

export default async function LatestProjectsSection() {
  const projects = await getLatestProjects()

  if (projects.length === 0) {
    return null
  }

  return (
    <section className={styles['latest-projects']}>
      <div className={styles['latest-projects__container']}>
        <div className={styles['latest-projects__header']}>
          <div className={styles['section-label']}>
            <span>◆</span>
            <span>FEATURED</span>
            <span>◆</span>
          </div>
          <h2 className={styles['section-heading']}>Latest Projects</h2>
          <p className={styles['section-description']}>
            Discover our most recent luxury residential developments
          </p>
        </div>

        <div className={styles['projects-grid']}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className={styles['latest-projects__cta']}>
          <Link href="/projects/ongoing" className={styles['btn']}>
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  )
}
