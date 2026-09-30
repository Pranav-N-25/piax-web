import { useEffect, useId, useRef, useState } from 'react'
import { MousePointerClick } from 'lucide-react'
import { cn } from '../homeStyles.js'
import { gutterBleed } from '../../common/spacing.js'
import { DoodleNote } from '../HomeUi.jsx'
import PadVisual from './PadVisual.jsx'
import { VIEW_WIDTH, layerTip } from './padGeometry.js'
import { layerNumber, padLayers } from './padLayers.js'

const desktopQuery = '(min-width: 45rem)'
const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

// Measures the pad and card positions relative to the explorer, re-measuring only
// when layout changes. Cards never transform, so their boxes stay stable.
function useConnectorGeometry(rootRef, padRef, cardRefs) {
  const [geometry, setGeometry] = useState(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || !('ResizeObserver' in window)) return undefined
    const measure = () => {
      const box = root.getBoundingClientRect()
      const pad = padRef.current.getBoundingClientRect()
      setGeometry({
        width: box.width,
        height: box.height,
        padX: pad.left - box.left,
        padY: pad.top - box.top,
        scale: pad.width / VIEW_WIDTH,
        cards: cardRefs.current.map((card) => {
          const rect = card.getBoundingClientRect()
          return { x: rect.left - box.left, y: rect.top - box.top + rect.height / 2 }
        }),
      })
    }
    const observer = new ResizeObserver(measure)
    observer.observe(root)
    cardRefs.current.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [rootRef, padRef, cardRefs])

  return geometry
}

function LayerConnectors({ geometry, activeId, revealed }) {
  const uid = useId().replace(/[^\w-]/g, '')
  if (!geometry) return null

  // Card edge → dotted S-curve → the layer's front tip (lifted when active).
  const route = (index, lifted) => {
    const card = geometry.cards[index]
    const tip = layerTip(index, lifted)
    const start = { x: card.x - 8, y: card.y }
    const end = { x: geometry.padX + tip.x * geometry.scale, y: geometry.padY + tip.y * geometry.scale }
    const bend = (start.x + end.x) / 2
    return { start, end, d: `M${start.x} ${start.y}C${bend} ${start.y} ${bend} ${end.y} ${end.x} ${end.y}` }
  }
  const active = activeId ? route(activeId - 1, true) : null

  return (
    <svg
      className={cn('pointer-events-none absolute inset-0 hidden overflow-visible transition-opacity duration-700 motion-reduce:transition-none md:block', revealed ? 'opacity-100 delay-300' : 'opacity-0')}
      width={geometry.width}
      height={geometry.height}
      aria-hidden="true"
    >
      <defs>
        <marker id={`${uid}-arrow`} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="9" markerHeight="9" markerUnits="userSpaceOnUse" orient="auto">
          <path d="M1.5 1.5L8.5 5L1.5 8.5" fill="none" stroke="#0b5b4e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
        {active && (
          <mask id={`${uid}-draw`} maskUnits="userSpaceOnUse" x="0" y="0" width={geometry.width} height={geometry.height}>
            <path key={activeId} d={active.d} fill="none" stroke="#fff" strokeWidth="18" strokeLinecap="round" pathLength="1" strokeDasharray="1" className="animate-connector-draw motion-reduce:animate-none" />
          </mask>
        )}
      </defs>

      {padLayers.map(({ id }) => {
        const { d, end } = route(id - 1, false)
        // Only the active layer keeps its pointer; the rest fade out so one description reads at a time.
        const emphasis = activeId === id ? 0 : activeId ? 0 : 0.85
        return (
          <g key={id} className="transition-opacity duration-300 motion-reduce:transition-none" opacity={emphasis}>
            <path d={d} fill="none" stroke="#8fb9aa" strokeWidth="1" strokeDasharray="1.5 4.5" strokeLinecap="round" />
            <circle cx={end.x - 3} cy={end.y} r="2" fill="#8fb9aa" />
          </g>
        )
      })}

      {active && (
        <>
          <path d={active.d} mask={`url(#${uid}-draw)`} fill="none" stroke="#0b5b4e" strokeWidth="1.5" strokeDasharray="3 4" strokeLinecap="round" markerEnd={`url(#${uid}-arrow)`} />
          <circle cx={active.start.x} cy={active.start.y} r="3.5" fill="#fff" stroke="#0b5b4e" strokeWidth="1.5" />
        </>
      )}
    </svg>
  )
}

