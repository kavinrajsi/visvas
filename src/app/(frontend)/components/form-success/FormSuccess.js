import styles from './FormSuccess.module.scss'

// Shown in place of a form after successful submission
export default function FormSuccess({
  heading = 'Thank you',
  message = 'We will get back to you soon.',
  link,
}) {
  return (
    <div className={styles['form-success']} role="status">
      <svg
        width="41"
        height="40"
        viewBox="0 0 41 40"
        fill="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.1983 0L0.0234375 40H40.0137L25.8388 0H14.1983Z" fill="#1B5E30" />
        <path
          d="M30.029 0L20.0167 13.4993L10.0084 0H0V3.46105H2.56584L20.0167 26.9985L37.4715 3.46105H40.0373V0H30.029Z"
          fill="#E09C26"
        />
      </svg>
      <p className={styles['form-success__heading']}>{heading}</p>
      <p className={styles['form-success__text']}>{message}</p>
      {link?.url && link?.text && (
        <a href={link.url} className={styles['form-success__link']}>
          {link.text}
        </a>
      )}
    </div>
  )
}
