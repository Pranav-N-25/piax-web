import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/public/Home.jsx'
import Business from './pages/public/Business.jsx'
import About from './pages/public/About.jsx'
import ProductDetail from './pages/public/ProductDetail.jsx'
import SearchPage from './pages/public/SearchPage.jsx'
import LegalPage from './pages/public/LegalPage.jsx'
import LearnCategory from './pages/public/learn/LearnCategory.jsx'
import LearnArticle from './pages/public/learn/LearnArticle.jsx'
import ProductRange from './pages/public/ProductRange.jsx'
import FindMyPad from './pages/public/FindMyPad.jsx'
import ComingSoon from './pages/public/ComingSoon.jsx'
import AppPrompt from './components/home/AppPrompt.jsx'
import AuthModal from './components/auth/AuthModal.jsx'
import AuthNotice from './components/auth/AuthNotice.jsx'
import LoginRoute from './components/auth/LoginRoute.jsx'
import ScrollManager from './components/navigation/ScrollManager.jsx'

// Only the home, products, Find My Pad, business and about pages are live for now; every other address shows the "Coming soon" page.
// The finished pages stay in src/pages and can be routed again when they launch.
export default function App() {
  return <>
    <ScrollManager />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductRange />} />
      <Route path="/products/:slug" element={<ProductDetail />} />
      <Route path="/product" element={<Navigate to="/products" replace />} />
      <Route path="/find-my-pad" element={<FindMyPad />} />
      <Route path="/business" element={<Business />} />
      <Route path="/about" element={<About />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/learn" element={<LearnCategory />} />
      <Route path="/learn/:category" element={<LearnCategory />} />
      <Route path="/learn/:category/:article" element={<LearnArticle />} />
      <Route path="/terms" element={<LegalPage page="terms" />} />
      <Route path="/privacy" element={<LegalPage page="privacy" />} />
      <Route path="/login" element={<LoginRoute mode="login" />} />
      <Route path="/signup" element={<LoginRoute mode="signup" />} />
      <Route path="*" element={<ComingSoon />} />
    </Routes>
    {/* Mounted once for the whole visit, so its timing carries across pages. */}
    <AppPrompt />
    <AuthModal />
    <AuthNotice />
  </>
}
