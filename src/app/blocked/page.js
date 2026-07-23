import styles from './blocked.module.scss'

export const metadata = {
  title: 'Access Restricted',
  robots: { index: false, follow: false },
}

export default function BlockedPage() {
  return (
    <main className={styles['blocked']}>
      <div className={styles['blocked__inner']}>
        <h1 className={styles['blocked__title']}>Access Restricted</h1>
        <p className={styles['blocked__text']}>
          Access to this site has been restricted.
        </p>
      </div>
    </main>
  )
}
