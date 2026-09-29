import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { CircleUserRound, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { cn } from '../common/ui.js'

export default function SiteLayout() {
  const [open, setOpen] = useState(false)
  const { itemCount } = useCart()
  const { currentUser } = useAuth()
  const { pathname } = useLocation()
  const nav = [
    { to: '/products', label: 'Shop' },
    { to: '/learn', label: 'Learn' },
    { to: '/ai', label: 'PIAX AI' },
    { to: '/about', label: 'Our story' },
  ]

  // The home and products pages ship their own header and footer.
  if (pathname === '/' || pathname === '/products') return <Outlet />

  return <div className="min-h-screen overflow-hidden">
    <header className="relative z-5 flex h-16 items-center justify-between border-b border-rule bg-[rgba(248,248,243,.94)] px-6">
      <Brand onClick={() => setOpen(false)} />
      <nav className={cn(
        'absolute inset-x-0 top-16 m-0 flex-col gap-1 border-b border-rule bg-paper px-6 py-4',
        'md:static md:mr-4 md:ml-auto md:flex md:flex-row md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0',
        open ? 'flex' : 'hidden',
      )}>
        {nav.map((item) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className={navLink}>{item.label}</Link>)}
        <Link to="/business" onClick={() => setOpen(false)} className={navLink}>For business</Link>
      </nav>
      <div className="flex items-center gap-4">
        <Link className="flex items-center" to="/products" aria-label="Search"><Search size={19} /></Link>
        <Link className="flex items-center" to={currentUser ? '/app/profile' : '/login'} aria-label="Account"><CircleUserRound size={20} /></Link>
        <Link className="relative flex items-center gap-1" to="/cart" aria-label="Cart">
          <ShoppingBag size={20} />
          <span className="absolute -top-2.5 -right-[11px] flex size-[17px] items-center justify-center rounded-full bg-leaf text-[10px] text-white">{itemCount}</span>
        </Link>
        <button className="cursor-pointer p-0.5 md:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X size={23} /> : <Menu size={23} />}</button>
      </div>
    </header>
    <main className="min-h-[60vh]"><Outlet /></main>
    <Footer />
  </div>
}

const navLink = 'inline-flex min-h-9 items-center rounded-full px-3 py-2 text-sm text-[#52615b] hover:bg-mint hover:text-leaf'
const footerLink = 'text-xs text-[#9fc5b8]'

function Brand({ onClick, light = false }) {
  return (
    <Link className={cn('inline-flex items-center gap-[9px] text-xl font-bold tracking-[.15em]', light && 'text-white')} to="/" onClick={onClick}>
      <span className="inline-flex size-[31px] items-center justify-center rounded-full bg-leaf font-playfair text-lg tracking-normal text-white">P</span>
      <span>PIAX</span>
    </Link>
  )
}

function Footer() {
  return <footer className="bg-forest px-6 pt-15 pb-8 text-[#d8eee5] md:grid md:grid-cols-[1.2fr_1fr_auto] md:gap-10">
    <div>
      <Brand light />
      <p className="mt-4 mb-4 text-[13px] text-[#9fc5b8]">Thoughtful period care for real life.</p>
    </div>
    <div className="my-10 flex gap-10 md:my-0 md:gap-16">
      <div className="flex flex-col gap-3">
        <strong className="mb-2 text-xs text-white">Explore</strong>
        <Link to="/products" className={footerLink}>Shop products</Link>
        <Link to="/learn" className={footerLink}>Learn</Link>
        <Link to="/ai" className={footerLink}>Ask PIAX</Link>
      </div>
      <div className="flex flex-col gap-3">
        <strong className="mb-2 text-xs text-white">PIAX</strong>
        <Link to="/about" className={footerLink}>Our story</Link>
        <Link to="/sustainability" className={footerLink}>Sustainability</Link>
        <Link to="/support" className={footerLink}>Support</Link>
      </div>
    </div>
    <small className="block self-end text-[10px] text-[#82a99c]">© 2026 PIAX Life Private Limited · Demo experience</small>
  </footer>
}
