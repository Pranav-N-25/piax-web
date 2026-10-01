import { useState } from 'react'
import { ArrowRight, Globe, Heart, Leaf, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DoodleNote, Foliage, StoreBadges } from './HomeUi.jsx'
import { cn, container, heading } from './homeStyles.js'
import footerLogo from '../../assets/piax_logo.png'

const columns = [
  { title: 'For Consumers', links: [['Shop All Products', '/products'], ['Find My PIAX Match', '/find-my-pad'], ['PIAX App', '/'], ['Period Education (Learn)', '/learn'], ['Track Your Cycle', '/app/cycle'], ['Ask PIAX AI', '/ai'], ['Offers & Bundles', '/products'], ['Orders & Delivery', '/app/orders'], ['Help Center', '/support']] },
  { title: 'For Business', links: [['Become a Distributor', '/business'], ['Retail Partnership', '/business'], ['Quick Commerce', '/business'], ['Institutional Sales', '/business'], ['CSR Collaborations', '/business'], ['Vending Solutions', '/business'], ['Bulk Enquiries', '/business']] },
  { title: 'Support', links: [['FAQ', '/support'], ['Contact Us', '/support'], ['Track Order', '/app/orders'], ['Returns & Refunds', '/support'], ['Shipping Information', '/support'], ['Product Safety', '/support'], ['Report an Issue', '/support']] },
  { title: 'Company', links: [['About PIAX', '/about'], ['Our Mission', '/about'], ['Sustainability', '/sustainability'], ['Careers', '/about', true], ['Blog', '/learn'], ['Media & Press', '/about'], ['Partner with Us', '/business']] },
  { title: 'Legal', links: [['Privacy Policy', '/privacy'], ['Terms of Use', '/terms'], ['Refund Policy', '/support'], ['Shipping Policy', '/support'], ['Cookie Policy', '/support'], ['Clinical Disclaimer', '/support'], ['Responsible AI Use', '/support']] },
]

