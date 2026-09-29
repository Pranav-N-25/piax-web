import { ArrowRight, CalendarDays, CirclePause, Tag } from 'lucide-react'
import Reveal from '../common/Reveal.jsx'
import { artwork } from './productImages.js'
import { button, container, eyebrow, sectionGap } from './productStyles.js'
import { cn } from '../common/ui.js'

const perks = [
  { icon: CalendarDays, label: 'Flexible plans' },
  { icon: CirclePause, label: 'Pause or cancel anytime' },
  { icon: Tag, label: 'Extra savings' },
]

export default function ProductSubscriptionBanner({ onSubscribe }) {
  return (
    <section aria-labelledby="subscription-title" className={cn(container, sectionGap)}>
      <Reveal className="relative grid items-center gap-8 overflow-hidden rounded-3xl bg-[linear-gradient(105deg,#fdf6ee_0%,#f9ece2_100%)] p-6 md:p-8 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-10 lg:px-10">
        <div className="relative hidden h-44 lg:block" aria-hidden="true">
          <img src={artwork.leavesLeft} alt="" loading="lazy" className="absolute bottom-0 left-0 w-12 opacity-80 mix-blend-multiply" />
          <img src={artwork.phone} alt="" loading="lazy" className="absolute bottom-0 left-10 h-full object-contain mix-blend-multiply" />
          <p className="absolute top-6 right-0 -rotate-8 font-hand text-lg leading-snug text-leaf italic">Never run out<br />again.</p>
        </div>
        <div>
          <p className={eyebrow}>Subscription</p>
          <h2 id="subscription-title" className="mt-3 text-2xl leading-tight font-bold text-charcoal md:text-[28px]">Your period, on your terms.</h2>
          <p className="mt-3 max-w-[460px] text-sm leading-relaxed text-stone">
            Save time, get regular deliveries, and never run out of your PIAX products.
          </p>
        </div>
        <div>
          <button type="button" onClick={onSubscribe} className={cn(button.primary, 'w-full md:w-auto lg:w-full')}>
            Subscribe &amp; Save <ArrowRight size={16} />
          </button>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
            {perks.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-xs text-charcoal">
                <Icon size={16} strokeWidth={1.6} className="shrink-0 text-leaf" /> {label}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}
