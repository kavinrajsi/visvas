import Link from 'next/link'
import styles from './Pagination.module.css'

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  buildHref = (page) => `?page=${page}`,
}) {
  if (totalPages <= 1) return null

  const pages = []
  const start = Math.max(1, currentPage - 2)
  const end = Math.min(totalPages, currentPage + 2)

  if (start > 1) {
    pages.push(1)
    if (start > 2) {
      pages.push('...')
    }
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (end < totalPages) {
    if (end < totalPages - 1) {
      pages.push('...')
    }
    pages.push(totalPages)
  }

  return (
    <nav className={styles['pagination']} aria-label="Pagination">
      {/* Previous button */}
      <Link
        href={buildHref(currentPage - 1)}
        className={`${styles['pagination__button']} ${
          currentPage === 1 ? styles['pagination__button--disabled'] : ''
        }`}
        aria-disabled={currentPage === 1}
      >
        ← Previous
      </Link>

      {/* Page numbers */}
      <div className={styles['pagination__numbers']}>
        {pages.map((page, idx) => {
          if (page === '...') {
            return (
              <span key={`dots-${idx}`} className={styles['pagination__dots']}>
                …
              </span>
            )
          }

          const isActive = page === currentPage
          return (
            <Link
              key={page}
              href={buildHref(page)}
              className={`${styles['pagination__page']} ${
                isActive ? styles['pagination__page--active'] : ''
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </Link>
          )
        })}
      </div>

      {/* Next button */}
      <Link
        href={buildHref(currentPage + 1)}
        className={`${styles['pagination__button']} ${
          currentPage === totalPages ? styles['pagination__button--disabled'] : ''
        }`}
        aria-disabled={currentPage === totalPages}
      >
        Next →
      </Link>
    </nav>
  )
}
