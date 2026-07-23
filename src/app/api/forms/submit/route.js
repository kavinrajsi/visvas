import { submitForm, validateFormData } from '@/lib/forms/submitForm'
import { RateLimiter } from '@/lib/security/rateLimiter'
import { isHoneypotTriggered, HONEYPOT_FIELD } from '@/lib/security/honeypot'
import { verifyRecaptcha } from '@/lib/security/recaptcha'
import { looksLikeSpamName } from '@/lib/security/spamName'

const rateLimiter = new RateLimiter({ windowMs: 60000, maxRequests: 5 })

export async function POST(request) {
  try {
    const body = await request.json()
    const { formType, formData, attribution, recaptchaToken } = body

    if (!formType || !formData) {
      return Response.json(
        { success: false, error: 'Missing formType or formData' },
        { status: 400 }
      )
    }

    // Rate limiting
    const clientIp = request.headers.get('cf-connecting-ip') ||
                     request.headers.get('x-real-ip') ||
                     'unknown'

    const rateLimitResult = rateLimiter.check(clientIp)
    if (!rateLimitResult.allowed) {
      return Response.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      )
    }

    // reCAPTCHA v3 (skipped when RECAPTCHA_SECRET_KEY is not set)
    const recaptcha = await verifyRecaptcha(recaptchaToken, {
      ip: clientIp,
      expectedAction: formType,
    })
    if (!recaptcha.ok) {
      console.log('[reCAPTCHA] rejected', {
        formType,
        ip: clientIp,
        reason: recaptcha.reason,
        score: recaptcha.score,
      })
      return Response.json(
        { success: false, error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      )
    }

    // Silently drop gibberish-name spam: respond as success but process
    // nothing, so bots believe it worked and do not retry.
    if (looksLikeSpamName(formData.name)) {
      console.log('[SPAM NAME] discarded', { formType, ip: clientIp, name: formData.name })
      return Response.json({ success: true, message: 'Form submitted successfully' })
    }

    // Validate form data
    const validation = validateFormData(formType, formData)
    if (!validation.valid) {
      return Response.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      )
    }

    // Check honeypot
    const isSpam = isHoneypotTriggered(formData)
    if (isSpam) {
      console.log('[SPAM]', { formType, ip: clientIp, email: formData.email })
    }

    console.log('[FORM SUBMIT]', { formType, ip: clientIp })

    // Strip honeypot before echoing fields back to the browser
    const { [HONEYPOT_FIELD]: _honeypot, ...safeFields } = formData

    // Submit form
    const result = await submitForm(formType, formData, {
      sendAdminEmail: true,
      sendUserEmail: true,
      storeInSheets: true,
      storeInPayload: true,
      metadata: {
        ip: clientIp,
        userAgent: request.headers.get('user-agent'),
        referer: request.headers.get('referer'),
        isSpam,
        attribution,
      },
    })

    if (result.success) {
      return Response.json({
        success: true,
        message: 'Form submitted successfully',
        id: result.payload?.id,
        fields: safeFields,
        destinations: result.destinations,
      })
    } else {
      return Response.json(
        {
          success: false,
          error: 'Form submission failed',
          fields: safeFields,
          destinations: result.destinations,
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('[API] Form submission error:', error.message)
    return Response.json(
      { success: false, error: 'Form submission encountered an error' },
      { status: 500 }
    )
  }
}
