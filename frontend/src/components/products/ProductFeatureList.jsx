import { CircleCheck, Droplet, Feather, Layers, Leaf, Lock, Ruler, Shield, Sparkles, Wind } from 'lucide-react'

const icons = { ruler: Ruler, feather: Feather, layers: Layers, leaf: Leaf, wind: Wind, shield: Shield, lock: Lock, droplet: Droplet, sparkles: Sparkles, check: CircleCheck }

// Compact two-column spec list shown on product cards.
export default function ProductFeatureList({ specs }) {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-2" aria-label="Key specifications">
      {specs.map(({ icon, label }) => {
        const Icon = icons[icon] ?? CircleCheck
        return (
          <li key={label} className="flex min-w-0 items-center gap-1.5 text-[11.5px] leading-tight text-stone">
            <Icon size={14} strokeWidth={1.6} className="shrink-0 text-charcoal/70" aria-hidden="true" />
            <span className="min-w-0">{label}</span>
          </li>
        )
      })}
    </ul>
  )
}
