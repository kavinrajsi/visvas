import Image from 'next/image'
import { Suspense } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import ProjectCard from '@/app/(frontend)/components/project-card/ProjectCard'
import ProjectFilters from '@/app/(frontend)/projects/ProjectFilters'
import Pagination from '@/app/(frontend)/projects/Pagination'
import ProjectPageClient from '@/app/(frontend)/projects/ProjectPageClient'
import { buildWhere } from '@/app/(frontend)/projects/helpers'
import styles from './page.module.scss'

export const dynamic = 'force-dynamic'
export const revalidate = 300

export const metadata = {
  title: 'Ongoing Projects | Visvas',
  description: 'Discover our active real estate development projects across premium locations in Madurai.',
  openGraph: {
    title: 'Ongoing Projects | Visvas',
    description: 'Discover our active real estate development projects across premium locations in Madurai.',
    type: 'website',
    url: 'https://www.visvas.in/projects/ongoing',
  },
  twitter: {
    title: 'Ongoing Projects | Visvas',
    description: 'Discover our active real estate development projects across premium locations in Madurai.',
  },
  alternates: {
    canonical: 'https://www.visvas.in/projects/ongoing',
  },
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

export default async function OngoingProjectsPage({ searchParams: searchParamsPromise }) {
  const searchParams = await searchParamsPromise
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
      <ProjectPageClient
        category="ongoing"
        projectCount={projects.length}
        filters={searchParams}
      />
      {/* Banner */}
      <div className={styles['page__banner']}>
        <Image
          src="/banner-project-desktop.png"
          alt="Ongoing Projects"
          width={1440}
          height={454}
          quality={85}
          priority
          className={styles['page__banner-image']}
        />
      </div>

      {/* Filters */}
      <Suspense fallback={null}>
        <ProjectFilters category="ongoing" availableLocations={availableLocations} />
      </Suspense>

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

      {/* JSON-LD Schema */}
      {projects.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: 'Ongoing Projects',
              url: 'https://www.visvas.in/projects/ongoing',
              description:
                'Discover our active real estate development projects across premium locations in Madurai.',
              mainEntity: {
                '@type': 'ItemList',
                itemListElement: projects.map((project, idx) => ({
                  '@type': 'ListItem',
                  position: idx + 1,
                  url: `https://www.visvas.in/projects/${project.slug}`,
                  name: project.name,
                  description: project.projectDescription,
                  image: project.coverImage?.url,
                })),
              },
            }),
          }}
        />
      )}
    </div>
  )
}
