'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '@/lib/gsap/registerPlugins'

// Per-word blur + rise reveal, triggered on scroll into view.
export default function WordReveal({ children, as: Component = 'div', className = '', ...rest }) {
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
        stagger: 0.04,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      return () => split.revert()
    },
    { scope: ref }
  )

  return (
    <Component ref={ref} className={className} {...rest}>
      {children}
    </Component>
  )
}
