'use client'

import Link from 'next/link'
import HeroReveal from '@/components/animation/HeroReveal'
import styles from './not-found.module.scss'

export default function NotFound() {
  return (
    <main className={styles['not-found']}>
      <HeroReveal
        className={styles['not-found__hero']}
        headingSelector={`.${styles['not-found__title']}`}
      >
        <div className={styles['not-found__container']}>
          {/* Estate agent signboard */}
          <svg
            className={styles['not-found__signboard']}
            viewBox="0 0 200 300"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Ground line (dashed) */}
            <line
              x1="40"
              y1="240"
              x2="160"
              y2="240"
              stroke="var(--color-border)"
              strokeWidth="1"
              strokeDasharray="4,4"
            />
            {/* Ground ellipse */}
            <ellipse
              cx="100"
              cy="250"
              rx="50"
              ry="8"
              fill="var(--color-muted)"
            />

            {/* Post */}
            <rect
              x="95"
              y="80"
              width="10"
              height="165"
              fill="var(--color-primary)"
              rx="2"
            />

            {/* Peg/nail at top of post */}
            <circle
              cx="100"
              cy="75"
              r="5"
              fill="var(--color-gold)"
            />

            {/* Signboard (white, rotated) */}
            <g className={styles['not-found__signboard-group']}>
              {/* Board rect */}
              <rect
                x="45"
                y="50"
                width="110"
                height="70"
                fill="var(--color-white)"
                stroke="var(--color-primary)"
                strokeWidth="2"
                rx="2"
              />
              {/* Board border accent (gold stripe) */}
              <rect
                x="45"
                y="50"
                width="110"
                height="4"
                fill="var(--color-gold)"
                rx="2"
              />
              {/* Main text: 404 */}
              <text
                x="100"
                y="95"
                fontFamily="Cormorant Garamond, serif"
                fontSize="36"
                fontWeight="600"
                fill="var(--color-primary)"
                textAnchor="middle"
              >
                404
              </text>
              {/* Subtext: NOT LISTED */}
              <text
                x="100"
                y="115"
                fontFamily="Raleway, sans-serif"
                fontSize="10"
                fontWeight="700"
                fill="var(--color-gold)"
                textAnchor="middle"
                letterSpacing="2"
              >
                NOT LISTED
              </text>
            </g>
          </svg>

          {/* Eyebrow label */}
          <div className={styles['not-found__eyebrow']}>
            <span>✦</span>
            <span>Plot Not Found</span>
            <span>✦</span>
          </div>

          {/* Title and message */}
          <h1 className={styles['not-found__title']}>This Address Isn&apos;t Listed</h1>
          <p className={styles['not-found__message']}>
            The property you&apos;re searching for isn&apos;t on our books — it may have sold, moved, or never existed at this address.
          </p>

          {/* CTAs */}
          <div className={styles['not-found__actions']}>
            <Link href="/" className={styles['not-found__btn']}>
              Back to Home
            </Link>
            <Link href="/projects/ongoing" className={styles['not-found__btn-secondary']}>
              Browse Live Projects
            </Link>
          </div>
        </div>
      </HeroReveal>
    </main>
  )
}
