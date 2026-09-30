import { useState } from 'react'
import { Check, Droplet, GitCompareArrows, Moon, Sun } from 'lucide-react'
import { colours, pads, sharedFeatures } from '../../data/piaxRange.js'
import { cn, eyebrow, h2, heading } from '../home/homeStyles.js'
import { AddButton, LengthBar, PackPicker, padItem, Price, tint } from './RangeUi.jsx'

const bestPerPad = (pad) => Math.min(...pad.packs.map((pack) => pack.price / pack.count))
const rupees = (value) => value.toFixed(2).replace(/\.00$/, '')

// Picker chips: tick the pads to compare. Two stay selected at minimum.
function Picker({ shown, onToggle }) {
  return (
    <div role="group" aria-label="Pads to compare" className="flex flex-wrap gap-2">
      {pads.map((pad) => {
        const on = shown.includes(pad.id)
        const locked = on && shown.length <= 2
        return (
          <button
            key={pad.id}
            type="button"
            aria-pressed={on}
            disabled={locked}
            title={locked ? 'Compare at least two pads' : undefined}
            onClick={() => onToggle(pad.id)}
            className={cn(
              'flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors disabled:cursor-default',
              on ? 'border-brand bg-white text-ink shadow-soft' : 'border-line bg-transparent text-muted hover:border-brand hover:text-ink',
            )}
          >
            <span className="size-3 rounded-full" style={{ background: colours[pad.colour].hex, opacity: on ? 1 : 0.45 }} />
            {pad.name.replace('PIAX ', '')}
            {on && <Check size={14} className="text-brand" />}
          </button>
        )
      })}
    </div>
  )
}

function Protection({ level }) {
  return (
    <span className="flex items-center gap-0.5" role="img" aria-label={`${level} of 4 drops, relative to the range`}>
      {[1, 2, 3, 4].map((drop) => (
        <Droplet key={drop} size={16} strokeWidth={1.8} className={drop <= level ? 'fill-brand text-brand' : 'text-line'} />
      ))}
    </span>
  )
}

// The pack a column prices and sells: each column keeps its own pack choice.
function BuyCell({ pad }) {
  const [index, setIndex] = useState(0)
  const pack = pad.packs[index]
  return (
    <div className="flex h-full flex-col gap-3">
      <PackPicker pad={pad} index={index} onChange={setIndex} />
      {pad.packs.length === 1 && <p className="text-[12.5px] font-semibold text-ink">{pack.count} pads</p>}
      <Price pack={pack} />
      <AddButton item={padItem(pad, pack)} className="mt-auto" />
    </div>
  )
}

