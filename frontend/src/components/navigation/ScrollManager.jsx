import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

// Where each visited page was scrolled to, by history entry, so Back / Forward can return there. Entries made outside
// the router (the first page load, plain #section links) all share the key 'default', so the address tells them apart.
const positions = new Map()
const entryKey = (location) => (location.key === 'default' ? `default:${location.pathname}${location.search}${location.hash}` : location.key)

// Site-wide scroll behaviour on navigation:
// - a new page opens at the top;
// - a link to a section (/products#compare) lands on that section;
// - Back / Forward return to where the visitor was on that page;
// - changes that stay on the same page (filters, compare picks, a new search) leave the scroll alone.
export default function ScrollManager() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const previous = useRef(location)

  // The browser's own restoration fights client-side rendering; this component takes over.
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
  }, [])

  // Record the scroll position under the history entry currently on screen. The key switches the moment a
  // navigation commits, so scrolling the new page never overwrites the position saved for the page left behind.
  const currentKey = useRef(entryKey(location))
  useEffect(() => {
    const save = () => positions.set(currentKey.current, window.scrollY)
    window.addEventListener('scroll', save, { passive: true })
    return () => window.removeEventListener('scroll', save)
  }, [])

  useLayoutEffect(() => {
    const from = previous.current
    previous.current = location
    currentKey.current = entryKey(location)
    const samePage = from.pathname === location.pathname
    if (samePage && from.hash === location.hash && from.key !== location.key && navigationType !== 'POP') return

    // Following a #section link on the same page is a jump to that section, not a return to a saved position.
    const sectionJump = samePage && from.hash !== location.hash && location.hash
    if (navigationType === 'POP' && !sectionJump && positions.has(entryKey(location))) {
      window.scrollTo({ top: positions.get(entryKey(location)), behavior: 'instant' })
      return
    }
    if (location.hash) {
      // Wait a frame so the page has rendered the section before scrolling to it.
      const id = decodeURIComponent(location.hash.slice(1))
      const frame = requestAnimationFrame(() => {
        const target = document.getElementById(id)
        if (target) {
          const smooth = samePage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
          target.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant', block: 'start' })
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' })
        }
      })
      return () => cancelAnimationFrame(frame)
    }
    if (!samePage) window.scrollTo({ top: 0, behavior: 'instant' })
    return undefined
  }, [location, navigationType])

  return null
}
