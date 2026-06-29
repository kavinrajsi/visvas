import styles from './BlogSidebar.module.css'

export default function BlogSidebar() {
  return (
    <aside className={styles['blog-sidebar']}>
      <h3 className={styles['blog-sidebar__heading']}>
        Subscribe to stay informed with curated updates for better living
      </h3>

      <form className={styles['blog-sidebar__form']}>
        <input
          type="text"
          placeholder="Name*"
          className={styles['blog-sidebar__input']}
          required
          aria-label="Full name"
        />
        <input
          type="email"
          placeholder="Email*"
          className={styles['blog-sidebar__input']}
          required
          aria-label="Email address"
        />
        <button type="submit" className={styles['blog-sidebar__btn']}>
          Subscribe
        </button>
      </form>
    </aside>
  )
}