// Side-by-side comparison of the pads in `selected` (all four when fewer than two are chosen).
export default function PadCompare({ selected, onToggle, onSelect }) {
  const shown = selected.length >= 2 ? pads.filter((pad) => selected.includes(pad.id)) : pads
  const ids = shown.map((pad) => pad.id)
  // Showing everything by default: a chip click takes that pad out rather than picking it alone.
  const chip = (id) => (selected.length >= 2 ? onToggle(id) : onSelect(ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]))
  const cheapest = Math.min(...shown.map(bestPerPad))

  const rows = [
    { label: 'Size & length', cell: (pad) => <><strong className="text-ink">{pad.size}</strong> · {pad.length}mm</> },
    { label: 'Coverage', cell: (pad) => <LengthBar pad={pad} className="mt-1.5 h-2" /> },
    { label: 'Best for', cell: (pad) => pad.flow },
    { label: 'Protection level', cell: (pad) => <Protection level={pad.protection} /> },
    {
      label: 'Wear it',
      cell: (pad) => (
        <span className="flex items-center gap-1.5">
          <Sun size={15} className="text-brand" />{pad.wear.includes('night') && <Moon size={15} className="text-brand" />}{pad.wear}
        </span>
      ),
    },
    {
      label: 'Colour',
      cell: (pad) => <span className="flex items-center gap-2"><span className="size-3.5 rounded-full" style={{ background: colours[pad.colour].hex }} />{colours[pad.colour].name}</span>,
    },
    { label: 'Pack sizes', cell: (pad) => pad.packs.map((pack) => `${pack.count} pads`).join(' · ') },
    {
      label: 'Lowest price per pad',
      cell: (pad) => (
        <span className="flex flex-wrap items-center gap-2">
          <strong className="text-ink">₹{rupees(bestPerPad(pad))}</strong>
          {bestPerPad(pad) === cheapest && <span className="rounded-md bg-brand-soft px-2 py-[3px] text-[11px] font-bold text-brand">Best value</span>}
        </span>
      ),
    },
  ]

  const grid = { gridTemplateColumns: `minmax(128px, 170px) repeat(${shown.length}, minmax(190px, 1fr))` }
  const labelCell = 'sticky left-0 z-10 flex items-center bg-white px-4 py-3.5 text-[12.5px] font-semibold text-ink md:px-5'
  const cell = 'flex items-center px-4 py-3.5 text-[13px] md:px-5'

  return (
    <div id="compare" className="mt-14 scroll-mt-24">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className={cn(eyebrow, 'flex items-center gap-2')}><GitCompareArrows size={14} /> Compare pads</p>
          <h2 className={cn(h2, 'text-[clamp(26px,2.6vw,36px)]')}>Side by side, <em className="not-italic text-brand-2">at a glance.</em></h2>
          <p className="mt-2 text-[15px]">Pick the pads you’re deciding between, or tap the compare icon on any photo above.</p>
        </div>
        <Picker shown={ids} onToggle={chip} />
      </div>

      <div className="overflow-x-auto rounded-[22px] bg-white shadow-soft [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div role="table" aria-label="PIAX pad comparison" className="grid min-w-max" style={grid}>
          {/* Header row: box photos */}
          <div role="row" className="contents">
            <div role="columnheader" className={cn(labelCell, 'items-end text-[11px] uppercase tracking-[.16em] text-muted')}>{shown.length} pads</div>
            {shown.map((pad) => (
              <div key={pad.id} role="columnheader" className="flex flex-col px-4 pt-4 pb-3 md:px-5">
                <div className="w-full max-w-[260px] rounded-[16px] px-3 pt-3" style={tint(colours[pad.colour].hex)}>
                  <img src={pad.packs[0].image} alt={`${pad.name} ${pad.variant} box`} loading="lazy" decoding="async" className="mx-auto aspect-[820/720] w-full max-w-[200px] object-contain" />
                </div>
                <h3 className={cn(heading, 'mt-3 text-[18px]')}>{pad.name.replace('PIAX ', '')} <span className="font-medium text-muted">· {pad.variant}</span></h3>
              </div>
            ))}
          </div>

          {rows.map(({ label, cell: render }, rowIndex) => (
            <div key={label} role="row" className="contents">
              <div role="rowheader" className={cn(labelCell, rowIndex % 2 === 0 && 'bg-mist')}>{label}</div>
              {shown.map((pad) => (
                <div key={pad.id} role="cell" className={cn(cell, rowIndex % 2 === 0 && 'bg-mist', 'block')}>{render(pad)}</div>
              ))}
            </div>
          ))}

          <div role="row" className="contents">
            <div role="rowheader" className={labelCell}>Every PIAX pad</div>
            <div role="cell" className="px-4 py-3.5 md:px-5" style={{ gridColumn: `span ${shown.length}` }}>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
                {sharedFeatures.map((feature) => <li key={feature} className="flex items-center gap-1.5"><Check size={15} className="text-brand" />{feature}</li>)}
              </ul>
            </div>
          </div>

          <div role="row" className="contents">
            <div role="rowheader" className={cn(labelCell, 'items-start border-t border-line')}>Buy</div>
            {shown.map((pad) => (
              <div key={pad.id} role="cell" className="border-t border-line px-4 py-4 md:px-5"><BuyCell pad={pad} /></div>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 text-[12px] text-muted lg:hidden">Swipe the table sideways to see every pad.</p>
    </div>
  )
}
