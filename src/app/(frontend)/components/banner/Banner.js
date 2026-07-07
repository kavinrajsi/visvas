import styles from './Banner.module.scss'

export default function Banner() {
  return (
    <section className={styles['banner']}>
      <video
        src="/web-banner.mp4"
        poster="/web-banner-cover.png"
        autoPlay
        loop
        muted
        className={styles['banner__video']}
      />
    </section>
  )
}
