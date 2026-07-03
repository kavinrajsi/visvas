'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Testimonial from '../Testimonial'
import { VideoPlaybackProvider } from '../VideoPlaybackContext'
import styles from './Footer.module.scss'

export default function TestimonialsCarousel({ testimonials }) {
  if (testimonials.length === 0) return null

  return (
    <VideoPlaybackProvider>
      <div className={styles['footer__testimonials-carousel']}>
        <Swiper
          breakpoints={{
            0: { slidesPerView: 1 },
            562: { slidesPerView: 1.5 },
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
          spaceBetween={24}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className={styles['footer__testimonials-item']}>
              <Testimonial testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </VideoPlaybackProvider>
  )
}
