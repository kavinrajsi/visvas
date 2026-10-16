import YouTubeFacade from '../youtube-facade/YouTubeFacade'
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
      <YouTubeFacade
        videoId={videoId}
        title={title || 'Kumbabishekam video'}
        className={styles.embed__iframe}
      />
    </div>
  )
}
