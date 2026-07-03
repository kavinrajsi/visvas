import Image from 'next/image'
import { Suspense } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import ProjectCard from '@/app/(frontend)/components/project-card/ProjectCard'
import Pagination from '@/app/(frontend)/projects/Pagination'
import ProjectPageClient from '@/app/(frontend)/projects/ProjectPageClient'
import styles from './page.module.scss'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export const metadata = {
  title: 'All Projects | Visvas',
  description: 'Explore all residential and commercial development projects by Visvas in Madurai.',
  openGraph: {
    title: 'All Projects | Visvas',
    description: 'Explore all residential and commercial development projects by Visvas in Madurai.',
    type: 'website',
    url: 'https://www.visvas.in/projects',
  },
  twitter: {
    title: 'All Projects | Visvas',
    description: 'Explore all residential and commercial development projects by Visvas in Madurai.',
  },
  alternates: {
    canonical: 'https://www.visvas.in/projects',
  },
}

async function getProjects(searchParams) {
  const payload = await getPayload({ config })

  const currentPage = Number(searchParams.page) || 1

  const result = await payload.find({
    collection: 'projects',
    limit: 8,
    page: currentPage,
    depth: 1,
  })

  return result
}

export default async function AllProjectsPage({ searchParams: searchParamsPromise }) {
  const searchParams = await searchParamsPromise
  const projectsData = await getProjects(searchParams)

  const { docs: projects, totalPages, page: currentPage } = projectsData

  const buildPaginationHref = (pageNum) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(pageNum))
    return `?${params.toString()}`
  }

  return (
    <div className={styles['page']}>
      <ProjectPageClient
        category="all"
        projectCount={projects.length}
        filters={searchParams}
      />

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
          <p>No projects found.</p>
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
              name: 'All Projects',
              url: 'https://www.visvas.in/projects',
              description:
                'Explore all residential and commercial development projects by Visvas in Madurai.',
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