const socials = [
  { label: 'Instagram', path: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm5.5-3.2a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z' },
  { label: 'LinkedIn', path: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4v11H3v-11Zm6.5 0h3.8v1.6h.05c.53-1 1.83-2 3.77-2 4.03 0 4.78 2.6 4.78 6v5.4h-4v-4.8c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.88h-4v-11Z' },
  { label: 'YouTube', path: 'M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z' },
  { label: 'Facebook', path: 'M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.2A21 21 0 0 0 14.6 2C12.2 2 10.6 3.4 10.6 6.1v2.4H8v3.4h2.6V22H14V11.9h2.6l.4-3.4h-3Z' },
]

const values = [
  { icon: Leaf, text: <>Comfort<br />by design</> },
  { icon: Heart, text: <>Healthier<br />communities</> },
  { icon: Users, text: <>A more equal<br />tomorrow</> },
  { icon: Globe, text: <>For people<br />and the planet</> },
]

export default function HomeFooter() {
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [joined, setJoined] = useState(false)

  const subscribe = (event) => {
    event.preventDefault()
    if (email && agreed) setJoined(true)
  }

  return (
    <footer className="relative overflow-hidden bg-linear-to-b from-[#e9f6ef] to-[#dff1e7] pt-15 pb-8 lg:pt-20">
      {/* Generous botanical close: foliage rises from both bottom corners past the content edge. */}
      <Foliage art="clusterLeft" className="-bottom-12 -left-24 w-[clamp(120px,22vw,340px)] opacity-85 max-md:-left-12 max-md:w-28 max-md:opacity-60" />
      <Foliage art="clusterRight" className="-bottom-10 -right-24 w-[clamp(120px,24vw,360px)] opacity-85 max-md:-right-12 max-md:w-28 max-md:opacity-60" />
      <Foliage art="sprigRound" className="top-6 -right-10 w-[clamp(90px,9vw,150px)] opacity-60 max-lg:hidden" />
      <div className={container}>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[minmax(0,.95fr)_minmax(0,2.5fr)_minmax(0,1.05fr)]">
          <div className="relative">
            <img src={footerLogo} alt="PIAX — Feel different. Feel you." width="1200" height="403" loading="lazy" className="h-auto w-[170px]" />
            <p className="mt-2 mb-4 font-serif text-[19px] leading-[1.2] font-semibold italic text-brand-2">For a healthier you.<br />A brighter tomorrow.</p>
            <p className="text-[12.5px]">Comfort-focused menstrual and wellness care for every stage of your journey.</p>
            <div className="mt-6 mb-4 flex gap-3">
              {socials.map(({ label, path }) => (
                <a key={label} href="#" aria-label={label} className="flex size-9 items-center justify-center rounded-full bg-[#d6ebe1] text-brand hover:bg-brand hover:text-white">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d={path} /></svg>
                </a>
              ))}
            </div>
            <small className="text-[11.5px]">#PeriodsForProgress</small>
            <DoodleNote inline className="mt-10 ml-24 hidden text-xl lg:block">Good for you. Good for her.<br />Good for tomorrow.</DoodleNote>
          </div>

          <div className="grid grid-cols-2 gap-y-6 md:col-span-full md:row-start-2 md:grid-cols-5 md:gap-y-0 lg:col-span-1 lg:row-start-auto">
            {columns.map(({ title, links }) => (
              <div key={title} className="flex flex-col gap-3 md:border-r md:border-line md:px-5">
                <h4 className={cn(heading, 'mb-2 text-sm font-semibold')}>{title}</h4>
                {links.map(([label, to, hiring]) => (
                  <Link key={label} to={to} className="flex flex-wrap items-center gap-1.5 text-xs text-body hover:text-brand-2">
                    {label}
                    {hiring && <span className="rounded-full bg-[#d2ecdf] px-2 py-0.5 text-[9.5px] font-semibold text-brand">We’re Hiring!</span>}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <div className="relative lg:pt-20">
            <DoodleNote className="-top-2 left-0 hidden text-xl lg:block">A kinder planet<br />is possible.</DoodleNote>
            <h3 className={cn(heading, 'mb-2 text-[22px]')}>Stay in the loop.</h3>
            <p className="mb-6 text-sm">Get period tips, product updates and exclusive offers.</p>
            {joined ? (
              <p className="rounded-[14px] bg-white p-4 font-semibold text-brand">Thank you! You’re on the list. 💚</p>
            ) : (
              <form onSubmit={subscribe}>
                <div className="flex items-center rounded-full border border-line bg-white py-1 pr-1 pl-5">
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    aria-label="Email address"
                    className="min-w-0 flex-1 bg-transparent py-2 text-[13px] outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    disabled={!agreed}
                    className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-brand text-white disabled:cursor-not-allowed disabled:opacity-55"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
                <label className="mt-3 flex items-center gap-2 text-[11px]">
                  <input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} className="size-3.5 accent-brand" />
                  I agree to receive communications from PIAX.
                </label>
              </form>
            )}

            <p className="mt-8 mb-3 text-sm font-semibold text-ink">Get the PIAX app</p>
            <StoreBadges />
          </div>
        </div>

        <div className="mt-15 flex flex-wrap items-center justify-center gap-6 border-t border-line pt-6 lg:flex-nowrap lg:justify-start xl:mx-60">
          <p className="text-[11px]"><strong>© {new Date().getFullYear()} PIAX LIFE PRIVATE LIMITED.</strong><br />All rights reserved.</p>
          <ul className="flex flex-1 basis-full flex-wrap justify-center gap-6 md:basis-auto md:flex-nowrap md:border-x md:border-line md:px-6">
            {values.map(({ icon: Icon, text }, index) => (
              <li key={index} className="flex items-center gap-2 text-[10.5px] leading-[1.25]">
                <Icon size={24} strokeWidth={1.4} className="shrink-0 text-brand" /><span>{text}</span>
              </li>
            ))}
          </ul>
          <p className="flex items-center gap-2 text-[11px]">
            <span className="inline-block h-3 w-[18px] rounded-[3px] bg-[linear-gradient(#f93_33%,#fff_33%_66%,#128807_66%)]" aria-hidden="true" />
            Made in India <Heart size={20} strokeWidth={1.6} className="shrink-0 text-brand" />
          </p>
        </div>
      </div>
    </footer>
  )
}
