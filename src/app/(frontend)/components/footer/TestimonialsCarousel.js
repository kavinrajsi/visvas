'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import Testimonial from '../Testimonial'
import styles from './Footer.module.scss'
import 'swiper/css'
import 'swiper/css/navigation'

const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5 15L7.5 10L12.5 5" stroke="#303030" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 5L12.5 10L7.5 15" stroke="#303030" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function TestimonialsCarousel({ testimonials }) {
  if (testimonials.length === 0) return null

  return (
    <div className={styles['footer__testimonials-carousel']}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: `.${styles['footer__testimonials-carousel__arrow--prev']}`,
          nextEl: `.${styles['footer__testimonials-carousel__arrow--next']}`,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: false,
          el: `.${styles['footer__testimonials-carousel__dots']}`,
        }}
        className={styles['footer__testimonials-carousel__swiper']}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className={styles['footer__testimonials-carousel__slide']}>
            <Testimonial testimonial={testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles['footer__testimonials-carousel__arrows']}>
        <button
          type="button"
          aria-label="Previous testimonial"
          className={`${styles['footer__testimonials-carousel__arrow']} ${styles['footer__testimonials-carousel__arrow--prev']}`}
        >
          <ArrowLeftIcon />
        </button>
        <button
          type="button"
          aria-label="Next testimonial"
          className={`${styles['footer__testimonials-carousel__arrow']} ${styles['footer__testimonials-carousel__arrow--next']}`}
        >
          <ArrowRightIcon />
        </button>
      </div>

      <div className={styles['footer__testimonials-carousel__dots']} role="tablist" aria-label="Testimonial slides" />
    </div>
  )
}
