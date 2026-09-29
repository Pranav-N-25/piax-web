import Dialog from '../common/Dialog.jsx'
import ProductFilters from './ProductFilters.jsx'
import { countActiveFilters } from '../../utils/productFilters.js'
import { button } from './productStyles.js'

// Bottom sheet holding the filter panel on phones and tablets. Filters apply live.
export default function ProductFilterDrawer({ open, onClose, filters, resultCount, onToggle, onClearGroup, onClearAll }) {
  const active = countActiveFilters(filters)
  return (
    <Dialog
      open={open}
      onClose={onClose}
      variant="sheet"
      title="Filters"
      description={active ? `${active} selected` : 'Narrow down by flow, size, type and features.'}
      footer={(
        <div className="flex gap-3">
          <button type="button" onClick={onClearAll} disabled={active === 0} className={`${button.secondary} flex-1 disabled:cursor-default disabled:border-rule disabled:text-stone`}>
            Clear all
          </button>
          <button type="button" onClick={onClose} className={`${button.primary} flex-[2]`}>
            Show {resultCount} {resultCount === 1 ? 'product' : 'products'}
          </button>
        </div>
      )}
    >
      <ProductFilters filters={filters} onToggle={onToggle} onClearGroup={onClearGroup} onClearAll={onClearAll} showHeading={false} />
    </Dialog>
  )
}
