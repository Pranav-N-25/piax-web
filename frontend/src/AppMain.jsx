import { Route, Routes } from 'react-router-dom'
import Home from './pages/public/Home.jsx'
import Business from './pages/public/Business.jsx'
import ComingSoon from './pages/public/ComingSoon.jsx'
import AppPrompt from './components/home/AppPrompt.jsx'

// Only the home and business pages are live for now; every other address shows the "Coming soon" page.
// The finished pages stay in src/pages and can be routed again when they launch.
export default function App() {
  return <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/business" element={<Business />} />
      <Route path="*" element={<ComingSoon />} />
    </Routes>
    {/* Mounted once for the whole visit, so its timing carries across pages. */}
    <AppPrompt />
  </>
}
