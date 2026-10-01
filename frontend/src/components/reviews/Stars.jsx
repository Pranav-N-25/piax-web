import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import { reviewSummaries } from '../../services/reviewService.js'
import { cn } from '../home/homeStyles.js'

const STAR = '#e0a33a'

// Read-only stars, filled to `value` (0–5, fractions shown as a partly filled star).
export function Stars({ value, size = 16, className = '' }) {
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)} aria-hidden="true">
      {[1, 2, 3, 4, 5].map((n) => {
        const fill = Math.max(0, Math.min(1, value - (n - 1)))
        return (
          <span key={n} className="relative inline-flex" style={{ width: size, height: size }}>
            <Star size={size} className="absolute inset-0 text-line" fill="currentColor" strokeWidth={0} />
            {fill > 0 && (
              <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star size={size} style={{ color: STAR }} fill="currentColor" strokeWidth={0} />
              </span>
            )}
          </span>
        )
      })}
    </span>
  )
}

// Star picker for writing a review: a radio group, so arrow keys work; hovering previews the rating.
const ratingWords = ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent']
export function StarInput({ value, onChange, invalid }) {
  const [hover, setHover] = useState(0)
  const shown = hover || value
  return (
    <div className="flex items-center gap-3">
      <div role="radiogroup" aria-label="Your rating" aria-invalid={invalid || undefined} className="flex gap-1" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} star${n > 1 ? 's' : ''} — ${ratingWords[n]}`}
            tabIndex={value ? (value === n ? 0 : -1) : (n === 1 ? 0 : -1)}
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight' || event.key === 'ArrowUp') { event.preventDefault(); onChange(Math.min(5, (value || 0) + 1)) }
              if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') { event.preventDefault(); onChange(Math.max(1, (value || 2) - 1)) }
            }}
            className="cursor-pointer rounded-md p-0.5 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-brand"
          >
            <Star size={30} strokeWidth={1.5} style={{ color: n <= shown ? STAR : undefined }} className={n <= shown ? '' : 'text-line'} fill={n <= shown ? 'currentColor' : 'none'} />
          </button>
        ))}
      </div>
      <span className="text-[13px] font-semibold text-ink" aria-live="polite">{ratingWords[shown]}</span>
    </div>
  )
}

// "★ 4.6 (12)" for a product card. With `showEmpty`, a product without reviews shows empty stars and
// "No reviews yet" (keeps product cards lined up); otherwise it renders nothing until the first review.
export function RatingBadge({ productId, showEmpty = false, className = '' }) {
  const [summary, setSummary] = useState(null)
  useEffect(() => {
    let cancelled = false
    reviewSummaries().then((all) => { if (!cancelled) setSummary(all[productId] ?? null) })
    return () => { cancelled = true }
  }, [productId])
  if (!summary?.count) {
    if (!showEmpty || !summary) return null
    return <span className={cn('inline-flex items-center gap-1.5 text-[12.5px] text-muted', className)}><Stars value={0} size={13} /> No reviews yet</span>
  }
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-[12.5px] text-muted', className)}>
      <Stars value={summary.average} size={13} />
      <strong className="text-ink">{summary.average.toFixed(1)}</strong>
      <span>({summary.count})</span>
      <span className="sr-only">{`Rated ${summary.average.toFixed(1)} out of 5 from ${summary.count} review${summary.count === 1 ? '' : 's'}`}</span>
    </span>
  )
}
