import { preload } from 'react-dom'
import styles from './Banner.module.scss'

export default function Banner() {
  preload('/web-banner-cover.png', { as: 'image' })

  return (
    <section className={styles['banner']}>
      <video
        src="/web-banner.mp4"
        poster="/web-banner-cover.png"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={styles['banner__video']}
      />
    </section>
  )
}
