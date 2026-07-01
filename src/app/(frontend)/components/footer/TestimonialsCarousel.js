'use client'

import { useRef, useState, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Testimonial from '../Testimonial'
import styles from './Footer.module.scss'

const AUTOPLAY_INTERVAL = 5000
const TRANSITION_DURATION = 0.6

const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 15L7.5 10L12.5 5" stroke="#303030" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 5L12.5 10L7.5 15" stroke="#303030" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function TestimonialsCarousel({ testimonials }) {
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const indexRef = useRef(0)
  const maxIndexRef = useRef(0)
  const pitchRef = useRef(0)
  const autoplayTweenRef = useRef(null)
  const isPausedRef = useRef(false)

  const [index, setIndex] = useState(0)
  const [maxIndex, setMaxIndex] = useState(0)

  const measure = useCallback(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track || track.children.length === 0) return

    let pitch
    if (track.children.length < 2) {
      pitch = track.children[0]?.offsetWidth ?? 0
    } else {
      pitch = track.children[1].offsetLeft - track.children[0].offsetLeft
    }

    pitchRef.current = pitch
    const visibleCount = pitch ? Math.round(viewport.offsetWidth / pitch) : 1
    const newMaxIndex = Math.max(testimonials.length - visibleCount, 0)

    maxIndexRef.current = newMaxIndex
    setMaxIndex(newMaxIndex)

    const clamped = Math.min(indexRef.current, newMaxIndex)
    indexRef.current = clamped
    setIndex(clamped)

    gsap.set(track, { x: -clamped * pitch })
  }, [testimonials.length])

  const goTo = useCallback(
    (next) => {
      const clamped = Math.max(0, Math.min(next, maxIndexRef.current))
      indexRef.current = clamped
      setIndex(clamped)

      gsap.to(trackRef.current, {
        x: -clamped * pitchRef.current,
        duration: TRANSITION_DURATION,
        ease: 'power2.inOut',
      })
    },
    []
  )

  useGSAP(() => {
    measure()

    const debounce = (fn, delay) => {
      let timeout
      return () => {
        clearTimeout(timeout)
        timeout = setTimeout(fn, delay)
      }
    }

    const onResize = debounce(measure, 150)
    window.addEventListener('resize', onResize)

    const tick = () => {
      const next = indexRef.current >= maxIndexRef.current ? 0 : indexRef.current + 1
      goTo(next)
    }

    const scheduleAutoplay = () => {
      autoplayTweenRef.current = gsap.delayedCall(
        AUTOPLAY_INTERVAL / 1000,
        function repeat() {
          if (!isPausedRef.current) {
            tick()
          }
          scheduleAutoplay()
        }
      )
    }

    if (testimonials.length > 0) {
      scheduleAutoplay()
    }

    return () => {
      window.removeEventListener('resize', onResize)
      if (autoplayTweenRef.current) {
        autoplayTweenRef.current.kill()
      }
    }
  }, { scope: viewportRef, dependencies: [testimonials.length, goTo, measure] })

  useGSAP(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    isPausedRef.current = mq.matches

    const handler = (e) => {
      isPausedRef.current = e.matches
    }

    mq.addEventListener('change', handler)

    return () => {
      mq.removeEventListener('change', handler)
    }
  }, [])

  const pause = () => {
    isPausedRef.current = true
  }

  const resume = () => {
    isPausedRef.current = false
  }

  if (testimonials.length === 0) return null

  return (
    <div
      ref={viewportRef}
      className={styles['footer__testimonials-carousel']}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <div className={styles['footer__testimonials-carousel__viewport']}>
        <div ref={trackRef} className={styles['footer__testimonials-carousel__track']}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles['footer__testimonials-carousel__slide']}>
              <Testimonial testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      {maxIndex > 0 && (
        <>
          <div className={styles['footer__testimonials-carousel__arrows']}>
            <button
              type="button"
              aria-label="Previous testimonial"
              className={styles['footer__testimonials-carousel__arrow']}
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
            >
              <ArrowLeftIcon />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              className={`${styles['footer__testimonials-carousel__arrow']} ${styles['footer__testimonials-carousel__arrow--next']}`}
              onClick={() => goTo(index + 1)}
              disabled={index === maxIndex}
            >
              <ArrowRightIcon />
            </button>
          </div>

          <div
            className={styles['footer__testimonials-carousel__dots']}
            role="tablist"
            aria-label="Testimonial slides"
          >
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`${styles['footer__testimonials-carousel__dot']} ${
                  i === index ? styles['footer__testimonials-carousel__dot--active'] : ''
                }`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
