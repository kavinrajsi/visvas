'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '@/lib/gsap/registerPlugins'

gsap.registerPlugin(ScrollTrigger)

export default function Counter({ value, duration = 2, className = '' }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (!ref.current) return

      gsap.to(
        { val: 0 },
        {
          val: value,
          duration,
          ease: 'power1.out',
          onUpdate: function () {
            ref.current.textContent = Math.round(this.targets()[0].val)
          },
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    },
    { scope: ref }
  )

  return (
    <span ref={ref} className={className}>
      0
    </span>
  )
}
