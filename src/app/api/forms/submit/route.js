import { submitForm, validateFormData } from '@/lib/forms/submitForm'
import { RateLimiter } from '@/lib/security/rateLimiter'
import { isHoneypotTriggered, HONEYPOT_FIELD } from '@/lib/security/honeypot'
import { verifyRecaptcha } from '@/lib/security/recaptcha'

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

    // Submit form.
    // On a honeypot hit the Payload row is still written (audit trail) but every
    // outbound destination is skipped, so spam never reaches the CRM or an inbox.
    const result = await submitForm(formType, formData, {
      sendAdminEmail: !isSpam,
      sendUserEmail: !isSpam,
      storeInSheets: !isSpam,
      storeInPayload: true,
      storeInZoho: !isSpam,
      metadata: {
        ip: clientIp,
        userAgent: request.headers.get('user-agent'),
        referer: request.headers.get('referer'),
        isSpam,
        attribution,
      },
    })

    // `result.success` means the lead was durably stored. Secondary destinations
    // (Sheets/Zoho/email) may still have failed — surfaced as `degraded` and
    // recorded in form-submission-logs, but never shown to the user as a failure.
    if (result.success) {
      if (result.degraded) {
        console.error('[FORM SUBMIT] lead saved with destination failures', {
          formType,
          id: result.payload?.id,
          errors: result.errors,
        })
      }
      return Response.json({
        success: true,
        message: 'Form submitted successfully',
        id: result.payload?.id,
        degraded: result.degraded,
        fields: safeFields,
        destinations: result.destinations,
      })
    }

    return Response.json(
      {
        success: false,
        error: 'Form submission failed',
        fields: safeFields,
        destinations: result.destinations,
      },
      { status: 500 }
    )
  } catch (error) {
    console.error('[API] Form submission error:', error.message)
    return Response.json(
      { success: false, error: 'Form submission encountered an error' },
      { status: 500 }
    )
  }
}
