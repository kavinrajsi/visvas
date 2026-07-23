// Server-side reCAPTCHA v3 verification.
//
// Graceful-fail like the other integrations: with no RECAPTCHA_SECRET_KEY the
// check is skipped so local/dev keeps working. When configured, a missing token
// or a bot-like result is rejected, but a Google outage fails open — a real
// estate lead form should not silently drop leads if the verifier is down, and
// the rate limiter + honeypot still apply.

const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'
const MIN_SCORE = 0.5

export async function verifyRecaptcha(token, { ip, expectedAction } = {}) {
  const secret = process.env.RECAPTCHA_SECRET_KEY

  // Not configured → skip.
  if (!secret) return { ok: true, skipped: true }

  // Configured but the client sent nothing → treat as a bot.
  if (!token) return { ok: false, reason: 'missing-token' }

  try {
    const params = new URLSearchParams({ secret, response: token })
    if (ip && ip !== 'unknown') params.set('remoteip', ip)

    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    })
    const data = await res.json()

    if (!data.success) {
      return { ok: false, reason: 'verification-failed', errorCodes: data['error-codes'] }
    }
    if (expectedAction && data.action && data.action !== expectedAction) {
      return { ok: false, reason: 'action-mismatch', action: data.action }
    }
    if (typeof data.score === 'number' && data.score < MIN_SCORE) {
      return { ok: false, reason: 'low-score', score: data.score }
    }

    return { ok: true, score: data.score }
  } catch (err) {
    // Verifier unreachable → fail open rather than lose the lead.
    console.error('[reCAPTCHA] verify error:', err.message)
    return { ok: true, skipped: true, error: err.message }
  }
}
