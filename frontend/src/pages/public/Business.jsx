import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HomeHeader from '../../components/home/HomeHeader.jsx'
import BusinessSection from '../../components/home/BusinessSection.jsx'
import AppBanner from '../../components/home/AppBanner.jsx'
import HomeFooter from '../../components/home/HomeFooter.jsx'

// PIAX for Business: the partnership overview with the dealer contact form.
export default function Business() {
  const { hash } = useLocation()

  useEffect(() => {
    const target = hash && document.querySelector(hash)
    if (target) target.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [hash])

  return (
    <div className="overflow-x-clip bg-mist font-sans text-base leading-[1.45] text-body">
      <HomeHeader />
      <main>
        <BusinessSection />
        <AppBanner />
      </main>
      <HomeFooter />
    </div>
  )
}
