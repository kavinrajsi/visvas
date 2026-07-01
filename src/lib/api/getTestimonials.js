import { getPayload } from 'payload'
import config from '@payload-config'

export async function getTestimonials() {
  const payload = await getPayload({ config })
  try {
    const testimonials = await payload.find({
      collection: 'testimonials',
      limit: 1000,
    })
    return testimonials.docs
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}
