import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { focusRing } from './productStyles.js'

export default function ProductBreadcrumb() {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 text-[13px] text-stone">
        <li><Link to="/" className={`rounded hover:text-leaf ${focusRing}`}>Home</Link></li>
        <li aria-hidden="true"><ChevronRight size={14} /></li>
        <li aria-current="page" className="font-medium text-charcoal">Products</li>
      </ol>
    </nav>
  )
}
