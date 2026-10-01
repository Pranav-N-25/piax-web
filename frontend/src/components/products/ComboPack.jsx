import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Minus, Plus, RotateCcw, ShieldCheck, ShoppingCart, SlidersHorizontal, Truck } from 'lucide-react'
import Dialog from '../common/Dialog.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { colours, combo, comboItem, discount, mixCount, pads, subscriptionItem } from '../../data/piaxRange.js'
import PurchaseOptions, { defaultPlan } from './PurchaseOptions.jsx'
import { RatingBadge } from '../reviews/Stars.jsx'
import { AddButton, DiscountTag, Price, QuantityPicker } from './RangeUi.jsx'
import { btn, cn, heading } from '../home/homeStyles.js'

// The PIAX Combo Pack: exactly 12 pads in any mix of sizes, at one flat price. Shoppers can add the suggested mix
// in one tap, start from another ready-made mix, or set the count for each size themselves.

const suggested = combo.presets[0]
const short = (pad) => pad.name.replace('PIAX ', '')
const presetFor = (mix) => combo.presets.find((preset) => pads.every((pad) => (preset.mix[pad.id] ?? 0) === (mix[pad.id] ?? 0)))

// One slot per pad in the box, filled in size order with each size's colour; empty slots are dashed.
export function ComboMeter({ mix, className = '' }) {
  const slots = pads.flatMap((pad) => Array.from({ length: mix[pad.id] ?? 0 }, () => pad))
  return (
    <div className={cn('grid grid-cols-12 gap-1', className)} aria-hidden="true">
      {Array.from({ length: combo.count }, (_, index) => {
        const pad = slots[index]
        return (
          <span
            key={index}
            className={cn('h-3 rounded-full transition-colors duration-300', !pad && 'border border-dashed border-line bg-white')}
            style={pad ? { background: colours[pad.colour].hex } : undefined}
          />
        )
      })}
    </div>
  )
}

// "3 × L VERA · 4 × XL LUMA …" with colour dots, for the sizes in a mix.
export function MixLegend({ mix, className = '' }) {
  return (
    <ul className={cn('flex flex-wrap gap-x-4 gap-y-1.5 text-[12.5px]', className)}>
      {pads.filter((pad) => mix[pad.id] > 0).map((pad) => (
        <li key={pad.id} className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full" style={{ background: colours[pad.colour].hex }} aria-hidden="true" />
          <strong className="text-ink">{mix[pad.id]} ×</strong> {pad.size} {short(pad)}
        </li>
      ))}
    </ul>
  )
}

function Stepper({ value, onChange, label, canAdd }) {
  const button = 'flex size-9 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:bg-brand-soft disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent'
  return (
    <div className="flex items-center gap-1 rounded-full border border-line bg-white p-1" role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(-1)} disabled={value <= 0} aria-label={`One less: ${label}`} className={button}><Minus size={16} /></button>
      <output className="w-7 text-center text-[16px] font-semibold tabular-nums text-ink" aria-live="polite">{value}</output>
      <button type="button" onClick={() => onChange(1)} disabled={!canAdd} aria-label={`One more: ${label}`} className={button}><Plus size={16} /></button>
    </div>
  )
}

const stepTitle = (number, text, hint) => (
  <div className="mb-3">
    <h3 className="flex items-center gap-3 text-[16px] font-semibold text-ink">
      <span className="flex size-8 items-center justify-center rounded-full bg-brand text-[14px] font-bold text-white">{number}</span>{text}
    </h3>
    {hint && <p className="mt-1 pl-11 text-[12.5px] text-muted">{hint}</p>}
  </div>
)

const card = (on) => cn('relative flex cursor-pointer flex-col rounded-2xl border bg-white text-left transition-[border-color,box-shadow]', on ? 'border-brand bg-[#eef8f3] shadow-[0_0_0_3px_rgba(0,127,109,.12)]' : 'border-line hover:border-brand')
const tick = <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-brand text-white"><Check size={14} /></span>

