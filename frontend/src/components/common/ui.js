import { extendTailwindMerge } from 'tailwind-merge'

// Font sizes here are arbitrary values without a bundled line-height,
// so a size class must not drop an explicit `leading-*` class.
const twMerge = extendTailwindMerge({ override: { conflictingClassGroups: { 'font-size': [] } } })

export const cn = (...classes) => twMerge(classes.filter(Boolean).join(' '))

const focusRing = 'focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#e2a878]'

// Shared Tailwind class sets for the inner (non-home) pages.
export const ui = {
  page: 'mx-auto w-full max-w-[1440px] px-6 pt-10 pb-15 md:pt-12 md:pb-20 lg:pt-15 lg:pb-30',
  pageHeading: 'mb-10 max-w-[700px]',
  pageHeadingNarrow: 'mb-10 max-w-[640px]',
  eyebrow: 'flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[.14em] text-leaf',
  display: 'font-playfair font-medium leading-[1.02] tracking-[-.045em]',
  h1: 'mt-4 mb-6 font-playfair text-[54px] font-medium leading-[1.02] tracking-[-.045em] md:text-[clamp(54px,6.3vw,88px)]',
  h2: 'mb-[.83em] font-playfair text-[clamp(34px,4vw,56px)] font-medium leading-[1.02] tracking-[-.045em]',
  h3: 'mb-1.5 text-[17px] font-bold leading-[1.25]',
  accent: 'font-playfair font-medium italic text-leaf',
  lead: 'mb-4 max-w-[450px] text-[17px] text-stone',
  muted: 'text-stone',
  textLink: `inline-flex items-center gap-2 text-[13px] font-bold text-leaf hover:text-leaf ${focusRing}`,
  label: 'my-5 block text-xs font-bold',
  input: `mt-2 block w-full rounded-[3px] border border-rule bg-white px-4 py-3 ${focusRing}`,
  chip: 'rounded border border-rule bg-paper px-3.5 py-2.5 text-stone',
  chipActive: 'rounded border border-leaf bg-leaf px-3.5 py-2.5 text-white',
  card: 'max-w-[700px] bg-white p-6 md:p-8',
  quantity: 'flex items-center gap-4 rounded-[22px] border border-rule px-2 py-1',
  quantityButton: `flex cursor-pointer items-center p-1 text-leaf ${focusRing}`,
  miniArt: 'h-[42px] shrink-0 grow-0 basis-[42px]',
  artCaption: 'font-playfair text-[29px] leading-none italic text-white',
}

export const button = {
  base: `inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-transparent px-5 text-[13px] font-bold transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`,
  primary: 'border-[#0b6662] bg-[#0b6662] text-white',
  outline: 'border-leaf bg-transparent text-leaf',
  light: 'bg-white text-leaf',
  dark: 'bg-charcoal text-white',
  full: 'w-full',
}

// Product artwork backgrounds, keyed by product.tone
export const productTones = {
  mint: 'bg-[linear-gradient(140deg,#d5eee4,#a8d2c3)]',
  peach: 'bg-[linear-gradient(140deg,#f7dfd0,#e7bca8)]',
  sage: 'bg-[linear-gradient(140deg,#dfe8d1,#b9ce9f)]',
  pink: 'bg-[linear-gradient(140deg,#fbe3e8,#f0c3cd)]',
  lilac: 'bg-[linear-gradient(140deg,#ece6fa,#cfc3ef)]',
  cream: 'bg-[linear-gradient(140deg,#f8f0e0,#e9d8b8)]',
}

// Article artwork backgrounds, keyed by article.accent
export const articleAccents = {
  mint: 'bg-[linear-gradient(140deg,#77af9b,#c6e1d3)]',
  peach: 'bg-[linear-gradient(140deg,#d7a68f,#f0d4c3)]',
  lilac: 'bg-[linear-gradient(140deg,#9b9cbf,#dbd7e8)]',
}

export const productShape = 'flex -rotate-15 items-center justify-center rounded-[48%_48%_46%_46%] bg-[#fffdf8] font-playfair tracking-[.12em] text-leaf shadow-[10px_14px_22px_rgba(0,70,50,.13)]'
