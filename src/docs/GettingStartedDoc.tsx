import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CodeBlock } from './CodeBlock'
import {
  DocArticle,
  DocH1,
  DocH2,
  DocLead,
  DocLink,
  DocP,
  InlineCode,
} from './ui/Prose'

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
      <DocH1 description="Get up and running with RSX UI in under 5 minutes.">
        Getting started
      </DocH1>

      {/* ── 1. Install ─────────────────────────────────────────────────── */}
      <DocH2 id="install" first>
        1. Install
      </DocH2>
      <DocP>
        Install RSX UI alongside its peer dependencies.
      </DocP>
      <CodeBlock title="Terminal" lang="bash" editable={false}>
        {`npm install react-stylex-ui @stylexjs/stylex`}
      </CodeBlock>
      <DocP>
        You also need the StyleX compiler plugin for your bundler. For Vite:
      </DocP>
      <CodeBlock title="Terminal" lang="bash" editable={false}>
        {`npm install -D @stylexjs/unplugin`}
      </CodeBlock>
      {/* ── 2. Configure Vite ──────────────────────────────────────────── */}
      <DocH2 id="configure-vite">
        2. Configure Vite
      </DocH2>
      <DocP>
        Add the StyleX plugin <strong>before</strong>{' '}
        <InlineCode>@vitejs/plugin-react</InlineCode> to preserve Fast Refresh.
      </DocP>
      <CodeBlock title="vite.config.ts" lang="tsx" editable={false}>
        {`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import stylex from '@stylexjs/unplugin'

export default defineConfig({
  plugins: [
    stylex.vite({
      useCSSLayers: true,
    }),
    react(),
  ],
})`}
      </CodeBlock>
      <DocP>
        Import a CSS file (e.g. <InlineCode>index.css</InlineCode>) from your
        entry so Vite emits a CSS asset. The StyleX plugin appends compiled
        styles to it during production builds.
      </DocP>

      {/* ── 3. Setup ───────────────────────────────────────────────────── */}
      <DocH2 id="setup">
        3. Wrap with ThemeProvider
      </DocH2>
      <DocP>
        Wrap the root of your app with <InlineCode>ThemeProvider</InlineCode> to
        enable design tokens and automatic dark mode.
      </DocP>
      <CodeBlock title="main.tsx" lang="tsx" editable={false}>
        {`import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'react-stylex-ui'
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

      {/* ── 4. Use a component ─────────────────────────────────────────── */}
      <DocH2 id="use">
        4. Use a component
      </DocH2>
      <CodeBlock title="App.tsx" lang="tsx" editable={false}>
        {`import { Button } from 'react-stylex-ui'

export default function App() {
  return (
    <Button severity="primary" onClick={() => alert('It works!')}>
      Hello RSX UI
    </Button>
  )
}`}
      </CodeBlock>

      {/* ── Next steps ─────────────────────────────────────────────────── */}
      <DocH2 id="next-steps">
        Next steps
      </DocH2>
      <DocP>
        Explore the <DocLink to="/docs">component index</DocLink>, customize
        your design with{' '}
        <DocLink to="/docs/theme">theme tokens</DocLink>, or jump into a
        specific component like{' '}
        <DocLink to="/docs/components/button">Button</DocLink>,{' '}
        <DocLink to="/docs/components/select">Select</DocLink>, or{' '}
        <DocLink to="/docs/components/dialog">Dialog</DocLink>.
      </DocP>
    </DocArticle>
  )
}
