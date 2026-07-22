'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '@/lib/gsap/registerPlugins'

// Where the reveal starts clipped from — the content unmasks toward the
// opposite edge as it scrolls into view.
const CLIP_FROM = {
  right: 'inset(0 100% 0 0)', // unmasks left → right
  left: 'inset(0 0 0 100%)', // unmasks right → left
  down: 'inset(0 0 100% 0)', // unmasks top → bottom
  up: 'inset(100% 0 0 0)', // unmasks bottom → top
}

const CLIP_TO = 'inset(0 0 0 0)'

export default function BlockReveal({
  children,
  as: Component = 'div',
  className = '',
  direction = 'right',
  duration = 0.9,
  delay = 0,
  ease = 'power3.out',
  ...rest
}) {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      gsap.fromTo(
        containerRef.current,
        { clipPath: CLIP_FROM[direction] || CLIP_FROM.right },
        {
          clipPath: CLIP_TO,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    },
    { scope: containerRef, dependencies: [direction, delay] }
  )

  return (
    <Component ref={containerRef} className={className} {...rest}>
      {children}
    </Component>
  )
}
