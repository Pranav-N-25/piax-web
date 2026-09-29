import { cn } from '../common/ui.js'

const styles = {
  'Best Seller': 'bg-[#e8506a] text-white',
  New: 'bg-leaf text-white',
}

export default function ProductBadge({ label, className = '' }) {
  if (!label) return null
  return (
    <span className={cn('rounded-full px-3 py-1 text-[11px] font-semibold', styles[label] ?? 'bg-[#e8506a] text-white', className)}>
      {label}
    </span>
  )
}
