import Image from 'next/image'
import { toImageKitUrl } from '@/lib/image/imageKitUrl'
import styles from './HowWeBuildSection.module.scss'

export default function HowWeBuildSection({ section }) {
  if (!section) return null

  const {
    sectionLabel = 'OUR PROCESS',
    heading = 'How We Build',
    description = '',
    steps = [],
  } = section

  return (
    <section className={styles['how-we-build']}>
      <div className={styles['how-we-build__container']}>
        <div className={styles['how-we-build__header']}>
          <div className={styles['section-label']}>
            <span>◆</span>
            <span>{sectionLabel}</span>
            <span>◆</span>
          </div>
          <h2 className={styles['section-heading']}>{heading}</h2>
          {description && (
            <p className={styles['section-description']}>{description}</p>
          )}
        </div>

        {steps.length > 0 && (
          <div className={styles['steps-container']}>
            <div className={styles['steps-timeline']}>
              {steps.map((step, idx) => (
                <div key={idx} className={styles['step']}>
                  <div className={styles['step__number']}>
                    <span>{step.stepNumber}</span>
                  </div>
                  <div className={styles['step__content']}>
                    {step.icon?.url && (
                      <div className={styles['step__icon']}>
                        <Image
                          src={toImageKitUrl(step.icon.url)}
                          alt={step.title}
                          width={48}
                          height={48}
                        />
                      </div>
                    )}
                    <h3 className={styles['step__title']}>{step.title}</h3>
                    <p className={styles['step__description']}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