// Where the mix stands against the 12 pads the box needs.
function MixStatus({ mix }) {
  const total = mixCount(mix)
  const left = combo.count - total
  return (
    <div className={cn('rounded-2xl px-4 py-3', left === 0 ? 'bg-[#e4f4ec]' : 'bg-[#fff6e5]')}>
      <div className="flex items-center justify-between gap-3 text-[13.5px]">
        <p className="font-semibold text-ink" aria-live="polite">
          {left === 0 ? <span className="flex items-center gap-1.5 text-brand"><Check size={16} /> 12 of 12 pads — your box is ready</span> : `${total} of ${combo.count} pads — add ${left} more`}
        </p>
      </div>
      <ComboMeter mix={mix} className="mt-2.5" />
      {left === 0 && <p className="mt-2 text-[12px] text-muted">Box full. To swap sizes, remove a pad first, then add another.</p>}
    </div>
  )
}

// The two building steps — start from a ready-made mix, then adjust each size — shared by the builder popup and the
// Cycle Pack page. `mix` / `setMix` hold the count per pad id.
export function ComboBuilder({ mix, setMix }) {
  const total = mixCount(mix)
  const preset = presetFor(mix)
  // Steps one size by `delta` from the latest mix, never below 0 or past a full box.
  const step = (id, delta) => setMix((all) => ({ ...all, [id]: Math.max(0, Math.min(all[id] + delta, combo.count - mixCount(all) + all[id])) }))
  return (
    <>
      <section className="mt-7">
        {stepTitle(1, 'Start from a mix')}
        <div role="radiogroup" aria-label="Ready-made mixes" className="grid gap-3 sm:grid-cols-3">
          {combo.presets.map((item, index) => {
            const on = preset?.id === item.id
            return (
              <button key={item.id} type="button" role="radio" aria-checked={on} onClick={() => setMix({ ...item.mix })} className={cn(card(on), 'gap-1.5 p-4')}>
                {on && tick}
                <span className="flex items-center gap-2 text-[14.5px] font-semibold text-ink">
                  {item.name}
                  {index === 0 && <span className="rounded-full bg-brand px-2 py-0.5 text-[10.5px] font-semibold text-white">Suggested</span>}
                </span>
                <span className="text-[12px] text-muted">{item.text}</span>
                <ComboMeter mix={item.mix} className="mt-1.5" />
              </button>
            )
          })}
        </div>
        {!preset && <p className="mt-2.5 flex items-center gap-1.5 text-[12.5px] font-semibold text-brand"><SlidersHorizontal size={14} /> Your own mix</p>}
      </section>

      <section className="mt-7">
        {stepTitle(2, 'Adjust each size', `Total must be exactly ${combo.count} pads.`)}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {pads.map((pad) => (
            <div key={pad.id} className={cn(card(mix[pad.id] > 0), 'cursor-default items-center gap-1 px-2 py-3 text-center')}>
              <span className="size-3 rounded-full" style={{ background: colours[pad.colour].hex }} aria-hidden="true" />
              <strong className="text-[15px] text-ink">{pad.size} · {short(pad)}</strong>
              <span className="text-[12px] text-muted">{pad.lengthLabel} · {pad.variant}</span>
              <span className="text-[11.5px] text-muted">{pad.flow}</span>
              <div className="mt-2"><Stepper value={mix[pad.id]} onChange={(delta) => step(pad.id, delta)} label={`${pad.size} ${short(pad)} pads`} canAdd={total < combo.count} /></div>
            </div>
          ))}
        </div>
        <div className="mt-4"><MixStatus mix={mix} /></div>
        <button type="button" onClick={() => setMix({ ...suggested.mix })} disabled={preset?.id === suggested.id} className="mt-3 inline-flex cursor-pointer items-center gap-1.5 text-[13px] font-semibold text-brand hover:underline disabled:cursor-default disabled:opacity-40 disabled:no-underline">
          <RotateCcw size={14} /> Back to suggested mix
        </button>
      </section>
    </>
  )
}

// A mix starting from `initialMix` (the suggested one by default), with every pad id present.
export const useMix = (initialMix = suggested.mix) => useState(() => Object.fromEntries(pads.map((pad) => [pad.id, initialMix[pad.id] ?? 0])))

