import { useEffect, useState } from 'react'
import { ArrowRight, Building2, Check, Heart, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { MAX_ITEM_QUANTITY } from '../../services/cartService.js'
import { useFavourites } from '../../hooks/useFavourites.js'
import { colours, discount, padById, perPad, standardPack } from '../../data/piaxRange.js'
import { btn, cn } from '../home/homeStyles.js'

// Shared pieces for everything that sells the PIAX range: the /products page, the comparison table
// and the Find My Pad results.

// Cart entry for a pad pack.
export const padItem = (pad, pack) => ({
  id: pack.id, name: `${pad.name} ${pad.variant}`, subtitle: `${pad.size} · ${pad.lengthLabel} · ${pack.count} pads per box`,
  price: pack.price, mrp: pack.mrp, boxCount: pack.count, image: pack.image,
})

// Brief "Added" confirmation on an add-to-cart button.
function useAdded() {
  const [added, setAdded] = useState(false)
  useEffect(() => {
    if (!added) return undefined
    const timer = setTimeout(() => setAdded(false), 1800)
    return () => clearTimeout(timer)
  }, [added])
  return [added, () => setAdded(true)]
}

const stepButton = 'flex size-8 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:bg-brand-soft disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'

// − boxes + beside a price: how many boxes Add to cart adds (1 to MAX_ITEM_QUANTITY).
export function QuantityPicker({ value, onChange, label, className = '' }) {
  return (
    <div role="group" aria-label={`${label} boxes`} className={cn('flex shrink-0 items-center gap-0.5 rounded-full border border-line bg-white p-0.5', className)}>
      <button type="button" onClick={() => onChange(Math.max(1, value - 1))} disabled={value <= 1} aria-label={`One box fewer of ${label}`} className={stepButton}><Minus size={15} /></button>
      <output aria-live="polite" className="w-6 text-center text-[14px] font-semibold tabular-nums text-ink">{value}</output>
      <button type="button" onClick={() => onChange(Math.min(MAX_ITEM_QUANTITY, value + 1))} disabled={value >= MAX_ITEM_QUANTITY} aria-label={`One box more of ${label}`} className={stepButton}><Plus size={15} /></button>
    </div>
  )
}

// − quantity + for an item in the cart, changing the cart directly (the cart page). At 1 the minus becomes a bin.
export function QuantityStepper({ item, className = '' }) {
  const { items, changeQuantity, removeItem } = useCart()
  const quantity = items.find((entry) => entry.id === item.id)?.quantity ?? 0
  return (
    <div role="group" aria-label={`${item.name} quantity`} className={cn('flex items-center justify-between gap-1 rounded-full border border-line bg-white p-0.5', className)}>
      <button type="button" onClick={() => (quantity <= 1 ? removeItem(item.id) : changeQuantity(item.id, -1))} aria-label={quantity <= 1 ? `Remove ${item.name} from cart` : `One less ${item.name}`} className={stepButton}>
        {quantity <= 1 ? <Trash2 size={15} /> : <Minus size={15} />}
      </button>
      <output aria-live="polite" className="min-w-6 text-center text-[14px] font-semibold tabular-nums text-ink">{quantity}</output>
      <button type="button" onClick={() => changeQuantity(item.id, 1)} disabled={quantity >= MAX_ITEM_QUANTITY} aria-label={`One more ${item.name}`} className={stepButton}><Plus size={15} /></button>
    </div>
  )
}

// Adds one item (`quantity` boxes of it), or several `{ item, quantity }` entries at once (a whole kit).
export function AddButton({ item, items, quantity = 1, label = 'Add to cart', disabled = false, className = '' }) {
  const { addItem } = useCart()
  const [added, markAdded] = useAdded()
  const add = () => {
    if (items) items.forEach((entry) => addItem(entry.item, entry.quantity))
    else addItem(item, quantity)
    markAdded()
  }
  return (
    <button type="button" onClick={add} disabled={disabled} className={cn(btn.base, btn.solid, btn.small, 'w-full', className)}>
      {added ? <Check size={16} /> : <ShoppingCart size={16} />}{added ? 'Added' : label}
    </button>
  )
}

// Price, struck-through MRP and price per pad. The "% OFF" itself is shown once, as DiscountTag on the photo.
export function Price({ pack }) {
  const off = discount(pack)
  return (
    <div>
      <div className="flex items-baseline gap-2 whitespace-nowrap">
        <strong className="text-[22px] leading-none text-ink">₹{pack.price}</strong>
        {off > 0 && <del className="text-sm text-[#8d9a96]">₹{pack.mrp}</del>}
      </div>
      <p className="mt-1.5 text-[11.5px] text-muted">
        ₹{perPad(pack)}/pad{off > 0 && <> · <span className="font-semibold text-brand">Save ₹{pack.mrp - pack.price}</span></>}
      </p>
    </div>
  )
}

// "% OFF" corner tag on a product photo, for the pack currently shown. Renders nothing without a discount.
export function DiscountTag({ pack, className = '' }) {
  const off = discount(pack)
  if (!off) return null
  return (
    <span className={cn('z-10 inline-flex items-center rounded-full bg-[#e8506a] px-2.5 py-1 text-[11.5px] font-bold text-white shadow-[0_6px_14px_-6px_rgba(200,50,80,.7)]', className)}>
      {off}% OFF<span className="sr-only">, was ₹{pack.mrp}</span>
    </span>
  )
}

export function Dots({ keys, className = '' }) {
  return (
    <span className={cn('flex items-center', className)}>
      {keys.map((key) => (
        <span key={key} title={colours[key].name} className="-ml-1 size-3.5 rounded-full border-2 border-white first:ml-0" style={{ background: colours[key].hex }} />
      ))}
    </span>
  )
}

// Soft fade from white into a pad's colour, behind its box photo.
export const tint = (hex) => ({ background: `linear-gradient(180deg, #fff 0%, ${hex}38 100%)` })

// Pack-size switch for pads sold in more than one count.
export function PackPicker({ pad, index, onChange, className = '' }) {
  if (pad.packs.length < 2) return null
  return (
    <div role="radiogroup" aria-label={`${pad.name} pack size`} className={cn('flex gap-2', className)}>
      {pad.packs.map((option, optionIndex) => (
        <button
          key={option.id}
          type="button"
          role="radio"
          aria-checked={optionIndex === index}
          onClick={() => onChange(optionIndex)}
          className={cn(
            'flex-1 cursor-pointer whitespace-nowrap rounded-full border px-2 py-1.5 text-[12px] font-semibold transition-colors',
            optionIndex === index ? 'border-brand bg-brand text-white' : 'border-line bg-white text-body hover:border-brand',
          )}
        >
          {option.count} pads
        </button>
      ))}
    </div>
  )
}

// Compare symbol (Material Symbols "compare"): two halves of a picture, split down the middle.
export function CompareIcon({ size = 18, className = '' }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" className={className}>
      <path d="M10 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h5v2h2V1h-2v2zm0 15H5l5-6v6zm9-15h-5v2h5v13l-5-6v9h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
    </svg>
  )
}

