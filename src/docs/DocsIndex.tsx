import * as stylex from '@stylexjs/stylex'
import { Link } from 'react-router-dom'
import { indexStyles as s } from './DocsIndex.stylex'
import { useDocMeta } from './useDocMeta'

const sections: {
  title: string
  items: { to: string; title: string; desc: string }[]
}[] = [
  {
    title: 'Getting started',
    items: [
      {
        to: '/docs/getting-started',
        title: 'Quick start',
        desc: 'Install, configure Vite, import CSS, and wrap your app in ThemeProvider.',
      },
      {
        to: '/docs/theme',
        title: 'Theme & tokens',
        desc: 'ThemeProvider, useTheme, createTheme, custom token overrides.',
      },
      {
        to: '/docs/utilities',
        title: 'Utilities',
        desc: 'StyleX layout and typography helpers aligned with design tokens.',
      },
    ],
  },
  {
    title: 'Inputs',
    items: [
      {
        to: '/docs/components/input-text',
        title: 'InputText',
        desc: 'Text field with label, helper text, disabled, and validation states.',
      },
      {
        to: '/docs/components/input-text-with-icon',
        title: 'Input with icon',
        desc: 'Prefix/suffix slots for icons, units, and action buttons.',
      },
      {
        to: '/docs/components/input-number',
        title: 'InputNumber',
        desc: 'Numeric field with min, max, and step controls.',
      },
    ],
  },
  {
    title: 'Components',
    items: [
      {
        to: '/docs/components/button',
        title: 'Button',
        desc: 'Severities, sizes, outlined, text, and loading variants.',
      },
      {
        to: '/docs/components/checkbox',
        title: 'Checkbox',
        desc: 'Labeled checkbox with description, invalid, and indeterminate states.',
      },
      {
        to: '/docs/components/switch',
        title: 'Switch',
        desc: 'Toggle with track and thumb; semantically a checkbox with role=switch.',
      },
      {
        to: '/docs/components/radio',
        title: 'Radio',
        desc: 'RadioGroup and Radio options with a shared accessible name.',
      },
      {
        to: '/docs/components/select',
        title: 'Select',
        desc: 'Custom listbox with keyboard support, animations, and form API.',
      },
      {
        to: '/docs/components/multi-select',
        title: 'MultiSelect',
        desc: 'Multi-value listbox with chips, filter, and form-friendly hidden inputs.',
      },
      {
        to: '/docs/components/autocomplete',
        title: 'Autocomplete',
        desc: 'Combobox with type-ahead filtering and keyboard selection.',
      },
      {
        to: '/docs/components/toggle-button',
        title: 'ToggleButton',
        desc: 'Pressed-state buttons and single or multi-select groups.',
      },
      {
        to: '/docs/components/split-button',
        title: 'SplitButton',
        desc: 'Primary action plus dropdown menu; same severity and size API as Button.',
      },
      {
        to: '/docs/components/table',
        title: 'Table',
        desc: 'Sortable columns, pagination, loading, and empty states.',
      },
      {
        to: '/docs/components/toast',
        title: 'Toast',
        desc: 'Snackbar: anchor positions, filled severities, and ref API.',
      },
      {
        to: '/docs/components/dialog',
        title: 'Dialog',
        desc: 'Modal dialog with backdrop, focus trap, sizes, and footer actions.',
      },
      {
        to: '/docs/components/accordion',
        title: 'Accordion',
        desc: 'Expandable sections; single or multiple open, ARIA wired.',
      },
      {
        to: '/docs/components/tabs',
        title: 'Tabs',
        desc: 'Tablist, tabs, and panels with keyboard navigation.',
      },
      {
        to: '/docs/components/spinner',
        title: 'Spinner',
        desc: 'Loading indicator with size and semantic tone variants.',
      },
      {
        to: '/docs/components/alert',
        title: 'Alert',
        desc: 'Static banners for info, success, warning, and danger messages.',
      },
      {
        to: '/docs/components/progress',
        title: 'Progress',
        desc: 'Determinate and indeterminate progress bars with severity colors.',
      },
      {
        to: '/docs/components/tooltip',
        title: 'Tooltip',
        desc: 'Hover and focus hints with four positions and configurable delay.',
      },
    ],
  },
  {
    title: 'Display',
    items: [
      { to: '/docs/components/label', title: 'Label', desc: 'Form labels with optional required marker.' },
      { to: '/docs/components/card', title: 'Card', desc: 'Elevated surfaces with padding and interactive variants.' },
      { to: '/docs/components/badge', title: 'Badge', desc: 'Semantic pill badges in multiple sizes and colors.' },
      { to: '/docs/components/avatar', title: 'Avatar', desc: 'User images, initials, sizes, severities, and AvatarGroup.' },
      { to: '/docs/components/divider', title: 'Divider', desc: 'Horizontal or vertical separator with optional label.' },
      { to: '/docs/components/skeleton', title: 'Skeleton', desc: 'Shimmer placeholders for text, circles, and rectangles.' },
      { to: '/docs/components/stack', title: 'Stack', desc: 'Flex row or column with gap, align, and justify props.' },
      { to: '/docs/components/text', title: 'Text', desc: 'Typography variants, tones, truncation, and line clamping.' },
      { to: '/docs/components/theme-toggle', title: 'ThemeToggle', desc: 'Cycle between system, light, and dark themes.' },
    ],
  },
]

