import { useLayoutEffect } from 'react'

// Turns on the calm scroll-reveal for every direct child section of `ref`.
// Sections start hidden only once this runs, so content stays visible without
// JavaScript, and nothing is hidden when the visitor prefers reduced motion.
export function useSectionReveal(ref) {
  useLayoutEffect(() => {
    const root = ref.current
    if (!root || !('IntersectionObserver' in window)) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    root.dataset.reveal = ''
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return
        target.dataset.visible = ''
        observer.unobserve(target)
      })
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 })

    const sections = [...root.children]
    sections.forEach((section) => observer.observe(section))
    return () => {
      observer.disconnect()
      delete root.dataset.reveal
      sections.forEach((section) => delete section.dataset.visible)
    }
  }, [ref])
}
