import { Bell, CalendarHeart, MessageCircleHeart, Repeat, Smartphone } from 'lucide-react'
import { DoodleNote, Foliage, StoreBadges } from './HomeUi.jsx'
import { accent, cn, container, h2, sectionPlain } from './homeStyles.js'
import piaxLogo from '../../assets/piax_logo.png'

const features = [
  { icon: CalendarHeart, text: 'Track your cycle' },
  { icon: MessageCircleHeart, text: 'Ask PIAX AI' },
  { icon: Bell, text: 'Smart reminders' },
  { icon: Repeat, text: 'Reorder in a tap' },
]

// The PIAX lotus mark: the square at the left edge of the wordmark logo.
function LogoMark({ className = '' }) {
  return (
    <span className={cn('block aspect-square overflow-hidden', className)}>
      <img src={piaxLogo} alt="" width="1200" height="403" loading="lazy" className="size-full object-cover object-left brightness-0 invert" />
    </span>
  )
}

// A phone showing the PIAX app splash screen, built in HTML so it stays sharp. Decorative.
function PhoneMockup() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-[210px] md:w-[230px]">
      <div className="relative aspect-[9/19] rounded-[38px] bg-[#0a1f1b] p-2.5 shadow-[0_30px_60px_rgba(3,30,25,.45)] ring-1 ring-white/15">
        <span className="absolute top-4 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-[#0a1f1b]" />
        <div className="relative flex size-full flex-col items-center justify-center overflow-hidden rounded-[30px] bg-linear-to-b from-[#1b8a74] via-brand-2 to-brand px-6 text-center text-white">
          <span className="absolute -top-16 -right-16 size-44 rounded-full bg-white/10" />
          <span className="absolute -bottom-20 -left-16 size-48 rounded-full bg-white/8" />
          <span className="relative flex size-20 items-center justify-center rounded-[22px] bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
            <LogoMark className="w-12" />
          </span>
          <strong className="relative mt-4 text-[26px] leading-none font-bold tracking-[.18em]">PIAX</strong>
          <span className="relative mt-2 text-[11px] text-white/80">Feel different. Feel you.</span>
          <span className="absolute bottom-3 h-1 w-20 rounded-full bg-white/60" />
        </div>
      </div>

      <div className="absolute top-[18%] -left-[62px] flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-left shadow-soft max-sm:-left-8">
        <span className="flex size-8 items-center justify-center rounded-full bg-tone-pink text-[#d9577a]"><CalendarHeart size={16} /></span>
        <span className="flex flex-col text-[10px] leading-tight text-muted"><strong className="text-[12px] text-ink">Day 14</strong>Cycle on track</span>
      </div>
      <div className="absolute bottom-[20%] -right-[58px] flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-left shadow-soft max-sm:-right-8">
        <span className="flex size-8 items-center justify-center rounded-full bg-brand-soft text-brand"><Bell size={16} /></span>
        <span className="flex flex-col text-[10px] leading-tight text-muted"><strong className="text-[12px] text-ink">Reminder</strong>Pack arrives Friday</span>
      </div>
    </div>
  )
}

export default function AppBanner() {
  return (
    <section className={sectionPlain} id="download">
      <div className={container}>
        <div className="relative isolate overflow-hidden rounded-[32px] bg-linear-to-br from-brand via-brand-2 to-[#0a4a40] px-6 py-12 text-white md:px-12 lg:px-16 lg:py-14">

          <Foliage art="sprigArch" className="-top-6 -right-8 w-[clamp(110px,12vw,190px)] opacity-25 brightness-0 invert" />
          <Foliage art="clusterLeft" className="-bottom-10 -left-14 w-[clamp(120px,14vw,220px)] opacity-20 brightness-0 invert max-md:hidden" />

          <div className="relative z-10 grid items-center gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[.14em] text-white ring-1 ring-white/20">
                <Smartphone size={14} /> Now on Android &amp; iOS
              </span>
              <h2 className={cn(h2, 'mt-4 mb-4 text-white')}>
                Your period care,<br /><em className={cn(accent, 'text-[#bfe8d5]')}>right in your pocket.</em>
              </h2>
              <p className="mb-8 max-w-[520px] text-[17px] text-white/85">
                Download the PIAX app to track your cycle, get answers from PIAX AI, set gentle reminders and restock your favourite packs — anytime, anywhere.
              </p>
              <ul className="mb-8 grid max-w-[520px] grid-cols-2 gap-3">
                {features.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-2.5 text-sm font-medium">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/12 text-[#bfe8d5]"><Icon size={18} strokeWidth={1.8} /></span>
                    {text}
                  </li>
                ))}
              </ul>
              <StoreBadges tone="light" />
              <p className="mt-4 text-xs text-white/70">Free to download · Available for Android and iOS devices</p>
            </div>

            <div className="relative py-4">
              <DoodleNote className="-top-4 right-0 hidden text-[#bfe8d5] lg:block">Care that<br />goes with you.</DoodleNote>
              <PhoneMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
