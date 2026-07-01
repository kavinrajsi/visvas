'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import '@/lib/gsap/registerPlugins'

export default function HeroReveal({
  children,
  headingSelector = null,
  className = '',
}) {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      const tl = gsap.timeline()

      tl.from(containerRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power2.out',
      })

      if (headingSelector) {
        const heading = containerRef.current.querySelector(headingSelector)
        if (heading) {
          const split = new SplitText(heading, { type: 'lines' })
          tl.from(
            split.lines,
            {
              opacity: 0,
              y: 20,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out',
            },
            0.3
          )
        }
      }
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
