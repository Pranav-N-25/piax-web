import { useState } from 'react'
import { Menu, Search, ShoppingCart, Tag, Truck, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import AccountMenu from '../auth/AccountMenu.jsx'
import HeaderSearch from '../navigation/HeaderSearch.jsx'
import { btn, cn, container } from './homeStyles.js'
import headerLogo from '../../assets/piax_logo.png'

// The header sets its own type so it looks the same on every page, whatever font the page itself uses.
// Poppins is the brand face for navigation (CLAUDE.md typography).
const headerType = 'font-poppins leading-normal antialiased'

const separator = <b className="mx-1.5 font-normal opacity-60">|</b>

const strip = [
  { icon: Truck, text: 'Free shipping on orders above ₹499', className: '' },
  { icon: Tag, text: 'Get 10% off on your first order', code: 'WELCOME10', className: 'max-lg:hidden' },
]

const nav = [
  { to: '/products', label: 'Shop' },
  { to: '/find-my-pad', label: 'Find My Pad' },
  { to: '/ai', label: 'PIAX AI' },
  { to: '/learn', label: 'Learn' },
  { to: '/business', label: 'For Business' },
  { to: '/about', label: 'About' },
]

export default function HomeHeader() {
  const [open, setOpen] = useState(false)
  const { itemCount } = useCart()

  return (
    <>
      <div className={cn(headerType, 'bg-[#0c4a40] text-[12.5px] text-[#e6f3ee]')}>
        <div className={cn(container, 'flex min-h-10 items-center justify-center w-full')}>
          {strip.map(({ icon: Icon, text, code, fill, className }, index) => (
            <span
              key={index}
              className={cn(
                'inline-flex items-center gap-2 whitespace-nowrap md:px-4 xl:px-6',
                index > 0 && 'border-l border-white/30',
                className,
              )}
            >
              <Icon size={17} fill={fill ? 'currentColor' : 'none'} /> {text}
              {code && <>{separator} Code: <strong>{code}</strong></>}
            </span>
          ))}
        </div>
      </div>

      <header className={cn(headerType, 'sticky top-0 z-30 bg-white text-ink shadow-[0_1px_0_rgba(15,60,50,.06)]')}>
        <div className={cn(container, 'flex min-h-16 items-center gap-4 lg:gap-6')}>
          <Link to="/" aria-label="PIAX home">
            <img src={headerLogo} alt="PIAX — Feel different. Feel you." width="1200" height="403" className="h-10 w-auto md:h-11" />
          </Link>

          <nav
            aria-label="Primary navigation"
            className={cn(
              'absolute inset-x-0 top-full flex-col gap-1 bg-white px-6 py-4 shadow-[0_12px_24px_rgba(15,60,50,.1)]',
              'lg:static lg:ml-2 lg:flex lg:flex-row lg:bg-transparent lg:p-0 lg:shadow-none xl:ml-6',
              open ? 'flex' : 'hidden',
            )}
          >
            {nav.map(({ to, label }) => (
              // NavLink marks the current page (and its sub-pages) with aria-current="page" and the active pill.
              <NavLink
                key={label}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) => cn(
                  'inline-flex min-h-9 items-center whitespace-nowrap rounded-full px-3 py-2 text-[14px] font-medium transition-colors xl:px-3.5',
                  isActive ? 'bg-brand-soft text-brand' : 'text-ink hover:bg-mist hover:text-brand-2',
                )}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <HeaderSearch className="ml-auto hidden max-w-[200px] flex-1 md:block lg:hidden xl:block xl:max-w-[272px]" />

          <div className="flex items-center gap-4 max-md:ml-auto md:gap-6">
            {/* Phones (and the lg width where the field is hidden): search opens its own page. */}
            <Link to="/search" aria-label="Search" className="flex flex-col items-center gap-0.5 text-[11px] text-ink hover:text-brand md:hidden lg:flex xl:hidden">
              <Search size={24} strokeWidth={1.6} /><span className="max-md:sr-only">Search</span>
            </Link>
            <AccountMenu />
            <Link to="/cart" className="relative flex flex-col items-center gap-0.5 text-[11px] text-ink">
              <ShoppingCart size={24} strokeWidth={1.6} /><span className="max-md:hidden">Cart</span>
              <b className="absolute -top-2 -right-2.5 flex size-5 items-center justify-center rounded-full border-2 border-white bg-brand text-[10px] text-white">
                {itemCount}
              </b>
            </Link>
            <a href="#download" className={cn(btn.base, btn.solid, 'min-h-10 px-4 max-md:hidden')}>Download App</a>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen(!open)}
              className="cursor-pointer p-1 text-ink lg:hidden"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
