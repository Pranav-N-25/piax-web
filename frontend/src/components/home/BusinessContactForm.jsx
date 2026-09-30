import { CheckCircle2, Globe, Mail, MessageCircle, Send } from 'lucide-react'
import { useState } from 'react'
import { btn, cn, heading } from './homeStyles.js'

const CONTACT = {
  email: 'contact@piax.co.in',
  whatsapp: '919443724783',
  whatsappLabel: '+91 94437 24783',
  website: 'piax.co.in',
}

const partnerships = ['Distributor', 'Retailer', 'Quick Commerce', 'Institution', 'CSR', 'Vending']
const empty = { name: '', company: '', partnership: '', email: '', phone: '', city: '', message: '', website: '' }

const label = 'flex flex-col gap-1.5 text-[12.5px] font-semibold text-ink'
const input = 'w-full rounded-xl border border-line bg-white px-4 py-3 text-sm font-normal text-body outline-none transition-[border-color,box-shadow] focus:border-brand focus:shadow-[0_0_0_3px_var(--color-brand-soft)]'

function whatsappText(form) {
  const lines = [
    'Hello PIAX! I’d like to partner with you.',
    form.name && `Name: ${form.name}`,
    form.company && `Business: ${form.company}`,
    form.partnership && `Partnership type: ${form.partnership}`,
    form.city && `City: ${form.city}`,
    form.phone && `Phone: ${form.phone}`,
    form.email && `Email: ${form.email}`,
    form.message && `Message: ${form.message}`,
  ]
  return encodeURIComponent(lines.filter(Boolean).join('\n'))
}

export default function BusinessContactForm() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  async function submit(event) {
    event.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error)
      setStatus('sent')
    } catch (err) {
      setError(err.message || 'We couldn’t send your message right now. Please try WhatsApp or email us directly.')
      setStatus('idle')
    }
  }

  function openWhatsapp() {
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${whatsappText(form)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div id="business-contact" className="mt-12 grid scroll-mt-24 gap-8 rounded-[24px] bg-white p-6 shadow-soft md:p-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.4fr)] lg:gap-12">
      <div className="flex flex-col">
        <h3 className={cn(heading, 'text-[clamp(24px,2.2vw,30px)]')}>Let’s talk partnership.</h3>
        <p className="mt-3 mb-6 text-[15px]">Share a few details and our partnerships team will get back to you within 1–2 business days. Prefer to chat? Reach us on WhatsApp.</p>
        <ul className="flex flex-col gap-4 text-sm">
          <li>
            <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-brand-2">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand"><MessageCircle size={20} /></span>
              <span><strong className="block text-ink">WhatsApp</strong>{CONTACT.whatsappLabel}</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 hover:text-brand-2">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand"><Mail size={20} /></span>
              <span><strong className="block text-ink">Email</strong>{CONTACT.email}</span>
            </a>
          </li>
          <li>
            <a href={`https://${CONTACT.website}`} className="flex items-center gap-3 hover:text-brand-2">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand"><Globe size={20} /></span>
              <span><strong className="block text-ink">Website</strong>{CONTACT.website}</span>
            </a>
          </li>
        </ul>
      </div>

      {status === 'sent' ? (
        <div role="status" className="flex flex-col items-center justify-center gap-3 rounded-[18px] bg-tone-mint p-8 text-center">
          <CheckCircle2 size={44} strokeWidth={1.5} className="text-brand" />
          <h4 className={cn(heading, 'text-xl')}>Thank you, {form.name.split(' ')[0]}!</h4>
          <p className="max-w-[420px] text-sm">We’ve received your details and sent a confirmation to <strong>{form.email}</strong>. Our team will be in touch shortly.</p>
          <button type="button" className={cn(btn.base, btn.outline, btn.small, 'mt-2')} onClick={() => { setForm(empty); setStatus('idle') }}>Send another enquiry</button>
        </div>
      ) : (
        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
          <label className={label}>Full name*<input name="name" required maxLength={100} autoComplete="name" value={form.name} onChange={update} className={input} /></label>
          <label className={label}>Business name<input name="company" maxLength={150} autoComplete="organization" value={form.company} onChange={update} className={input} /></label>
          <label className={label}>Email*<input name="email" type="email" required maxLength={200} autoComplete="email" value={form.email} onChange={update} className={input} /></label>
          <label className={label}>Phone / WhatsApp*<input name="phone" type="tel" required pattern="[+\d][\d\s\-]{6,}" maxLength={30} autoComplete="tel" value={form.phone} onChange={update} className={input} /></label>
          <label className={label}>Partnership type
            <select name="partnership" value={form.partnership} onChange={update} className={input}>
              <option value="">Select a type</option>
              {partnerships.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>
          <label className={label}>City<input name="city" maxLength={100} autoComplete="address-level2" value={form.city} onChange={update} className={input} /></label>
          <label className={cn(label, 'sm:col-span-2')}>Message<textarea name="message" rows={4} maxLength={2000} value={form.message} onChange={update} placeholder="Tell us about your business and what you’re looking for" className={cn(input, 'resize-y')} /></label>
          {/* Honeypot for bots: hidden from people and assistive tech. */}
          <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={update} className="hidden" />

          {error && <p role="alert" className="text-sm font-semibold text-[#b3261e] sm:col-span-2">{error}</p>}

          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <button type="submit" disabled={status === 'sending'} className={cn(btn.base, btn.solid)}>
              <Send size={18} />{status === 'sending' ? 'Sending…' : 'Send enquiry'}
            </button>
            <button type="button" onClick={openWhatsapp} className={cn(btn.base, btn.outline)}>
              <MessageCircle size={18} />Chat on WhatsApp
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
