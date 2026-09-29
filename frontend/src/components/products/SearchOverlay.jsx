import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Dialog from '../common/Dialog.jsx'
import { productService } from '../../services/productService.js'
import { searchProducts } from '../../utils/productFilters.js'
import { money } from '../../utils/formatters.js'
import { productImages } from './productImages.js'
import { button, focusRing, toneBackgrounds } from './productStyles.js'

const suggestions = ['XL', 'Night', 'Compostable', 'Heavy flow', 'Liners']

export default function SearchOverlay({ open, onClose }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (open && products.length === 0) productService.getProducts().then(setProducts)
  }, [open, products.length])

  const results = useMemo(() => (query.trim() ? searchProducts(products, query).slice(0, 5) : []), [products, query])

  const showAll = (value = query) => {
    const q = value.trim()
    onClose()
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : '/products')
  }

  return (
    <Dialog open={open} onClose={onClose} variant="search" title="Search PIAX products" description="Search by name, size, type or feature.">
      <form role="search" onSubmit={(event) => { event.preventDefault(); showAll() }} className="relative">
        <Search size={18} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-stone" />
        <input
          data-autofocus
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try “XL”, “night” or “compostable”"
          aria-label="Search products"
          className={`h-12 w-full rounded-full border border-rule bg-foam pr-4 pl-11 text-sm text-charcoal outline-none placeholder:text-stone focus:border-leaf ${focusRing}`}
        />
      </form>

      {!query.trim() && (
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[.14em] text-stone">Popular searches</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {suggestions.map((term) => (
              <button key={term} type="button" onClick={() => setQuery(term)} className={`min-h-9 cursor-pointer rounded-full border border-rule px-4 text-sm text-charcoal hover:border-leaf hover:text-leaf ${focusRing}`}>
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {query.trim() && (
        <div className="mt-6" aria-live="polite">
          {results.length === 0 ? (
            <p className="text-sm text-stone">No products match “{query}”. Try a size like “XL” or a feature like “rash-free”.</p>
          ) : (
            <ul className="grid gap-2">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    to={`/products/${product.slug}`}
                    onClick={onClose}
                    className={`flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-foam ${focusRing}`}
                  >
                    <span className={`flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl ${toneBackgrounds[product.tone]}`}>
                      <img src={productImages[product.image][0]} alt="" className="size-12 object-contain mix-blend-multiply" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-charcoal">{product.name}</span>
                      <span className="block text-xs text-stone">{product.subtitle}</span>
                    </span>
                    <span className="text-sm font-semibold text-charcoal">{product.priceFrom ? 'From ' : ''}{money(product.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <button type="button" onClick={() => showAll()} className={`${button.ghost} mt-4 px-2`}>
            See all results for “{query}” <ArrowRight size={16} />
          </button>
        </div>
      )}
    </Dialog>
  )
}
