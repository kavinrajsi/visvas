'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '@/lib/gsap/registerPlugins'

// Per-word blur + rise reveal, triggered on scroll into view.
export default function WordReveal({
  children,
  as: Component = 'div',
  className = '',
  stagger = 0.04,
  ease = 'power2.out',
  start = 'top 85%',
  ...rest
}) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (!ref.current) return

      const split = new SplitText(ref.current, { type: 'words' })

      gsap.from(split.words, {
        opacity: 0,
        y: 10,
        filter: 'blur(10px)',
        duration: 0.5,
        stagger,
        ease,
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: 'play none none none',
        },
      })

      return () => split.revert()
    },
    { scope: ref, dependencies: [stagger, ease, start] }
  )

  return (
    <Component ref={ref} className={className} {...rest}>
      {children}
    </Component>
  )
}
