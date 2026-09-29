import { useState } from 'react'
import { ArrowRight, Check, Minus, Plus } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { orderService } from '../../services/orderService.js'
import { money } from '../../utils/formatters.js'
import { EmptyState } from '../../components/common/FeedbackStates.jsx'
import { button, cn, productTones, ui } from '../../components/common/ui.js'

const layout = 'gap-16 md:grid md:grid-cols-[1.5fr_.8fr]'
const summary = 'mt-8 self-start bg-white p-6 md:mt-0'
const summaryTitle = cn(ui.h2, 'mb-6 text-[27px]')
const summaryRow = 'flex justify-between py-2 text-[13px]'
const summaryTotal = 'mt-2.5 flex justify-between border-t border-rule pt-4 pb-2 text-[17px]'
const demoNote = 'mt-4 text-center text-[11px] text-stone'

export function Cart() {
  const { items, subtotal, total, changeQuantity, removeItem } = useCart()
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
            <div key={item.id} className="grid grid-cols-[55px_1fr_auto] items-center gap-2.5 border-t border-rule py-4 md:grid-cols-[70px_1fr_auto_auto] md:gap-5">
              <div className={cn('h-[70px]', productTones[item.tone])} />
              <div>
                <h3 className="mb-1.5 font-playfair text-xl leading-[1.25] font-medium">{item.name}</h3>
                <p className="m-0 text-[13px] text-stone">{item.size} · {item.boxCount} pads</p>
                <strong className="mt-1.5 block">{money(item.price)}</strong>
              </div>
              <div className={cn(ui.quantity, 'col-start-2 justify-self-start md:col-start-auto')}>
                <button className={ui.quantityButton} onClick={() => changeQuantity(item.id, -1)} aria-label="Decrease"><Minus size={15} /></button>
                <span>{item.quantity}</span>
                <button className={ui.quantityButton} onClick={() => changeQuantity(item.id, 1)} aria-label="Increase"><Plus size={15} /></button>
              </div>
              <button className="col-start-3 row-start-2 cursor-pointer text-xs text-stone md:col-start-auto md:row-start-auto" onClick={() => removeItem(item.id)}>Remove</button>
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
