import { Cloud, Heart, Leaf, ShieldCheck } from 'lucide-react'
import Reveal from '../common/Reveal.jsx'
import ProductBreadcrumb from './ProductBreadcrumb.jsx'
import { artwork } from './productImages.js'
import { container, eyebrow } from './productStyles.js'

const benefits = [
  { icon: Leaf, label: 'Sustainable & compostable' },
  { icon: ShieldCheck, label: 'Safe & lab-tested' },
  { icon: Cloud, label: 'Soft & rash-free' },
  { icon: Heart, label: 'Designed for all flows' },
]

export default function ProductHero() {
  return (
    <section aria-labelledby="products-hero-title" className="overflow-hidden rounded-b-[32px] bg-[linear-gradient(115deg,#eef8f4_0%,#e3f3ec_55%,#d4ece2_100%)] pb-20 lg:rounded-b-[48px] lg:pb-24">
      <div className={container}>
        <div className="pt-5 lg:pt-6"><ProductBreadcrumb /></div>

        <div className="grid items-center gap-10 pt-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] lg:gap-12 lg:pt-4">
          <Reveal>
            <p className={eyebrow}>Products</p>
            <h1 id="products-hero-title" className="mt-4 text-[34px] leading-[1.12] font-bold tracking-[-.02em] text-charcoal min-[480px]:text-[40px] md:text-[48px] xl:text-[54px]">
              Menstrual care<br />that understands you.
            </h1>
            <p className="mt-5 max-w-[480px] text-base leading-relaxed text-stone md:text-lg">
              Ultra-thin. Highly absorbent. Sustainable. Designed for every flow, every body, every day.
            </p>
            <ul className="mt-8 grid max-w-[600px] grid-cols-2 gap-x-6 gap-y-5 min-[640px]:grid-cols-4 min-[640px]:gap-x-4">
              {benefits.map(({ icon: Icon, label }, index) => (
                <li key={index} className="flex items-center gap-2.5 text-xs leading-snug text-charcoal">
                  <Icon size={26} strokeWidth={1.5} className="shrink-0 text-leaf" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="relative mx-auto aspect-[5/4] w-full max-w-[560px]">
            <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.9)_0%,rgba(255,255,255,0)_70%)]" />
            <img src={artwork.leavesLeft} alt="" aria-hidden="true" width="78" height="200" className="absolute top-[6%] left-[4%] w-[16%] -rotate-12 opacity-90 mix-blend-multiply" />
            <img src={artwork.leavesRight} alt="" aria-hidden="true" width="90" height="125" className="absolute right-[2%] bottom-[10%] w-[18%] rotate-6 opacity-90 mix-blend-multiply" />
            <img
              src={artwork.packWithPad}
              alt="PIAX Soft & Ultra-Thin Anion-Infused pads box with a PIAX pad"
              width="1338"
              height="1175"
              fetchPriority="high"
              className="relative mx-auto mt-8 h-[calc(100%-2rem)] w-[80%] object-contain drop-shadow-[0_24px_40px_rgba(0,64,52,.18)]"
            />
            <p aria-hidden="true" className="absolute top-0 right-0 z-1 hidden -rotate-8 font-hand text-lg leading-snug text-leaf italic md:block">
              Comfort today.<br />A cleaner tomorrow.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
