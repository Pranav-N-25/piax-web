import { useRef, useState } from 'react'
import { ArrowDown, ChevronDown, Moon, Package, Sun, Zap } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import HomeHeader from '../../components/home/HomeHeader.jsx'
import HomeFooter from '../../components/home/HomeFooter.jsx'
import { Foliage } from '../../components/home/HomeUi.jsx'
import { PadCard } from '../../components/home/ProductRangeSection.jsx'
import { ComboBuilder, ComboMeter, MixLegend, useMix } from '../../components/products/ComboPack.jsx'
import PurchaseOptions, { defaultPlan } from '../../components/products/PurchaseOptions.jsx'
import { AddButton, DiscountTag, FavouriteButton, InstitutionalBanner, QuantityPicker, tint } from '../../components/products/RangeUi.jsx'
import Pincode from '../../components/productDetail/Pincode.jsx'
import ProductReviews from '../../components/reviews/ProductReviews.jsx'
import { RatingBadge } from '../../components/reviews/Stars.jsx'
import { accent, btn, cn, container, eyebrow, h2, heading, poppinsPage, sectionPlain } from '../../components/home/homeStyles.js'
import { useCart } from '../../context/CartContext.jsx'
import { usePageMeta } from '../../hooks/usePageMeta.js'
import { useMotion } from '../../hooks/useMotion.js'
import { colours, combo, comboItem, discount, mixCount, pads, parseMix, perPad, standardPack, subscriptionItem } from '../../data/piaxRange.js'

const rise = (delay = 0) => ({ 'data-anim': '', style: { '--d': `${delay}s` } })
const BRAND = '#0b6e5f'

// Page background: the brand green fading down the page, like each pad's page uses its own colour.
const pageTint = {
  background: `linear-gradient(180deg, color-mix(in srgb, ${BRAND} 10%, #eef7f2) 0%, #eef7f2 38%, color-mix(in srgb, ${BRAND} 5%, #eef7f2) 70%, color-mix(in srgb, ${BRAND} 12%, #eef7f2) 100%)`,
}
const heroTint = {
  background: `linear-gradient(115deg, color-mix(in srgb, ${BRAND} 5%, #fff) 0%, color-mix(in srgb, ${BRAND} 11%, #fff) 55%, color-mix(in srgb, ${BRAND} 20%, #fff) 100%)`,
}

const faqs = [
  ['What is the PIAX Cycle Pack?', `One box of ${combo.count} PIAX pads in the sizes you choose, for ₹${combo.price}. Mix VERA, LUMA, NOCTE and SEREN to match your lighter days, regular days and nights.`],
  ['Do I have to pick all four sizes?', `No. Any mix works, as long as the box holds exactly ${combo.count} pads. Start from a suggested mix and change it, or set every size yourself.`],
  ['Which mix should I choose?', 'Most people use a shorter pad on lighter days, a regular pad on most days and a longer one at night. “Whole cycle” covers all of that; the quiz on any product page can suggest sizes too.'],
  ['Can I subscribe to my mix?', 'Yes. Choose Subscribe & save and your mix arrives every month for the length you pick, at a lower price per box.'],
]

