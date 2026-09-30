import { useEffect, useState } from 'react'
import { CalendarHeart, ChevronRight } from 'lucide-react'
import { useInView } from '../../hooks/useInView.js'
import { cn } from './homeStyles.js'
import appScreens from '../../assets/home/app-screens.webp'

// The PIAX app on three phones (flat artwork), brought to life with sharp HTML layers placed exactly over
// the middle phone's screen: the search placeholder cycles through queries, the promo card is a carousel,
// the Quick Order buttons pulse and a soft light sweeps the glass. Everything is measured in the artwork's
// own pixels (619 × 434), so the layers stay locked to it at any size. Motion runs only while the phones
// are on screen, and not at all for people who prefer reduced motion.
const art = { width: 619, height: 434 }
const x = (px) => `${(px / art.width) * 100}%`
const y = (px) => `${(px / art.height) * 100}%`
// Sizes scale with the artwork's width (the wrapper is a size container).
const u = (px) => `${((px / art.width) * 100).toFixed(3)}cqw`

// Regions of the middle phone, in artwork pixels.
const screen = { left: 191, top: 10, right: 415 }
const search = { left: 218, top: 86, right: 388, bottom: 106, textLeft: 221.5 }
const promo = { left: 198.5, top: 191.5, right: 405, bottom: 299 }
const quickOrderBadge = { left: 347.5, top: 48.5, right: 384, bottom: 65 }
const promoButton = { left: 11.5, top: 58.5, width: 54, height: 14 } // inside the promo card

const queries = ['Pads', 'Night pads', 'Panty liners', 'Cramp relief tips']
const timing = { query: 2200, slide: 3400, slideMove: 650 }

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

function box({ left, top, right, bottom }) {
  return { left: x(left), top: y(top), width: x(right - left), height: y(bottom - top) }
}

// Cycles 0..count-1 every `ms` while `running`.
function useTicker(count, ms, running) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (!running) return undefined
    const id = window.setInterval(() => setIndex((value) => (value + 1) % count), ms)
    return () => window.clearInterval(id)
  }, [count, ms, running])
  return index
}

// Slide 1 is the promo card from the artwork itself, so the carousel opens on exactly what the screenshot shows.
function ArtworkSlide({ animated }) {
  const width = promo.right - promo.left
  const height = promo.bottom - promo.top
  return (
    <div
      className="relative h-full shrink-0 basis-1/4"
      style={{
        backgroundImage: `url(${appScreens})`,
        backgroundSize: `${(art.width / width) * 100}% auto`,
        backgroundPosition: `${(promo.left / (art.width - width)) * 100}% ${(promo.top / (art.height - height)) * 100}%`,
      }}
    >
      {animated && (
        <span
          className="absolute motion-safe:animate-tap-pulse"
          style={{
            left: `${(promoButton.left / width) * 100}%`,
            top: `${(promoButton.top / height) * 100}%`,
            width: `${(promoButton.width / width) * 100}%`,
            height: `${(promoButton.height / height) * 100}%`,
            borderRadius: u(2),
          }}
        />
      )}
    </div>
  )
}

function OfferSlide() {
  return (
    <div className="flex h-full shrink-0 basis-1/4 flex-col justify-center bg-linear-to-br from-[#e6f5ee] to-[#c9eadb]" style={{ padding: `0 ${u(12)}`, gap: u(6) }}>
      <strong className="leading-[1.1] font-extrabold text-brand" style={{ fontSize: u(12.5) }}>Unlock 50% Off<br />Your First Order!</strong>
      <span className="inline-flex w-fit items-center rounded-full bg-brand font-semibold text-white" style={{ fontSize: u(6), padding: `${u(2.5)} ${u(7)}`, gap: u(2) }}>
        Grab the Deal <ChevronRight style={{ width: u(6), height: u(6) }} />
      </span>
    </div>
  )
}

