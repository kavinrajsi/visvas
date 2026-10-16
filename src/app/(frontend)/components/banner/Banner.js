import { preload } from 'react-dom'
import ResponsiveVideo from '../responsive-video/ResponsiveVideo'
import styles from './Banner.module.scss'

export default function Banner() {
  preload('/web-banner-cover.webp', { as: 'image', fetchPriority: 'high' })

  return (
    <section className={styles['banner']}>
      <ResponsiveVideo
        mobileSrc="/web-banner-720.mp4"
        desktopSrc="/web-banner-1080.mp4"
        poster="/web-banner-cover.webp"
        className={styles['banner__video']}
      />
    </section>
  )
}
