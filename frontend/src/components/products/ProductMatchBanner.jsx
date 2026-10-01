import { ArrowRight, CircleCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from '../common/Reveal.jsx'
import { artwork } from './productImages.js'
import { button, eyebrow } from './productStyles.js'

const steps = ['Flow type', 'Lifestyle', 'Comfort preference', 'Recommended pad']

// Opens the Find My Size modal via `onFindSize`, or links to the quiz page when given `to`.
export default function ProductMatchBanner({ onFindSize, to }) {
  return (
    <Reveal as="section" aria-labelledby="match-banner-title" className="relative overflow-hidden rounded-2xl bg-[linear-gradient(110deg,#eef8f4_0%,#e0f2ea_60%,#d2ebe0_100%)] p-6 md:p-7">
      <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1.3fr)_auto_minmax(0,.8fr)]">
        <div>
          <p className={eyebrow}>Find your PIAX match</p>
          <h2 id="match-banner-title" className="mt-3 text-2xl leading-tight font-bold text-charcoal md:text-[26px]">Not sure which pad is right for you?</h2>
          <p className="mt-2 text-sm text-stone">Take a quick personalised quiz to find your perfect size and flow.</p>
          {to ? (
            <Link to={to} className={`${button.primary} mt-5`}>Find My Size <ArrowRight size={16} /></Link>
          ) : (
            <button type="button" onClick={onFindSize} className={`${button.primary} mt-5`}>
              Find My Size <ArrowRight size={16} />
            </button>
          )}
        </div>
        <div className="relative hidden h-40 w-44 md:block lg:hidden xl:block" aria-hidden="true">
          <img src={artwork.leavesRight} alt="" loading="lazy" className="absolute -top-2 left-2 w-14 -rotate-12 opacity-80 mix-blend-multiply" />
          <img src={artwork.singlePad} alt="" loading="lazy" className="absolute inset-0 m-auto h-full w-full object-contain mix-blend-multiply" />
        </div>
        <ul className="grid gap-3 rounded-2xl bg-white/80 p-5" aria-label="What the quiz covers">
          {steps.map((step) => (
            <li key={step} className="flex items-center gap-3 text-[13px] text-charcoal">
              <CircleCheck size={18} strokeWidth={1.6} className="shrink-0 text-leaf" /> {step}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}
