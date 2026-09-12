'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '@/lib/gsap/registerPlugins'
import WordReveal from '@/components/animation/WordReveal'
import TrackedSection from './TrackedSection'
import styles from './IntroSection.module.scss'

// Sticky card pinned over two parallax layers (sky + temple), matching the
// reference site's "Images" section — a simplified version: the reference
// switches the card between several near-identical variants as you scroll
// past trigger points, but all of them carry the same copy, so this renders
// one persistent card instead of replicating that variant-swap transition.
export default function IntroSection({ intro, language }) {
  const heading = intro?.heading?.[language]
  const paragraphs = intro?.paragraphs || []
  const stageRef = useRef(null)
  const skyRef = useRef(null)
  const templeRef = useRef(null)

  useGSAP(
    () => {
      if (!stageRef.current) return

      gsap.to(skyRef.current, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(templeRef.current, {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.fromTo(
        stageRef.current,
        { width: 0 },
        {
          width: 560,
          ease: 'none',
          scrollTrigger: {
            trigger: templeRef.current,
            start: 'top top',
            end: '+=560',
            scrub: true,
            pin: true,
          },
        }
      )
    },
    { scope: stageRef }
  )

  if (!paragraphs.length && !heading) return null

  return (
    <TrackedSection id="significance" language={language} className={styles.intro}>
      <div ref={stageRef} className={styles.intro__stage}>
        <div className={styles.intro__sticky}>
          <div className={styles.intro__background}>
            <div ref={skyRef} className={styles.intro__layer}>
              <Image
                src="/kumbabishekam/parallax-sky.png"
                alt=""
                aria-hidden="true"
                fill
                sizes="100vw"
                className={styles.intro__layerImage}
              />
            </div>
            <div ref={templeRef} className={styles.intro__layer}>
              <Image
                src="/kumbabishekam/parallax-temple.png"
                alt=""
                aria-hidden="true"
                fill
                sizes="100vw"
                className={styles.intro__layerImage}
              />
            </div>
          </div>

          <div className={styles.intro__card}>
            {heading && (
              <WordReveal as="h2" className={styles.intro__heading}>
                {heading}
              </WordReveal>
            )}
            <div className={styles.intro__paragraphs}>
              {paragraphs.map((paragraph, index) => (
                <p key={index} className={styles.intro__paragraph}>
                  {paragraph?.[language]}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TrackedSection>
  )
}
