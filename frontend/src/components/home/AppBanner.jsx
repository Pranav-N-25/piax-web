import { Bell, CalendarHeart, MessageCircleHeart, Repeat, Smartphone } from 'lucide-react'
import { DoodleNote, Foliage, StoreBadges } from './HomeUi.jsx'
import { accent, cn, container, h2, sectionPlain } from './homeStyles.js'
import AppScreensShowcase from './AppScreensShowcase.jsx'

const features = [
  { icon: CalendarHeart, text: 'Track your cycle' },
  { icon: MessageCircleHeart, text: 'Ask PIAX AI' },
  { icon: Bell, text: 'Smart reminders' },
  { icon: Repeat, text: 'Reorder in a tap' },
]

const platforms = [
  { name: 'Android', path: 'M17.6 9.48l1.84-3.18a.38.38 0 0 0-.66-.38l-1.87 3.23a11.4 11.4 0 0 0-9.82 0L5.22 5.92a.38.38 0 0 0-.66.38L6.4 9.48A10.8 10.8 0 0 0 1 18h22a10.8 10.8 0 0 0-5.4-8.52ZM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z' },
  { name: 'iOS', path: 'M15.53 3.83c.84-1.01 1.4-2.43 1.25-3.83-1.21.05-2.67.8-3.54 1.82-.78.9-1.45 2.34-1.27 3.71 1.34.1 2.72-.69 3.56-1.7Zm-3.38 3.07c-.95 0-2.42-1.08-3.96-1.04-2.04.03-3.91 1.18-4.96 3.01-2.12 3.68-.55 9.1 1.52 12.09 1.01 1.45 2.21 3.09 3.79 3.04 1.52-.07 2.09-.99 3.94-.99 1.83 0 2.35.99 3.96.95 1.64-.03 2.68-1.48 3.68-2.95 1.16-1.69 1.64-3.33 1.66-3.42-.04-.01-3.18-1.22-3.22-4.86-.03-3.04 2.48-4.49 2.6-4.56-1.43-2.09-3.63-2.32-4.39-2.38-2-.15-3.68 1.1-4.62 1.1Z' },
]

export default function AppBanner() {
  return (
    <section className={sectionPlain} id="download">
      <div className={container}>
        <div className="relative isolate grid overflow-hidden rounded-[32px] bg-linear-to-br from-brand via-brand-2 to-[#0a4a40] px-6 pt-12 text-white lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:gap-6 md:px-12 md:pt-14 lg:px-16">
          <Foliage art="sprigArch" className="-top-6 left-[46%] w-[clamp(110px,12vw,190px)] opacity-20 brightness-0 invert max-md:hidden" />
          <Foliage art="clusterLeft" className="-bottom-10 -left-14 w-[clamp(120px,14vw,220px)] opacity-20 brightness-0 invert max-md:hidden" />

          <div className="relative z-10 lg:pb-14">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[.14em] text-white ring-1 ring-white/20">
              <Smartphone size={14} /> The PIAX app
            </span>
            <h2 className={cn(h2, 'mt-4 mb-4 text-white')}>
              Your period care,<br /><em className={cn(accent, 'text-[#bfe8d5]')}>right in your pocket.</em>
            </h2>
            <p className="mb-6 max-w-[520px] text-[17px] text-white/85">
              Track your cycle, ask PIAX AI, get gentle reminders and restock your favourite packs — all from one app on your phone.
            </p>

            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="text-sm text-white/80">Works on both</span>
              {platforms.map(({ name, path }) => (
                <span key={name} className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-1.5 text-sm font-semibold ring-1 ring-white/20">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d={path} /></svg>
                  {name}
                </span>
              ))}
            </div>

            <ul className="mb-8 grid max-w-[520px] grid-cols-2 gap-3">
              {features.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2.5 text-sm font-medium">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/12 text-[#bfe8d5]"><Icon size={18} strokeWidth={1.8} /></span>
                  {text}
                </li>
              ))}
            </ul>
            <StoreBadges tone="light" />
            <p className="mt-4 text-xs text-white/70">Free to download on Android phones and iPhone.</p>
          </div>

          {/* PIAX app screens on three phones, animated. The phones are cut off flat at the bottom of the
              artwork, so they sit on the banner's bottom edge: full-bleed under the text on phones, centred
              under it on tablets, and in a wider right column from lg up, rising a little above its top. */}
          <div className="relative mt-10 flex items-end justify-center max-md:-mx-6 lg:mt-0 lg:-mr-10">
            <DoodleNote arrow="down-left" className="top-0 right-4 z-10 hidden text-[#bfe8d5] xl:block">It’s on<br />your phone.</DoodleNote>
            <AppScreensShowcase className="w-full max-w-[760px] lg:-mt-6 lg:w-[115%] lg:max-w-none xl:w-[112%]" />
          </div>
        </div>
      </div>
    </section>
  )
}
