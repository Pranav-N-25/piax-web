// Shared spacing tokens on an 8px grid.

// Page gutter: fluid left/right margin shared by every page (--page-gutter in index.css).
export const gutter = 'px-(--page-gutter)'
// Lets a scroll row run edge to edge while its first card still lines up with the page gutter.
export const gutterBleed = '-mx-(--page-gutter) px-(--page-gutter)'

// Page container: 1440px max width with the page gutter.
export const container = `mx-auto w-full max-w-[1440px] ${gutter}`

// Vertical rhythm between sections scales with screen height (45px on phones →
// 102px on large displays): fluid padding, 80% of the original full-bleed rhythm.
export const sectionY = 'py-[clamp(45px,7.2vh,102px)]'

// Space below a section heading block.
export const headGap = 'mb-10 md:mb-12'

// Gap between cards in a grid: 16px → 24px.
export const gridGap = 'gap-4 md:gap-6'

// Space between stacked blocks inside a section.
export const blockGap = 'mt-8 md:mt-10'
