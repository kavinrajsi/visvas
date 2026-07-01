export const HONEYPOT_FIELD = 'company'

export function isHoneypotTriggered(formData) {
  if (!formData) return false
  const value = formData[HONEYPOT_FIELD]
  return value && value.trim().length > 0
}
