import { useId } from 'react'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'
import { sortOptions } from '../../utils/productFilters.js'
import { button, focusRing } from './productStyles.js'
import { cn } from '../common/ui.js'

export default function ProductSort({ count, sort, onSortChange, activeFilterCount, onOpenFilters }) {
  const sortId = useId()
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-charcoal" aria-live="polite">
        Showing <strong className="font-semibold">{count}</strong> {count === 1 ? 'product' : 'products'}
      </p>
      <div className="flex items-center gap-2">
        <button type="button" onClick={onOpenFilters} className={cn(button.secondary, 'min-h-10 px-4 lg:hidden')}>
          <SlidersHorizontal size={16} /> Filters{activeFilterCount > 0 && ` (${activeFilterCount})`}
        </button>
        <label htmlFor={sortId} className="sr-only text-sm text-stone min-[480px]:not-sr-only">Sort by</label>
        <div className="relative">
          <select
            id={sortId}
            value={sort}
            onChange={(event) => onSortChange(event.target.value)}
            className={cn('h-10 cursor-pointer appearance-none rounded-full border border-rule bg-white pr-9 pl-4 text-sm text-charcoal hover:border-sage', focusRing)}
          >
            {sortOptions.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-charcoal" />
        </div>
      </div>
    </div>
  )
}
