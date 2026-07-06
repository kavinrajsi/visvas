import Image from 'next/image'
import styles from './page.module.scss'

export const metadata = {
  title: 'Coming Soon | Visvas',
  description: 'We are currently migrating the website',
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
          sizes="(max-width: 768px) 120px, (max-width: 992px) 160px, (max-width: 1200px) 200px, 240px"
        />
        <div className={styles['coming-soon__content']}>
          <p className={styles['coming-soon__greeting']}>Vanakkam!</p>
          <p className={styles['coming-soon__message']}>
            Sorry for the inconvenience. We are currently migrating the website.
          </p>
        </div>
      </div>
    </main>
  )
}
