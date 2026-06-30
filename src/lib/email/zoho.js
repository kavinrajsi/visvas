// Zeptomail (Zoho Mail) transactional email service

const ZOHO_CONFIG = {
  apiToken: process.env.ZOHO_ZEPTOMAIL_TOKEN,
  senderEmail: process.env.ZOHO_ZEPTOMAIL_SENDER_EMAIL,
  senderName: process.env.ZOHO_ZEPTOMAIL_SENDER_NAME || 'Visvas Properties',
  apiUrl: 'https://api.zeptomail.com/v1.1/email',
}

export async function sendEmail({ to, subject, html, bcc = null, replyTo = null }) {
  try {
    const payload = {
      from: {
        address: ZOHO_CONFIG.senderEmail,
        name: ZOHO_CONFIG.senderName,
      },
      to: Array.isArray(to) ? to.map(email => ({ email_address: { address: email } })) : [{ email_address: { address: to } }],
      subject,
      htmlbody: html,
      ...(bcc && { bcc: Array.isArray(bcc) ? bcc.map(email => ({ email_address: { address: email } })) : [{ email_address: { address: bcc } }] }),
      ...(replyTo && { reply_to: { address: replyTo } }),
    }

    // Dev/missing config: log instead of send
    if (!ZOHO_CONFIG.apiToken || !ZOHO_CONFIG.senderEmail) {
      console.log('[EMAIL] Missing config - email would be sent:', {
        to: payload.to,
        bcc: payload.bcc,
        subject: payload.subject,
      })
      return { success: true, messageId: `dev_${Date.now()}`, mode: 'development' }
    }

    // Production: send via Zeptomail API
    const response = await fetch(ZOHO_CONFIG.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-enczapikey ${ZOHO_CONFIG.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Zeptomail API error: ${response.status} ${error}`)
    }

    const result = await response.json()
    return { success: true, messageId: result.data?.message_id }
  } catch (error) {
    console.error('[EMAIL] Error sending email:', error.message)
    return { success: false, error: error.message }
  }
}

export async function sendAdminNotification(data) {
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) {
    console.log('[EMAIL] Missing ADMIN_EMAIL env - skipping admin notification')
    return { success: true, mode: 'skipped' }
  }

  const html = formatAdminEmail(data)

  return sendEmail({
    to: adminEmail,
    subject: `New Form Submission: ${data.formType || 'Unknown'}`,
    html,
    replyTo: data.email,
  })
}

export async function sendUserConfirmation(data) {
  if (!data.email) return { success: false, error: 'No user email provided' }

  const html = formatUserEmail(data)

  return sendEmail({
    to: data.email,
    subject: `Confirmation: We received your inquiry`,
    html,
    bcc: process.env.ADMIN_EMAIL || undefined,
  })
}

function formatAdminEmail(data) {
  const htmlEscape = (str) => {
    if (typeof str !== 'string') return String(str)
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  }

  return `
    <h2>New Form Submission</h2>
    <p><strong>Form Type:</strong> ${htmlEscape(data.formType || 'Unknown')}</p>
    <p><strong>Timestamp:</strong> ${htmlEscape(new Date(data.timestamp).toLocaleString())}</p>
    <hr/>
    <h3>Submitted Data:</h3>
    <pre>${htmlEscape(JSON.stringify(data.formData, null, 2))}</pre>
    <hr/>
    <p><strong>IP:</strong> ${htmlEscape(data.ip || 'Unknown')}</p>
  `
}

function formatUserEmail(data) {
  const htmlEscape = (str) => {
    if (typeof str !== 'string') return String(str)
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  }

  return `
    <h2>Thank You for Your Inquiry</h2>
    <p>Hi ${htmlEscape(data.formData?.name || 'there')},</p>
    <p>We have received your inquiry and will get back to you shortly.</p>
    <p><strong>Submission Reference:</strong> ${htmlEscape(data.id || 'N/A')}</p>
    <hr/>
    <p>Best regards,<br/>Visvas Properties Team</p>
  `
}
