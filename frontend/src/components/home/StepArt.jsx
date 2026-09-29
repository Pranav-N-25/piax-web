// Animated illustrations for the four "How it works" steps. Pure SVG in brand greens; the
// motion classes live in index.css and switch off under prefers-reduced-motion.
const ink = '#0b5b4e'
const mint = '#d3ecdf'
const leaf = '#8cbfae'

// Bleeds slightly past the card padding so each illustration fills its step card.
const frame = 'relative -mx-[9%] h-auto w-[118%] max-w-none overflow-visible'

// 1 · Tell us about you: a phone quiz where the answer highlight moves down the options.
export function QuizPhone() {
  const rows = [58, 80, 102]
  return (
    <svg viewBox="0 0 160 150" className={frame} aria-hidden="true">
      <ellipse cx="80" cy="142" rx="44" ry="5" fill={mint} />
      <rect x="44" y="6" width="72" height="134" rx="14" fill="#fff" stroke={ink} strokeWidth="3" />
      <rect x="66" y="12" width="28" height="6" rx="3" fill={ink} />
      <rect x="54" y="28" width="52" height="6" rx="3" fill={leaf} />
      <rect x="60" y="38" width="40" height="4" rx="2" fill={mint} />
      <rect className="step-quiz-scan" x="52" y={rows[0] - 8} width="56" height="16" rx="8" fill={mint} />
      {rows.map((y) => (
        <g key={y}>
          <circle cx="61" cy={y} r="4" fill="none" stroke={ink} strokeWidth="1.6" />
          <rect x="70" y={y - 2.5} width="30" height="5" rx="2.5" fill={leaf} />
        </g>
      ))}
      <path className="step-quiz-check" d="M58.5 58l2 2.2 4-4.4" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />
      <rect x="56" y="118" width="48" height="12" rx="6" fill={ink} />
      <path d="M77 124h6m-2-2 2 2-2 2" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  )
}

// 2 · Get your recommendation: a pad that floats gently while sparkles twinkle around it.
export function MatchPad() {
  return (
    <svg viewBox="0 0 160 150" className={frame} aria-hidden="true">
      <circle cx="80" cy="78" r="56" fill={mint} opacity=".7" />
      <ellipse className="step-shadow" cx="80" cy="140" rx="30" ry="4" fill={leaf} opacity=".5" />
      <g className="step-float">
        <g transform="rotate(-28 80 76)">
          <path d="M80 18c16 0 22 12 22 26 0 6 9 8 9 18s-9 12-9 18c0 18-8 30-22 30s-22-12-22-30c0-6-9-8-9-18s9-12 9-18c0-14 6-26 22-26Z" fill="#fff" stroke={ink} strokeWidth="2.6" />
          <path d="M80 30c9 0 12 8 12 18v28c0 12-4 22-12 22s-12-10-12-22V48c0-10 3-18 12-18Z" fill="none" stroke={leaf} strokeWidth="2" strokeDasharray="3 4" />
          <rect x="76" y="46" width="8" height="40" rx="4" fill={mint} />
        </g>
      </g>
      {[[128, 34, 0], [30, 52, .5], [124, 104, 1]].map(([x, y, delay]) => (
        <path key={x} className="step-twinkle" style={{ animationDelay: `${delay}s` }} d={`M${x} ${y - 8}v16M${x - 8} ${y}h16`} stroke={ink} strokeWidth="2.4" strokeLinecap="round" />
      ))}
    </svg>
  )
}

// 3 · Shop with ease: a PIAX pack drops into the shopping bag on a loop.
export function ShopBag() {
  return (
    <svg viewBox="0 0 160 150" className={frame} aria-hidden="true">
      <ellipse cx="80" cy="142" rx="46" ry="5" fill={mint} />
      <g className="step-drop">
        <rect x="58" y="22" width="44" height="34" rx="4" fill="#fff" stroke={ink} strokeWidth="2.4" />
        <rect x="58" y="22" width="44" height="9" rx="4" fill={leaf} />
        <text x="80" y="48" textAnchor="middle" fontSize="11" fontWeight="700" fill={ink} fontFamily="inherit">PIAX</text>
      </g>
      <path d="M62 66c0-12 7-18 18-18s18 6 18 18" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      <path d="M40 64h80l-8 72H48Z" fill={mint} stroke={ink} strokeWidth="3" strokeLinejoin="round" />
      <path d="M40 64h80" stroke={ink} strokeWidth="3" />
      <path d="M68 96c4 6 20 6 24 0" fill="none" stroke={ink} strokeWidth="2.6" strokeLinecap="round" />
      <g className="step-pop">
        <circle cx="120" cy="54" r="11" fill={ink} />
        <path d="M120 49v10m-5-5h10" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
      </g>
    </svg>
  )
}

// 4 · Delivery: a van rolls along a moving road with wheels turning.
export function DeliveryVan() {
  const wheel = (cx) => (
    <g key={cx}>
      <circle cx={cx} cy="112" r="10" fill={ink} />
      <g className="step-wheel" style={{ transformOrigin: `${cx}px 112px` }}>
        <circle cx={cx} cy="112" r="4" fill="#fff" />
        <path d={`M${cx} 104v16M${cx - 8} 112h16`} stroke={leaf} strokeWidth="1.6" />
      </g>
    </g>
  )
  return (
    <svg viewBox="0 0 160 150" className={frame} aria-hidden="true">
      <circle cx="80" cy="76" r="56" fill={mint} opacity=".7" />
      <path className="step-road" d="M6 128h148" stroke={leaf} strokeWidth="3" strokeLinecap="round" strokeDasharray="14 10" />
      <g className="step-bump">
        <path d="M22 56h72v56H22Z" fill="#fff" stroke={ink} strokeWidth="3" strokeLinejoin="round" />
        <path d="M94 72h22l16 18v22H94Z" fill={mint} stroke={ink} strokeWidth="3" strokeLinejoin="round" />
        <path d="M100 78h14l10 12h-24Z" fill="#fff" stroke={ink} strokeWidth="2" strokeLinejoin="round" />
        <rect x="38" y="68" width="38" height="30" rx="3" fill="#e9d2b0" stroke={ink} strokeWidth="2" />
        <path d="M38 78h38" stroke={ink} strokeWidth="1.6" />
        <text x="57" y="92" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={ink} fontFamily="inherit">PIAX</text>
        {[48, 112].map(wheel)}
      </g>
      {[66, 80, 94].map((y, i) => (
        <path key={y} className="step-speed" style={{ animationDelay: `${i * 0.2}s` }} d={`M4 ${y}h12`} stroke={ink} strokeWidth="2.4" strokeLinecap="round" />
      ))}
    </svg>
  )
}