function LayerCard({ layer, active, dimmed, cardRef, onHover, onSelect }) {
  const { id, title, text, icon: Icon } = layer
  return (
    <li className="w-[78%] shrink-0 snap-center md:w-auto">
      <button
        ref={cardRef}
        type="button"
        aria-pressed={active}
        onPointerEnter={(event) => event.pointerType === 'mouse' && onHover(id)}
        onFocus={() => onSelect(id)}
        onClick={() => onSelect(id)}
        className={cn(
          'relative grid h-full w-full cursor-pointer grid-cols-[auto_34px_minmax(0,1fr)] items-center gap-3 rounded-2xl border px-4 py-2.5 text-left transition-[background-color,border-color,box-shadow] duration-300 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
          active ? 'border-brand/35 bg-white shadow-lift' : dimmed ? 'border-transparent bg-white/50' : 'border-white bg-white/80 shadow-soft',
        )}
      >
        <span className={cn('w-6 text-[15px] font-bold tabular-nums tracking-[-.02em] transition-colors duration-300', active ? 'text-brand' : 'text-brand/75')}>
          {layerNumber(id)}
        </span>
        <span className={cn('flex size-[34px] items-center justify-center rounded-full transition-colors duration-300 motion-reduce:transition-none', active ? 'bg-brand text-white' : 'bg-brand-soft text-brand')}>
          <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
        </span>
        <span>
          <strong className="block text-[13.5px] font-semibold leading-[1.2] text-ink">{title}</strong>
          <span className="mt-0.5 block text-[12px] leading-[1.35] text-muted">{text}</span>
        </span>
      </button>
    </li>
  )
}

const tourStepMs = 2600

// While nobody is exploring, walks through the layers one by one so each description gets its turn.
// Pauses as soon as the visitor hovers or selects, and never runs with reduced motion.
function useLayerTour(enabled) {
  const [tourId, setTourId] = useState(1)
  const [still] = useState(() => window.matchMedia(reducedMotionQuery).matches)
  const running = enabled && !still

  useEffect(() => {
    if (!running) return undefined
    const timer = setInterval(() => setTourId((id) => id % padLayers.length + 1), tourStepMs)
    return () => clearInterval(timer)
  }, [running])

  return running ? tourId : null
}

// Hover (mouse) previews a layer; click, tap or keyboard focus selects it. With neither, a guided
// tour steps through the layers. One active id drives the pad, the connector and the cards together.
export default function PadLayerExplorer({ revealed = true }) {
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)
  const userId = hovered ?? selected
  const tourId = useLayerTour(revealed && userId === null)
  const activeId = userId ?? tourId

  const rootRef = useRef(null)
  const padRef = useRef(null)
  const listRef = useRef(null)
  const cardRefs = useRef([])
  const geometry = useConnectorGeometry(rootRef, padRef, cardRefs)

  // On phones the cards are a swipe row: bring the tapped layer's card into view.
  const selectFromPad = (id) => {
    setSelected(id)
    const list = listRef.current
    const card = cardRefs.current[id - 1]
    if (!list || !card || window.matchMedia(desktopQuery).matches) return
    list.scrollTo({
      left: card.offsetLeft - (list.clientWidth - card.offsetWidth) / 2,
      behavior: window.matchMedia(reducedMotionQuery).matches ? 'auto' : 'smooth',
    })
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setSelected(null)
      return
    }
    const current = cardRefs.current.indexOf(document.activeElement)
    if (current === -1) return
    const last = padLayers.length - 1
    const next = {
      ArrowDown: Math.min(current + 1, last),
      ArrowRight: Math.min(current + 1, last),
      ArrowUp: Math.max(current - 1, 0),
      ArrowLeft: Math.max(current - 1, 0),
      Home: 0,
      End: last,
    }[event.key]
    if (next === undefined) return
    event.preventDefault()
    cardRefs.current[next].focus()
  }

  return (
    <div
      ref={rootRef}
      className="relative grid items-center gap-6 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-x-12"
      onPointerLeave={() => setHovered(null)}
      onKeyDown={handleKeyDown}
    >
      <LayerConnectors geometry={geometry} activeId={activeId} revealed={revealed} />

      <div className="relative">
        {/* Handwritten hint with an arrow curling down onto the pad: it's interactive. The cursor glides and
            clicks until the visitor starts exploring, then rests. */}
        <DoodleNote inline arrow="down-right" className="mb-1 ml-2 w-fit text-[21px] md:ml-6">
          <MousePointerClick
            size={22}
            strokeWidth={1.8}
            className={cn('mr-2 inline-block align-[-4px] motion-safe:animate-cursor-guide', userId !== null && 'motion-safe:animate-none')}
          />
          <span className="md:hidden">Tap a layer to explore!</span>
          <span className="hidden md:inline">Explore each layer!</span>
        </DoodleNote>
        <div ref={padRef} className="relative mx-auto w-full max-w-[360px] md:max-w-[400px] lg:max-w-none">
          <PadVisual activeId={activeId} settled={revealed} onHover={setHovered} onSelect={selectFromPad} />
        </div>
      </div>

      <ol data-stagger
        ref={listRef}
        aria-label="The 8 layers inside a PIAX pad"
        className={cn(gutterBleed, 'relative flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] md:mx-0 md:grid md:gap-2 md:overflow-visible md:p-0 [&::-webkit-scrollbar]:hidden')}
      >
        {padLayers.map((layer, index) => (
          <LayerCard
            key={layer.id}
            layer={layer}
            active={activeId === layer.id}
            dimmed={activeId !== null && activeId !== layer.id}
            cardRef={(node) => { cardRefs.current[index] = node }}
            onHover={setHovered}
            onSelect={setSelected}
          />
        ))}
      </ol>
    </div>
  )
}
