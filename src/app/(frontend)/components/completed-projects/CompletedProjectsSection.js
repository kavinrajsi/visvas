import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import ProjectCard from '@/app/(frontend)/components/project-card/ProjectCard'
import styles from './CompletedProjectsSection.module.scss'

async function getCompletedProjects() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'projects',
      limit: 3,
      sort: '-createdAt',
      depth: 1,
      where: {
        status: { equals: 'completed' },
      },
    })
    return result.docs || []
  } catch (error) {
    console.error('Error fetching completed projects:', error)
    return []
  }
}

export default async function CompletedProjectsSection() {
  const projects = await getCompletedProjects()

  if (projects.length === 0) {
    return null
  }

  return (
    <section className={styles['completed-projects']}>
      <div className={styles['completed-projects__container']}>
        <div className={styles['completed-projects__header']}>
          <div className={styles['section-label']}>
            <span>◆</span>
            <span>DELIVERED</span>
            <span>◆</span>
          </div>
          <h2 className={styles['section-heading']}>Completed Projects</h2>
          <p className={styles['section-description']}>
            Explore our successfully delivered luxury developments
          </p>
        </div>

        <div className={styles['projects-grid']}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className={styles['completed-projects__cta']}>
          <Link href="/projects/completed" className={styles['btn']}>
            View All Completed Projects
          </Link>
        </div>
      </div>
    </section>
  )
}
