import { submitForm, validateFormData } from '@/lib/forms/submitForm'

export async function POST(request) {
  try {
    const body = await request.json()
    const { formType, formData } = body

    if (!formType || !formData) {
      return Response.json(
        { success: false, error: 'Missing formType or formData' },
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

    // Get client IP
    const clientIp = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown'

    // Submit form
    const result = await submitForm(formType, formData, {
      sendAdminEmail: true,
      sendUserEmail: true,
      storeInDb: true,
      storeInSheets: true,
      metadata: {
        ip: clientIp,
        userAgent: request.headers.get('user-agent'),
        referer: request.headers.get('referer'),
      },
    })

    if (result.success) {
      return Response.json({
        success: true,
        message: 'Form submitted successfully',
        id: result.db?.id,
      })
    } else {
      return Response.json(
        {
          success: false,
          error: 'Form submission failed',
          errors: result.errors,
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('[API] Form submission error:', error.message)
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}
