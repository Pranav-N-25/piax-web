import { gridColumns } from './productStyles.js'

export default function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className={gridColumns} aria-busy="true" aria-label="Loading products">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="rounded-2xl bg-white p-3 shadow-[0_6px_24px_rgba(0,64,52,.06)]">
          <div className="aspect-[4/3] animate-pulse rounded-xl bg-foam motion-reduce:animate-none" />
          <div className="space-y-3 px-2 pt-4 pb-2">
            <div className="h-4 w-4/5 animate-pulse rounded bg-foam motion-reduce:animate-none" />
            <div className="h-3 w-3/5 animate-pulse rounded bg-foam motion-reduce:animate-none" />
            <div className="h-3 w-full animate-pulse rounded bg-foam motion-reduce:animate-none" />
            <div className="mt-4 h-11 animate-pulse rounded-full bg-foam motion-reduce:animate-none" />
          </div>
        </div>
      ))}
    </div>
  )
}
