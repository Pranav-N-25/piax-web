import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { CompareIcon } from './RangeUi.jsx'
import { colours, padById, standardPack } from '../../data/piaxRange.js'
import { btn, cn } from '../home/homeStyles.js'

// Floating bar while pads are ticked for comparison: jumps to the table, or clears the selection.
// Hidden while the comparison table itself is on screen.
export default function CompareBar({ selected, onClear }) {
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
    <div className="compare-bar-in fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      {/* Glow: a blurred, pulsing halo behind a thin border that a light travels around (index.css, "Compare bar"). */}
      <div className="relative w-full max-w-[640px]">
        <span aria-hidden="true" className="compare-glow-halo absolute -inset-3 rounded-full blur-2xl" />
        <div className="compare-glow-border relative rounded-full p-[2.5px] shadow-[0_14px_44px_-10px_rgba(0,127,109,.55)]">
      <div className="flex w-full items-center gap-3 rounded-full bg-linear-to-r from-[#0c4a40] via-brand to-[#0c4a40] py-2 pr-2 pl-2 text-white">
        {/* Grouped avatars: each selected pad's box photo on its own colour, overlapping left to right. */}
        <ul className="flex shrink-0 -space-x-3" aria-label="Pads selected to compare">
          {selected.map((id, index) => {
            const pad = padById[id]
            const { hex } = colours[pad.colour]
            return (
              <li
                key={id}
                title={pad.name}
                className="relative flex size-11 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white shadow-soft motion-safe:animate-[home-rise_.3s_ease-out]"
                style={{ background: `${hex}33`, boxShadow: `0 0 0 2px ${hex}`, zIndex: selected.length - index }}
              >
                <img src={standardPack(pad).image} alt={pad.name} width="820" height="720" className="size-full scale-110 object-contain" />
              </li>
            )
          })}
        </ul>
        <p className="min-w-0 flex-1 truncate text-[13px] font-semibold text-white">
          {ready ? selected.map((id) => padById[id].name.replace('PIAX ', '')).join(' vs ') : 'Pick one more pad to compare'}
        </p>
        <button type="button" onClick={onClear} aria-label="Clear comparison" className="flex size-9 cursor-pointer items-center justify-center rounded-full text-white/75 hover:bg-white/15 hover:text-white">
          <X size={16} />
        </button>
        <a href="#compare" aria-disabled={!ready} className={cn(btn.base, btn.small, 'border-white bg-white text-brand hover:bg-[#e8f6ef]', ready ? 'compare-ready' : 'pointer-events-none opacity-60')}>
          <CompareIcon size={16} /> Compare
        </a>
      </div>
        </div>
      </div>
    </div>
  )
}
