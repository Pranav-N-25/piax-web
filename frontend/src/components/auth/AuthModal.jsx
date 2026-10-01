import { useEffect, useId, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, CalendarHeart, Eye, EyeOff, Loader2, Lock, Mail, MessageCircleHeart, Smartphone, Truck } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import Dialog from '../common/Dialog.jsx'
import { cn } from '../common/ui.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { authService } from '../../services/authService.js'
import { padById, standardPack } from '../../data/piaxRange.js'
import heroPhoto from '../../assets/about/about-hero.webp'
import piaxLogo from '../../assets/piax_logo.png'

// ---------- Brand marks for the social buttons (official colours) ----------
const GoogleMark = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.5 14.6 2.5 12 2.5 6.8 2.5 2.6 6.7 2.6 12s4.2 9.5 9.4 9.5c5.4 0 9-3.8 9-9.2 0-.6-.1-1.1-.2-1.6H12z" />
    <path fill="#34A853" d="M3.7 7.6l3.2 2.3C7.8 7.9 9.7 6.4 12 6.4c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.5 14.6 2.5 12 2.5 8.3 2.5 5.2 4.6 3.7 7.6z" opacity="0" />
    <path fill="#FBBC05" d="M2.6 12c0 1.6.4 3 1 4.3l3.4-2.6c-.2-.5-.3-1.1-.3-1.7s.1-1.2.3-1.7L3.6 7.7c-.6 1.3-1 2.7-1 4.3z" />
    <path fill="#34A853" d="M12 21.5c2.6 0 4.7-.9 6.3-2.3l-3.1-2.4c-.8.6-1.9 1-3.2 1-2.5 0-4.6-1.7-5.3-4l-3.4 2.6c1.6 3 4.8 5.1 8.7 5.1z" />
    <path fill="#4285F4" d="M21 12.3c0-.6-.1-1.1-.2-1.6H12v3.9h5.5c-.3 1.3-1 2.3-2.3 3.1l3.1 2.4c1.8-1.7 2.7-4.1 2.7-7.8z" />
  </svg>
)
const FacebookMark = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <circle cx="12" cy="12" r="10.5" fill="#1877F2" />
    <path fill="#fff" d="M13.4 21.4v-6.6h2.2l.4-2.6h-2.6v-1.7c0-.7.3-1.4 1.4-1.4H16V6.9s-1-.2-2-.2c-2.1 0-3.4 1.2-3.4 3.5v2h-2.3v2.6h2.3v6.6c.9.1 1.9.1 2.8 0z" />
  </svg>
)
const InstagramMark = () => {
  const id = useId()
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="30%" cy="107%" r="150%">
          <stop offset="0" stopColor="#FDF497" /><stop offset=".05" stopColor="#FDF497" /><stop offset=".45" stopColor="#FD5949" /><stop offset=".6" stopColor="#D6249F" /><stop offset=".9" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill={`url(#${id})`} />
      <rect x="6.3" y="6.3" width="11.4" height="11.4" rx="3.6" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2.8" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="16.4" cy="7.6" r="1" fill="#fff" />
    </svg>
  )
}

const socials = [
  { id: 'google', label: 'Google', Mark: GoogleMark },
  { id: 'facebook', label: 'Facebook', Mark: FacebookMark },
  { id: 'instagram', label: 'Instagram', Mark: InstagramMark },
]

const perks = [
  { icon: CalendarHeart, text: 'Track your cycle and get gentle reminders' },
  { icon: MessageCircleHeart, text: 'Ask PIAX AI anything, privately' },
  { icon: Truck, text: 'Faster checkout and order tracking' },
]

const field = 'h-12 w-full rounded-xl border bg-white px-4 text-[15px] text-ink placeholder:text-[#9aa8a3] transition-[border-color,box-shadow] outline-none focus:border-brand focus:shadow-[0_0_0_4px_rgba(0,127,109,.12)]'
const fieldState = (invalid) => (invalid ? 'border-[#d9475e]' : 'border-[#dbe5e0]')
const primary = 'relative inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand text-[15px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(0,127,109,.7)] transition-[background-color,transform] hover:bg-[#006a5b] active:scale-[.99] disabled:cursor-not-allowed disabled:opacity-60'

