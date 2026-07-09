// Gmail (Google Workspace) SMTP email service — sends as no-reply@visvas.in
import nodemailer from 'nodemailer'

const GMAIL_CONFIG = {
  user: process.env.GMAIL_USER,
  appPassword: process.env.GMAIL_APP_PASSWORD,
  senderEmail: process.env.GMAIL_SENDER_EMAIL,
  senderName: process.env.GMAIL_SENDER_NAME,
}

let transporter = null

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: GMAIL_CONFIG.user,
        pass: GMAIL_CONFIG.appPassword,
      },
    })
  }
  return transporter
}

export async function sendEmail({ to, subject, html, bcc = null, replyTo = null }) {
  try {
    // Dev/missing config: log instead of send
    if (!GMAIL_CONFIG.user || !GMAIL_CONFIG.appPassword || !GMAIL_CONFIG.senderEmail) {
      console.log('[EMAIL] Missing Gmail config - email would be sent:', {
        to,
        bcc,
        subject,
      })
      return { success: true, messageId: `dev_${Date.now()}`, mode: 'development' }
    }

    const info = await getTransporter().sendMail({
      from: GMAIL_CONFIG.senderName
        ? `"${GMAIL_CONFIG.senderName}" <${GMAIL_CONFIG.senderEmail}>`
        : GMAIL_CONFIG.senderEmail,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject,
      html,
      ...(bcc && { bcc: Array.isArray(bcc) ? bcc.join(', ') : bcc }),
      ...(replyTo && { replyTo }),
    })

    return { success: true, messageId: info.messageId }
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

function htmlEscape(str) {
  if (typeof str !== 'string') return String(str)
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatAdminEmail(data) {
  let attributionBlock = ''
  if (data.attribution) {
    const { firstTouch, lastTouch, referrerDomain, previousPage } = data.attribution
    attributionBlock = '<h3>Attribution:</h3>'
    if (firstTouch) {
      attributionBlock += `<p><strong>First Touch:</strong><br/>
        UTM Source: ${htmlEscape(firstTouch.utmSource || '—')}<br/>
        UTM Medium: ${htmlEscape(firstTouch.utmMedium || '—')}<br/>
        UTM Campaign: ${htmlEscape(firstTouch.utmCampaign || '—')}<br/>
        GCLID: ${htmlEscape(firstTouch.gclid || '—')}<br/>
        FBCLID: ${htmlEscape(firstTouch.fbclid || '—')}<br/>
        Landing Page: ${htmlEscape(firstTouch.landingPage || '—')}
      </p>`
    }
    if (lastTouch) {
      attributionBlock += `<p><strong>Last Touch:</strong><br/>
        UTM Source: ${htmlEscape(lastTouch.utmSource || '—')}<br/>
        UTM Medium: ${htmlEscape(lastTouch.utmMedium || '—')}<br/>
        UTM Campaign: ${htmlEscape(lastTouch.utmCampaign || '—')}<br/>
        GCLID: ${htmlEscape(lastTouch.gclid || '—')}<br/>
        FBCLID: ${htmlEscape(lastTouch.fbclid || '—')}
      </p>`
    }
    if (referrerDomain) {
      attributionBlock += `<p><strong>Referrer Domain:</strong> ${htmlEscape(referrerDomain)}</p>`
    }
    if (previousPage) {
      attributionBlock += `<p><strong>Previous Page:</strong> ${htmlEscape(previousPage)}</p>`
    }
    attributionBlock += '<hr/>'
  }

  const spamFlag = data.isSpam ? '<p style="color:red;"><strong>⚠️ FLAGGED AS SPAM (Honeypot triggered)</strong></p><hr/>' : ''

  return `
    <h2>New Form Submission</h2>
    <p><strong>Form Type:</strong> ${htmlEscape(data.formType || 'Unknown')}</p>
    <p><strong>Timestamp:</strong> ${htmlEscape(new Date(data.timestamp).toLocaleString())}</p>
    ${spamFlag}
    ${attributionBlock}
    <h3>Submitted Data:</h3>
    <pre>${htmlEscape(JSON.stringify(data.formData, null, 2))}</pre>
    <hr/>
    <p><strong>IP:</strong> ${htmlEscape(data.ip || 'Unknown')}</p>
  `
}

function formatUserEmail(data) {
  return `
    <p><strong>Hi ${htmlEscape(data.formData?.name || 'there')},</strong></p>
    <h2>Thank You for Your Inquiry</h2>
    <p>We have received your inquiry and will get back to you shortly.</p>
    <p><strong>Submission Reference:</strong> ${htmlEscape(data.id || 'N/A')}</p>
    <hr/>
    <p>Best regards,<br/>Visvas Team</p>
  `
}
