// Tailwind class sets shared by the products page.
// Spacing: 1440px max width, 16–20px mobile gutter, 48–80px desktop gutter,
// 56px (mobile) to 80px (desktop) between sections, 20–28px card padding.

export const container = 'mx-auto w-full max-w-[1440px] px-4 min-[480px]:px-5 md:px-8 lg:px-12 xl:px-20'
export const sectionGap = 'mt-14 lg:mt-20'

export const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf'

export const button = {
  primary: `inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-leaf px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-leaf-dark disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`,
  secondary: `inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-leaf bg-white px-6 text-sm font-semibold text-leaf transition-colors duration-200 hover:bg-foam ${focusRing}`,
  ghost: `inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-full px-4 text-sm font-medium text-leaf hover:bg-foam ${focusRing}`,
  icon: `inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-charcoal transition-colors hover:bg-foam ${focusRing}`,
}

export const eyebrow = 'text-xs font-semibold uppercase tracking-[.14em] text-leaf'
export const card = 'rounded-2xl bg-white shadow-[0_8px_28px_rgba(0,64,52,.06)]'

// Choice chips used inside modals (sizes, pad types, frequencies…)
export const choice = (selected) => [
  `min-h-11 cursor-pointer rounded-xl border px-4 text-sm font-medium transition-colors ${focusRing}`,
  selected ? 'border-leaf bg-foam text-leaf' : 'border-rule bg-white text-charcoal hover:border-sage',
].join(' ')

// Soft background behind product artwork, keyed by product.tone
export const toneBackgrounds = {
  mint: 'bg-[linear-gradient(160deg,#eef8f4,#d5ede3)]',
  pink: 'bg-[linear-gradient(160deg,#fdf0f2,#f8dce2)]',
  lilac: 'bg-[linear-gradient(160deg,#f3effc,#e2daf6)]',
  peach: 'bg-[linear-gradient(160deg,#fdf3ec,#f7e0d0)]',
  sage: 'bg-[linear-gradient(160deg,#f1f6f1,#dce9dd)]',
  cream: 'bg-[linear-gradient(160deg,#fbf6ec,#f1e6d2)]',
}

// 1 column on small phones, 2 from 420px, 3 on tablets, 4 when the sidebar leaves room.
export const gridColumns = 'grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-3 md:gap-5 lg:gap-6 xl:grid-cols-4'
