// Client-side reCAPTCHA v3 helper.
//
// Loads the script once, on first use, and returns a token for the given
// action. Returns null when not configured or on any failure, so callers can
// submit without a token; the server decides whether to enforce.

let scriptPromise = null

function loadScript(siteKey) {
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && window.grecaptcha) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => {
      scriptPromise = null // allow a retry on the next submit
      reject(new Error('recaptcha-load-failed'))
    }
    document.head.appendChild(script)
  })

  return scriptPromise
}

export async function getRecaptchaToken(action) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  if (!siteKey) return null // not configured

  try {
    await loadScript(siteKey)
    await new Promise((resolve) => window.grecaptcha.ready(resolve))
    return await window.grecaptcha.execute(siteKey, { action })
  } catch {
    return null // server still enforces when it is configured
  }
}
