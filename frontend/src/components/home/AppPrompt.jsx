import { useCallback, useEffect, useRef, useState } from 'react'
import { Bell, CalendarHeart, Repeat, Star, Tag, X } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { StoreBadges } from './HomeUi.jsx'
import { cn } from './homeStyles.js'
import appPromo from '../../assets/home/app-promo.webp'

// "Try our mobile app" prompt, built on app-promotion UX research:
// - Non-blocking: a corner card on desktop and a compact bottom sheet on phones (about a fifth of the
//   screen; the big product artwork, description and benefit chips are desktop-only). No backdrop,
//   no scroll lock, no focus theft, so it never hides the page (Google's intrusive-interstitial guidance).
// - Earned timing: never on arrival. It appears a few seconds after the visitor reaches the footer, once
//   they've read through the page, as a gentle next step rather than an interruption.
// - Respectful frequency: at most once per visit, quiet for a while after "Not now" and for longer once
//   someone has tapped a store link. Never while typing (e.g. in the footer's newsletter field) or while
//   another dialog is open; it waits for the next free moment instead.
// - Relevant: Android visitors see Google Play, iPhone and iPad visitors see the App Store, desktop sees both.
const trigger = {
  footerDelayMs: 3000, // how long after the footer comes into view
  footerVisible: 0.15, // share of the footer that must be on screen to count as reached
}
const quietDays = { dismissed: 14, storeTapped: 90 }

const storageKey = 'piax-app-prompt'
const sessionKey = 'piax-app-prompt-shown'
const day = 24 * 60 * 60 * 1000

const benefits = [
  { icon: CalendarHeart, title: 'Cycle tracker', text: 'Know what’s next' },
  { icon: Bell, title: 'Reminders', text: 'Never be caught out' },
  { icon: Repeat, title: 'Quick reorder', text: 'Pads in one tap' },
]

// Same welcome offer as the site's top strip.
const offer = { code: 'WELCOME10', text: '10% off your first app order' }

// Storage can be blocked (private mode, strict settings): the prompt then simply behaves per page view.
function readStore(storage, key) {
  try {
    return storage.getItem(key)
  } catch {
    return null
  }
}

function writeStore(storage, key, value) {
  try {
    storage.setItem(key, value)
  } catch {
    // Nothing to remember then.
  }
}

function isQuiet() {
  if (readStore(sessionStorage, sessionKey)) return true
  try {
    const { until = 0 } = JSON.parse(readStore(localStorage, storageKey) || '{}')
    return Date.now() < until
  } catch {
    return false
  }
}

function rememberFor(days) {
  writeStore(localStorage, storageKey, JSON.stringify({ until: Date.now() + days * day }))
}

function detectPlatform() {
  const agent = navigator.userAgent || ''
  if (/android/i.test(agent)) return 'android'
  // iPadOS reports itself as a Mac, so a touch-capable "Mac" is an iPad.
  if (/iphone|ipad|ipod/i.test(agent) || (/macintosh/i.test(agent) && navigator.maxTouchPoints > 1)) return 'ios'
  return 'desktop'
}

const storesFor = { android: ['Google Play'], ios: ['App Store'], desktop: undefined }

// Moments when a prompt would interrupt: typing in a field, or another (modal) dialog holding the page.
function userIsBusy() {
  const active = document.activeElement
  if (active && (active.matches('input, textarea, select') || active.isContentEditable)) return true
  return document.body.style.overflow === 'hidden'
}

// Decides when to show the prompt; returns [open, close]. Watches the current page's footer and opens
// the prompt `footerDelayMs` after the visitor reaches it. Pages swap their footer on navigation, so the
// watch restarts with each route while the once-per-visit limit carries across them.
function useAppPromptTrigger() {
  const [open, setOpen] = useState(false)
  const done = useRef(false)
  const { pathname } = useLocation()

  useEffect(() => {
    if (done.current || isQuiet()) return undefined
    const footer = document.querySelector('footer')
    if (!footer || !('IntersectionObserver' in window)) return undefined

    let timer
    // Show once the delay has passed; if the visitor is busy right then, check again a second later.
    const showWhenFree = () => {
      if (userIsBusy()) {
        timer = window.setTimeout(showWhenFree, 1000)
        return
      }
      done.current = true
      writeStore(sessionStorage, sessionKey, '1')
      setOpen(true)
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      timer = window.setTimeout(showWhenFree, trigger.footerDelayMs)
    }, { threshold: trigger.footerVisible })
    observer.observe(footer)

    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [pathname])

  const close = useCallback(() => setOpen(false), [])
  return [open, close]
}

// Product artwork: the PIAX app on a phone with PIAX pads and the watch face. Decorative.
function PromoArt({ className = '' }) {
  return <img src={appPromo} alt="" width="729" height="760" decoding="async" draggable={false} className={cn('h-auto max-w-none select-none', className)} />
}

