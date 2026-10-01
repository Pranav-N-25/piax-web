import { Atom, Feather, Layers, Wind } from 'lucide-react'
import Reveal from '../common/Reveal.jsx'
import ProductBreadcrumb from './ProductBreadcrumb.jsx'
import { artwork } from './productImages.js'
import { container, eyebrow } from './productStyles.js'
import { claim } from '../../config/productClaims.js'
import { pads, standardPack } from '../../data/piaxRange.js'

// Benefit row: only claims approved for the product listing are shown (see config/productClaims.js).
const benefits = [
  { icon: Feather, id: 'soft-top-sheet' },
  { icon: Layers, id: 'eight-layer' },
  { icon: Atom, id: 'anion' },
  { icon: Wind, id: 'winged' },
].map((benefit) => ({ ...benefit, label: claim(benefit.id) })).filter((benefit) => benefit.label)

// Box layout for the four sizes, back to front: SEREN and NOCTE behind, LUMA in front of VERA.
const fan = {
  seren: 'right-[2%] top-[4%] w-[44%] rotate-6',
  nocte: 'left-[4%] top-[6%] w-[44%] -rotate-6',
  vera: 'left-[10%] bottom-[2%] w-[46%] -rotate-2',
  luma: 'right-[8%] bottom-[4%] w-[52%] rotate-2',
}

export default function ProductHero() {
  return (
    <section aria-labelledby="products-hero-title" className="overflow-hidden rounded-b-[32px] bg-[linear-gradient(115deg,#eef8f4_0%,#e3f3ec_55%,#d4ece2_100%)] pb-20 lg:rounded-b-[48px] lg:pb-24">
      <div className={container}>
        <div className="pt-5 lg:pt-6"><ProductBreadcrumb /></div>

        <div className="grid items-center gap-10 pt-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] lg:gap-12 lg:pt-4">
          <Reveal>
            <p className={eyebrow}>Products</p>
            <h1 id="products-hero-title" className="mt-4 font-playfair text-[34px] leading-[1.12] font-semibold tracking-[-.01em] text-charcoal min-[480px]:text-[40px] md:text-[48px] xl:text-[54px]">
              Menstrual care<br />that understands you.
            </h1>
            <p className="mt-5 max-w-[480px] text-base leading-relaxed text-stone md:text-lg">
              Four sizes, from light days to overnight. Or mix any 12 pads across all four sizes in a ₹249 combo pack.
            </p>
            <ul className="mt-8 grid max-w-[600px] grid-cols-2 gap-x-6 gap-y-5 min-[640px]:grid-cols-4 min-[640px]:gap-x-4">
              {benefits.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5 text-xs leading-snug text-charcoal">
                  <Icon size={26} strokeWidth={1.5} className="shrink-0 text-leaf" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="relative mx-auto aspect-[5/4] w-full max-w-[560px]">
            <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.9)_0%,rgba(255,255,255,0)_70%)]" />
            <img src={artwork.leavesLeft} alt="" aria-hidden="true" width="78" height="200" className="pointer-events-none absolute top-[2%] -left-[2%] w-[14%] -rotate-12 opacity-80 mix-blend-multiply max-md:hidden" />
            <img src={artwork.leavesRight} alt="" aria-hidden="true" width="90" height="125" className="pointer-events-none absolute -right-[2%] bottom-[6%] w-[16%] rotate-6 opacity-80 mix-blend-multiply max-md:hidden" />
            {['seren', 'nocte', 'vera', 'luma'].map((id) => {
              const pad = pads.find((item) => item.id === id)
              return (
                <img
                  key={id}
                  src={standardPack(pad).image}
                  alt={`${pad.name} ${pad.lengthLabel} box`}
                  width="820"
                  height="720"
                  fetchPriority={id === 'luma' ? 'high' : undefined}
                  className={`absolute object-contain drop-shadow-[0_18px_30px_rgba(0,64,52,.16)] ${fan[id]}`}
                />
              )
            })}
            <p aria-hidden="true" className="absolute -top-10 -right-4 z-1 hidden -rotate-8 font-doodle text-[22px] leading-snug text-leaf xl:block">
              Comfort. Care.<br />Confidence.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
