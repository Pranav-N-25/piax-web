import { useId } from 'react'
import { Check, SlidersHorizontal, X } from 'lucide-react'
import { pads } from '../../data/piaxRange.js'
import { cn } from '../home/homeStyles.js'

// Filter groups for the pad range. Each option matches pads by a test on the pad.
export const rangeFilterGroups = [
  {
    name: 'flow', title: 'Flow',
    options: ['Light', 'Regular', 'Heavy'].map((value) => ({ value, label: value, test: (pad) => pad.flowTags.includes(value) })),
  },
  {
    name: 'size', title: 'Size',
    options: pads.map((pad) => ({ value: pad.size, label: `${pad.size} · ${pad.lengthLabel}`, test: (item) => item.size === pad.size })),
  },
  {
    name: 'use', title: 'Wear it',
    options: [
      { value: 'day', label: 'Day', test: (pad) => pad.wear.toLowerCase().includes('day') },
      { value: 'night', label: 'Night', test: (pad) => pad.wear.toLowerCase().includes('night') },
    ],
  },
]

export const emptyRangeFilters = Object.fromEntries(rangeFilterGroups.map((group) => [group.name, []]))

// A pad passes when, in every group with a selection, it matches at least one selected option.
export const filterPads = (list, filters) => list.filter((pad) => rangeFilterGroups.every(({ name, options }) => (
  filters[name].length === 0 || options.some((option) => filters[name].includes(option.value) && option.test(pad))
)))

const countSelected = (filters) => Object.values(filters).reduce((total, values) => total + values.length, 0)

// Icon-only filter button plus the filter bar it reveals. The bar is hidden by default; closing it clears the
// filters, so nothing stays filtered out of sight.
export default function RangeFilters({ open, onOpenChange, filters, onChange, shown, total }) {
  const barId = useId()
  const selected = countSelected(filters)

  const toggleOpen = () => {
    if (open) onChange(emptyRangeFilters)
    onOpenChange(!open)
  }
  const toggleOption = (group, value) => onChange({
    ...filters,
    [group]: filters[group].includes(value) ? filters[group].filter((item) => item !== value) : [...filters[group], value],
  })

  return (
    <div className="mb-6" data-anim style={{ '--d': '.1s' }}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={barId}
          onClick={toggleOpen}
          className={cn(
            'relative inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border pr-5 pl-4 text-[14px] font-semibold shadow-soft transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
            open ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink hover:border-brand',
          )}
        >
          <SlidersHorizontal size={19} strokeWidth={2} aria-hidden="true" className={open ? 'text-white' : 'text-brand'} />
          Filters
          {selected > 0 && (
            <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full border-2 border-white bg-[#e8506a] text-[10px] font-bold text-white">
              {selected}<span className="sr-only"> selected</span>
            </span>
          )}
        </button>
        <p className="text-[13px] text-muted" aria-live="polite">Showing <strong className="text-ink">{shown}</strong> of {total} pads</p>
      </div>

      <div id={barId} hidden={!open} className="motion-drop mt-4 rounded-[22px] bg-white p-5 shadow-soft md:p-6">
        <div className="grid gap-5 md:grid-cols-[repeat(3,auto)_1fr] md:items-start md:gap-8">
          {rangeFilterGroups.map(({ name, title, options }) => (
            <fieldset key={name}>
              <legend className="mb-2.5 text-[11px] font-semibold uppercase tracking-[.16em] text-muted">{title}</legend>
              <div className="flex flex-wrap gap-2">
                {options.map(({ value, label }) => {
                  const on = filters[name].includes(value)
                  return (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleOption(name, value)}
                      className={cn(
                        'inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-semibold transition-[color,background-color,border-color,scale] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
                        on ? 'border-brand bg-brand text-white' : 'border-line bg-white text-body hover:border-brand hover:text-ink',
                      )}
                    >
                      {on && <Check size={14} />}{label}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          ))}
          <button
            type="button"
            onClick={() => onChange(emptyRangeFilters)}
            disabled={selected === 0}
            className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 self-end justify-self-start rounded-full px-3 text-[13px] font-semibold text-brand hover:underline disabled:cursor-default disabled:text-muted disabled:no-underline md:justify-self-end"
          >
            <X size={14} /> Clear all
          </button>
        </div>
      </div>
    </div>
  )
}
