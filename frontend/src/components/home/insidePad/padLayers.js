import { Anchor, Atom, Droplet, Leaf, Recycle, ShieldCheck, Waves, Wind } from 'lucide-react'

// Single source of truth for the pad diagram, its connectors and the layer cards.
// `kind` picks how PadVisual draws the layer; ids run top (1) to bottom (8).
export const padLayers = [
  { id: 1, kind: 'top', title: 'Soft Top Sheet', text: 'The layer against your skin, designed for a soft feel.', icon: Leaf },
  { id: 2, kind: 'anion', title: 'Anion Strip', text: 'Part of PIAX’s anion-infused design.', icon: Atom },
  { id: 3, kind: 'absorb', title: 'Distribution Layer', text: 'Spreads flow across the pad.', icon: Waves },
  { id: 4, kind: 'core', title: 'Absorbent Core', text: 'The centre of the pad, where flow is held.', icon: Droplet },
  { id: 5, kind: 'channels', title: 'Leak-Management Design', text: 'Shaped to help guide flow and manage leaks.', icon: ShieldCheck },
  { id: 6, kind: 'breathable', title: 'Inner Barrier Layer', text: 'Sits between the core and the back sheet.', icon: Wind },
  { id: 7, kind: 'wings', title: 'Winged Design', text: 'Wings fold around your underwear to hold the pad in place.', icon: Anchor },
  { id: 8, kind: 'back', title: 'Back Sheet & Adhesive', text: 'Attaches the pad to your underwear.', icon: Recycle },
]

export const layerNumber = (id) => String(id).padStart(2, '0')
