import { ArrowLeft, Sparkles } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import HomeHeader from '../../components/home/HomeHeader.jsx'
import AppBanner from '../../components/home/AppBanner.jsx'
import HomeFooter from '../../components/home/HomeFooter.jsx'
import { DoodleNote, Foliage, Tag } from '../../components/home/HomeUi.jsx'
import { accent, btn, cn, container, h2, sectionPlain } from '../../components/home/homeStyles.js'

// Friendly names for the sections that are not live yet, matched on the first path segment.
const pageNames = {
  products: 'Our shop',
  ai: 'PIAX AI',
  learn: 'PIAX Learn',
  about: 'About PIAX',
  sustainability: 'Sustainability',
  business: 'PIAX for Business',
  support: 'Help & support',
  login: 'Your PIAX account',
  cart: 'Your cart',
  checkout: 'Checkout',
  app: 'Your PIAX account',
  admin: 'The admin workspace',
}

// Stand-in for every page except home while the rest of the site is being built.
export default function ComingSoon() {
  const { pathname } = useLocation()
  const name = pageNames[pathname.split('/')[1]] ?? 'This page'

  return (
    <div className="overflow-x-clip bg-mist font-sans text-base leading-[1.45] text-body">
      <HomeHeader />
      <main>
        <section className={cn(sectionPlain, 'flex min-h-[70vh] items-center overflow-hidden')}>
          <Foliage art="shadowFrond" className="top-0 -left-16 w-[clamp(180px,20vw,300px)] opacity-80 max-md:hidden" />
          <Foliage art="sprigRound" className="top-6 -right-10 w-[clamp(100px,11vw,170px)] opacity-75 max-md:hidden" />
          <Foliage art="clusterLeft" className="-bottom-10 -left-24 w-[clamp(140px,18vw,280px)] opacity-80 max-lg:hidden" />
          <Foliage art="broad" className="-bottom-10 -right-[110px] w-[clamp(150px,16vw,260px)] opacity-55 max-lg:hidden" />

          <div className={cn(container, 'relative z-10 flex flex-col items-center text-center')}>
            <Tag><Sparkles size={14} /> Coming soon</Tag>
            <h1 className={cn(h2, 'mt-5 mb-5 max-w-[760px] text-[clamp(36px,4.4vw,60px)]')}>
              {name} is<br /><em className={accent}>on its way.</em>
            </h1>
            <p className="mb-9 max-w-[560px] text-[17px] text-body">
              We’re putting the finishing touches on this page. In the meantime, explore PIAX on our home page or get the app to stay updated.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/" className={cn(btn.base, btn.solid)}><ArrowLeft size={18} /> Back to home</Link>
              <a href="#download" className={cn(btn.base, btn.outline)}>Get the PIAX app</a>
            </div>
            <DoodleNote inline className="mt-10">Good things take<br />a little time.</DoodleNote>
          </div>
        </section>
        <AppBanner />
      </main>
      <HomeFooter />
    </div>
  )
}
