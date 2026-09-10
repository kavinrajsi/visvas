import styles from './YouTubeEmbed.module.scss'

function extractVideoId(url) {
  if (!url) return null
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/)
  return match ? match[1] : null
}

export default function YouTubeEmbed({ url, title }) {
  const videoId = extractVideoId(url)
  if (!videoId) return null

  return (
    <div className={styles.embed}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&modestbranding=1&playsinline=1`}
        title={title || 'Kumbabishekam video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className={styles.embed__iframe}
      />
    </div>
  )
}
