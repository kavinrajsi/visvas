'use client'

import { useEffect, useRef } from 'react'
import styles from './CurvedLoopMarquee.module.scss'

const REPEAT = 6
const SPEED_PERCENT_PER_FRAME = 0.035
const DRAG_SENSITIVITY = 0.05

// Only one instance renders per page (the hero), so a static id is safe —
// React's useId() emits colons, which break the `href="#id"` fragment
// reference SVG textPath needs and silently fall back to flat text.
const PATH_ID = 'kumbabishekam-curved-loop-path'

// Approximation of the reference site's "Curved Loop Text" component: text
// riding an SVG arc, auto-scrolling, fading at the edges, and draggable to
// scrub manually.
export default function CurvedLoopMarquee({ text, color = 'rgb(48, 48, 48)' }) {
  const textPathRef = useRef(null)
  const offsetRef = useRef(0)
  const draggingRef = useRef(false)
  const lastXRef = useRef(0)

  useEffect(() => {
    let rafId

    const tick = () => {
      if (!draggingRef.current) {
        offsetRef.current -= SPEED_PERCENT_PER_FRAME
      }
      if (offsetRef.current <= -100) offsetRef.current += 100
      if (offsetRef.current > 0) offsetRef.current -= 100

      textPathRef.current?.setAttribute('startOffset', `${offsetRef.current}%`)
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const handlePointerDown = (event) => {
    draggingRef.current = true
    lastXRef.current = event.clientX
  }

  const handlePointerMove = (event) => {
    if (!draggingRef.current) return
    const deltaX = event.clientX - lastXRef.current
    lastXRef.current = event.clientX
    offsetRef.current += deltaX * DRAG_SENSITIVITY
  }

  const stopDrag = () => {
    draggingRef.current = false
  }

  const repeated = Array.from({ length: REPEAT }, () => text).join('   ')

  return (
    <div
      className={styles.marquee}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDrag}
      onPointerLeave={stopDrag}
    >
      <svg viewBox="0 0 1400 520" className={styles.marquee__svg} preserveAspectRatio="xMidYMid meet">
        <defs>
          {/* Reference's "Curved Loop Text" rides one big dome-shaped arc
              (its bounding box is far taller than wide), not a flat wave —
              most of the circle bleeds above the hero and is clipped by
              its overflow:hidden, so only the crown of the arc shows. */}
          <path id={PATH_ID} fill="none" d="M -100,500 A 940,940 0 0 1 1500,500" />
        </defs>
        <text fontSize="44" fontWeight="600" fill={color}>
          <textPath ref={textPathRef} href={`#${PATH_ID}`} startOffset="0%">
            {repeated}
          </textPath>
        </text>
      </svg>
    </div>
  )
}
