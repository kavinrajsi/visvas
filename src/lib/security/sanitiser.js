export function sanitiseFormType(formType) {
  if (typeof formType !== 'string') return 'unknown'
  return formType.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 50) || 'unknown'
}
