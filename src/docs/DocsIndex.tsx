import * as stylex from '@stylexjs/stylex'
import { Link } from 'react-router-dom'
import {
  DocArticle,
  DocH1,
  DocLink,
  DocP,
  InlineCode,
} from './ui/Prose'
import { indexStyles } from './DocsIndex.stylex'

const sections: {
  title: string
  items: { to: string; title: string; desc: string }[]
}[] = [
  {
    title: 'Getting started',
    items: [
      {
        to: '/docs/getting-started',
        title: 'Getting started',
        desc: 'Install, configure Vite, CSS entry, ThemeProvider, and dependencies.',
      },
      {
        to: '/docs/theme',
        title: 'Theme & tokens',
        desc: 'ThemeProvider, useTheme, createTheme, and custom themeLayers.',
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
        desc: 'Text field: label, helper text, disabled, validation, required — standard Input usage.',
      },
      {
        to: '/docs/components/input-text-with-icon',
        title: 'Input text with icon',
        desc: 'Same Input with prefix/suffix slots for icons, units, and combined states.',
      },
      {
        to: '/docs/components/input-number',
        title: 'InputNumber',
        desc: 'Numeric field: min, max, step, and the same label/helper/validation API as Input.',
      },
    ],
  },
  {
    title: 'Components',
    items: [
      { to: '/docs/components/button', title: 'Button', desc: 'Severities, sizes, and variants.' },
      { to: '/docs/components/checkbox', title: 'Checkbox', desc: 'Labeled checkbox with description and invalid state.' },
      { to: '/docs/components/switch', title: 'Switch', desc: 'Toggle with track and thumb; role=switch on a checkbox input.' },
      { to: '/docs/components/radio', title: 'Radio', desc: 'RadioGroup and Radio options with shared name.' },
      {
        to: '/docs/components/select',
        title: 'Select',
        desc: 'Custom listbox with keyboard support, animations, and form-friendly API.',
      },
      {
        to: '/docs/components/multi-select',
        title: 'MultiSelect',
        desc: 'Multi-value listbox with chips, filter, and hidden inputs for forms.',
      },
      {
        to: '/docs/components/autocomplete',
        title: 'Autocomplete',
        desc: 'Combobox with type-ahead filtering and keyboard selection.',
      },
      {
        to: '/docs/components/toggle-button',
        title: 'ToggleButton',
        desc: 'Pressed-state buttons and single- or multi-select groups.',
      },
      {
        to: '/docs/components/split-button',
        title: 'SplitButton',
        desc: 'Primary action plus dropdown menu; same Button severity and sizes.',
      },
      {
        to: '/docs/components/table',
        title: 'Table',
        desc: 'Tabular data with sortable columns, optional pagination, and loading/empty states.',
      },
      {
        to: '/docs/components/toast',
        title: 'Toast',
        desc: 'Material-style Snackbar: elevated bar, anchor positions, filled severities, ref API.',
      },
      {
        to: '/docs/components/dialog',
        title: 'Dialog',
        desc: 'Modal dialog: backdrop, focus trap, sizes, and optional footer actions.',
      },
      {
        to: '/docs/components/accordion',
        title: 'Accordion',
        desc: 'Expandable sections: single or multiple open, collapsible, ARIA wiring.',
      },
      {
        to: '/docs/components/tabs',
        title: 'Tabs',
        desc: 'Tablist, tabs, and panels with keyboard navigation and selection state.',
      },
      { to: '/docs/components/label', title: 'Label', desc: 'Form labels with optional required marker.' },
      { to: '/docs/components/card', title: 'Card', desc: 'Surfaces and padding.' },
      { to: '/docs/components/badge', title: 'Badge', desc: 'Semantic pill badges.' },
      { to: '/docs/components/stack', title: 'Stack', desc: 'Flex row or column with gap.' },
      { to: '/docs/components/text', title: 'Text', desc: 'Typography variants and tones.' },
      {
        to: '/docs/components/theme-toggle',
        title: 'ThemeToggle',
        desc: 'Cycle system / light / dark.',
      },
    ],
  },
]

export function DocsIndex() {
  return (
    <DocArticle>
      <DocH1>Documentation</DocH1>

      <div {...stylex.props(indexStyles.intro)}>
        <p {...stylex.props(indexStyles.introText)}>
          Start with <DocLink to="/docs/getting-started">Getting started</DocLink> for dependencies,
          Vite configuration, CSS entry, and <InlineCode>ThemeProvider</InlineCode>. Each component page
          follows <strong>Import</strong> → <strong>Usage</strong> → <strong>Props</strong> →{' '}
          <strong>Accessibility</strong> (when relevant). Code snippets include copy.
        </p>
      </div>

      <DocP>
        Browse by category below, or open the <DocLink to="/demo">playground</DocLink> for live examples.
      </DocP>

      {sections.map((section) => (
        <section key={section.title} aria-labelledby={`section-${section.title}`}>
          <h2 id={`section-${section.title}`} {...stylex.props(indexStyles.sectionLabel)}>
            {section.title}
          </h2>
          <div {...stylex.props(indexStyles.grid)}>
            {section.items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                {...stylex.props(indexStyles.cardLink)}
              >
                <h3 {...stylex.props(indexStyles.cardTitle)}>{item.title}</h3>
                <p {...stylex.props(indexStyles.cardDesc)}>{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </DocArticle>
  )
}