function Field({ label, error, id, children, hint }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-semibold text-ink">{label}</label>
      {children}
      {error ? <p id={`${id}-error`} className="mt-1.5 text-[12.5px] text-[#c23a55]">{error}</p> : hint}
    </div>
  )
}

function PasswordInput({ id, value, onChange, error, autoComplete }) {
  const [shown, setShown] = useState(false)
  return (
    <div className="relative">
      <Lock size={17} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" aria-hidden="true" />
      <input
        id={id}
        type={shown ? 'text' : 'password'}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(field, fieldState(error), 'pr-12 pl-11')}
        required
      />
      <button
        type="button"
        onClick={() => setShown((value) => !value)}
        aria-label={shown ? 'Hide password' : 'Show password'}
        aria-pressed={shown}
        className="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-muted hover:bg-mist hover:text-ink"
      >
        {shown ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  )
}

// Rough strength for the sign-up hint: length plus a mix of character kinds.
function strength(password) {
  if (!password) return null
  const kinds = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((pattern) => pattern.test(password)).length
  if (password.length < 8) return { score: 1, label: 'Too short — use at least 8 characters' }
  if (password.length >= 12 && kinds >= 3) return { score: 4, label: 'Strong password' }
  if (kinds >= 3 || password.length >= 12) return { score: 3, label: 'Good password' }
  return { score: 2, label: 'Okay — add numbers or symbols to make it stronger' }
}

function FormError({ message }) {
  if (!message) return null
  return <p role="alert" className="rounded-xl bg-[#fdecef] px-4 py-3 text-[13px] text-[#a52d47] motion-drop">{message}</p>
}

