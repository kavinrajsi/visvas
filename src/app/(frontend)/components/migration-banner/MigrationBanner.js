import styles from './MigrationBanner.module.scss'

export default function MigrationBanner() {
  return (
    <div className={styles['migration-banner']} role="status">
      <p className={styles['migration-banner__text']}>
        Sorry for the inconvenience, we are migrating the website.
      </p>
    </div>
  )
}
