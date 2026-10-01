import Reveal from '../common/Reveal.jsx'
import { artwork } from './productImages.js'
import { container, sectionGap } from './productStyles.js'
import { cn } from '../common/ui.js'

const defaultItems = [
  { icon: artwork.trustDelivery, title: 'Fast & reliable delivery', text: 'Pan India' },
  { icon: artwork.trustPackage, title: 'Secure & safe packaging', text: 'Discreet delivery' },
  { icon: artwork.trustLab, title: '8-layer construction', text: 'in every PIAX pad' },
  { icon: artwork.trustLeaf, title: 'Four sizes', text: '240mm to 360mm' },
]

export default function ProductTrustStrip({ items = defaultItems }) {
  return (
    <section aria-label="Why shop with PIAX" className={cn(container, sectionGap)}>
      <Reveal as="ul" className="grid grid-cols-1 gap-5 rounded-2xl bg-foam px-6 py-6 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:px-4 lg:py-7">
        {items.map(({ icon, title, text }, index) => (
          <li key={title} className={cn('flex items-center gap-4 lg:justify-center lg:px-6', index > 0 && 'lg:border-l lg:border-sage/70')}>
            <img src={icon} alt="" width="56" height="56" loading="lazy" className="size-14 shrink-0 rounded-full mix-blend-multiply" />
            <p className="text-[13px] leading-snug text-stone">
              <strong className="block font-semibold text-charcoal">{title}</strong>
              {text}
            </p>
          </li>
        ))}
      </Reveal>
    </section>
  )
}
