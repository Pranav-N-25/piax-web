import { cn } from '../common/ui.js'

const checkbox = 'size-[18px] shrink-0 cursor-pointer rounded accent-leaf focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf'
const row = 'flex min-h-9 cursor-pointer items-center gap-3 text-sm text-charcoal hover:text-leaf'

// One filter group. With `withAll`, an "All" option is checked while nothing is selected.
export default function ProductFilterGroup({ title, name, options, selected, onToggle, onClear, withAll = false, className = '' }) {
  return (
    <fieldset className={cn('border-t border-rule pt-5', className)}>
      <legend className="float-left mb-2 w-full text-sm font-semibold text-charcoal">{title}</legend>
      <div className="clear-both grid gap-0.5">
        {withAll && (
          <label className={row}>
            <input type="checkbox" className={checkbox} checked={selected.length === 0} onChange={() => onClear(name)} />
            All
          </label>
        )}
        {options.map(({ value, label }) => (
          <label key={value} className={row}>
            <input
              type="checkbox"
              className={checkbox}
              checked={selected.includes(value)}
              onChange={() => onToggle(name, value)}
            />
            {label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
