import { useCallback, useEffect, useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import ProductsHeader from '../../components/products/ProductsHeader.jsx'
import ProductHero from '../../components/products/ProductHero.jsx'
import ProductCategoryNav from '../../components/products/ProductCategoryNav.jsx'
import ProductFilters from '../../components/products/ProductFilters.jsx'
import ProductFilterDrawer from '../../components/products/ProductFilterDrawer.jsx'
import ProductMatchBanner from '../../components/products/ProductMatchBanner.jsx'
import ProductSort from '../../components/products/ProductSort.jsx'
import ProductGrid from '../../components/products/ProductGrid.jsx'
import ProductGridSkeleton from '../../components/products/ProductGridSkeleton.jsx'
import { ProductEmptyState, ProductErrorState } from '../../components/products/ProductResultStates.jsx'
import ProductTrustStrip from '../../components/products/ProductTrustStrip.jsx'
import ProductSubscriptionBanner from '../../components/products/ProductSubscriptionBanner.jsx'
import CustomizePackModal from '../../components/products/CustomizePackModal.jsx'
import FindMySizeModal from '../../components/products/FindMySizeModal.jsx'
import SubscriptionModal from '../../components/products/SubscriptionModal.jsx'
import CartToast from '../../components/products/CartToast.jsx'
import HomeFooter from '../../components/home/HomeFooter.jsx'
import { container, focusRing, sectionGap } from '../../components/products/productStyles.js'
import { cn } from '../../components/common/ui.js'
import { productService } from '../../services/productService.js'
import { useCart } from '../../context/CartContext.jsx'
import { countActiveFilters, emptyFilters, filterProducts, searchProducts, sortProducts } from '../../utils/productFilters.js'

const PAGE_TITLE = 'PIAX Products — Sustainable Menstrual & Wellness Products'
const PAGE_DESCRIPTION = 'Explore PIAX menstrual and wellness products designed for comfort, protection, different flows and everyday period care.'

function usePageMeta(title, description) {
  useEffect(() => {
    const previousTitle = document.title
    let meta = document.querySelector('meta[name="description"]')
    const previousDescription = meta?.getAttribute('content')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    document.title = title
    meta.setAttribute('content', description)
    return () => {
      document.title = previousTitle
      if (previousDescription) meta.setAttribute('content', previousDescription)
    }
  }, [title, description])
}

export default function Products() {
  usePageMeta(PAGE_TITLE, PAGE_DESCRIPTION)
  const { addItem } = useCart()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [options, setOptions] = useState({ customPack: null, subscription: null })
  const [status, setStatus] = useState('loading')
  const [attempt, setAttempt] = useState(0)

  const [activeCategory, setActiveCategory] = useState('all')
  const [filters, setFilters] = useState(emptyFilters)
  const [sort, setSort] = useState('best')

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const [customizing, setCustomizing] = useState(null)
  const [findSizeOpen, setFindSizeOpen] = useState(false)
  const [subscriptionOpen, setSubscriptionOpen] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    let cancelled = false
    Promise.all([
      productService.getProducts(),
      productService.getCategories(),
      productService.getCustomPackOptions(),
      productService.getSubscriptionOptions(),
    ])
      .then(([productList, categoryList, customPack, subscription]) => {
        if (cancelled) return
        setProducts(productList)
        setCategories(categoryList)
        setOptions({ customPack, subscription })
        setStatus('ready')
      })
      .catch(() => { if (!cancelled) setStatus('error') })
    return () => { cancelled = true }
  }, [attempt])

  const visibleProducts = useMemo(
    () => sortProducts(filterProducts(searchProducts(products, query), { category: activeCategory, filters }), sort),
    [products, query, activeCategory, filters, sort],
  )

  const toggleFilter = useCallback((group, value) => {
    setFilters((current) => ({
      ...current,
      [group]: current[group].includes(value) ? current[group].filter((item) => item !== value) : [...current[group], value],
    }))
  }, [])
  const clearFilterGroup = useCallback((group) => setFilters((current) => ({ ...current, [group]: [] })), [])
  const clearAll = useCallback(() => {
    setFilters(emptyFilters)
    setActiveCategory('all')
    if (query) setSearchParams({})
  }, [query, setSearchParams])

  const retry = () => {
    setStatus('loading')
    setAttempt((count) => count + 1)
  }

  const addToCart = (product, quantity = 1) => {
    addItem(product, quantity)
    setToast(`${product.name}${quantity > 1 ? ` × ${quantity}` : ''} added to your cart.`)
  }
  const dismissToast = useCallback(() => setToast(''), [])

  const filterProps = { filters, onToggle: toggleFilter, onClearGroup: clearFilterGroup, onClearAll: clearAll }

  return (
    <div className="min-h-screen bg-white font-poppins text-charcoal">
      <ProductsHeader />

      <main>
        <ProductHero />
        <ProductCategoryNav categories={categories} active={activeCategory} onSelect={setActiveCategory} />

        <section aria-labelledby="product-listing-title" className={cn(container, 'mt-10 lg:mt-14')}>
          <h2 id="product-listing-title" className="sr-only">All PIAX products</h2>
          <div className="items-start lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[256px_minmax(0,1fr)] xl:gap-10">
            <aside aria-label="Product filters" className="hidden rounded-2xl border border-rule/70 bg-white p-6 lg:sticky lg:top-24 lg:block lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto">
              <ProductFilters {...filterProps} />
            </aside>

            <div className="min-w-0">
              <ProductMatchBanner onFindSize={() => setFindSizeOpen(true)} />

              {query && (
                <p className="mt-8 flex flex-wrap items-center gap-2 text-sm text-stone">
                  Results for
                  <button
                    type="button"
                    onClick={() => setSearchParams({})}
                    className={`inline-flex min-h-8 cursor-pointer items-center gap-1.5 rounded-full bg-foam px-3 font-medium text-leaf hover:bg-mint ${focusRing}`}
                    aria-label={`Clear search for ${query}`}
                  >
                    “{query}” <X size={14} />
                  </button>
                </p>
              )}

              <div className={query ? 'mt-4' : 'mt-8'}>
                <ProductSort
                  count={visibleProducts.length}
                  sort={sort}
                  onSortChange={setSort}
                  activeFilterCount={countActiveFilters(filters)}
                  onOpenFilters={() => setFilterDrawerOpen(true)}
                />
              </div>

              <div className="mt-6">
                {status === 'loading' && <ProductGridSkeleton />}
                {status === 'error' && <ProductErrorState onRetry={retry} />}
                {status === 'ready' && (visibleProducts.length === 0
                  ? <ProductEmptyState onClear={clearAll} />
                  : <ProductGrid products={visibleProducts} onAdd={addToCart} onCustomize={setCustomizing} />)}
              </div>
            </div>
          </div>
        </section>

        <ProductTrustStrip />
        <ProductSubscriptionBanner onSubscribe={() => setSubscriptionOpen(true)} />
      </main>

      <div className={sectionGap}><HomeFooter /></div>

      <ProductFilterDrawer
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        resultCount={visibleProducts.length}
        {...filterProps}
      />
      <CustomizePackModal
        open={Boolean(customizing)}
        onClose={() => setCustomizing(null)}
        product={customizing}
        options={options.customPack}
        onAdd={addToCart}
      />
      <FindMySizeModal open={findSizeOpen} onClose={() => setFindSizeOpen(false)} products={products} onAdd={addToCart} />
      <SubscriptionModal open={subscriptionOpen} onClose={() => setSubscriptionOpen(false)} products={products} options={options.subscription} />
      <CartToast message={toast} onDismiss={dismissToast} />
    </div>
  )
}
