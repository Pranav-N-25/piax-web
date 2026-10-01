import { cn } from '../common/ui.js'
import { blockGap, container as pageContainer, gridGap, headGap, sectionY } from '../common/spacing.js'

export { cn }

// Card tones: `bg` is the soft fill, `accent` the stronger chip/icon fill, `fade` white at the top into the tone at the bottom.
export const tones = {
  pink: { bg: 'bg-tone-pink', accent: 'bg-tone-pink-2', icon: 'text-tone-pink-2', fade: 'bg-[linear-gradient(180deg,#fff_8%,var(--color-tone-pink)_100%)]' },
  rose: { bg: 'bg-tone-rose', accent: 'bg-tone-rose-2', icon: 'text-tone-rose-2', fade: 'bg-[linear-gradient(180deg,#fff_8%,var(--color-tone-rose)_100%)]' },
  mint: { bg: 'bg-tone-mint', accent: 'bg-tone-mint-2', icon: 'text-tone-mint-2', fade: 'bg-[linear-gradient(180deg,#fff_8%,var(--color-tone-mint)_100%)]' },
  sage: { bg: 'bg-tone-sage', accent: 'bg-tone-sage-2', icon: 'text-tone-sage-2', fade: 'bg-[linear-gradient(180deg,#fff_8%,var(--color-tone-sage)_100%)]' },
  lilac: { bg: 'bg-tone-lilac', accent: 'bg-tone-lilac-2', icon: 'text-tone-lilac-2', fade: 'bg-[linear-gradient(180deg,#fff_8%,var(--color-tone-lilac)_100%)]' },
  blue: { bg: 'bg-tone-blue', accent: 'bg-tone-blue-2', icon: 'text-tone-blue-2', fade: 'bg-[linear-gradient(180deg,#fff_8%,var(--color-tone-blue)_100%)]' },
  peach: { bg: 'bg-tone-peach', accent: 'bg-tone-peach-2', icon: 'text-tone-peach-2', fade: 'bg-[linear-gradient(180deg,#fff_8%,var(--color-tone-peach)_100%)]' },
  cream: { bg: 'bg-tone-cream', accent: 'bg-tone-cream-2', icon: 'text-tone-cream-2', fade: 'bg-[linear-gradient(180deg,#fff_8%,var(--color-tone-cream)_100%)]' },
}

// Spacing follows an 8px grid: 24px page gutter, 16/24px card gaps,
// 20-24px card padding and 80-120px between sections.
export const container = `relative ${pageContainer}`
// Sections share one even rhythm: identical top/bottom padding and no forced
// height, so the gap between any two sections' content is the same everywhere.
// `section` lays its container out as a column so equal-height card rows and
// columns inside it line up; `sectionPlain` keeps a section's natural block flow.
export const section = `relative flex scroll-mt-16 flex-col *:flex-1 ${sectionY}`
export const sectionPlain = `relative scroll-mt-16 ${sectionY}`
export const sectionHead = headGap
export const cardGrid = gridGap
export { blockGap }
export const heading = 'm-0 font-sans font-bold leading-[1.08] tracking-[-.025em] text-ink'
export const h2 = `${heading} text-[clamp(32px,3.3vw,46px)]`
// Green highlight inside section titles: same typeface and weight as the title, in brand green.
export const accent = 'not-italic text-brand-2'
export const eyebrow = 'mb-2.5 text-xs font-semibold uppercase tracking-[.22em] text-brand'
export const bar = 'flex items-center gap-3'
export const barIcon = 'shrink-0 text-brand'
export const barText = 'flex flex-col text-[12.5px] leading-[1.3]'
export const barStrong = 'text-sm font-semibold text-ink'

export const iconRow = 'grid grid-cols-2 gap-4 md:grid-cols-4'
export const iconRowItem = 'flex flex-col items-center gap-2 text-center text-[11.5px] leading-[1.3]'
export const iconRowIcon = 'flex size-11 items-center justify-center rounded-full bg-brand-soft text-brand'
export const tile = 'flex flex-col items-center gap-2 rounded-[14px] p-5 text-center transition-transform duration-200 hover:-translate-y-[3px]'
export const tileTitle = 'text-[15px] font-semibold leading-[1.08] tracking-[-.025em] text-ink'
export const tileText = 'mb-2 min-h-[30px] text-[11.5px] leading-[1.3] text-body'

// Pages whose content is set in Poppins (Shop, About): redefines the sans face for everything inside,
// including shared sections that use `font-sans`. Doodle notes and Playfair headings keep their own faces.
export const poppinsPage = "font-poppins [--font-sans:'Poppins',system-ui,sans-serif]"

export const btn = {
  base: 'inline-flex min-h-12 cursor-pointer items-center justify-center gap-2.5 whitespace-nowrap rounded-full border-[1.5px] border-brand px-5 text-[15px] font-semibold transition-[transform,box-shadow,background] duration-200 hover:-translate-y-0.5 hover:shadow-lift disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none',
  solid: 'bg-brand text-white',
  outline: 'bg-white text-brand',
  small: 'min-h-10 px-4 text-[13px]',
}

export const roundArrow = 'inline-flex size-10 shrink-0 items-center justify-center rounded-full text-ink transition-transform duration-200 hover:translate-x-[3px]'
