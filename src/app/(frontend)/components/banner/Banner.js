import { preload } from 'react-dom'
import styles from './Banner.module.scss'

export default function Banner() {
  preload('/web-banner-cover.webp', { as: 'image', fetchPriority: 'high' })

  return (
    <section className={styles['banner']}>
      <video
        poster="/web-banner-cover.webp"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className={styles['banner__video']}
      >
        <source src="/web-banner-720.mp4" type="video/mp4" media="(max-width: 768px)" />
        <source src="/web-banner-1080.mp4" type="video/mp4" />
      </video>
    </section>
  )
}
