import { useRef, useState } from 'react'
import { SearchX } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import HomeHeader from '../../components/home/HomeHeader.jsx'
import ProductRangeSection from '../../components/home/ProductRangeSection.jsx'
import AppBanner from '../../components/home/AppBanner.jsx'
import HomeFooter from '../../components/home/HomeFooter.jsx'
import PadCompare from '../../components/products/PadCompare.jsx'
import CompareBar from '../../components/products/CompareBar.jsx'
import RangeFilters, { emptyRangeFilters, filterPads } from '../../components/products/RangeFilters.jsx'
import { btn, cn, poppinsPage } from '../../components/home/homeStyles.js'
import { usePageMeta } from '../../hooks/usePageMeta.js'
import { useMotion } from '../../hooks/useMotion.js'
import { padById, pads } from '../../data/piaxRange.js'

const PAGE_TITLE = 'Shop PIAX pads | Sizes, packs & prices'
const PAGE_DESCRIPTION = 'The full PIAX range — LUMA, VERA, NOCTE and SEREN pads in trial, standard and value packs, with a side-by-side comparison.'

// /products: the full PIAX range with pack sizes, prices and a side-by-side comparison (the layout of piax.co.in/products).
// A Filters switch reveals a filter bar for flow, size and day/night use; it is off by default.
// Pads ticked for comparison live in the URL (?compare=luma,nocte) so a comparison can be shared,
// and Find My Pad can link straight to one.
export default function ProductRange() {
  usePageMeta(PAGE_TITLE, PAGE_DESCRIPTION)
  const [params, setParams] = useSearchParams()
  const mainRef = useRef(null)
  useMotion(mainRef)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState(emptyRangeFilters)
  const shownPads = filterPads(pads, filters)
  const selected = (params.get('compare') ?? '').split(',').filter((id) => padById[id])

  const setSelected = (ids) => {
    const next = new URLSearchParams(params)
    const ordered = pads.map((pad) => pad.id).filter((id) => ids.includes(id))
    if (ordered.length) next.set('compare', ordered.join(','))
    else next.delete('compare')
    setParams(next, { replace: true, preventScrollReset: true })
  }
  const toggle = (id) => setSelected(selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id])

  const emptyState = (
    <div role="status" className="flex flex-col items-center rounded-[22px] bg-white px-6 py-14 text-center shadow-soft">
      <span className="flex size-14 items-center justify-center rounded-full bg-brand-soft text-brand"><SearchX size={26} strokeWidth={1.6} /></span>
      <h2 className="mt-4 text-lg font-semibold text-ink">No PIAX pad matches these filters.</h2>
      <p className="mt-1.5 max-w-95 text-sm text-muted">Try removing a filter or two.</p>
      <button type="button" onClick={() => setFilters(emptyRangeFilters)} className={cn(btn.base, btn.solid, btn.small, 'mt-5')}>Clear filters</button>
    </div>
  )

  return (
    <div className={cn(poppinsPage, 'overflow-x-clip bg-mist text-base leading-[1.45] text-body')}>
      <HomeHeader />
      <main ref={mainRef}>
        <ProductRangeSection
          titleAs="h1"
          compare={selected}
          onCompare={toggle}
          shownPads={shownPads}
          emptyState={emptyState}
          toolbar={(
            <RangeFilters
              open={filtersOpen}
              onOpenChange={setFiltersOpen}
              filters={filters}
              onChange={setFilters}
              shown={shownPads.length}
              total={pads.length}
            />
          )}
          afterPads={<PadCompare selected={selected} onToggle={toggle} onSelect={setSelected} />}
        />
        <AppBanner />
      </main>
      <HomeFooter />
      <CompareBar selected={selected} onClear={() => setSelected([])} />
    </div>
  )
}
