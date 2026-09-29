import { useId } from 'react'
import { cn } from '../homeStyles.js'
import { CENTER_X, ISO, LIFT, SETTLE, VIEW_HEIGHT, VIEW_WIDTH, layerTip, layerY } from './padGeometry.js'
import { layerNumber, padLayers } from './padLayers.js'

const OUTLINE = 'M-150 0C-150-40-122-47-92-45C-52-43-32-32 0-32C32-32 52-43 92-45C122-47 150-40 150 0C150 40 122 47 92 45C52 43 32 32 0 32C-32 32-52 43-92 45C-122 47-150 40-150 0Z'
const WING = 'M-76-40C-74-58-66-78-50-82C-34-86-16-80-10-66C-7-56-8-44-8-32Z'
const WING_MIRRORS = ['scale(1 1)', 'scale(-1 1)', 'scale(1 -1)', 'scale(-1 -1)']
const hairline = { vectorEffect: 'non-scaling-stroke' }
const edgeStroke = '#d3e2db'

// Side thickness and colour of each layer's slab edge.
const edges = {
  top: [4, '#dfeae5'],
  anion: [2, '#e3ece8'],
  absorb: [4, '#dbe9f0'],
  core: [8, '#bcd8ee'],
  channels: [4, '#dfeae5'],
  breathable: [3, '#e1ebe7'],
  wings: [4, '#dfeae5'],
  back: [3, '#bcdccb'],
}

function Wings(props) {
  return WING_MIRRORS.map((mirror) => <path key={mirror} d={WING} transform={mirror} {...props} />)
}

function Silhouette({ kind, ...props }) {
  return (
    <>
      {(kind === 'wings' || kind === 'back') && <Wings {...props} />}
      <path d={OUTLINE} {...props} />
    </>
  )
}

function LayerFace({ kind, ids }) {
  const base = { stroke: edgeStroke, strokeWidth: 1, style: hairline }
  switch (kind) {
    case 'top':
      return (
        <>
          <path d={OUTLINE} fill="#fff" {...base} />
          <path d={OUTLINE} fill={`url(#${ids.emboss})`} />
          <path d={OUTLINE} transform="scale(.8 .68)" fill="none" stroke="#dfe9e4" strokeWidth={1.5} style={hairline} />
        </>
      )
    case 'anion':
      return (
        <>
          <path d={OUTLINE} fill="#fff" fillOpacity={0.55} {...base} strokeDasharray="3 4" />
          <rect x={-104} y={-12} width={208} height={24} rx={12} fill="#6cc3a0" />
          <rect x={-104} y={-12} width={208} height={24} rx={12} fill={`url(#${ids.strip})`} />
        </>
      )
    case 'absorb':
      return (
        <>
          <path d={OUTLINE} fill="#f3f9fc" {...base} />
          <path d={OUTLINE} fill={`url(#${ids.perforation})`} />
        </>
      )
    case 'core':
      return (
        <>
          <path d={OUTLINE} fill="#f7fbfd" {...base} />
          <path d={OUTLINE} transform="scale(.84 .66)" fill="#d3e7f7" stroke="#b5d4ec" strokeWidth={1} style={hairline} />
          <path d={OUTLINE} transform="scale(.84 .66)" fill={`url(#${ids.beads})`} />
        </>
      )
    case 'channels':
      return (
        <>
          <path d={OUTLINE} fill="#fff" {...base} />
          <path d={OUTLINE} transform="scale(.88 .8)" fill="none" stroke="#a8cfc0" strokeWidth={2} style={hairline} />
          <path d={OUTLINE} transform="scale(.7 .56)" fill="none" stroke="#a8cfc0" strokeWidth={2} style={hairline} />
        </>
      )
    case 'breathable':
      return (
        <>
          <path d={OUTLINE} fill="#fbfdfc" {...base} />
          <path d={OUTLINE} fill={`url(#${ids.micro})`} />
        </>
      )
    case 'wings':
      return (
        <>
          <Silhouette kind={kind} fill="#fff" {...base} />
          <path d={OUTLINE} transform="scale(.93 .86)" fill="none" stroke="#cfe0d8" strokeWidth={1} strokeDasharray="3 3" style={hairline} />
        </>
      )
    default:
      return (
        <>
          <Silhouette kind={kind} fill="#e4f3ea" stroke="#b7d8c7" strokeWidth={1} style={hairline} />
          <rect x={-112} y={-15} width={224} height={30} rx={15} fill="#d0e8da" />
        </>
      )
  }
}