const STATS = [
  { value: '36+', label: 'Components' },
  { value: '100%', label: 'TypeScript' },
  { value: 'StyleX', label: 'Zero-runtime CSS' },
  { value: 'A11y', label: 'ARIA compliant' },
]

function ArrowRight() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function DocsIndex() {
  useDocMeta('Overview', 'Component index, quick-start links, and library summary for RSX UI.')
  return (
    <article>
      {/* Hero */}
      <div {...stylex.props(s.hero)}>
        <div {...stylex.props(s.heroEyebrow)}>
          <span aria-hidden>✦</span>
          RSX UI — React + StyleX
        </div>
        <h1 {...stylex.props(s.heroTitle)}>
          Build faster with<br />beautiful components
        </h1>
        <p {...stylex.props(s.heroLead)}>
          A modern component library built with React and StyleX. Zero-runtime CSS, full TypeScript
          support, accessible by default, and themeable with design tokens.
        </p>
        <div {...stylex.props(s.heroCta)}>
          <Link to="/docs/getting-started" {...stylex.props(s.ctaPrimary)}>
            Get started
            <ArrowRight />
          </Link>
          <Link to="/demo" {...stylex.props(s.ctaSecondary)}>
            View playground
          </Link>
        </div>
        <div {...stylex.props(s.installSnippet)}>
          <span {...stylex.props(s.installPrompt)}>$</span>
          npm install react-stylex-ui
        </div>
      </div>

      {/* Stats */}
      <div {...stylex.props(s.stats)} aria-label="Library stats">
        {STATS.map((stat, i) => (
          <div key={stat.label} style={{ display: 'contents' }}>
            {i > 0 && <div {...stylex.props(s.statDivider)} aria-hidden />}
            <div {...stylex.props(s.stat)}>
              <span {...stylex.props(s.statValue)}>{stat.value}</span>
              <span {...stylex.props(s.statLabel)}>{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sections */}
      {sections.map((section) => (
        <section key={section.title} {...stylex.props(s.section)} aria-labelledby={`section-${section.title}`}>
          <h2 id={`section-${section.title}`} {...stylex.props(s.sectionLabel)}>
            {section.title}
            <span {...stylex.props(s.sectionCount)}>{section.items.length}</span>
          </h2>
          <div {...stylex.props(s.grid)}>
            {section.items.map((item) => (
              <Link key={item.to} to={item.to} {...stylex.props(s.cardLink)}>
                <h3 {...stylex.props(s.cardTitle)}>{item.title}</h3>
                <p {...stylex.props(s.cardDesc)}>{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </article>
  )
}
