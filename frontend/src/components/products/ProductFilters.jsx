import ProductFilterGroup from './ProductFilterGroup.jsx'
import { countActiveFilters, filterOptions } from '../../utils/productFilters.js'
import { focusRing } from './productStyles.js'

const defaultGroups = [
  { name: 'flows', title: 'Flow Type', withAll: true },
  { name: 'sizes', title: 'Size', withAll: true },
  { name: 'types', title: 'Type' },
  { name: 'features', title: 'Features' },
]

// Filter panel content, shared by the desktop sidebar and the mobile drawer.
// `groups` and `options` default to the full catalogue's filters; a page can pass its own.
export default function ProductFilters({ filters, onToggle, onClearGroup, onClearAll, showHeading = true, groups = defaultGroups, options = filterOptions }) {
  const active = countActiveFilters(filters)
  return (
    <div>
      {showHeading && (
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-charcoal">Filters</h2>
          <button
            type="button"
            onClick={onClearAll}
            disabled={active === 0}
            className={`cursor-pointer rounded text-[13px] font-medium text-leaf hover:underline disabled:cursor-default disabled:text-stone disabled:no-underline ${focusRing}`}
          >
            Clear all
          </button>
        </div>
      )}
      <div className="grid gap-5">
        {groups.map(({ name, title, withAll }) => (
          <ProductFilterGroup
            key={name}
            name={name}
            title={title}
            withAll={withAll}
            options={options[name]}
            selected={filters[name]}
            onToggle={onToggle}
            onClear={onClearGroup}
          />
        ))}
      </div>
    </div>
  )
}