// Exploded, interactive PIAX pad. The drawing is aria-hidden: the layer cards
// are the accessible controls, and pointer input here mirrors them.
export default function PadVisual({ activeId, settled, onHover, onSelect }) {
  const uid = useId().replace(/[^\w-]/g, '')
  const ids = {
    shadow: `${uid}-shadow`,
    emboss: `${uid}-emboss`,
    strip: `${uid}-strip`,
    perforation: `${uid}-perforation`,
    beads: `${uid}-beads`,
    micro: `${uid}-micro`,
  }
  const drawOrder = [...padLayers].reverse()

  return (
    <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} className="block h-auto w-full overflow-visible" aria-hidden="true">
      <defs>
        <filter id={ids.shadow} x="-20%" y="-30%" width="140%" height="180%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0b5b4e" floodOpacity=".09" />
        </filter>
        <pattern id={ids.emboss} width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="4.5" cy="4.5" r="1.1" fill="#e2ebe7" />
        </pattern>
        <pattern id={ids.strip} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0V8" stroke="#8fd3b7" strokeWidth="2" />
        </pattern>
        <pattern id={ids.perforation} width="11" height="11" patternUnits="userSpaceOnUse">
          <circle cx="5.5" cy="5.5" r="1.6" fill="#cfe3ef" />
        </pattern>
        <pattern id={ids.beads} width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="2.4" fill="#76b3e4" />
          <circle cx="9" cy="8.5" r="1.7" fill="#9ccaee" />
        </pattern>
        <pattern id={ids.micro} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r=".8" fill="#d6e2dd" />
        </pattern>
      </defs>

      {drawOrder.map(({ id, kind }) => {
        const index = id - 1
        const y = layerY(index)
        const [thickness, edgeColor] = edges[kind]
        const active = activeId === id
        const offset = active ? LIFT : settled ? 0 : (index - 3.5) * SETTLE
        return (
          <g
            key={id}
            data-layer={id}
            className="transition-[transform,opacity] duration-400 ease-out motion-reduce:transition-none"
            style={{ transform: `translateY(${offset}px)`, opacity: activeId && !active ? 0.45 : 1 }}
          >
            <g transform={`translate(${CENTER_X} ${y + thickness})`}>
              <g transform={ISO}>
                {kind === 'anion'
                  ? <rect x={-104} y={-12} width={208} height={24} rx={12} fill="#4fae88" />
                  : <Silhouette kind={kind} fill={edgeColor} />}
              </g>
            </g>
            <g transform={`translate(${CENTER_X} ${y})`} filter={`url(#${ids.shadow})`}>
              <g transform={ISO}>
                <path
                  d={OUTLINE}
                  fill="none"
                  stroke="#0b5b4e"
                  strokeOpacity=".22"
                  strokeWidth="7"
                  style={hairline}
                  className="transition-opacity duration-300 motion-reduce:transition-none"
                  opacity={active ? 1 : 0}
                />
                <LayerFace kind={kind} ids={ids} />
                {active && <path d={OUTLINE} fill="none" stroke="#0b5b4e" strokeWidth={1.25} style={hairline} />}
              </g>
            </g>
          </g>
        )
      })}

      {/* Static hit areas at rest positions, so a lifting layer never slips out from under the pointer. */}
      {drawOrder.map(({ id }) => (
        <path
          key={id}
          d={OUTLINE}
          transform={`translate(${CENTER_X} ${layerY(id - 1)}) ${ISO}`}
          fill="transparent"
          className="cursor-pointer"
          onPointerEnter={(event) => event.pointerType === 'mouse' && onHover(id)}
          onClick={() => onSelect(id)}
        />
      ))}

      {/* Numbered pins stand in for the connectors on phones. */}
      <g className="md:hidden">
        {padLayers.map(({ id }) => {
          const tip = layerTip(id - 1)
          const active = activeId === id
          return (
            <g key={id} className="cursor-pointer" onClick={() => onSelect(id)}>
              <path d={`M${tip.x} ${tip.y}H${tip.x + 17}`} stroke="#8fb9aa" strokeDasharray="1.5 3" strokeLinecap="round" />
              <circle cx={tip.x + 29} cy={tip.y} r="11" fill={active ? '#0b5b4e' : '#fff'} stroke="#0b5b4e" strokeWidth="1" />
              <text x={tip.x + 29} y={tip.y + 3.5} textAnchor="middle" className={cn('font-sans text-[10px] font-bold', active ? 'fill-white' : 'fill-brand')}>
                {layerNumber(id)}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}
