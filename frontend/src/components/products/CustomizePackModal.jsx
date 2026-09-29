import { useState } from 'react'
import { Minus, Plus, ShoppingBag } from 'lucide-react'
import Dialog from '../common/Dialog.jsx'
import { money } from '../../utils/formatters.js'
import { button, choice, focusRing } from './productStyles.js'

const groupTitle = 'mb-3 text-sm font-semibold text-charcoal'

function ChoiceGroup({ title, options, value, onChange, render = (option) => option }) {
  return (
    <fieldset>
      <legend className={groupTitle}>{title}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const key = typeof option === 'object' ? option.size : option
          return (
            <button key={key} type="button" aria-pressed={value === key} onClick={() => onChange(key)} className={choice(value === key)}>
              {render(option)}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

function customPackPrice(options, { size, type, pads }) {
  const perPad = options.sizes.find((option) => option.size === size).perPad + (type === 'Night' ? options.nightPerPadExtra : 0)
  return Math.round(perPad * pads)
}

export default function CustomizePackModal({ open, onClose, product, options, onAdd }) {
  const [size, setSize] = useState('XL')
  const [type, setType] = useState('Day')
  const [flow, setFlow] = useState('Moderate')
  const [pads, setPads] = useState(6)
  const [packs, setPacks] = useState(1)

  if (!product || !options) return null
  const packPrice = customPackPrice(options, { size, type, pads })
  const length = options.sizes.find((option) => option.size === size).length

  const addToCart = () => {
    onAdd({
      ...product,
      id: `${product.id}-${size}-${type}-${pads}`,
      name: `Build Your Own Pack · ${size} ${type}`,
      subtitle: `${length} · ${pads} Pads · ${flow} flow`,
      size,
      length,
      boxCount: pads,
      price: packPrice,
      mrp: null,
    }, packs)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Build Your Own Pack"
      description="Choose the size, type and count that fit your flow."
      footer={(
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-stone">
            Total
            <strong className="block text-xl font-semibold text-charcoal">{money(packPrice * packs)}</strong>
          </p>
          <button type="button" onClick={addToCart} className={button.primary}>
            <ShoppingBag size={16} /> Add Custom Pack to Cart
          </button>
        </div>
      )}
    >
      <div className="grid gap-6">
        <ChoiceGroup
          title="Pad size"
          options={options.sizes}
          value={size}
          onChange={setSize}
          render={(option) => <span className="flex flex-col py-1 leading-tight">{option.size}<small className="text-[11px] text-stone">{option.length}</small></span>}
        />
        <ChoiceGroup title="Pad type" options={options.types} value={type} onChange={setType} />
        <ChoiceGroup title="Flow preference" options={options.flows} value={flow} onChange={setFlow} />
        <ChoiceGroup title="Pads per pack" options={options.padCounts} value={pads} onChange={setPads} render={(count) => `${count} pads`} />
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-charcoal">Number of packs</p>
            <p className="text-xs text-stone">{money(packPrice)} per pack</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-rule p-1">
            <button type="button" aria-label="Fewer packs" disabled={packs <= 1} onClick={() => setPacks(packs - 1)} className={`flex size-9 cursor-pointer items-center justify-center rounded-full text-leaf hover:bg-foam disabled:cursor-default disabled:text-stone/50 ${focusRing}`}>
              <Minus size={16} />
            </button>
            <span className="w-6 text-center text-sm font-semibold" aria-live="polite">{packs}</span>
            <button type="button" aria-label="More packs" disabled={packs >= 10} onClick={() => setPacks(packs + 1)} className={`flex size-9 cursor-pointer items-center justify-center rounded-full text-leaf hover:bg-foam disabled:cursor-default disabled:text-stone/50 ${focusRing}`}>
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