// Customize the combo: start from a ready-made mix, then adjust each size. Add to cart unlocks at exactly 12 pads.
export function ComboModal({ open, onClose, initialMix = suggested.mix }) {
  const { addItem } = useCart()
  const [mix, setMix] = useMix(initialMix)
  const [added, setAdded] = useState(false)
  const [plan, setPlan] = useState(defaultPlan)
  const item = comboItem(mix)
  const total = mixCount(mix)
  const ready = total === combo.count

  const subscribe = (months) => {
    addItem(subscriptionItem(item, months))
    setTimeout(onClose, 1100)
  }
  const add = () => {
    addItem(item)
    setAdded(true)
    setTimeout(() => { setAdded(false); onClose() }, 1100)
  }

  return (
    <Dialog open={open} onClose={onClose} bare variant="sheet" title="Build your PIAX Cycle Pack" description={`Pick any ${combo.count} pads across the four sizes for ₹${combo.price}.`} className="md:h-[min(780px,calc(100dvh-48px))] md:max-w-[1080px] motion-safe:animate-[home-rise_.4s_cubic-bezier(.22,1,.36,1)]">
      <div className="flex w-full flex-col md:h-full md:flex-row">
        <div className="min-w-0 flex-1 px-5 pt-14 pb-6 sm:px-8 md:overflow-y-auto md:overscroll-contain md:pt-10">
          <p className="text-[12px] font-semibold tracking-[.18em] text-brand uppercase">PIAX Cycle Pack · {combo.count} pads · ₹{combo.price}</p>
          <h2 className={cn(heading, 'mt-2 text-[clamp(28px,3vw,40px)]')}>Your period. <em className="not-italic text-brand-2">Your mix.</em></h2>
          <p className="mt-2 text-[14px] text-muted">Any {combo.count} pads across the four sizes, for one price. Start from a suggestion or set each size yourself.</p>

          <ComboBuilder mix={mix} setMix={setMix} />
        </div>

        <aside className="flex shrink-0 flex-col gap-4 border-t border-line bg-[#f6faf8] p-5 sm:p-7 md:w-[360px] md:overflow-y-auto md:border-t-0 md:border-l">
          <div className="rounded-2xl bg-[linear-gradient(180deg,#fff_0%,#e6f1ec_100%)] p-4 max-md:hidden">
            <img src={combo.image} alt="" className="mx-auto aspect-[820/720] w-full max-w-[260px] object-contain" />
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-soft">
            <h3 className="text-[16px] font-semibold text-ink">Your Cycle Pack</h3>
            {total === 0 ? <p className="mt-3 text-[13px] text-muted">Add pads to start your box.</p> : <MixLegend mix={mix} className="mt-3 flex-col" />}
            <dl className="mt-4 grid gap-1.5 border-t border-line pt-3 text-[13px]">
              <div className="flex justify-between"><dt className="text-muted">Pads</dt><dd className={cn('font-semibold tabular-nums', ready ? 'text-ink' : 'text-[#b26b00]')}>{total} / {combo.count}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Per pad</dt><dd className="font-semibold text-ink">₹{(combo.price / combo.count).toFixed(2)}</dd></div>
            </dl>
            <p className="mt-3 flex items-baseline gap-2 border-t border-line pt-3">
              <span className="text-[13px] text-muted">Price</span>
              <strong className="ml-auto text-[24px] text-ink">₹{combo.price}</strong>
              {combo.mrp > combo.price && <del className="text-[13px] text-muted">₹{combo.mrp}</del>}
            </p>
            {combo.mrp > combo.price && <p className="mt-1 text-right text-[13px] font-semibold text-brand">You save ₹{combo.mrp - combo.price} ({discount(combo)}% OFF)</p>}
            <p className="text-right text-[11.5px] text-muted">Inclusive of all taxes</p>
          </div>
          <PurchaseOptions price={combo.price} plan={plan} onChange={setPlan} onSubscribe={subscribe} disabledReason={ready ? undefined : `Add ${combo.count - total} more pad${combo.count - total === 1 ? '' : 's'} to subscribe.`} />
          <button type="button" onClick={add} disabled={!ready || added} aria-describedby={ready ? undefined : 'cycle-not-ready'} className={cn(btn.base, btn.solid, 'w-full')}>
            {added ? <><Check size={17} /> Added to cart</> : <><ShoppingCart size={17} /> Add Cycle Pack · ₹{combo.price}</>}
          </button>
          {!ready && <p id="cycle-not-ready" className="-mt-2 text-center text-[12px] text-[#b26b00]">Add {combo.count - total} more pad{combo.count - total === 1 ? '' : 's'} to complete your box.</p>}
          <ul className="flex justify-around gap-2 text-[12px] text-muted">
            <li className="flex items-center gap-1.5"><Truck size={16} className="text-brand" aria-hidden="true" /> Discreet delivery</li>
            <li className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-brand" aria-hidden="true" /> Secure checkout</li>
          </ul>
        </aside>
      </div>
    </Dialog>
  )
}