function TrackerSlide() {
  return (
    <div className="flex h-full shrink-0 basis-1/4 items-center justify-between bg-linear-to-br from-[#1b8a74] to-brand text-white" style={{ padding: `0 ${u(12)}`, gap: u(8) }}>
      <span className="flex flex-col" style={{ gap: u(6) }}>
        <strong className="leading-[1.1] font-extrabold" style={{ fontSize: u(12) }}>Know your cycle,<br />plan with ease.</strong>
        <span className="inline-flex w-fit items-center rounded-full bg-white font-semibold text-brand" style={{ fontSize: u(6), padding: `${u(2.5)} ${u(7)}` }}>
          Open Period Tracker
        </span>
      </span>
      <span className="flex shrink-0 items-center justify-center rounded-full bg-white/15" style={{ width: u(40), height: u(40) }}>
        <CalendarHeart style={{ width: u(22), height: u(22) }} strokeWidth={1.6} />
      </span>
    </div>
  )
}

// The promo card as a looping carousel: artwork card → offer → tracker → artwork card (a copy, so the
// loop always moves forward), then it jumps back to the first slide without animating.
function PromoCarousel({ running }) {
  const [index, setIndex] = useState(0)
  const [instant, setInstant] = useState(false)

  useEffect(() => {
    if (!running) return undefined
    const id = window.setInterval(() => {
      setInstant(false)
      setIndex((value) => value + 1)
    }, timing.slide)
    return () => window.clearInterval(id)
  }, [running])

  useEffect(() => {
    if (index !== 3) return undefined
    const id = window.setTimeout(() => {
      setInstant(true)
      setIndex(0)
    }, timing.slideMove)
    return () => window.clearTimeout(id)
  }, [index])

  const dot = index % 3
  return (
    <>
      <div className="absolute overflow-hidden" style={{ ...box(promo), borderRadius: u(6) }}>
        <div
          className={cn('flex h-full w-[400%]', !instant && 'transition-transform duration-[650ms] ease-[cubic-bezier(.65,0,.35,1)]')}
          style={{ transform: `translateX(-${index * 25}%)` }}
        >
          <ArtworkSlide animated={running} />
          <OfferSlide />
          <TrackerSlide />
          <ArtworkSlide animated={running} />
        </div>
      </div>
      <div className="absolute flex -translate-x-1/2 items-center" style={{ left: x((promo.left + promo.right) / 2), top: y(promo.bottom + 4), gap: u(2.5) }}>
        {[0, 1, 2].map((item) => (
          <span
            key={item}
            className={cn('rounded-full transition-all duration-300', item === dot ? 'bg-brand' : 'bg-[#c9d3cf]')}
            style={{ height: u(2.6), width: item === dot ? u(9) : u(2.6) }}
          />
        ))}
      </div>
    </>
  )
}

export default function AppScreensShowcase({ className = '' }) {
  const [still] = useState(reducedMotion)
  const [ref, inView] = useInView({ once: false, threshold: 0.3 })
  const running = inView && !still
  const query = useTicker(queries.length, timing.query, running)

  return (
    <div ref={ref} className={cn('@container relative', className)}>
      <div className="relative motion-safe:animate-phone-float">
        <img
          src={appScreens}
          alt="The PIAX app on three phones: chat with the PIAX health assistant, period tracking with quick ordering, and the PIAX pad shop"
          width={art.width}
          height={art.height}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />

        {!still && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
            {/* Search placeholder: a patch the colour of the search field, with the query sliding in. */}
            <div className="absolute flex items-center overflow-hidden bg-[#f6f6f6]" style={box(search)}>
              <span
                key={query}
                className="whitespace-nowrap text-[#6b6c72] motion-safe:animate-search-in"
                style={{ fontSize: u(8.8), paddingLeft: u(search.textLeft - search.left) }}
              >
                Search for ‘{queries[query]}’
              </span>
            </div>

            <PromoCarousel running={running} />

            {/* "Quick Order" badge in the header: a soft pulse inviting a tap. */}
            {running && <span className="absolute rounded-full motion-safe:animate-tap-pulse" style={box(quickOrderBadge)} />}

            {/* A soft light sweeping across the middle phone's glass now and then. */}
            {running && (
              <div
                className="absolute bottom-0 overflow-hidden"
                style={{ left: x(screen.left), top: y(screen.top), width: x(screen.right - screen.left), borderRadius: `${u(26)} ${u(26)} 0 0` }}
              >
                <span className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/35 to-transparent motion-safe:animate-screen-shine" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
