import { useEffect, useState } from 'react'
import { ArrowRight, CircleUserRound, Sparkles } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { mockApi } from '../../services/mockApi.js'
import { money } from '../../utils/formatters.js'
import { button, cn, ui } from '../../components/common/ui.js'

const cardTitle = cn(ui.h2, 'mt-4 mb-2 text-[32px]')
const serifTitle = 'font-playfair font-medium leading-[1.25]'

export function CustomerArea() {
  const path = useLocation().pathname
  const { currentUser, logout } = useAuth()
  const [events, setEvents] = useState(() => JSON.parse(localStorage.getItem('piax-events') || '[]'))
  const addEvent = () => {
    const next = [{ date: new Date().toLocaleDateString(), type: 'Period started' }, ...events]
    setEvents(next)
    localStorage.setItem('piax-events', JSON.stringify(next))
  }

  if (path === '/app/track') return <Workspace title="Track your day" action={addEvent} actionLabel="Log today" content={
    <div className={ui.card}>
      <h2 className={cardTitle}>Today’s check-in</h2>
      <p className="mb-4 text-stone">Make a quick note about how you feel. Your demo entries stay on this device.</p>
      <div className="my-6 flex flex-wrap gap-2">
        {['Good', 'Okay', 'Low', 'Resting'].map((mood) => <button key={mood} className={cn(ui.chip, 'cursor-pointer')}>{mood}</button>)}
      </div>
      <label className={ui.label}>Notes<textarea placeholder="Anything you want to remember..." className={cn(ui.input, 'min-h-[120px] resize-y')} /></label>
    </div>
  } />

  if (path === '/app/profile') return <Workspace title="Your profile" action={logout} actionLabel="Log out" content={
    <div className={ui.card}>
      <CircleUserRound size={40} />
      <h2 className={cardTitle}>{currentUser.name}</h2>
      <p className="mb-4 text-stone">{currentUser.email}</p>
      <div className="mt-7 flex flex-wrap gap-2.5 border-t border-rule pt-5">
        <button className={cn(ui.chipActive, 'cursor-pointer')}>Personal information</button>
        <button className={cn(ui.chip, 'cursor-pointer')}>Preferences</button>
        <button className={cn(ui.chip, 'cursor-pointer')}>Privacy</button>
      </div>
    </div>
  } />

  if (path === '/app/orders') return <Orders />

  return <Workspace title={`Good morning, ${currentUser.name.split(' ')[0]}`} content={
    <div className="gap-5 md:grid md:grid-cols-[1.3fr_1fr]">
      <div className="mb-4 bg-leaf p-10 text-white md:row-span-2 md:mb-0">
        <span className={cn(ui.eyebrow, 'text-mint')}>Your next rhythm</span>
        <h2 className={cn(ui.h2, 'text-[44px]')}>About 6 days<br />until your next period.</h2>
        <p className="mb-4 text-sage">A gentle demo estimate based on the information you’ve logged.</p>
        <Link className={cn(button.base, button.light)} to="/app/calendar">Open calendar <ArrowRight size={16} /></Link>
      </div>
      <div className="mb-4 bg-white p-8 md:mb-0">
        <span className={ui.eyebrow}>Quick log</span>
        <h3 className={cn(serifTitle, 'mt-4 mb-6 text-[28px]')}>How are you feeling?</h3>
        <button className={cn(button.base, button.outline)} onClick={addEvent}>Log today</button>
      </div>
      <div className="mb-4 bg-white p-8 md:mb-0">
        <span className={ui.eyebrow}>PIAX noticed</span>
        <h3 className={cn(serifTitle, 'mt-4 mb-6 text-[28px]')}>Preparation may help this week.</h3>
        <Link className={ui.textLink} to="/app/insights">See insight <ArrowRight size={15} /></Link>
      </div>
    </div>
  } />
}

export function Orders() {
  const [orders, setOrders] = useState([])
  useEffect(() => { mockApi.getOrders().then(setOrders) }, [])

  return <Workspace title="Your orders" content={
    <div className="bg-white px-6">
      {orders.map((order) => (
        <div key={order.id} className="flex items-center justify-between gap-5 border-b border-rule py-6">
          <div>
            <span className={ui.eyebrow}>{order.id}</span>
            <h3 className={cn(serifTitle, 'mb-1.5 text-[21px]')}>{order.items.join(' + ')}</h3>
            <p className="m-0 text-xs text-stone">{order.date}</p>
          </div>
          <span className="rounded-[20px] bg-mint px-2.5 py-1.5 text-[11px] text-leaf">{order.status}</span>
          <strong>{money(order.total)}</strong>
        </div>
      ))}
    </div>
  } />
}

export function Workspace({ title, action, actionLabel, content }) {
  const link = 'text-[13px] font-bold text-leaf'

  return <div className={ui.page}>
    <div className="mb-8 items-end justify-between border-b border-rule pb-6 md:flex">
      <span className={ui.eyebrow}>PIAX space</span>
      <h1 className={cn(ui.h1, 'mt-2.5 mb-0 text-[55px] md:text-[55px]')}>{title}</h1>
      {action && <button className={cn(button.base, button.outline)} onClick={action}>{actionLabel}</button>}
    </div>
    {content || <div className={ui.card}>
      <Sparkles size={22} className="text-leaf" />
      <h2 className={cardTitle}>Your calm command centre.</h2>
      <p className="mb-4 text-stone">Calendar, insights, products and care tools will live here in the full PIAX experience.</p>
      <div className="mt-6 flex gap-4">
        <Link to="/app/track" className={link}>Track a day</Link>
        <Link to="/app/orders" className={link}>View orders</Link>
        <Link to="/app/profile" className={link}>Profile</Link>
      </div>
    </div>}
  </div>
}
