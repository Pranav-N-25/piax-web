// Email bodies for the business contact form: an internal lead notification
// for the PIAX team and a branded acknowledgement for the dealer.

const PIAX = {
  email: 'contact@piax.co.in',
  whatsapp: '+91 94437 24783',
  whatsappLink: 'https://wa.me/919443724783',
  website: 'piax.co.in',
  websiteLink: 'https://piax.co.in',
}

const escapeHtml = (value = '') =>
  String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])

const fields = (lead) => [
  ['Name', lead.name],
  ['Business', lead.company],
  ['Partnership type', lead.partnership],
  ['Email', lead.email],
  ['Phone', lead.phone],
  ['City', lead.city],
  ['Message', lead.message],
].filter(([, value]) => value)

function leadNotification(lead) {
  const rows = fields(lead)
  return {
    subject: `New ${lead.partnership || 'business'} enquiry from ${lead.name}${lead.company ? ` (${lead.company})` : ''}`,
    text: `New partner enquiry from the piax.co.in contact form.\n\n${rows.map(([label, value]) => `${label}: ${value}`).join('\n')}`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#0f2622;max-width:560px">
        <h2 style="color:#0b5b4e;margin:0 0 12px">New partner enquiry</h2>
        <p style="margin:0 0 16px;color:#5a6c68">Submitted via the business contact form on ${PIAX.website}.</p>
        <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:14px">
          ${rows.map(([label, value]) => `
            <tr>
              <td style="border-bottom:1px solid #d6e7df;font-weight:bold;width:150px;vertical-align:top">${label}</td>
              <td style="border-bottom:1px solid #d6e7df;white-space:pre-wrap">${escapeHtml(value)}</td>
            </tr>`).join('')}
        </table>
      </div>`,
  }
}

function dealerAcknowledgement(lead) {
  const firstName = escapeHtml(lead.name.split(' ')[0])
  const partnership = lead.partnership ? ` about a <strong>${escapeHtml(lead.partnership)}</strong> partnership` : ''

  const text = `Hi ${lead.name.split(' ')[0]},

Thank you for reaching out to PIAX! We have received your information via the contact form on our website${lead.partnership ? ` about a ${lead.partnership} partnership` : ''}.

We're glad to connect with you. A member of our partnerships team will review your details and get back to you within 1-2 business days.

If you'd like to talk sooner, you can reach us anytime:
  Email:    ${PIAX.email}
  WhatsApp: ${PIAX.whatsapp} (${PIAX.whatsappLink})
  Website:  ${PIAX.websiteLink}

Warm regards,
Customer Care Team
PIAX Life Private Limited
Care for a brighter you.`

  const html = `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#eef7f2">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef7f2;padding:32px 12px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;color:#263c37">
          <tr>
            <td style="background:#0b5b4e;padding:28px 32px;text-align:center">
              <div style="font-size:30px;font-weight:bold;letter-spacing:.18em;color:#ffffff">PIAX</div>
              <div style="font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#d8eee3;margin-top:6px">Care for a brighter you</div>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 32px 8px">
              <h1 style="margin:0 0 16px;font-size:24px;color:#0f2622">Glad to connect with you, ${firstName}! 💚</h1>
              <p style="margin:0 0 14px;font-size:15px;line-height:1.6">Thank you for reaching out to PIAX. We have received your information via the contact form on our website${partnership}.</p>
              <p style="margin:0 0 14px;font-size:15px;line-height:1.6">A member of our partnerships team will review your details and get back to you within <strong>1–2 business days</strong>. Together, let’s make menstrual care more accessible, sustainable and stigma-free.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 24px">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#e0f2e9;border-radius:14px">
                <tr><td style="padding:20px 22px">
                  <div style="font-size:13px;font-weight:bold;letter-spacing:.14em;text-transform:uppercase;color:#0b5b4e;margin-bottom:12px">Reach us anytime</div>
                  <p style="margin:0 0 8px;font-size:14px">✉️&nbsp; Email: <a href="mailto:${PIAX.email}" style="color:#0b5b4e;font-weight:bold">${PIAX.email}</a></p>
                  <p style="margin:0 0 8px;font-size:14px">💬&nbsp; WhatsApp: <a href="${PIAX.whatsappLink}" style="color:#0b5b4e;font-weight:bold">${PIAX.whatsapp}</a></p>
                  <p style="margin:0;font-size:14px">🌐&nbsp; Website: <a href="${PIAX.websiteLink}" style="color:#0b5b4e;font-weight:bold">${PIAX.website}</a></p>
                </td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 32px 28px">
              <a href="${PIAX.whatsappLink}" style="display:inline-block;background:#0b5b4e;color:#ffffff;text-decoration:none;font-weight:bold;font-size:15px;padding:14px 28px;border-radius:999px">Chat with us on WhatsApp</a>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 32px;font-size:15px;line-height:1.6">
              Warm regards,<br />
              <strong style="color:#0f2622">Customer Care Team</strong><br />
              PIAX Life Private Limited
            </td>
          </tr>
          <tr>
            <td style="background:#f8f8f3;border-top:1px solid #d6e7df;padding:18px 32px;text-align:center;font-size:12px;color:#5a6c68;line-height:1.6">
              <a href="${PIAX.websiteLink}" style="color:#0b5b4e;text-decoration:none;font-weight:bold">${PIAX.website}</a> · ${PIAX.email} · ${PIAX.whatsapp}<br />
              You’re receiving this email because you submitted the business contact form on ${PIAX.website}.<br />
              © ${new Date().getFullYear()} PIAX LIFE PRIVATE LIMITED · Made in India
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`

  return { subject: 'We’ve received your enquiry – glad to connect with you! | PIAX', text, html }
}

module.exports = { PIAX, leadNotification, dealerAcknowledgement }
