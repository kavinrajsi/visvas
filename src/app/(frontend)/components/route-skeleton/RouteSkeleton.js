import styles from './RouteSkeleton.module.scss'

// Route-level loading skeleton for dynamic listing pages (projects, blog)
export default function RouteSkeleton({ variant = 'grid', cards = 6 }) {
  const block = (extra) => `${styles['skeleton__block']} ${extra}`

  return (
    <div aria-busy="true" aria-label="Loading page">
      <div className={block(styles['skeleton__banner'])} />

      <div className={styles['skeleton__container']}>
        <div className={styles['skeleton__filters']}>
          <div className={block(styles['skeleton__filter'])} />
          <div className={block(styles['skeleton__filter'])} />
        </div>

        {variant === 'grid' ? (
          <div className={styles['skeleton__grid']}>
            {Array.from({ length: cards }).map((_, i) => (
              <div key={i} className={block(styles['skeleton__card'])} />
            ))}
          </div>
        ) : (
          <div className={styles['skeleton__list']}>
            {Array.from({ length: cards }).map((_, i) => (
              <div key={i} className={block(styles['skeleton__row'])} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
