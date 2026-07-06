import Image from 'next/image'
import styles from './page.module.scss'

export const metadata = {
  title: 'Coming Soon | Visvas',
  description: 'Something amazing is coming soon',
}

export default function ComingSoonPage() {
  return (
    <main className={styles['coming-soon']}>
      <div className={styles['coming-soon__container']}>
        <Image
          src="/logo.png"
          alt="Visvas"
          width={200}
          height={200}
          priority
          className={styles['coming-soon__logo']}
          sizes="(max-width: 768px) 120px, 200px"
        />
      </div>
    </main>
  )
}
