/**
 * Post-build script that creates per-route index.html files with unique
 * <title>, description, and Open Graph tags so link-preview crawlers
 * (WhatsApp, Slack, Discord, Twitter, etc.) see the correct metadata
 * without executing JavaScript.
 *
 * Run after `vite build`:  node scripts/prerender-meta.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = resolve(__dirname, '..', 'dist')
const BASE_URL = 'https://rsxui.netlify.app'
const SITE = 'RSX UI'

const ROUTES = [
  { path: '/', title: 'RSX UI', desc: '36+ accessible, typed React components with zero-runtime CSS powered by StyleX.' },
  { path: '/docs', title: 'Overview', desc: 'Component index, quick-start links, and library summary for RSX UI.' },
  { path: '/docs/getting-started', title: 'Getting Started', desc: 'Install RSX UI, configure Vite with StyleX, and render your first component.' },
  { path: '/docs/theme', title: 'Theme & Tokens', desc: 'ThemeProvider setup, useTheme hook, createTheme overrides, and design token reference.' },
  { path: '/docs/utilities', title: 'Utilities', desc: 'StyleX utility styles for layout, spacing, typography, and more.' },

  // Inputs
  { path: '/docs/components/input-text', title: 'InputText', desc: 'Text field with label, helper text, disabled, and validation states.' },
  { path: '/docs/components/input-text-with-icon', title: 'Input with Icon', desc: 'Prefix and suffix slots for icons, units, and action buttons.' },
  { path: '/docs/components/input-number', title: 'InputNumber', desc: 'Numeric field with min, max, and step controls.' },

  // Components
  { path: '/docs/components/button', title: 'Button', desc: 'Severities, sizes, outlined, text, and loading variants.' },
  { path: '/docs/components/checkbox', title: 'Checkbox', desc: 'Labeled checkbox with description, invalid, and indeterminate states.' },
  { path: '/docs/components/switch', title: 'Switch', desc: 'Toggle with track and thumb, semantically a checkbox with role=switch.' },
  { path: '/docs/components/radio', title: 'Radio', desc: 'RadioGroup and Radio options with a shared accessible name.' },
  { path: '/docs/components/select', title: 'Select', desc: 'Custom listbox with keyboard support, animations, and form API.' },
  { path: '/docs/components/multi-select', title: 'MultiSelect', desc: 'Multi-value listbox with chips, filter, and form-friendly hidden inputs.' },
  { path: '/docs/components/autocomplete', title: 'Autocomplete', desc: 'Combobox with type-ahead filtering and keyboard selection.' },
  { path: '/docs/components/toggle-button', title: 'ToggleButton', desc: 'Pressed-state buttons and single or multi-select groups.' },
  { path: '/docs/components/split-button', title: 'SplitButton', desc: 'Primary action plus dropdown menu with shared severity and size API.' },
  { path: '/docs/components/table', title: 'Table', desc: 'Sortable columns, pagination, loading, and empty states.' },
  { path: '/docs/components/toast', title: 'Toast', desc: 'Snackbar with anchor positions, severities, and ref API.' },
  { path: '/docs/components/dialog', title: 'Dialog', desc: 'Modal dialog with backdrop, focus trap, sizes, and footer actions.' },
  { path: '/docs/components/accordion', title: 'Accordion', desc: 'Expandable sections with single or multiple open support and ARIA.' },
  { path: '/docs/components/tabs', title: 'Tabs', desc: 'Tablist, tabs, and panels with keyboard navigation.' },
  { path: '/docs/components/spinner', title: 'Spinner', desc: 'Loading indicator with size and semantic tone variants.' },
  { path: '/docs/components/alert', title: 'Alert', desc: 'Static banners for info, success, warning, and danger messages.' },
  { path: '/docs/components/progress', title: 'Progress', desc: 'Determinate and indeterminate progress bars with severity colors.' },
  { path: '/docs/components/tooltip', title: 'Tooltip', desc: 'Hover and focus hints with four positions and configurable delay.' },

  // Display
  { path: '/docs/components/label', title: 'Label', desc: 'Form labels with optional required marker.' },
  { path: '/docs/components/badge', title: 'Badge', desc: 'Semantic pill badges in multiple sizes and colors.' },
  { path: '/docs/components/avatar', title: 'Avatar', desc: 'User images, initials, sizes, severities, and AvatarGroup.' },
  { path: '/docs/components/card', title: 'Card', desc: 'Elevated surfaces with padding and interactive variants.' },
  { path: '/docs/components/divider', title: 'Divider', desc: 'Horizontal or vertical separator with optional label.' },
  { path: '/docs/components/skeleton', title: 'Skeleton', desc: 'Shimmer placeholders for text, circles, and rectangles.' },
  { path: '/docs/components/stack', title: 'Stack', desc: 'Flex row or column with gap, align, and justify props.' },
  { path: '/docs/components/text', title: 'Text', desc: 'Typography variants, tones, truncation, and line clamping.' },
  { path: '/docs/components/theme-toggle', title: 'ThemeToggle', desc: 'Cycle between system, light, and dark color schemes.' },

  // Utility sub-pages
  { path: '/docs/utilities/display', title: 'Display Utilities', desc: 'Show, hide, and control element display modes with StyleX helpers.' },
  { path: '/docs/utilities/typography', title: 'Typography Utilities', desc: 'Font size, weight, alignment, and text decoration helpers.' },
  { path: '/docs/utilities/border-shadow', title: 'Border & Shadow Utilities', desc: 'Border width, radius, and box-shadow helpers.' },
  { path: '/docs/utilities/position', title: 'Position Utilities', desc: 'CSS position, z-index, and inset helpers.' },
  { path: '/docs/utilities/background', title: 'Background Utilities', desc: 'Background color and gradient helpers.' },
  { path: '/docs/utilities/overflow', title: 'Overflow Utilities', desc: 'Overflow and scroll behavior helpers.' },
  { path: '/docs/utilities/sizing', title: 'Sizing Utilities', desc: 'Width, height, and min/max sizing helpers.' },
  { path: '/docs/utilities/spacing', title: 'Spacing Utilities', desc: 'Margin and padding spacing helpers.' },
  { path: '/docs/utilities/flex-layout', title: 'Flex & Layout Utilities', desc: 'Flex direction, wrap, align, justify, and gap helpers.' },
]

const shell = readFileSync(resolve(DIST, 'index.html'), 'utf8')

let created = 0
for (const { path: routePath, title, desc } of ROUTES) {
  const fullTitle = routePath === '/' ? `${title} — React + StyleX Component Library` : `${title} — ${SITE}`
  const url = `${BASE_URL}${routePath}`

  let html = shell
    // Title
    .replace(/<title>[^<]*<\/title>/, `<title>${fullTitle}</title>`)
    // Description
    .replace(/(<meta name="description" content=")[^"]*"/, `$1${desc}"`)
    // OG
    .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${fullTitle}"`)
    .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${desc}"`)
    .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
    // Twitter
    .replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${fullTitle}"`)
    .replace(/(<meta name="twitter:description" content=")[^"]*"/, `$1${desc}"`)
    // Canonical
    .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`)

  const dir = routePath === '/' ? DIST : resolve(DIST, routePath.slice(1))
  mkdirSync(dir, { recursive: true })
  writeFileSync(resolve(dir, 'index.html'), html)
  created++
}

console.log(`prerender-meta: wrote ${created} route HTML files into dist/`)
