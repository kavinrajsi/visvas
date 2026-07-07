'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '@/lib/gsap/registerPlugins'

export default function ScrollReveal({
  children,
  as: Component = 'div',
  className = '',
  y = 40,
  stagger = false,
  ...rest
}) {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      if (stagger) {
        gsap.from(containerRef.current.children, {
          opacity: 0,
          y,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      } else {
        gsap.from(containerRef.current, {
          opacity: 0,
          y,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      }
    },
    { scope: containerRef }
  )

  return (
    <Component ref={containerRef} className={className} {...rest}>
      {children}
    </Component>
  )
}
