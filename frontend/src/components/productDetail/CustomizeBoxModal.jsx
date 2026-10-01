import { useState } from 'react'
import { Check, Minus, Package, Plus, ShieldCheck, ShoppingCart, Truck } from 'lucide-react'
import Dialog from '../common/Dialog.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { colours, packFormats, padById, pads } from '../../data/piaxRange.js'
import { padItem, tint } from '../products/RangeUi.jsx'
import { cn, heading } from '../home/homeStyles.js'

const MAX_BOXES = 10

function Stepper({ value, onChange, label, min = 0 }) {
  const button = 'flex size-9 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:bg-brand-soft disabled:cursor-default disabled:opacity-35'
  return (
    <div className="flex items-center gap-1 rounded-full border border-line bg-white p-1" role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`Fewer: ${label}`} className={button}><Minus size={16} /></button>
      <output className="w-8 text-center text-[16px] font-semibold tabular-nums text-ink" aria-live="polite">{value}</output>
      <button type="button" onClick={() => onChange(Math.min(MAX_BOXES, value + 1))} disabled={value >= MAX_BOXES} aria-label={`More: ${label}`} className={button}><Plus size={16} /></button>
    </div>
  )
}

const stepTitle = (number, text) => (
  <h3 className="mb-3 flex items-center gap-3 text-[16px] font-semibold text-ink">
    <span className="flex size-8 items-center justify-center rounded-full bg-brand text-[14px] font-bold text-white">{number}</span>{text}
  </h3>
)

const sizeCard = (on) => cn('relative flex cursor-pointer flex-col items-center gap-1 rounded-2xl border bg-white px-2 py-3 text-center transition-[border-color,box-shadow]', on ? 'border-brand bg-[#eef8f3] shadow-[0_0_0_3px_rgba(0,127,109,.12)]' : 'border-line hover:border-brand')
const tick = <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-brand text-white"><Check size={14} /></span>

