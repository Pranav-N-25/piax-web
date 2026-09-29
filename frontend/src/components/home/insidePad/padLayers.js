import { Anchor, Atom, Droplet, Leaf, Recycle, ShieldCheck, Waves, Wind } from 'lucide-react'

// Single source of truth for the pad diagram, its connectors and the layer cards.
// `kind` picks how PadVisual draws the layer; ids run top (1) to bottom (8).
export const padLayers = [
  { id: 1, kind: 'top', title: 'Soft Bamboo Top Layer', text: 'Gentle, breathable and rash-free.', icon: Leaf },
  { id: 2, kind: 'anion', title: 'Anion Strip', text: 'Helps maintain freshness and reduce odour.', icon: Atom },
  { id: 3, kind: 'absorb', title: 'Quick Absorption Layer', text: 'Pulls fluid in instantly.', icon: Waves },
  { id: 4, kind: 'core', title: 'SAP Core', text: 'Locks in fluid and keeps you dry for longer.', icon: Droplet },
  { id: 5, kind: 'channels', title: 'Leak-Lock Channels', text: 'Distributes fluid evenly and helps prevent side leaks.', icon: ShieldCheck },
  { id: 6, kind: 'breathable', title: 'Breathable Bottom Layer', text: 'Lets air out, keeps moisture away.', icon: Wind },
  { id: 7, kind: 'wings', title: '4-Wing Design', text: 'Stays in place, no shifting.', icon: Anchor },
  { id: 8, kind: 'back', title: 'Eco-Conscious Back Sheet', text: 'Compostable & oxo-biodegradable.', icon: Recycle },
]

export const layerNumber = (id) => String(id).padStart(2, '0')