// The combo as a product card beside the four pads, laid out like PadCard: Add to cart adds the suggested mix,
// Customize opens the builder.
export function ComboProductCard({ animDelay = 0 }) {
  const [customizing, setCustomizing] = useState(false)
  const [boxes, setBoxes] = useState(1)
  return (
    <article id="cycle-pack" data-anim style={{ '--d': `${animDelay}s` }} className="group flex scroll-mt-28 flex-col overflow-hidden rounded-[22px] bg-white shadow-soft transition-[translate,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_-14px_rgba(15,60,50,.28)]">
      <div className="relative overflow-hidden px-5 pt-5 pb-11 bg-[linear-gradient(180deg,#fff_0%,#d9ebe2_100%)]">
        <div className="flex min-h-9 items-center justify-between gap-2 text-[11.5px] font-semibold text-ink">
          <span className="rounded-full bg-white px-3 py-1 shadow-soft">{combo.count} pads</span>
          <span className="rounded-full bg-brand px-3 py-1 text-white">Mix &amp; match</span>
        </div>
        <DiscountTag pack={combo} className="absolute right-5 bottom-3" />
        <Link to={combo.path} tabIndex={-1} aria-hidden="true" className="block">
          <img
            src={combo.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="mx-auto mt-2 aspect-[820/720] w-full max-w-[280px] -translate-y-1 object-contain transition-[translate,scale] duration-500 ease-out group-hover:-translate-y-3 group-hover:scale-[1.03]"
          />
        </Link>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-[#0b5b4e]">Every flow, one box</p>
        <h3 className={cn(heading, 'mt-1.5 text-[22px]')}>
          <Link to={combo.path} className="hover:text-brand">{combo.shortName}</Link>
        </h3>
        <RatingBadge productId={combo.id} showEmpty className="mt-1.5" />
        <p className="mt-2 text-[13px] leading-[1.4]">{combo.text}</p>

        <p className="mt-4 text-[11.5px] text-muted">Suggested: {pads.map((pad) => `${suggested.mix[pad.id]} ${pad.size}`).join(' · ')}</p>
        <button type="button" onClick={() => setCustomizing(true)} className="mt-1.5 inline-flex cursor-pointer items-center gap-1 self-start text-[12.5px] font-semibold text-brand hover:underline"><SlidersHorizontal size={13} /> Customize your mix</button>

        <div className="mt-auto pt-5">
          <p className="mb-2 text-[12.5px] font-semibold text-ink">{combo.count} pads per box</p>
          <div className="flex items-end justify-between gap-3">
            <Price pack={combo} />
            <QuantityPicker value={boxes} onChange={setBoxes} label="Cycle Pack" />
          </div>
          <AddButton className="mt-4" item={comboItem(suggested.mix)} quantity={boxes} />
        </div>
      </div>
      {/* Mounted fresh on each open, so it starts from the suggested mix. */}
      {customizing && <ComboModal open onClose={() => setCustomizing(false)} />}
    </article>
  )
}
