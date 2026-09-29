import { useEffect, useState } from 'react'
import { Check, Moon, ShoppingBag, SlidersHorizontal, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductBadge from './ProductBadge.jsx'
import ProductFeatureList from './ProductFeatureList.jsx'
import { productImages } from './productImages.js'
import { button, focusRing, toneBackgrounds } from './productStyles.js'
import { discountPercent } from '../../utils/productFilters.js'
import { money } from '../../utils/formatters.js'
import { cn } from '../common/ui.js'

const accentIcons = { sun: Sun, moon: Moon }

// Positions for stacked bundle artwork (back to front).
const stackLayout = [
  'absolute left-[8%] top-[18%] w-[46%]',
  'absolute right-[8%] top-[14%] w-[46%]',
  'absolute left-1/2 bottom-[8%] w-[52%] -translate-x-1/2',
]

function ProductArtwork({ product }) {
  const images = productImages[product.image] ?? []
  const imageClass = 'object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none'
  if (images.length > 1) {
    return images.map((src, index) => (
      <img key={src} src={src} alt="" loading="lazy" className={cn(stackLayout[index], imageClass)} />
    ))
  }
  return <img src={images[0]} alt="" loading="lazy" className={cn('absolute inset-0 m-auto h-[78%] w-[78%]', imageClass)} />
}

export default function ProductCard({ product, onAdd, onCustomize }) {
  const [added, setAdded] = useState(false)
  const discount = discountPercent(product)
  const AccentIcon = accentIcons[product.accentIcon]
  const href = `/products/${product.slug}`

  useEffect(() => {
    if (!added) return undefined
    const timer = setTimeout(() => setAdded(false), 1600)
    return () => clearTimeout(timer)
  }, [added])

  const handleAdd = () => {
    onAdd(product)
    setAdded(true)
  }

  return (
    <article className="group flex h-full flex-col rounded-2xl bg-white p-3 shadow-[0_6px_24px_rgba(0,64,52,.06)] transition-shadow duration-300 hover:shadow-[0_14px_36px_rgba(0,64,52,.12)]">
      <Link
        to={href}
        tabIndex={-1}
        aria-hidden="true"
        className={cn('relative block aspect-[4/3] overflow-hidden rounded-xl', toneBackgrounds[product.tone])}
      >
        <ProductArtwork product={product} />
        {AccentIcon && !product.badge && (
          <span className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-white/80 text-charcoal">
            <AccentIcon size={18} strokeWidth={1.6} />
          </span>
        )}
        <ProductBadge label={product.badge} className="absolute top-3 right-3" />
      </Link>

      <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
        <h3 className="text-[15px] leading-snug font-semibold text-charcoal">
          <Link to={href} className={cn('rounded hover:text-leaf', focusRing)}>{product.name}</Link>
        </h3>
        <p className="mt-1 text-[13px] text-stone">{product.subtitle}</p>

        <div className="mt-4"><ProductFeatureList specs={product.specs} /></div>

        <div className="mt-auto pt-5">
          <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            {product.priceFrom && <span className="text-sm font-medium text-charcoal">From</span>}
            <strong className="text-lg font-semibold text-charcoal">{money(product.price)}</strong>
            {discount > 0 && (
              <>
                <del className="text-[13px] text-stone">{money(product.mrp)}</del>
                <span className="rounded-md bg-[#fde6ea] px-1.5 py-0.5 text-[11px] font-semibold text-[#c23a55]">{discount}% OFF</span>
              </>
            )}
          </p>
          {product.customizable ? (
            <button type="button" onClick={() => onCustomize(product)} className={cn(button.primary, 'mt-3 w-full')}>
              <SlidersHorizontal size={16} /> Customize
            </button>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              aria-label={`Add ${product.name}, ${product.subtitle}, to cart`}
              className={cn(button.primary, 'mt-3 w-full', added && 'bg-leaf-dark')}
            >
              {added ? <><Check size={16} /> Added</> : <><ShoppingBag size={16} /> Add to Cart</>}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
