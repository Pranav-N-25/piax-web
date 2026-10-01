import { useRef } from 'react'
import { useSectionReveal } from '../../hooks/useSectionReveal.js'
import HomeHeader from '../../components/home/HomeHeader.jsx'
import HomeHero from '../../components/home/HomeHero.jsx'
import NeedsSection from '../../components/home/NeedsSection.jsx'
import TrustSection from '../../components/home/TrustSection.jsx'
import MatchSection from '../../components/home/MatchSection.jsx'
import ShopNeedsSection from '../../components/home/ShopNeedsSection.jsx'
import InsidePadSection from '../../components/home/InsidePadSection.jsx'
import WhySection from '../../components/home/WhySection.jsx'
import ReviewsSection from '../../components/home/ReviewsSection.jsx'
import AskAiSection from '../../components/home/AskAiSection.jsx'
import HowItWorksSection from '../../components/home/HowItWorksSection.jsx'
import BusinessSection from '../../components/home/BusinessSection.jsx'
import LearnSection from '../../components/home/LearnSection.jsx'
import FaqSection from '../../components/home/FaqSection.jsx'
import AppBanner from '../../components/home/AppBanner.jsx'
import HomeFooter from '../../components/home/HomeFooter.jsx'

export default function Home() {
  const mainRef = useRef(null)
  useSectionReveal(mainRef)

  return (
    <div className="overflow-x-clip bg-mist font-sans text-base leading-[1.45] text-body">
      <HomeHeader />
      <main ref={mainRef}>
        <HomeHero />
        <NeedsSection />
        <TrustSection />
        <MatchSection />
        <ShopNeedsSection />
        <InsidePadSection />
        <WhySection />
        <ReviewsSection />
        <AskAiSection />
        <HowItWorksSection />
        <BusinessSection />
        <LearnSection />
        <FaqSection />
        <AppBanner />
      </main>
      <HomeFooter />
    </div>
  )
}
