import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CodeBlock } from './CodeBlock'
import {
  peerDependencyRows,
  viteStylexPluginRows,
} from './gettingStartedContent'
import {
  DocArticle,
  DocExternalLink,
  DocH1,
  DocH2,
  DocLead,
  DocLink,
  DocP,
  InlineCode,
} from './ui/Prose'
import { PropsTable } from './ui/PropsTable'

function ScrollToHash() {
  const { hash, pathname } = useLocation()
  useLayoutEffect(() => {
    if (pathname !== '/docs/getting-started') return
    const id = hash.replace(/^#/, '')
    if (!id) return
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [hash, pathname])
  return null
}

export function GettingStartedDoc() {
  return (
    <DocArticle>
      <ScrollToHash />
      <DocH1>Getting started</DocH1>
      <DocLead>
        Set up dependencies, configure the StyleX compiler for Vite, wire a CSS
        entry, and wrap your app with <InlineCode>ThemeProvider</InlineCode>. Then
        browse components or dive into{' '}
        <DocLink to="/docs/theme">tokens and custom themes</DocLink>.
      </DocLead>

      <DocH2 id="overview" first>
        Overview
      </DocH2>
      <DocP>
        RSX UI is built with{' '}
        <DocExternalLink href="https://stylexjs.com/">StyleX</DocExternalLink>. Your
        app must compile <InlineCode>*.stylex.ts</InlineCode> files (this library
        ships StyleX styles). Use <InlineCode>@stylexjs/unplugin</InlineCode> with
        Vite—or the equivalent for your bundler—following{' '}
        <DocExternalLink href="https://stylexjs.com/docs/learn/installation/vite/vite-react">
          StyleX + Vite + React
        </DocExternalLink>
        .
      </DocP>

      <DocH2 id="peer-dependencies">Dependencies</DocH2>
      <DocP>
        Install React, StyleX runtime, and the compiler plugin. Exact versions should
        match your toolchain.
      </DocP>
      <PropsTable rows={[...peerDependencyRows]} />
      <CodeBlock title="npm (example)" editable={false}>
        {`npm install react react-dom @stylexjs/stylex
npm install -D @stylexjs/unplugin @vitejs/plugin-react typescript`}
      </CodeBlock>

      <DocH2 id="configure-vite">Configure Vite</DocH2>
      <DocP>
        Register <InlineCode>@stylexjs/unplugin</InlineCode>{' '}
        <strong>before</strong> <InlineCode>@vitejs/plugin-react</InlineCode> so Fast
        Refresh keeps working.
      </DocP>
      <PropsTable rows={[...viteStylexPluginRows]} />
      <CodeBlock title="vite.config.ts (excerpt)" editable={false}>
        {`import { defineConfig } from 'vite'
import stylex from '@stylexjs/unplugin'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    stylex.vite({
      useCSSLayers: true,
      dev: process.env.NODE_ENV !== 'production',
      runtimeInjection: false,
    }),
    react(),
  ],
})`}
      </CodeBlock>

      <DocH2 id="css-entry">CSS entry</DocH2>
      <DocP>
        Import a root stylesheet (for example <InlineCode>index.css</InlineCode>) from
        your entry file so Vite emits a CSS asset. The StyleX plugin appends compiled
        rules to that output in production when{' '}
        <InlineCode>runtimeInjection: false</InlineCode>.
      </DocP>
      <CodeBlock title="main.tsx" editable={false}>
        {`import './index.css'`}
      </CodeBlock>

      <DocH2 id="theming">Theming</DocH2>
      <DocP>
        Wrap the root of your app with <InlineCode>ThemeProvider</InlineCode> so
        semantic color and elevation tokens apply. The provider resolves light / dark
        / system preference and can persist to <InlineCode>localStorage</InlineCode>.
      </DocP>
      <CodeBlock title="Root" editable={false}>
        {`import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './lib' // or 'your-package'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultColorScheme="system">
      <App />
    </ThemeProvider>
  </StrictMode>,
)`}
      </CodeBlock>
      <DocP>
        Use <InlineCode>useTheme()</InlineCode> in any child to read or update the
        color scheme. Export <InlineCode>colors</InlineCode>,{' '}
        <InlineCode>elevation</InlineCode>, and other token groups from the library to
        build <InlineCode>stylex.createTheme</InlineCode> layers—see{' '}
        <DocLink to="/docs/theme">Theme &amp; tokens</DocLink> for the full API,
        <InlineCode>themeLayers</InlineCode>, and brand overrides.
      </DocP>

      <DocH2 id="next-steps">Next steps</DocH2>
      <DocP>
        Explore the <DocLink to="/docs">component index</DocLink>, try the{' '}
        <DocLink to="/demo">playground</DocLink>, or open a specific primitive (for
        example <DocLink to="/docs/components/button">Button</DocLink>,{' '}
        <DocLink to="/docs/components/input-text">InputText</DocLink>).
      </DocP>
    </DocArticle>
  )
}
