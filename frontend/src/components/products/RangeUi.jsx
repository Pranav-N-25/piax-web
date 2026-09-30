import { useEffect, useState } from 'react'
import { Check, GitCompareArrows, Heart, ShoppingCart } from 'lucide-react'
import { useCart } from '../../context/CartContext.jsx'
import { useFavourites } from '../../hooks/useFavourites.js'
import { colours, discount, pads, perPad } from '../../data/piaxRange.js'
import { btn, cn } from '../home/homeStyles.js'

// Shared pieces for everything that sells the PIAX range: the /products page, the comparison table
// and the Find My Pad results.

// Cart entries for a pad pack or a bundle.
export const padItem = (pad, pack) => ({
  id: pack.id, name: `${pad.name} ${pad.variant}`, subtitle: `${pad.size} (${pad.length}mm) – ${pack.count} pads`,
  price: pack.price, mrp: pack.mrp, boxCount: pack.count, image: pack.image,
})
export const bundleItem = (bundle) => ({
  id: bundle.id, name: bundle.name, subtitle: `${bundle.contents} – ${bundle.count} pads`,
  price: bundle.price, mrp: bundle.mrp, boxCount: bundle.count, image: bundle.image,
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

// Adds one item, or several `{ item, quantity }` entries at once (a whole kit).
export function AddButton({ item, items, label = 'Add to cart', className = '' }) {
  const { addItem } = useCart()
  const [added, markAdded] = useAdded()
  const add = () => {
    if (items) items.forEach((entry) => addItem(entry.item, entry.quantity))
    else addItem(item)
    markAdded()
  }
  return (
    <button type="button" onClick={add} className={cn(btn.base, btn.solid, btn.small, 'w-full', className)}>
      {added ? <Check size={16} /> : <ShoppingCart size={16} />}{added ? 'Added' : label}
    </button>
  )
}

export function Price({ pack }) {
  const off = discount(pack)
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <strong className="text-[22px] leading-none text-ink">₹{pack.price}</strong>
        {off > 0 && <del className="text-sm text-[#8d9a96]">₹{pack.mrp}</del>}
        {off > 0 && <span className="rounded-md bg-[#fde2e7] px-2 py-[3px] text-[11px] font-bold text-[#c0355a]">{off}% OFF</span>}
      </div>
      <p className="mt-1.5 text-[11.5px] text-muted">
        ₹{perPad(pack)}/pad{pack.chemist && <> · ₹{pack.chemist} at chemists</>}
      </p>
    </div>
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

const LONGEST = Math.max(...pads.map((pad) => pad.length))

// Pad length against the longest pad in the range.
export function LengthBar({ pad, className = '' }) {
  return (
    <div className={cn('h-1.5 overflow-hidden rounded-full bg-mist', className)} aria-hidden="true">
      <span className="block h-full rounded-full" style={{ width: `${(pad.length / LONGEST) * 100}%`, background: colours[pad.colour].hex }} />
    </div>
  )
}

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
            'flex-1 cursor-pointer rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition-colors',
            optionIndex === index ? 'border-brand bg-brand text-white' : 'border-line bg-white text-body hover:border-brand',
          )}
        >
          {option.count} pads
        </button>
      ))}
    </div>
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
      <GitCompareArrows size={17} strokeWidth={2} />
    </button>
  )
}
