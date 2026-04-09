import { CodeBlock } from './CodeBlock'
import {
  DocArticle,
  DocH1,
  DocH2,
  DocH3,
  DocLead,
  DocP,
  DocUl,
  DocLi,
  InlineCode,
} from './ui/Prose'
import { PropsTable } from './ui/PropsTable'
import { useDocMeta } from './useDocMeta'

const themeProviderProps = [
  {
    name: 'children',
    type: 'React.ReactNode',
    required: true,
    description: 'Your app tree; theme variables apply to this subtree.',
  },
  {
    name: 'defaultColorScheme',
    type: "'light' | 'dark' | 'system'",
    default: "'system'",
    description:
      'Initial preference when localStorage is empty or storage is disabled.',
  },
  {
    name: 'disableStorage',
    type: 'boolean',
    default: 'false',
    description:
      'Skip reading/writing localStorage (useful for SSR or tests).',
  },
  {
    name: 'themeLayers',
    type: 'ThemeLayers',
    description:
      'Optional light/dark StyleX theme layers from createTheme(colors) and createTheme(elevation). Replaces default dark stacks when provided.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Merged onto the provider root div.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description: 'Merged onto the provider root div.',
  },
] as const

const useThemeReturns = [
  {
    name: 'colorScheme',
    type: "'light' | 'dark' | 'system'",
    description: 'User preference, including system.',
  },
  {
    name: 'setColorScheme',
    type: '(scheme: ColorScheme) => void',
    description: 'Updates preference and persists to localStorage unless disabled.',
  },
  {
    name: 'resolved',
    type: "'light' | 'dark'",
    description:
      'Effective appearance after resolving system preference with prefers-color-scheme.',
  },
] as const

const exportedTokens = [
  {
    name: 'colors',
    type: 'VarGroup',
    description: 'Semantic palette: fg, bg, accent, danger, input tokens, etc.',
  },
  {
    name: 'elevation',
    type: 'VarGroup',
    description: 'Box shadows for cards and inputs.',
  },
  {
    name: 'fonts',
    type: 'VarGroup',
    description: 'Sans and mono stacks.',
  },
  {
    name: 'space',
    type: 'VarGroup',
    description: 'Spacing scale (xs … 2xl).',
  },
  {
    name: 'radii',
    type: 'VarGroup',
    description: 'Corner radii.',
  },
] as const

export function ThemeDoc() {
  useDocMeta('Theme & Tokens', 'ThemeProvider setup, useTheme hook, createTheme overrides, and design token reference.')
  return (
    <DocArticle>
      <DocH1>Theme &amp; tokens</DocH1>
      <DocLead>
        <InlineCode>ThemeProvider</InlineCode> applies semantic CSS variables and
        dark-mode overrides; <InlineCode>useTheme()</InlineCode> exposes the active
        preference. Export token groups to author custom{' '}
        <InlineCode>createTheme</InlineCode> layers.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <CodeBlock title="Import" editable={false}>
        {`import { ThemeProvider, useTheme, colors, elevation } from 'react-stylex-ui'
import * as stylex from '@stylexjs/stylex'`}
      </CodeBlock>

      <DocH2 id="usage">Usage</DocH2>
      <DocP>
        Wrap the root of your app (or a subtree) with the provider. Read or update
        the scheme with <InlineCode>useTheme()</InlineCode> in descendants.
      </DocP>
      <CodeBlock title="Basic">
        {`import { ThemeProvider } from 'react-stylex-ui'

<ThemeProvider>
  <App />
</ThemeProvider>`}
      </CodeBlock>

      <DocH2 id="theme-provider">ThemeProvider</DocH2>
      <DocP>
        Renders a root <InlineCode>div</InlineCode> with background and text from
        tokens. When <InlineCode>resolved</InlineCode> is dark, built-in{' '}
        <InlineCode>createTheme</InlineCode> layers run for{' '}
        <InlineCode>colors</InlineCode> and <InlineCode>elevation</InlineCode>{' '}
        unless <InlineCode>themeLayers</InlineCode> overrides them.
      </DocP>
      <DocH3>Props</DocH3>
      <PropsTable rows={[...themeProviderProps]} showRequiredLegend />

      <DocH2 id="use-theme">useTheme()</DocH2>
      <DocP>
        Call inside <InlineCode>ThemeProvider</InlineCode>. Throws if the provider
        is missing.
      </DocP>
      <DocH3>Returns</DocH3>
      <PropsTable rows={[...useThemeReturns]} />

      <DocH2 id="exported-tokens">Exported token groups</DocH2>
      <DocP>
        Import from the library entry to build custom{' '}
        <InlineCode>createTheme</InlineCode> layers that match component styles:
      </DocP>
      <PropsTable rows={[...exportedTokens]} />

      <DocH2 id="merge-sx">mergeSx</DocH2>
      <DocP>
        Utility <InlineCode>mergeSx(sx, className?, style?)</InlineCode> merges the
        object returned by <InlineCode>stylex.props()</InlineCode> with host{' '}
        <InlineCode>className</InlineCode> and <InlineCode>style</InlineCode> (caller
        style wins on duplicate keys). Used internally by primitives.
      </DocP>

      <DocH2 id="custom-themes">Custom themes</DocH2>
      <DocP>
        Export <InlineCode>colors</InlineCode> and{' '}
        <InlineCode>elevation</InlineCode> from this library, then build themes with
        the same contracts:
      </DocP>
      <DocUl>
        <DocLi>
          <InlineCode>stylex.createTheme(colors, {'{ ...overrides }'})</InlineCode>
        </DocLi>
        <DocLi>
          <InlineCode>
            stylex.createTheme(elevation, {'{ ...overrides }'})
          </InlineCode>
        </DocLi>
      </DocUl>
      <DocP>
        Pass them through <InlineCode>themeLayers</InlineCode> on{' '}
        <InlineCode>ThemeProvider</InlineCode> to replace the default light/dark
        layers.
      </DocP>

      <CodeBlock title="Brand overrides">
        {`import * as stylex from '@stylexjs/stylex'
import { ThemeProvider, colors, elevation } from 'react-stylex-ui'

const brandDark = stylex.createTheme(colors, {
  accent: '#2dd4bf',
  accentFg: '#042f2e',
  bg: '#0a0a0b',
  fg: '#fafafa',
})

const brandDarkElevation = stylex.createTheme(elevation, {
  card: '0 2px 8px rgba(0,0,0,0.5)',
  cardHover: '0 12px 32px rgba(0,0,0,0.6)',
  input: '0 1px 2px rgba(0,0,0,0.4)',
})

<ThemeProvider
  themeLayers={{
    dark: [brandDark, brandDarkElevation],
  }}
>
  <App />
</ThemeProvider>`}
      </CodeBlock>
    </DocArticle>
  )
}
