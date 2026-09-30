import { useState } from 'react'
import { ChevronDown, Menu, Search, ShoppingCart, Tag, Truck, User, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { btn, cn, container } from './homeStyles.js'
import headerLogo from '../../assets/piax_logo.png'

const separator = <b className="mx-1.5 font-normal opacity-60">|</b>

const strip = [
  { icon: Truck, text: 'Free shipping on orders above ₹499', className: '' },
  { icon: Tag, text: 'Get 10% off on your first order', code: 'WELCOME10', className: 'max-lg:hidden' },
]

const nav = [
  { to: '/products', label: 'Shop', menu: true },
  { to: '/find-my-pad', label: 'Find My Pad' },
  { to: '/ai', label: 'PIAX AI' },
  { to: '/learn', label: 'Learn', menu: true },
  { to: '/business', label: 'For Business', menu: true },
  { to: '/about', label: 'About', menu: true },
]

export default function HomeHeader() {
  const [open, setOpen] = useState(false)
  const { itemCount } = useCart()
  const { currentUser } = useAuth()

  return (
    <>
      <div className="bg-[#0c4a40] text-[12.5px] text-[#e6f3ee]">
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

      <header className="sticky top-0 z-30 bg-white shadow-[0_1px_0_rgba(15,60,50,.06)]">
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
            {nav.map(({ to, label, menu }) => (
              <Link
                key={label}
                to={to}
                onClick={() => setOpen(false)}
                className="inline-flex min-h-9 items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-[15px] font-medium text-ink hover:bg-mist hover:text-brand-2"
              >
                {label}{menu && <ChevronDown size={16} />}
              </Link>
            ))}
          </nav>

          <label className="ml-auto hidden min-h-10 max-w-[200px] flex-1 items-center gap-2.5 rounded-full border border-[#dfe8e3] bg-[#f5f8f6] px-4 text-ink md:flex xl:max-w-[272px]">
            <Search size={20} />
            <input
              type="search"
              placeholder="Search pads, sizes, or your questions..."
              aria-label="Search"
              className="w-full min-w-0 bg-transparent text-[13px] outline-none"
            />
          </label>

          <div className="flex items-center gap-4 max-md:ml-auto md:gap-6">
            <Link to={currentUser ? '/app/profile' : '/login'} className="relative flex flex-col items-center gap-0.5 text-[11px] text-ink">
              <User size={24} strokeWidth={1.6} /><span className="max-md:hidden">Account</span>
            </Link>
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
