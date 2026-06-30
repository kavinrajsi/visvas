import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <main className={styles['not-found']}>
      <div className={styles['not-found__container']}>
        <h1 className={styles['not-found__heading']}>404</h1>
        <h2 className={styles['not-found__title']}>Page Not Found</h2>
        <p className={styles['not-found__message']}>
          Sorry, we couldn't find the page you're looking for. It may have been moved or no longer exists.
        </p>
        <div className={styles['not-found__actions']}>
          <Link href="/" className={styles['not-found__btn']}>
            Back to Home
          </Link>
          <Link href="/projects/ongoing" className={styles['not-found__btn-secondary']}>
            View Projects
          </Link>
        </div>
      </div>
    </main>
  )
}