// /products/cycle-pack — the PIAX Cycle Pack: 12 pads in any mix of the four sizes. The mix chosen in the builder
// is what the purchase panel adds to the cart.
export default function CyclePackDetail() {
  const navigate = useNavigate()
  const { addItem } = useCart()
  const mainRef = useRef(null)
  useMotion(mainRef)
  // A mix passed in the link (from Find My Pad) starts the builder; otherwise the suggested mix.
  const [params] = useSearchParams()
  const [mix, setMix] = useMix(parseMix(params.get('mix')) ?? undefined)
  const [boxes, setBoxes] = useState(1)
  const [plan, setPlan] = useState(defaultPlan)
  usePageMeta(`${combo.name} — mix any ${combo.count} pads across four sizes | PIAX`, `${combo.tagline} ₹${combo.price} for ${combo.count} pads.`)

  const total = mixCount(mix)
  const ready = total === combo.count
  const item = comboItem(mix)
  const off = discount(combo)
  const notReady = ready ? undefined : `Add ${combo.count - total} more pad${combo.count - total === 1 ? '' : 's'} to complete your box.`
  const buyNow = () => { addItem(item, boxes); navigate('/cart') }
  const subscribe = (months) => addItem(subscriptionItem(item, months), boxes)

  return (
    <div className={cn(poppinsPage, 'overflow-x-clip text-base leading-[1.45] text-body')} style={pageTint}>
      <HomeHeader />
      <main ref={mainRef}>
        {/* 1. Hero + purchase panel */}
        <section className="relative overflow-hidden" style={heroTint}>
          <div className={cn(container, 'pt-6 pb-12')}>
            <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-muted"><Link to="/" className="hover:text-brand">Home</Link> › <Link to="/products" className="hover:text-brand">Shop</Link> › <span aria-current="page" className="font-medium text-ink">{combo.name}</span></nav>
            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-10">
              <div {...rise(0.1)}>
                <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#fff_0%,#d9ebe2_100%)] p-6">
                  <Foliage art="sprigArch" className="-top-2 -left-4 w-24 opacity-50" />
                  <DiscountTag pack={combo} className="absolute top-5 right-5" />
                  <img src={combo.image} alt={`${combo.name}: ${combo.count} pads in mixed sizes`} className="relative mx-auto aspect-[820/720] w-full max-w-[520px] object-contain drop-shadow-[0_24px_40px_rgba(0,64,52,.18)]" />
                </div>
                {/* The four sizes that can go in the box. */}
                <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {pads.map((pad) => (
                    <li key={pad.id}>
                      <Link to={`/products/${pad.id}`} className="flex h-full flex-col items-center rounded-2xl p-2 text-center transition-transform hover:-translate-y-0.5" style={tint(colours[pad.colour].hex)}>
                        <img src={standardPack(pad).image} alt="" className="aspect-[820/720] w-full object-contain" />
                        <strong className="text-[13px] text-ink">{pad.size} · {pad.name.replace('PIAX ', '')}</strong>
                        <span className="text-[11.5px] text-muted">{pad.lengthLabel} · {pad.flow}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:sticky lg:top-24">
                <div className="rounded-[26px] bg-white p-6 shadow-[0_20px_50px_-24px_rgba(15,60,50,.35)] md:p-7" {...rise(0.2)}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#0c4a40] px-3 py-1 text-[11.5px] font-semibold text-white">{combo.count} pads · All 4 sizes</span>
                    <FavouriteButton id={combo.id} name={combo.name} />
                  </div>
                  <h1 className={cn(heading, 'mt-4 text-[clamp(28px,2.6vw,36px)]')}>{combo.name} <span className="font-medium text-muted">· {combo.variant}</span></h1>
                  <p className="mt-2 text-[15px]">{combo.tagline}</p>
                  <a href="#reviews" className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-brand"><RatingBadge productId={combo.id} showEmpty /></a>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <strong className="text-[38px] leading-none text-ink">₹{combo.price}</strong>
                        {off > 0 && <del className="text-[18px] text-muted">₹{combo.mrp}</del>}
                        {off > 0 && <span className="rounded-full bg-[#fde6ea] px-3 py-1 text-[13px] font-bold text-[#c23a55]">{off}% OFF</span>}
                      </div>
                      {off > 0 && <p className="mt-2 text-[13.5px] font-semibold text-brand">You save ₹{combo.mrp - combo.price} on every box</p>}
                      <p className="mt-1 text-[12.5px] text-muted">Inclusive of all taxes · ₹{perPad(combo)} per pad</p>
                    </div>
                    <div className="text-right">
                      <QuantityPicker value={boxes} onChange={setBoxes} label={combo.name} className="p-1 [&_button]:size-9" />
                      {boxes > 1 && <p className="mt-1 text-[12px] text-muted">{boxes} boxes · ₹{combo.price * boxes}</p>}
                    </div>
                  </div>

                  {/* The mix being bought, set in the builder below. */}
                  <div className="mt-5 rounded-2xl border border-line bg-[#f8fbf9] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="flex items-center gap-1.5 text-[13px] font-semibold text-ink"><Package size={15} className="text-brand" aria-hidden="true" /> Your mix · {total} / {combo.count} pads</p>
                      <a href="#build" className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand hover:underline">Change mix <ArrowDown size={13} /></a>
                    </div>
                    <ComboMeter mix={mix} className="mt-3" />
                    {total > 0 && <MixLegend mix={mix} className="mt-3" />}
                  </div>

                  <PurchaseOptions price={combo.price} plan={plan} onChange={setPlan} onSubscribe={subscribe} disabledReason={notReady} className="mt-5" />

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <AddButton item={item} quantity={boxes} disabled={!ready} className="min-h-12 text-[15px]" />
                    <button type="button" onClick={buyNow} disabled={!ready} className={cn(btn.base, btn.outline, 'min-h-12 text-[15px]')}><Zap size={17} /> Buy now</button>
                  </div>
                  {notReady && <p className="mt-2 text-center text-[12.5px] text-[#b26b00]">{notReady}</p>}
                  <Pincode />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Build your mix */}
        <section id="build" className={cn(sectionPlain, 'scroll-mt-20')} aria-labelledby="build-title">
          <div className={container}>
            <div className="rounded-[26px] bg-white p-5 shadow-soft sm:p-8" {...rise()}>
              <p className={eyebrow}>Build your box</p>
              <h2 id="build-title" className={h2}>Your period. <em className={accent}>Your mix.</em></h2>
              <p className="mt-3 max-w-[640px] text-[16px]">Pick any {combo.count} pads across the four sizes. Your choice updates the box above.</p>
              <ComboBuilder mix={mix} setMix={setMix} />
            </div>
          </div>
        </section>

        {/* 3. Single sizes */}
        <section className={sectionPlain} aria-labelledby="range-title">
          <div className={container}>
            <div className="mb-6" {...rise()}>
              <h2 id="range-title" className={cn(heading, 'text-[clamp(24px,2.4vw,32px)]')}>Prefer <em className={accent}>one size?</em></h2>
              <p className="mt-1 text-[14px] text-muted">Every size also comes in its own box.</p>
            </div>
            <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {pads.map((pad, index) => <li key={pad.id} className="grid"><PadCard pad={pad} animDelay={index * 0.08} /></li>)}
            </ul>
          </div>
        </section>

        {/* 4. Reviews */}
        <section id="reviews" className={cn(sectionPlain, 'scroll-mt-24')} aria-labelledby="reviews-title">
          <div className={container}><ProductReviews productId={combo.id} productName={combo.name} /></div>
        </section>

        {/* 5. Questions + business */}
        <section className={sectionPlain} aria-labelledby="faq-title">
          <div className={container}>
            <div className="grid gap-6 rounded-[26px] bg-white p-6 shadow-soft md:grid-cols-[minmax(0,.8fr)_minmax(0,1.4fr)] md:p-8" {...rise()}>
              <div>
                <p className={eyebrow}>Questions</p>
                <h2 id="faq-title" className={cn(heading, 'text-[clamp(24px,2.4vw,32px)]')}>About the <em className={accent}>Cycle Pack.</em></h2>
                <p className="mt-3 flex items-center gap-2 text-[13.5px] text-muted"><Sun size={16} className="text-brand" aria-hidden="true" /><Moon size={16} className="text-brand" aria-hidden="true" /> Days and nights, one box.</p>
              </div>
              <div className="grid gap-2">
                {faqs.map(([question, answer]) => (
                  <details key={question} className="group rounded-2xl bg-[#f6faf8] px-5 py-4 open:bg-[#eef7f2]">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-ink [&::-webkit-details-marker]:hidden">{question}<ChevronDown size={18} className="shrink-0 text-brand transition-transform group-open:rotate-180" /></summary>
                    <p className="mt-2 text-[14px] leading-[1.6]">{answer}</p>
                  </details>
                ))}
              </div>
            </div>
            <div className="mt-10" {...rise()}><InstitutionalBanner /></div>
          </div>
        </section>
      </main>
      <HomeFooter />
    </div>
  )
}
