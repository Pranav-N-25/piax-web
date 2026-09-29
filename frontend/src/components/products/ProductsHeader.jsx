import { useState } from 'react'
import { ChevronDown, Menu, Search, ShoppingBag, User } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import Dialog from '../common/Dialog.jsx'
import SearchOverlay from './SearchOverlay.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { cn } from '../common/ui.js'
import { button, container, focusRing } from './productStyles.js'
import logo from '../../assets/piax_logo.png'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/ai', label: 'PIAX AI' },
  { to: '/learn', label: 'Learn' },
  { to: '/sustainability', label: 'Sustainability' },
  { to: '/business', label: 'For Business' },
]

const navLinkClass = ({ isActive }) => cn(
  'inline-flex min-h-9 items-center rounded-full px-4 text-[13px] font-medium transition-colors',
  focusRing,
  isActive ? 'bg-foam text-leaf ring-1 ring-sage' : 'text-charcoal hover:bg-foam hover:text-leaf',
)

export default function ProductsHeader() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [language, setLanguage] = useState('EN')
  const { itemCount } = useCart()
  const { currentUser } = useAuth()
  const accountPath = currentUser ? '/app/profile' : '/login'

  return (
    <header className="sticky top-0 z-40 border-b border-rule/70 bg-white/95 backdrop-blur">
      <div className={cn(container, 'flex h-16 items-center gap-4 lg:h-[72px]')}>
        <Link to="/" aria-label="PIAX home" className={cn('shrink-0 rounded-lg', focusRing)}>
          <img src={logo} alt="PIAX" width="1200" height="403" className="h-10 w-auto lg:h-11" />
        </Link>

        <nav aria-label="Primary" className="mx-auto hidden items-center gap-1 lg:flex">
          {navItems.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={navLinkClass}>{label}</NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <button type="button" className={button.icon} aria-label="Search products" onClick={() => setSearchOpen(true)}>
            <Search size={20} strokeWidth={1.8} />
          </button>
          <Link to="/cart" className={cn(button.icon, 'relative')} aria-label={`Cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}>
            <ShoppingBag size={20} strokeWidth={1.8} />
            {itemCount > 0 && (
              <span className="absolute top-1 right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-leaf px-1 text-[10px] font-semibold text-white">
                {itemCount}
              </span>
            )}
          </Link>
          <Link to={accountPath} className={cn(button.icon, 'hidden md:inline-flex')} aria-label="Account">
            <User size={20} strokeWidth={1.8} />
          </Link>
          <label className="relative hidden items-center md:flex">
            <span className="sr-only">Language</span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className={cn('h-10 cursor-pointer appearance-none rounded-full bg-transparent pr-7 pl-3 text-[13px] font-medium text-charcoal hover:bg-foam', focusRing)}
            >
              <option value="EN">EN</option>
              <option value="TA">தமிழ்</option>
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-2.5 text-charcoal" />
          </label>
          <button type="button" className={cn(button.icon, 'lg:hidden')} aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
            <Menu size={22} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      <Dialog open={menuOpen} onClose={() => setMenuOpen(false)} variant="drawer" title="Menu">
        <nav aria-label="Mobile" className="flex flex-col gap-1">
          {navItems.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => cn(
                'flex min-h-12 items-center rounded-xl px-4 text-[15px] font-medium',
                focusRing,
                isActive ? 'bg-foam text-leaf' : 'text-charcoal hover:bg-foam',
              )}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-6 grid gap-3 border-t border-rule pt-6">
          <Link to={accountPath} onClick={() => setMenuOpen(false)} className={button.secondary}>
            <User size={18} /> {currentUser ? 'My account' : 'Sign in'}
          </Link>
          <label className="flex items-center justify-between rounded-xl bg-foam px-4 py-3 text-sm">
            Language
            <select value={language} onChange={(event) => setLanguage(event.target.value)} className={cn('cursor-pointer bg-transparent font-medium', focusRing)}>
              <option value="EN">English</option>
              <option value="TA">தமிழ்</option>
            </select>
          </label>
        </div>
      </Dialog>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
