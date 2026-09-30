import { useEffect } from 'react'
import HomeHeader from '../../components/home/HomeHeader.jsx'
import BusinessContactForm from '../../components/home/BusinessContactForm.jsx'
import AppBanner from '../../components/home/AppBanner.jsx'
import HomeFooter from '../../components/home/HomeFooter.jsx'
import { container, sectionPlain } from '../../components/home/homeStyles.js'

// PIAX for Business: the dealer contact form.
export default function Business() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="overflow-x-clip bg-mist font-sans text-base leading-[1.45] text-body">
      <HomeHeader />
      <main>
        <section className={sectionPlain}>
          <div className={container}>
            <BusinessContactForm className="mt-0" />
          </div>
        </section>
        <AppBanner />
      </main>
      <HomeFooter />
    </div>
  )
}