// Customize Your Box: one size in the pack and number of boxes you choose, or several sizes at once
// (each size in its own box — mixing sizes inside one box is a future PIAX format).
export default function CustomizeBoxModal({ open, onClose, initialPad = 'vera', initialFormat = 'standard' }) {
  const { addItem } = useCart()
  const [mode, setMode] = useState('single')
  const [padId, setPadId] = useState(initialPad)
  const [format, setFormat] = useState(initialFormat)
  const [boxes, setBoxes] = useState(1)
  const [mix, setMix] = useState(() => Object.fromEntries(pads.map((pad) => [pad.id, pad.id === initialPad ? 1 : 0])))
  const [added, setAdded] = useState(false)

  const packOf = (id) => padById[id].packs.find((pack) => pack.format === format)
  const lines = mode === 'single'
    ? [{ pad: padById[padId], pack: packOf(padId), quantity: boxes }]
    : pads.filter((pad) => mix[pad.id] > 0).map((pad) => ({ pad, pack: packOf(pad.id), quantity: mix[pad.id] }))
  const totals = lines.reduce((sum, { pack, quantity }) => ({
    pads: sum.pads + pack.count * quantity, boxes: sum.boxes + quantity, price: sum.price + pack.price * quantity, mrp: sum.mrp + pack.mrp * quantity,
  }), { pads: 0, boxes: 0, price: 0, mrp: 0 })
  const preview = lines[0] ?? { pad: padById[padId], pack: packOf(padId) }

  const addAll = () => {
    lines.forEach(({ pad, pack, quantity }) => addItem(padItem(pad, pack), quantity))
    setAdded(true)
    setTimeout(() => { setAdded(false); onClose() }, 1100)
  }

  return (
    <Dialog open={open} onClose={onClose} bare variant="sheet" title="Customize your box" description="Choose your pad size, box size and number of boxes." className="md:h-[min(780px,calc(100dvh-48px))] md:max-w-[1080px] motion-safe:animate-[home-rise_.4s_cubic-bezier(.22,1,.36,1)]">
      <div className="flex w-full flex-col md:h-full md:flex-row">
        <div className="min-w-0 flex-1 px-5 pt-14 pb-6 sm:px-8 md:overflow-y-auto md:overscroll-contain md:pt-10">
          <p className="text-[12px] font-semibold tracking-[.18em] text-brand uppercase">Customize your box</p>
          <h2 className={cn(heading, 'mt-2 text-[clamp(28px,3vw,40px)]')}>Your period. <em className="not-italic text-brand-2">Your box.</em></h2>
          <p className="mt-2 text-[14px] text-muted">Choose your pad size, how many pads per box and how many boxes.</p>

          <div role="group" aria-label="How to build your box" className="relative mt-5 grid max-w-[420px] grid-cols-2 rounded-full bg-[#eef5f1] p-1">
            <span aria-hidden="true" className={cn('absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-white shadow-soft transition-transform duration-300 motion-reduce:transition-none', mode === 'mix' && 'translate-x-full')} />
            {[['single', 'One size'], ['mix', 'Mix sizes']].map(([value, label]) => (
              <button key={value} type="button" aria-pressed={mode === value} onClick={() => setMode(value)} className={cn('relative z-10 h-10 cursor-pointer rounded-full text-[14px] font-semibold', mode === value ? 'text-ink' : 'text-muted')}>{label}</button>
            ))}
          </div>

          <section className="mt-7">
            {stepTitle(1, mode === 'single' ? 'Select pad size' : 'How many boxes of each size?')}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {pads.map((pad) => {
                const on = mode === 'single' ? padId === pad.id : mix[pad.id] > 0
                const body = (
                  <>
                    <span className="size-3 rounded-full" style={{ background: colours[pad.colour].hex }} aria-hidden="true" />
                    <strong className="text-[15px] text-ink">{pad.name.replace('PIAX ', '')}</strong>
                    <span className="text-[12px] text-muted">{pad.size} · {pad.lengthLabel}</span>
                    <span className="text-[11.5px] text-muted">{pad.flow}</span>
                  </>
                )
                return mode === 'single' ? (
                  <button key={pad.id} type="button" aria-pressed={on} onClick={() => setPadId(pad.id)} className={sizeCard(on)}>{on && tick}{body}</button>
                ) : (
                  <div key={pad.id} className={sizeCard(on)}>
                    {body}
                    <div className="mt-2"><Stepper value={mix[pad.id]} onChange={(value) => setMix((all) => ({ ...all, [pad.id]: value }))} label={`${pad.name} boxes`} /></div>
                  </div>
                )
              })}
            </div>
            {mode === 'mix' && <p className="mt-3 rounded-2xl bg-[#eef5f1] px-4 py-3 text-[12.5px] text-body">Each size comes in its own box. Mixed-size boxes are something we’re working on.</p>}
          </section>

          <section className="mt-7">
            {stepTitle(2, 'Choose box size (pads per box)')}
            <div role="radiogroup" aria-label="Pads per box" className="grid grid-cols-3 gap-3">
              {packFormats.map((item) => {
                const on = format === item.id
                const pack = padById[mode === 'single' ? padId : preview.pad.id].packs.find((p) => p.format === item.id)
                return (
                  <button key={item.id} type="button" role="radio" aria-checked={on} onClick={() => setFormat(item.id)} className={sizeCard(on)}>
                    {on && tick}
                    <img src={pack.image} alt="" className="h-16 w-auto object-contain" />
                    <strong className="text-[14px] text-ink">{item.count} pads</strong>
                    <span className="text-[11.5px] text-muted">{item.name}</span>
                  </button>
                )
              })}
            </div>
          </section>

          {mode === 'single' && (
            <section className="mt-7">
              {stepTitle(3, 'Set number of boxes')}
              <div className="flex flex-wrap items-center gap-4">
                <Stepper value={boxes} onChange={setBoxes} label="Boxes" min={1} />
                <p className="flex items-center gap-3 rounded-2xl bg-[#eef5f1] px-4 py-2.5 text-[13px] text-ink"><Package size={20} className="text-brand" aria-hidden="true" />{boxes} × {packOf(padId).count} pads = <strong>{boxes * packOf(padId).count} pads</strong></p>
              </div>
            </section>
          )}
        </div>

        <aside className="flex shrink-0 flex-col gap-4 border-t border-line bg-[#f6faf8] p-5 sm:p-7 md:w-[360px] md:border-t-0 md:border-l md:overflow-y-auto">
          <div className="relative rounded-2xl p-4 max-md:hidden" style={tint(colours[preview.pad.colour].hex)}>
            <img key={preview.pack.id} src={preview.pack.image} alt="" className="mx-auto aspect-[820/720] w-full max-w-[260px] object-contain motion-safe:animate-[home-rise_.4s_ease-out]" />
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-soft">
            <h3 className="text-[16px] font-semibold text-ink">Your selection</h3>
            {lines.length === 0 ? <p className="mt-3 text-[13px] text-muted">Add at least one box.</p> : (
              <ul className="mt-3 grid gap-2 text-[13px]">
                {lines.map(({ pad, pack, quantity }) => (
                  <li key={pad.id} className="flex justify-between gap-3"><span>{pad.name.replace('PIAX ', '')} · {pack.count} pads × {quantity}</span><strong className="tabular-nums text-ink">₹{pack.price * quantity}</strong></li>
                ))}
              </ul>
            )}
            <dl className="mt-4 grid gap-1.5 border-t border-line pt-3 text-[13px]">
              <div className="flex justify-between"><dt className="text-muted">Total pads</dt><dd className="font-semibold text-ink">{totals.pads}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Boxes</dt><dd className="font-semibold text-ink">{totals.boxes}</dd></div>
              {totals.mrp > totals.price && <div className="flex justify-between"><dt className="text-muted">You save</dt><dd className="font-semibold text-brand">₹{totals.mrp - totals.price}</dd></div>}
            </dl>
            <p className="mt-3 flex items-baseline gap-2 border-t border-line pt-3">
              <span className="text-[13px] text-muted">Price</span>
              <strong className="ml-auto text-[24px] text-ink">₹{totals.price}</strong>
              {totals.mrp > totals.price && <del className="text-[13px] text-muted">₹{totals.mrp}</del>}
            </p>
            <p className="text-right text-[11.5px] text-muted">Inclusive of all taxes</p>
          </div>
          <button type="button" onClick={addAll} disabled={lines.length === 0 || added} className="inline-flex h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand text-[16px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(0,127,109,.7)] transition-colors hover:bg-[#006a5b] disabled:cursor-default disabled:opacity-60">
            {added ? <><Check size={19} /> Added to cart</> : <><ShoppingCart size={19} /> Add to Cart · ₹{totals.price}</>}
          </button>
          <ul className="flex justify-around gap-2 text-[12px] text-muted">
            <li className="flex items-center gap-1.5"><Truck size={16} className="text-brand" aria-hidden="true" /> Discreet delivery</li>
            <li className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-brand" aria-hidden="true" /> Secure checkout</li>
          </ul>
        </aside>
      </div>
    </Dialog>
  )
}
