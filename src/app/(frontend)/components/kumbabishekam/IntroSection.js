'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { CustomEase } from 'gsap/CustomEase'
import '@/lib/gsap/registerPlugins'
import WordReveal from '@/components/animation/WordReveal'
import TrackedSection from './TrackedSection'
import { inter } from '@/app/(frontend)/kumbabishekam/fonts'
import styles from './IntroSection.module.scss'

// Sticky card held over the temple backdrop while the stage scrolls past,
// matching the Framer design's "Scroll Container". The design swaps the card
// between variants at scroll trigger points, but every variant carries the
// same copy, so one persistent card renders instead.
export default function IntroSection({ intro, language }) {
  const heading = intro?.heading?.[language]
  const paragraphs = intro?.paragraphs || []
  const stageRef = useRef(null)
  const treeRef = useRef(null)

  useGSAP(
    () => {
      if (!treeRef.current) return

      gsap.from(treeRef.current, {
        y: 100,
        duration: 0.6,
        ease: CustomEase.create('introTree', '0.44,0,0.56,1'),
      })
    },
    { scope: stageRef }
  )

  if (!paragraphs.length && !heading) return null

  return (
    <TrackedSection id="significance" language={language} className={styles.intro}>
      <div ref={stageRef} className={styles.intro__stage}>
        <div className={styles.intro__cardHolder}>
          <div className={styles.intro__sticky}>
            <div className={styles.intro__card}>
              {heading && (
                <WordReveal
                  as="h2"
                  className={styles.intro__heading}
                  stagger={0.05}
                  start="top 50%"
                >
                  {heading}
                </WordReveal>
              )}
              <div className={`${styles.intro__paragraphs} ${inter.className}`}>
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className={styles.intro__paragraph}>
                    {paragraph?.[language]}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.intro__images}>
          <div ref={treeRef} className={styles.intro__tree}>
            <Image
              src="/kumbabishekam/hero-tree.png"
              alt=""
              aria-hidden="true"
              width={1920}
              height={963}
              className={styles.intro__treeImage}
            />
          </div>

          <div className={styles.intro__background}>
            <Image
              src="/kumbabishekam/parallax-sky.png"
              alt=""
              aria-hidden="true"
              fill
              sizes="100vw"
              className={styles.intro__backgroundTop}
            />
            <Image
              src="/kumbabishekam/parallax-temple.png"
              alt=""
              aria-hidden="true"
              width={1920}
              height={1412}
              className={styles.intro__backgroundBottom}
            />
          </div>
        </div>
      </div>
    </TrackedSection>
  )
}