// ---------- Email & password ----------
function EmailForm({ mode }) {
  const { register, loginWithEmail } = useAuth()
  const [values, setValues] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const ids = { name: useId(), email: useId(), password: useId() }
  const signup = mode === 'signup'
  const set = (key) => (value) => {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined, form: undefined }))
  }
  const meter = signup ? strength(values.password) : null

  const submit = async (event) => {
    event.preventDefault()
    const found = {}
    if (signup && !values.name.trim()) found.name = 'Please tell us your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) found.email = 'Please enter a valid email address.'
    if (signup ? values.password.length < 8 : !values.password) found.password = signup ? 'Use at least 8 characters.' : 'Please enter your password.'
    setErrors(found)
    if (Object.keys(found).length) return
    setBusy(true)
    try {
      if (signup) await register(values.name.trim(), values.email.trim(), values.password)
      else await loginWithEmail(values.email.trim(), values.password)
    } catch (err) {
      setErrors(err.field ? { [err.field]: err.message } : { form: err.message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} noValidate className="grid min-w-0 grid-cols-1 gap-4 motion-drop">
      <FormError message={errors.form} />
      {signup && (
        <Field label="Your name" id={ids.name} error={errors.name}>
          <input id={ids.name} value={values.name} onChange={(event) => set('name')(event.target.value)} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${ids.name}-error` : undefined} className={cn(field, fieldState(errors.name))} data-autofocus required />
        </Field>
      )}
      <Field label="Email" id={ids.email} error={errors.email}>
        <div className="relative">
          <Mail size={17} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input id={ids.email} type="email" inputMode="email" value={values.email} onChange={(event) => set('email')(event.target.value)} autoComplete="email" placeholder="you@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? `${ids.email}-error` : undefined} className={cn(field, fieldState(errors.email), 'pl-11')} data-autofocus={signup ? undefined : true} required />
        </div>
      </Field>
      <Field
        label="Password"
        id={ids.password}
        error={errors.password}
        hint={meter && (
          <div className="mt-2" aria-live="polite">
            <div className="flex gap-1" aria-hidden="true">
              {[1, 2, 3, 4].map((step) => (
                <span key={step} className={cn('h-1 flex-1 rounded-full transition-colors', step <= meter.score ? ['', 'bg-[#d9475e]', 'bg-[#e0a33a]', 'bg-[#4fae8f]', 'bg-brand'][meter.score] : 'bg-[#e4ece8]')} />
              ))}
            </div>
            <p className="mt-1.5 text-[12px] text-muted">{meter.label}</p>
          </div>
        )}
      >
        <PasswordInput id={ids.password} value={values.password} onChange={set('password')} error={errors.password} autoComplete={signup ? 'new-password' : 'current-password'} />
      </Field>
      <button type="submit" disabled={busy} className={primary}>
        {busy ? <Loader2 size={18} className="animate-spin" /> : null}
        {busy ? (signup ? 'Creating your account…' : 'Logging in…') : (signup ? 'Create account' : 'Log in')}
        {!busy && <ArrowRight size={18} />}
      </button>
    </form>
  )
}

// ---------- Mobile number + one-time code ----------
const CODE_LENGTH = 6

function CodeInput({ value, onChange, invalid, describedBy }) {
  const refs = useRef([])
  const digits = Array.from({ length: CODE_LENGTH }, (_, index) => value[index] ?? '')

  const setAt = (index, digit) => {
    const next = digits.slice()
    next[index] = digit
    onChange(next.join('').slice(0, CODE_LENGTH))
  }
  const handleChange = (index, raw) => {
    const clean = raw.replace(/\D/g, '')
    if (clean.length > 1) {
      // Pasted or autofilled code: spread it across the boxes.
      onChange(clean.slice(0, CODE_LENGTH))
      refs.current[Math.min(clean.length, CODE_LENGTH) - 1]?.focus()
      return
    }
    setAt(index, clean)
    if (clean && index < CODE_LENGTH - 1) refs.current[index + 1]?.focus()
  }
  const handleKey = (index, event) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) refs.current[index - 1]?.focus()
    if (event.key === 'ArrowLeft' && index > 0) refs.current[index - 1]?.focus()
    if (event.key === 'ArrowRight' && index < CODE_LENGTH - 1) refs.current[index + 1]?.focus()
  }

  return (
    <div role="group" aria-label="6-digit code" aria-describedby={describedBy} className="flex justify-between gap-2">
      {digits.map((digit, index) => (
        <input
          // Fixed-length row of boxes; the index is the box's identity.
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          ref={(node) => { refs.current[index] = node }}
          value={digit}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKey(index, event)}
          onFocus={(event) => event.target.select()}
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={index === 0 ? CODE_LENGTH : 1}
          aria-label={`Digit ${index + 1}`}
          aria-invalid={invalid}
          data-autofocus={index === 0 ? true : undefined}
          className={cn(
            'h-13 w-full min-w-0 rounded-xl border bg-white text-center text-[20px] font-semibold text-ink outline-none transition-[border-color,box-shadow,transform] focus:border-brand focus:shadow-[0_0_0_4px_rgba(0,127,109,.12)]',
            invalid ? 'border-[#d9475e]' : digit ? 'border-brand' : 'border-[#dbe5e0]',
          )}
        />
      ))}
    </div>
  )
}

function PhoneForm({ mode, devOtp }) {
  const { requestOtp, verifyOtp } = useAuth()
  const [step, setStep] = useState('phone')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [sentTo, setSentTo] = useState('')
  const [devCode, setDevCode] = useState('')
  const [wait, setWait] = useState(0)
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const ids = { phone: useId(), name: useId(), code: useId() }
  const signup = mode === 'signup'

  useEffect(() => {
    if (wait <= 0) return undefined
    const timer = setTimeout(() => setWait((seconds) => seconds - 1), 1000)
    return () => clearTimeout(timer)
  }, [wait])

  const send = async (event) => {
    event?.preventDefault()
    const digits = phone.replace(/\D/g, '')
    const found = {}
    if (signup && !name.trim()) found.name = 'Please tell us your name.'
    if (!/^[6-9]\d{9}$/.test(digits)) found.phone = 'Please enter a valid 10-digit mobile number.'
    setErrors(found)
    if (Object.keys(found).length) return
    setBusy(true)
    try {
      const result = await requestOtp(digits)
      setSentTo(result.phone)
      setDevCode(result.devCode ?? '')
      setWait(result.resendIn ?? 30)
      setCode('')
      setStep('code')
    } catch (err) {
      setErrors(err.field ? { [err.field]: err.message } : { form: err.message })
    } finally {
      setBusy(false)
    }
  }

  const verify = async (event) => {
    event?.preventDefault()
    if (code.length !== CODE_LENGTH) {
      setErrors({ code: 'Enter the 6-digit code we sent you.' })
      return
    }
    setBusy(true)
    try {
      await verifyOtp(sentTo, code, name.trim())
    } catch (err) {
      setErrors({ code: err.message })
      setCode('')
    } finally {
      setBusy(false)
    }
  }

  // Submit as soon as the last digit is in.
  useEffect(() => {
    if (step === 'code' && code.length === CODE_LENGTH && !busy) verify()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  if (step === 'code') {
    return (
      <form onSubmit={verify} noValidate className="grid min-w-0 grid-cols-1 gap-4 motion-drop">
        <button type="button" onClick={() => { setStep('phone'); setErrors({}) }} className="inline-flex w-fit cursor-pointer items-center gap-1.5 text-[13px] font-semibold text-brand hover:underline">
          <ArrowLeft size={15} /> Change number
        </button>
        <div>
          <p className="text-[15px] font-semibold text-ink">Enter the code</p>
          <p id={`${ids.code}-help`} className="mt-1 text-[13px] text-muted">We sent a 6-digit code to <strong className="text-ink">{sentTo.replace(/^\+91/, '+91 ')}</strong>.</p>
        </div>
        <CodeInput value={code} onChange={(next) => { setCode(next); setErrors({}) }} invalid={Boolean(errors.code)} describedBy={`${ids.code}-help`} />
        {errors.code && <p role="alert" className="text-[12.5px] text-[#c23a55]">{errors.code}</p>}
        {devCode && <p className="rounded-xl bg-[#fff6e5] px-4 py-2.5 text-[12.5px] text-[#8a5a00]">Development mode: use code <strong>{devCode}</strong>.</p>}
        <button type="submit" disabled={busy} className={primary}>
          {busy ? <><Loader2 size={18} className="animate-spin" /> Checking…</> : <>Verify &amp; continue <ArrowRight size={18} /></>}
        </button>
        <p className="text-center text-[13px] text-muted" aria-live="polite">
          {wait > 0 ? <>Resend code in <strong className="tabular-nums text-ink">0:{String(wait).padStart(2, '0')}</strong></> : (
            <button type="button" onClick={send} disabled={busy} className="cursor-pointer font-semibold text-brand hover:underline">Resend code</button>
          )}
        </p>
      </form>
    )
  }

  return (
    <form onSubmit={send} noValidate className="grid min-w-0 grid-cols-1 gap-4 motion-drop">
      <FormError message={errors.form} />
      {signup && (
        <Field label="Your name" id={ids.name} error={errors.name}>
          <input id={ids.name} value={name} onChange={(event) => { setName(event.target.value); setErrors({}) }} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${ids.name}-error` : undefined} className={cn(field, fieldState(errors.name))} data-autofocus required />
        </Field>
      )}
      <Field label="Mobile number" id={ids.phone} error={errors.phone}>
        <div className={cn('flex h-12 items-center overflow-hidden rounded-xl border bg-white transition-[border-color,box-shadow] focus-within:border-brand focus-within:shadow-[0_0_0_4px_rgba(0,127,109,.12)]', fieldState(errors.phone))}>
          <span className="flex h-full items-center gap-1.5 border-r border-[#e4ece8] bg-[#f6faf8] px-3.5 text-[14px] font-semibold text-ink" aria-hidden="true">🇮🇳 +91</span>
          <input
            id={ids.phone}
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(event) => { setPhone(event.target.value.replace(/[^\d\s]/g, '').slice(0, 11)); setErrors({}) }}
            autoComplete="tel-national"
            placeholder="98765 43210"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${ids.phone}-error` : undefined}
            className="h-full min-w-0 flex-1 bg-transparent px-3.5 text-[15px] tracking-wide text-ink outline-none placeholder:text-[#9aa8a3]"
            data-autofocus={signup ? undefined : true}
            required
          />
        </div>
      </Field>
      <button type="submit" disabled={busy} className={primary}>
        {busy ? <><Loader2 size={18} className="animate-spin" /> Sending code…</> : <>Send code <ArrowRight size={18} /></>}
      </button>
      <p className="text-[12px] text-muted">{devOtp ? 'Development mode: no SMS is sent; the code is 123456.' : 'We’ll text you a one-time code. Standard SMS rates may apply.'}</p>
    </form>
  )
}

// ---------- The popup ----------
function BrandPanel({ mode }) {
  const box = standardPack(padById.vera)
  return (
    <aside className="relative hidden w-[44%] shrink-0 flex-col overflow-hidden bg-[linear-gradient(160deg,#0c4a40_0%,#007f6d_70%,#1f9a86_100%)] p-8 text-white md:flex">
      <span aria-hidden="true" className="absolute -top-24 -right-24 size-64 rounded-full bg-white/10" />
      <span aria-hidden="true" className="absolute -bottom-16 -left-20 size-56 rounded-full bg-white/5" />
      <img src={piaxLogo} alt="" className="relative h-9 w-fit brightness-0 invert" />
      <div key={mode} className="relative mt-8 motion-drop">
        <h3 className="text-[30px] leading-[1.1] font-bold tracking-[-.02em]">{mode === 'signup' ? <>Join PIAX.<br /><span className="text-[#bfe8d5]">Care that fits you.</span></> : <>Welcome back.<br /><span className="text-[#bfe8d5]">We saved your spot.</span></>}</h3>
        <ul className="mt-6 grid gap-3">
          {perks.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-[13.5px] text-white/90">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15"><Icon size={16} /></span>{text}
            </li>
          ))}
        </ul>
      </div>
      {/* The photo takes whatever height is left, so the panel always fills the popup. */}
      <div className="relative mt-8 flex min-h-[110px] flex-1 flex-col justify-end">
        <img src={heroPhoto} alt="" className="h-full max-h-64 min-h-0 w-full rounded-t-[120px] object-cover object-[center_30%] opacity-95" />
        <img src={box.image} alt="" className="absolute -right-6 bottom-2 w-40 drop-shadow-[0_14px_24px_rgba(0,0,0,.3)] motion-safe:animate-[home-rise_.9s_ease-out]" />
        <p className="absolute top-2 left-2 rounded-full bg-white/15 px-3 py-1 text-[12px] font-semibold backdrop-blur">Comfort. Care. Confidence.</p>
      </div>
    </aside>
  )
}

export default function AuthModal() {
  const { modal, closeAuth, openAuth } = useAuth()
  const { pathname, search } = useLocation()
  const [method, setMethod] = useState('phone')
  const [options, setOptions] = useState({ oauth: [], phone: true, devOtp: false })
  const [socialNote, setSocialNote] = useState('')
  const mode = modal.mode

  useEffect(() => {
    if (!modal.open) return
    setSocialNote('')
    authService.providers().then(setOptions).catch(() => {})
  }, [modal.open])

  const signup = mode === 'signup'
  const returnTo = `${pathname}${search}`

  const startSocial = (provider, label) => {
    if (!options.oauth.includes(provider)) {
      setSocialNote(`${label} sign-in is coming soon. Please use your mobile number or email for now.`)
      return
    }
    window.location.assign(authService.oauthUrl(provider, returnTo))
  }

  return (
    <Dialog
      open={modal.open}
      onClose={closeAuth}
      bare
      variant="sheet"
      title={signup ? 'Create your PIAX account' : 'Log in to PIAX'}
      description="Sign in with your mobile number, email, Google, Facebook or Instagram."
      className="md:h-[min(760px,calc(100dvh-48px))] md:max-w-[920px] motion-safe:animate-[home-rise_.4s_cubic-bezier(.22,1,.36,1)]"
    >
      {/* On tablets and desktops the brand panel keeps the full height of the popup and only the form scrolls,
          so short windows never show a gap under the picture. */}
      <div className="flex w-full md:h-full">
        <BrandPanel mode={mode} />

        <div className="flex min-w-0 flex-1 flex-col px-5 pt-14 pb-6 sm:px-8 md:overflow-y-auto md:overscroll-contain md:pt-10 md:pb-8">
          <p className="text-[12px] font-semibold tracking-[.18em] text-brand uppercase">{signup ? 'Create account' : 'Log in'}</p>
          <h3 className="mt-2 text-[26px] leading-tight font-bold tracking-[-.02em] text-ink">{signup ? 'Start your PIAX journey' : 'Good to see you again'}</h3>

          {/* Log in / Sign up switch with a sliding highlight. */}
          <div role="group" aria-label="Log in or sign up" className="relative mt-5 grid grid-cols-2 rounded-full bg-[#eef5f1] p-1">
            <span aria-hidden="true" className={cn('absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-white shadow-soft transition-transform duration-300 ease-out motion-reduce:transition-none', signup && 'translate-x-full')} />
            {[['login', 'Log in'], ['signup', 'Sign up']].map(([value, label]) => (
              <button key={value} type="button" aria-pressed={mode === value} onClick={() => openAuth(value)} className={cn('relative z-10 h-10 cursor-pointer rounded-full text-[14px] font-semibold transition-colors', mode === value ? 'text-ink' : 'text-muted hover:text-ink')}>
                {label}
              </button>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2.5">
            {socials.map(({ id, label, Mark }) => {
              const live = options.oauth.includes(id)
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => startSocial(id, label)}
                  aria-label={`Continue with ${label}${live ? '' : ' (coming soon)'}`}
                  className="group flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#dbe5e0] bg-white text-[13.5px] font-semibold text-ink transition-[border-color,transform,box-shadow] hover:-translate-y-0.5 hover:border-brand hover:shadow-soft"
                >
                  <span className="transition-transform group-hover:scale-110"><Mark /></span>
                  <span className="max-sm:sr-only">{label}</span>
                </button>
              )
            })}
          </div>
          {socialNote && <p role="status" className="mt-3 rounded-xl bg-[#eef5f1] px-4 py-2.5 text-[12.5px] text-ink motion-drop">{socialNote}</p>}

          <div className="my-5 flex items-center gap-3 text-[12px] text-muted" aria-hidden="true">
            <span className="h-px flex-1 bg-[#e4ece8]" /> or continue with <span className="h-px flex-1 bg-[#e4ece8]" />
          </div>

          <div role="group" aria-label="Sign-in method" className="mb-5 flex gap-2">
            {[['phone', 'Mobile number', Smartphone], ['email', 'Email & password', Mail]].map(([value, label, Icon]) => (
              <button
                key={value}
                type="button"
                aria-pressed={method === value}
                onClick={() => setMethod(value)}
                className={cn('inline-flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border text-[13px] font-semibold transition-colors', method === value ? 'border-brand bg-brand-soft text-brand' : 'border-[#dbe5e0] text-muted hover:border-brand hover:text-ink')}
              >
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>

          <div key={`${mode}-${method}`}>
            {method === 'phone' ? <PhoneForm mode={mode} devOtp={options.devOtp} /> : <EmailForm mode={mode} />}
          </div>

          <p className="mt-6 text-center text-[13px] text-muted">
            {signup ? 'Already have an account? ' : 'New to PIAX? '}
            <button type="button" onClick={() => openAuth(signup ? 'login' : 'signup')} className="cursor-pointer font-semibold text-brand hover:underline">{signup ? 'Log in' : 'Create an account'}</button>
          </p>
          <p className="mt-3 flex items-start justify-center gap-1.5 text-center text-[11.5px] text-muted">
            <Lock size={13} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>By continuing you agree to PIAX’s <Link to="/terms" onClick={closeAuth} className="underline hover:text-ink">Terms</Link> and <Link to="/privacy" onClick={closeAuth} className="underline hover:text-ink">Privacy Policy</Link>.</span>
          </p>
        </div>
      </div>
    </Dialog>
  )
}
