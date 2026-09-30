import { useEffect, useState } from 'react'
import { GitCompareArrows, X } from 'lucide-react'
import { useLocation, useSearchParams } from 'react-router-dom'
import HomeHeader from '../../components/home/HomeHeader.jsx'
import ProductRangeSection from '../../components/home/ProductRangeSection.jsx'
import AppBanner from '../../components/home/AppBanner.jsx'
import HomeFooter from '../../components/home/HomeFooter.jsx'
import PadCompare from '../../components/products/PadCompare.jsx'
import { btn, cn } from '../../components/home/homeStyles.js'
import { colours, padById, pads } from '../../data/piaxRange.js'

// Floating bar while pads are ticked for comparison: jumps to the table, or clears the selection.
// Hidden while the comparison table itself is on screen.
function CompareBar({ selected, onClear }) {
  const [tableVisible, setTableVisible] = useState(false)
  useEffect(() => {
    const table = document.getElementById('compare')
    if (!table || !('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver(([entry]) => setTableVisible(entry.isIntersecting), { threshold: 0.15 })
    observer.observe(table)
    return () => observer.disconnect()
  }, [])

  if (!selected.length || tableVisible) return null
  const ready = selected.length >= 2
  return (
    <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 motion-safe:animate-[home-rise_.35s_ease-out]">
      <div className="flex w-full max-w-[560px] items-center gap-3 rounded-full bg-white py-2 pr-2 pl-5 shadow-[0_12px_40px_-8px_rgba(15,60,50,.35)] ring-1 ring-line">
        <span className="flex -space-x-1">
          {selected.map((id) => <span key={id} className="size-4 rounded-full border-2 border-white" style={{ background: colours[padById[id].colour].hex }} />)}
        </span>
        <p className="min-w-0 flex-1 truncate text-[13px] font-semibold text-ink">
          {ready ? selected.map((id) => padById[id].name.replace('PIAX ', '')).join(' vs ') : 'Pick one more pad to compare'}
        </p>
        <button type="button" onClick={onClear} aria-label="Clear comparison" className="flex size-9 cursor-pointer items-center justify-center rounded-full text-muted hover:bg-mist hover:text-ink">
          <X size={16} />
        </button>
        <a href="#compare" aria-disabled={!ready} className={cn(btn.base, btn.solid, btn.small, !ready && 'pointer-events-none opacity-50')}>
          <GitCompareArrows size={16} /> Compare
        </a>
      </div>
    </div>
  )
}

// /products: the full PIAX range with pack sizes, prices and a side-by-side comparison.
// Pads ticked for comparison live in the URL (?compare=luma,nocte) so a comparison can be shared,
// and Find My Pad can link straight to one.
export default function ProductRange() {
  const [params, setParams] = useSearchParams()
  const { hash } = useLocation()
  const selected = (params.get('compare') ?? '').split(',').filter((id) => padById[id])

  const setSelected = (ids) => {
    const next = new URLSearchParams(params)
    const ordered = pads.map((pad) => pad.id).filter((id) => ids.includes(id))
    if (ordered.length) next.set('compare', ordered.join(','))
    else next.delete('compare')
    setParams(next, { replace: true, preventScrollReset: true })
  }
  const toggle = (id) => setSelected(selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id])

  useEffect(() => {
    const target = hash && document.querySelector(hash)
    if (target) target.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [hash])

  return (
    <div className="overflow-x-clip bg-mist font-sans text-base leading-[1.45] text-body">
      <HomeHeader />
      <main>
        <ProductRangeSection
          titleAs="h1"
          compare={selected}
          onCompare={toggle}
          afterPads={<PadCompare selected={selected} onToggle={toggle} onSelect={setSelected} />}
        />
        <AppBanner />
      </main>
      <HomeFooter />
      <CompareBar selected={selected} onClear={() => setSelected([])} />
    </div>
  )
}