export default function AppPrompt() {
  const [open, close] = useAppPromptTrigger()
  const [platform] = useState(detectPlatform)

  const dismiss = useCallback(() => {
    rememberFor(quietDays.dismissed)
    close()
  }, [close])

  const storeTapped = () => {
    rememberFor(quietDays.storeTapped)
    close()
  }

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') dismiss()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, dismiss])

  // The live region stays mounted so screen readers announce the card when it appears, without moving focus.
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-3 bottom-3 z-40 flex justify-end md:inset-x-auto md:right-6 md:bottom-6">
      {open && (
        <section
          role="dialog"
          aria-modal="false"
          aria-labelledby="app-prompt-title"
          aria-describedby="app-prompt-text"
          className={cn(
            'pointer-events-auto relative w-full rounded-3xl border border-line bg-white p-4 font-sans text-body shadow-[0_24px_60px_rgba(15,60,50,.22)] md:w-[420px] md:p-5',
            'motion-safe:animate-app-prompt-in',
          )}
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close app suggestion"
            className="absolute top-2 right-2 z-10 flex size-11 cursor-pointer items-center justify-center rounded-full text-muted hover:bg-mist hover:text-ink focus-visible:outline-2 focus-visible:outline-brand md:bg-white/15 md:text-white md:hover:bg-white/25 md:hover:text-white"
          >
            <X size={18} />
          </button>

          {/* Desktop: a brand-green header panel with a "free" tag and the rating. The phone artwork sits outside the
              panel's clipping and rises above the card's top edge, tilted slightly, so it reads as standing out in 3D. */}
          <div aria-hidden="true" className="relative -mx-5 -mt-5 mb-5 h-48 overflow-hidden rounded-t-[23px] bg-linear-to-br from-[#1b8a74] via-brand-2 to-brand max-md:hidden">
            <span className="absolute -top-10 -left-10 size-40 rounded-full bg-white/10" />
            <span className="absolute right-8 bottom-8 size-20 rounded-full bg-white/10" />
            {/* Soft floor shadow where the phone meets the panel. */}
            <span className="absolute right-20 -bottom-6 h-12 w-48 rounded-[50%] bg-[#031e19]/35 blur-xl" />
            <span className="absolute top-4 left-4 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold tracking-[.12em] text-white uppercase ring-1 ring-white/25">Free app</span>
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute right-14 top-[-60px] z-[5] w-[230px] [perspective:900px] motion-safe:animate-phone-float max-md:hidden">
            <PromoArt className="w-full origin-bottom [transform:rotateY(-12deg)_rotateZ(-2deg)] drop-shadow-[0_26px_30px_rgba(3,30,25,.4)]" />
          </div>
          <span aria-hidden="true" className="absolute top-[156px] left-4 z-[6] flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-ink shadow-soft max-md:hidden">
            <Star size={14} className="fill-[#f5a524] text-[#f5a524]" /> 4.8 · 10,000+ women
          </span>

          <div className="flex items-center gap-4 pr-8">
            <span aria-hidden="true" className="flex size-16 shrink-0 items-end justify-center overflow-hidden rounded-2xl bg-linear-to-br from-[#1b8a74] to-brand md:hidden">
              <PromoArt className="w-[64px] translate-y-1" />
            </span>
            <div>
              <h2 id="app-prompt-title" className="text-[18px] leading-tight font-bold tracking-[-.02em] text-ink md:text-[22px]">Get the PIAX app</h2>
              <p className="mt-0.5 text-[12.5px] text-muted">Your period care, right in your pocket · Android &amp; iOS</p>
            </div>
          </div>

          <p id="app-prompt-text" className="sr-only">
            Track your cycle, get gentle reminders and quick-order your favourite PIAX pads. {offer.text} — {offer.code}.
          </p>

          <ul className="mt-4 grid grid-cols-3 gap-2 max-md:hidden">
            {benefits.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex flex-col items-center gap-1 rounded-2xl bg-mist px-2 py-3 text-center">
                <span className="flex size-9 items-center justify-center rounded-full bg-brand-soft text-brand"><Icon size={18} strokeWidth={1.8} /></span>
                <strong className="mt-1 text-[12.5px] leading-tight text-ink">{title}</strong>
                <span className="text-[11px] leading-tight text-muted">{text}</span>
              </li>
            ))}
          </ul>

          {/* Welcome offer: a ticket-style strip with the code. */}
          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-dashed border-[#f0b6c4] bg-[#fff4f6] px-3 py-2.5 md:mt-4">
            <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#fde2e7] text-[#c0355a]"><Tag size={16} /></span>
            <span className="min-w-0 flex-1 text-[12.5px] leading-tight text-body">{offer.text}</span>
            <strong className="shrink-0 rounded-lg bg-white px-2 py-1 font-mono text-[12px] tracking-wider text-[#c0355a] ring-1 ring-[#f0b6c4]">{offer.code}</strong>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
            <StoreBadges only={storesFor[platform]} onSelect={storeTapped} />
            <button
              type="button"
              onClick={dismiss}
              className="min-h-11 cursor-pointer px-1 text-[13px] font-semibold text-muted underline-offset-4 hover:text-ink hover:underline focus-visible:outline-2 focus-visible:outline-brand"
            >
              Not now
            </button>
          </div>
        </section>
      )}
    </div>
  )
}
