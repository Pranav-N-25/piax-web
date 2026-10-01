import { useEffect, useRef, useState } from 'react'

// Counts a figure such as "10,000+" or "95%" up from zero the first time it scrolls into view.
// The number part animates; anything after it (+, %, L+) stays as written. Shows the final figure
// straight away when motion is reduced or the value has no leading number.
export default function CountUp({ value, duration = 1600 }) {
  const match = /^([\d,]+)(.*)$/.exec(value)
  const target = match ? Number(match[1].replace(/,/g, '')) : null
  const [shown, setShown] = useState(value)
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (target === null || !node || !('IntersectionObserver' in window)) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let frame
    const format = (n) => `${n.toLocaleString('en-IN')}${match[2]}`
    setShown(format(0))
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration)
        setShown(format(Math.round(target * (1 - (1 - t) ** 3))))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
    // Runs once per value.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <span ref={ref}><span className="sr-only">{value}</span><span aria-hidden="true">{shown}</span></span>
}
