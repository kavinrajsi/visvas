import { getPayload } from 'payload'
import config from '@payload-config'
import ProjectCard from '@/app/(frontend)/components/project-card/ProjectCard'
import ProjectFilters from '@/app/(frontend)/projects/ProjectFilters'
import Pagination from '@/app/(frontend)/projects/Pagination'
import { buildWhere } from '@/app/(frontend)/projects/helpers'
import styles from './page.module.css'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Ongoing Projects | Visvas',
  description: 'View our ongoing real estate development projects.',
}

async function getProjects(searchParams) {
  const payload = await getPayload({ config })

  const currentPage = Number(searchParams.page) || 1
  const where = buildWhere(searchParams, 'ongoing')

  const result = await payload.find({
    collection: 'projects',
    limit: 8,
    page: currentPage,
    depth: 1,
    where: Object.keys(where).length > 0 ? where : undefined,
  })

  return result
}

async function getAvailableLocations() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'projects',
    limit: 1000,
    depth: 0,
    select: { location: true },
  })

  const locations = [
    ...new Set(result.docs.map((p) => p.location).filter(Boolean)),
  ].sort()

  return locations
}

export default async function OngoingProjectsPage({ searchParams }) {
  const [projectsData, availableLocations] = await Promise.all([
    getProjects(searchParams),
    getAvailableLocations(),
  ])

  const { docs: projects, totalPages, page: currentPage } = projectsData

  const buildPaginationHref = (pageNum) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(pageNum))
    return `?${params.toString()}`
  }

  return (
    <div className={styles['page']}>
      {/* Hero */}
      <div className={styles['page__hero']}>
        <h1 className={styles['page__title']}>Ongoing Projects</h1>
        <p className={styles['page__subtitle']}>
          Discover our active real estate development projects across premium locations
        </p>
      </div>

      {/* Filters */}
      <ProjectFilters category="ongoing" availableLocations={availableLocations} />

      {/* Results info */}
      <div className={styles['page__results-info']}>
        <p className={styles['page__count']}>
          Showing projects page {currentPage} of {totalPages}
        </p>
      </div>

      {/* Grid */}
      {projects.length > 0 ? (
        <>
          <div className={styles['page__grid']}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            buildHref={buildPaginationHref}
          />
        </>
      ) : (
        <div className={styles['page__empty']}>
          <p>No projects found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  )
}
