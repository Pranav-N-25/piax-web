require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const nodemailer = require('nodemailer')
const { PIAX, dealerAcknowledgement, leadNotification } = require('./contactEmails')
const authRoutes = require('./auth/routes')
const { appUrl } = require('./auth/config')

const app = express()
// Session cookies cross from the website to this API, so CORS names the allowed sites instead of allowing any.
const origins = [appUrl, ...(process.env.CORS_ORIGIN?.split(',').map((origin) => origin.trim()).filter(Boolean) ?? [])]
app.use(cors({ origin: origins, credentials: true }))
app.use(express.json({ limit: '20kb' }))
app.use(cookieParser())
app.disable('x-powered-by')

app.use('/api/auth', authRoutes)

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: Number(process.env.SMTP_PORT || 465) === 465,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
})

// Dealer details go to the mailbox that sends the emails; the acknowledgement goes to the dealer's own address from the form.
const inbox = process.env.SMTP_USER
const from = process.env.MAIL_FROM || `PIAX Customer Care <${inbox}>`

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const limits = { name: 100, company: 150, partnership: 50, email: 200, phone: 30, city: 100, message: 2000 }

function readLead(body = {}) {
  const lead = {}
  for (const [key, max] of Object.entries(limits)) lead[key] = String(body[key] ?? '').trim().slice(0, max)
  if (!lead.name) return { error: 'Please tell us your name.' }
  if (!EMAIL.test(lead.email)) return { error: 'Please enter a valid email address.' }
  if (!/^[+\d][\d\s-]{6,}$/.test(lead.phone)) return { error: 'Please enter a valid phone number.' }
  return { lead }
}

app.post('/api/contact', async (req, res) => {
  // Honeypot: real visitors never fill the hidden `website` field.
  if (req.body?.website) return res.json({ ok: true })

  const { lead, error } = readLead(req.body)
  if (error) return res.status(400).json({ error })

  try {
    await transporter.sendMail({ from, to: inbox, replyTo: lead.email, ...leadNotification(lead) })
    await transporter.sendMail({ from, to: lead.email, replyTo: PIAX.email, ...dealerAcknowledgement(lead) })
    res.json({ ok: true })
  } catch (err) {
    console.error('Contact email failed:', err)
    res.status(502).json({ error: 'We couldn’t send your message right now. Please try WhatsApp or email us directly.' })
  }
})

const port = Number(process.env.PORT || 5000)
app.listen(port, () => console.log(`PIAX API listening on http://localhost:${port}`))
