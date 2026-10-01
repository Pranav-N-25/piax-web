import { Droplets, Feather, Moon, Sun } from 'lucide-react'
import { cn } from '../common/ui.js'
import { artwork } from './productImages.js'
import { focusRing } from './productStyles.js'

const icons = {
  all: <img src={artwork.packWithPad} alt="" width="48" height="42" className="h-10 w-12 object-contain" />,
  sun: <Sun size={30} strokeWidth={1.5} className="text-[#f0a53a]" />,
  moon: <Moon size={28} strokeWidth={1.5} className="text-[#7b68c8]" />,
  droplets: <Droplets size={30} strokeWidth={1.5} className="text-[#e46a7e]" />,
  feather: <Feather size={28} strokeWidth={1.5} className="text-[#9b7bb0]" />,
  custom: <img src={artwork.customBox} alt="" width="48" height="36" className="h-10 w-12 object-contain mix-blend-multiply" />,
  liners: <img src={artwork.singlePad} alt="" width="48" height="52" className="h-10 w-12 object-contain mix-blend-multiply" />,
  bundles: <img src={artwork.trialPack} alt="" width="48" height="39" className="h-10 w-12 object-contain mix-blend-multiply" />,
}

export default function ProductCategoryItem({ category, active, onSelect }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onSelect(category.slug)}
      className={cn(
        'flex min-h-[104px] w-[132px] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border px-3 py-4 text-[13px] font-medium transition-colors lg:w-full',
        focusRing,
        active ? 'border-leaf bg-foam text-leaf' : 'border-transparent bg-white text-charcoal hover:border-sage',
      )}
    >
      <span className="flex h-10 items-center justify-center" aria-hidden="true">
        {category.image
          ? <img src={category.image} alt="" width="48" height="42" className="h-10 w-12 object-contain" />
          : icons[category.icon]}
      </span>
      {category.name}
    </button>
  )
}
