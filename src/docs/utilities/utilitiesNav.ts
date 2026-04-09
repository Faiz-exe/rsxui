/** Routes under `/docs/utilities/*` — keep in sync with `App.tsx`. */
export const utilityNavItems: { path: string; label: string; end?: boolean }[] = [
  { path: '', label: 'Overview', end: true },
  { path: 'display', label: 'Display' },
  { path: 'flex-layout', label: 'Flex & gap' },
  { path: 'spacing', label: 'Spacing' },
  { path: 'sizing', label: 'Sizing' },
  { path: 'typography', label: 'Typography' },
  { path: 'border-shadow', label: 'Border & shadow' },
  { path: 'position', label: 'Position' },
  { path: 'overflow', label: 'Overflow' },
  { path: 'background', label: 'Background' },
] as const

export const utilitySectionCards = [
  {
    to: '/docs/utilities/display',
    title: 'Display',
    desc: 'block, flex, grid, hidden, and other display modes.',
  },
  {
    to: '/docs/utilities/flex-layout',
    title: 'Flex & gap',
    desc: 'Direction, wrap, alignment, flex growth, and gap scale.',
  },
  {
    to: '/docs/utilities/spacing',
    title: 'Spacing',
    desc: 'Padding and margin using the space token scale.',
  },
  {
    to: '/docs/utilities/sizing',
    title: 'Sizing',
    desc: 'Width, height, min/max constraints.',
  },
  {
    to: '/docs/utilities/typography',
    title: 'Typography',
    desc: 'Font stacks, sizes, weights, colors, alignment, truncate.',
  },
  {
    to: '/docs/utilities/border-shadow',
    title: 'Border & shadow',
    desc: 'Radius, borders, and elevation shadows.',
  },
  {
    to: '/docs/utilities/position',
    title: 'Position',
    desc: 'static, relative, absolute, fixed, and inset.',
  },
  {
    to: '/docs/utilities/overflow',
    title: 'Overflow',
    desc: 'hidden, auto, and axis scrolling.',
  },
  {
    to: '/docs/utilities/background',
    title: 'Background',
    desc: 'Semantic surface backgrounds from color tokens.',
  },
] as const
