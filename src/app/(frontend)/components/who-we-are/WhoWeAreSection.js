import Image from 'next/image'
import { toImageKitUrl } from '@/lib/image/imageKitUrl'
import styles from './WhoWeAreSection.module.scss'

export default function WhoWeAreSection({ section }) {
  if (!section) return null

  const {
    sectionLabel = 'WHO WE ARE',
    heading = '',
    featureCards = [],
    stats = [],
  } = section

  return (
    <section className={styles['who-we-are']}>
      <div className={styles['who-we-are__header']}>
        <div className={styles['section-label']}>
          <span>◆</span>
          <span>{sectionLabel}</span>
          <span>◆</span>
        </div>
        <h2 className={styles['who-we-are__heading']}>{heading}</h2>
      </div>

      {featureCards.length > 0 && (
        <div className={styles['feature-cards']}>
          {featureCards.map((card, idx) => (
            <div key={idx} className={styles['feature-card']}>
              {card.backgroundImage?.url && (
                <Image
                  src={toImageKitUrl(card.backgroundImage.url)}
                  alt={card.title}
                  fill
                  className={styles['feature-card__bg']}
                />
              )}
              <div className={styles['feature-card__content']}>
                <h3 className={styles['feature-card__title']}>{card.title}</h3>
                <p className={styles['feature-card__description']}>
                  {card.description}
                </p>
                {card.buttonLabel && (
                  <a href="#" className={styles['feature-card__btn']}>
                    {card.buttonLabel}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {stats.length > 0 && (
        <div className={styles['stats-row']}>
          {stats.map((stat, idx) => (
            <div key={idx} className={styles['stat-item']}>
              <div className={styles['stat-item__number']}>
                {stat.number}
                {stat.suffix && <span>{stat.suffix}</span>}
              </div>
              <div className={styles['stat-item__label']}>{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
