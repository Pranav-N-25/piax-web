import { Route, Routes } from 'react-router-dom'
import SiteLayout from './components/navigation/SiteLayout.jsx'
import { Protected, RoleOnly } from './components/auth/RouteGuards.jsx'
import { NotFound } from './components/common/FeedbackStates.jsx'
import Home from './pages/public/Home.jsx'
import Products from './pages/public/Products.jsx'
import ProductDetail from './pages/public/ProductDetail.jsx'
import { About, BusinessLanding, Sustainability, Support } from './pages/public/SimplePages.jsx'
import Learn, { Article } from './pages/education/LearnPages.jsx'
import AiPage from './pages/ai/AiPages.jsx'
import { Cart, Checkout } from './pages/commerce/CommercePages.jsx'
import Login from './pages/auth/Login.jsx'
import { CustomerArea, Workspace } from './pages/customer/CustomerPages.jsx'

export default function App() {
  return <Routes>
    <Route element={<SiteLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:slug" element={<ProductDetail />} />
      <Route path="/ai" element={<AiPage />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/learn/:category/:articleSlug" element={<Article />} />
      <Route path="/sustainability" element={<Sustainability />} />
      <Route path="/business" element={<BusinessLanding />} />
      <Route path="/support" element={<Support />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Protected><Checkout /></Protected>} />
      <Route path="/app/*" element={<Protected><CustomerArea /></Protected>} />
      <Route path="/business/dashboard" element={<RoleOnly role="BUSINESS"><Workspace title="Business dashboard" /></RoleOnly>} />
      <Route path="/business/*" element={<RoleOnly role="BUSINESS"><Workspace title="Business workspace" /></RoleOnly>} />
      <Route path="/admin/*" element={<RoleOnly role="ADMIN"><Workspace title="Admin workspace" /></RoleOnly>} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
}