const photoButton = 'flex size-9 cursor-pointer items-center justify-center rounded-full bg-white shadow-soft transition-[transform,background-color,color] duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'

// Heart on a product photo: adds it to the visitor's favourites.
export function FavouriteButton({ id, name }) {
  const { isFavourite, toggle } = useFavourites()
  const on = isFavourite(id)
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? `Remove ${name} from favourites` : `Add ${name} to favourites`}
      title={on ? 'Saved to favourites' : 'Save to favourites'}
      onClick={() => toggle(id)}
      className={cn(photoButton, on ? 'text-[#e5577a]' : 'text-body hover:text-[#e5577a]')}
    >
      <Heart size={17} strokeWidth={2} className={cn('transition-transform', on && 'fill-current motion-safe:animate-[heart-pop_.35s_ease-out]')} />
    </button>
  )
}

// Compare toggle on a pad photo: ticks the pad for the side-by-side table.
export function CompareButton({ on, name, onToggle }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? `Remove ${name} from comparison` : `Add ${name} to comparison`}
      title={on ? 'In comparison' : 'Add to compare'}
      onClick={onToggle}
      className={cn(photoButton, on ? 'bg-brand text-white' : 'text-body hover:text-brand')}
    >
      <CompareIcon size={17} />
    </button>
  )
}

// Bulk enquiries from schools, workplaces and NGOs, linking to the business enquiry form.
export function InstitutionalBanner({ className = '' }) {
  return (
    <div className={cn('grid items-center gap-6 overflow-hidden rounded-[24px] bg-brand p-6 text-white md:grid-cols-[180px_1fr_auto] md:p-8', className)}>
      <img src={standardPack(padById.vera).image} alt="PIAX VERA box" loading="lazy" decoding="async" className="mx-auto w-[180px] rounded-[16px] bg-white/90 p-2" />
      <div>
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.16em] text-brand-soft"><Building2 size={14} /> For schools, workplaces &amp; NGOs</p>
        <h3 className="mt-2 text-[22px] font-bold leading-tight">Buying PIAX in bulk?</h3>
        <p className="mt-2 max-w-[520px] text-[14px] text-white/85">
          Tell us which sizes and how many you need, and our team will come back with business pricing.
        </p>
      </div>
      <Link to="/business" className={cn(btn.base, 'border-white bg-white text-brand')}>Get a bulk quote <ArrowRight size={18} /></Link>
    </div>
  )
}
