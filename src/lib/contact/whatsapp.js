// wa.me needs a bare country-code + number with no spaces or punctuation.
export const DEFAULT_WHATSAPP_MESSAGE = "Hi, I'd like to know more about your projects."

export function whatsAppHref(number, message = DEFAULT_WHATSAPP_MESSAGE) {
  const digits = String(number || '').replace(/\D/g, '')
  if (!digits) return null
  const base = `https://wa.me/${digits}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
