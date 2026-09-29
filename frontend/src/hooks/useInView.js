import { useEffect, useRef, useState } from 'react'

// Show content immediately when motion is reduced or the observer API is missing.
const startVisible = () => typeof window === 'undefined'
  || !('IntersectionObserver' in window)
  || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Reports when an element first scrolls into view. With `once`, it stops observing after that.
export function useInView({ once = true, rootMargin = '0px 0px -10% 0px', threshold = 0.1 } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(startVisible)

  useEffect(() => {
    const node = ref.current
    if (!node || (once && inView) || !('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        if (once) observer.disconnect()
      } else if (!once) {
        setInView(false)
      }
    }, { rootMargin, threshold })
    observer.observe(node)
    return () => observer.disconnect()
  }, [once, inView, rootMargin, threshold])

  return [ref, inView]
}
