import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { orderService } from '../../services/orderService.js'
import { money } from '../../utils/formatters.js'
import { EmptyState } from '../../components/common/FeedbackStates.jsx'
import { QuantityStepper } from '../../components/products/RangeUi.jsx'
import { button, cn, productTones, ui } from '../../components/common/ui.js'

const layout = 'gap-16 md:grid md:grid-cols-[1.5fr_.8fr]'
const summary = 'mt-8 self-start bg-white p-6 md:mt-0'
const summaryTitle = cn(ui.h2, 'mb-6 text-[27px]')
const summaryRow = 'flex justify-between py-2 text-[13px]'
const summaryTotal = 'mt-2.5 flex justify-between border-t border-rule pt-4 pb-2 text-[17px]'
const demoNote = 'mt-4 text-center text-[11px] text-stone'

export function Cart() {
  const { items, subtotal, total, removeItem } = useCart()
  const navigate = useNavigate()

  return <div className={ui.page}>
    <div className={ui.pageHeadingNarrow}>
      <span className={ui.eyebrow}>Your PIAX bag</span>
      <h1 className={ui.h1}>A little care,<br /><em className={ui.accent}>on its way.</em></h1>
    </div>
    {items.length === 0
      ? <EmptyState title="Your bag is waiting" text="Add something that feels right for your day." action="Browse products" to="/products" />
      : <div className={layout}>
        <div>
          {items.map((item) => (
            <div key={item.id} className="grid grid-cols-[64px_1fr] items-center gap-x-4 gap-y-3 border-t border-rule py-4 sm:grid-cols-[80px_1fr_auto_auto] sm:gap-5">
              {item.image
                ? <img src={item.image} alt="" className="aspect-square w-full rounded-2xl bg-[#eef5f1] object-contain p-1" />
                : <div className={cn('h-[70px]', productTones[item.tone])} />}
              <div className="min-w-0">
                <h3 className="mb-1 text-[17px] leading-[1.25] font-semibold">{item.name}</h3>
                <p className="m-0 text-[13px] text-stone">{item.subtitle ?? `${item.size} · ${item.boxCount} pads`}</p>
                <p className="mt-1.5 text-[13px]"><strong>{money(item.price)}</strong>{item.quantity > 1 && <span className="text-stone"> × {item.quantity} = {money(item.price * item.quantity)}</span>}</p>
              </div>
              <QuantityStepper item={item} className="col-start-2 w-[160px] sm:col-start-auto" />
              <button className="col-start-2 cursor-pointer justify-self-start text-xs text-stone hover:text-ink sm:col-start-auto" onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}
        </div>
        <aside className={summary}>
          <h2 className={summaryTitle}>Order summary</h2>
          <div className={summaryRow}><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
          <div className={summaryRow}><span>Delivery</span><strong>{subtotal ? '₹40' : 'Free'}</strong></div>
          <div className={summaryTotal}><span>Total</span><strong>{money(total)}</strong></div>
          <button className={cn(button.base, button.primary, button.full)} onClick={() => navigate('/checkout')}>Continue to checkout <ArrowRight size={17} /></button>
          <p className={demoNote}>Demo checkout · no real payment is taken</p>
        </aside>
      </div>}
  </div>
}

export function Checkout() {
  const { items, total } = useCart()
  const [paid, setPaid] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [order, setOrder] = useState()
  const pay = async () => {
    setProcessing(true)
    const created = await orderService.createOrder(items, total)
    setOrder(created)
    setPaid(true)
    setProcessing(false)
  }
  const step = 'text-xs text-[#9daaa4]'
  const activeStep = 'text-xs font-bold text-leaf'

  return <div className={ui.page}>
    <div className="mb-15 flex gap-8 border-b border-rule pb-4">
      <span className={activeStep}>1 Address</span>
      <span className={step}>2 Delivery</span>
      <span className={paid ? activeStep : step}>3 Confirmation</span>
    </div>
    {paid
      ? <div className="mx-auto max-w-[700px] pt-12 pb-20 text-center">
        <div className="mx-auto mb-8 flex size-[70px] items-center justify-center rounded-full bg-mint text-leaf"><Check size={29} /></div>
        <span className={cn(ui.eyebrow, 'justify-center')}>Payment successful</span>
        <h1 className={cn(ui.h1, 'text-[51px] md:text-[70px]')}>It’s on its way<br /><em className={ui.accent}>to feeling better.</em></h1>
        <p className="mb-8 text-stone">Your demo order <strong>{order.id}</strong> is being prepared.</p>
        <Link className={cn(button.base, button.primary)} to="/app/orders">View my orders <ArrowRight size={17} /></Link>
      </div>
      : <div className={layout}>
        <div className="max-w-[590px]">
          <span className={ui.eyebrow}>Delivery details</span>
          <h1 className={cn(ui.h1, 'text-[51px] md:text-[58px]')}>Where should we send it?</h1>
          <label className={ui.label}>Full name<input defaultValue="Aarohi Mehta" className={ui.input} /></label>
          <label className={ui.label}>Address<input placeholder="House no. and street" className={ui.input} /></label>
          <div className="gap-4 min-[431px]:grid min-[431px]:grid-cols-2">
            <label className={ui.label}>City<input placeholder="City" className={ui.input} /></label>
            <label className={ui.label}>PIN code<input placeholder="000 000" className={ui.input} /></label>
          </div>
          <button className={cn(button.base, button.primary)} onClick={pay} disabled={processing}>
            {processing ? 'Preparing payment...' : `Pay ${money(total)}`} <ArrowRight size={17} />
          </button>
          <p className={demoNote}>This is a simulated payment screen for the PIAX frontend demo.</p>
        </div>
        <aside className={summary}>
          <h2 className={summaryTitle}>Your order</h2>
          {items.map((item) => (
            <div key={item.id} className={summaryRow}><span>{item.name} × {item.quantity}</span><strong>{money(item.price * item.quantity)}</strong></div>
          ))}
          <div className={summaryTotal}><span>Total</span><strong>{money(total)}</strong></div>
        </aside>
      </div>}
  </div>
}
