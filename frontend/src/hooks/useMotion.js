import { useLayoutEffect } from 'react'

// Turns on the scroll-triggered page motion (index.css, "Page motion") inside `ref`: every element with a
// `data-anim` attribute plays its entrance once it scrolls into view. Elements added later (cards after a filter
// change) are picked up too. Does nothing when the visitor prefers reduced motion.
export function useMotion(ref) {
  useLayoutEffect(() => {
    const root = ref.current
    if (!root || !('IntersectionObserver' in window)) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    root.dataset.motion = ''
    const seen = new WeakSet()
    const io = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return
        target.dataset.in = ''
        io.unobserve(target)
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })

    const watch = () => root.querySelectorAll('[data-anim]:not([data-in])').forEach((el) => {
      if (seen.has(el)) return
      seen.add(el)
      io.observe(el)
    })
    watch()
    const mo = new MutationObserver(watch)
    mo.observe(root, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
      delete root.dataset.motion
    }
  }, [ref])
}
