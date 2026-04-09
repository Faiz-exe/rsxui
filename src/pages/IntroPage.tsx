import * as stylex from '@stylexjs/stylex'
import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Badge,
  Button,
  Card,
  Spinner,
  Switch,
  Text,
  ThemeToggle,
} from '../lib'
import { styles, ctaStyles } from './IntroPage.stylex'

// ─── Inline SVG icons (no extra dependency) ──────────────────────────────────
function IconZap() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}
function IconPalette() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r="0.5" /><circle cx="17.5" cy="10.5" r="0.5" /><circle cx="8.5" cy="7.5" r="0.5" /><circle cx="6.5" cy="12.5" r="0.5" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  )
}
function IconShield() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}
function IconCode() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  )
}
function IconLayers() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  )
}
function IconMoon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}
function IconGitHub() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: <IconZap />,
    title: 'Compile-time CSS',
    body: 'StyleX extracts all styles at build time. No runtime overhead, no style injection in production — just static atomic classes.',
  },
  {
    icon: <IconPalette />,
    title: 'Token-driven themes',
    body: 'Every color, spacing step, and radius is a CSS variable. Swap light → dark or brand overrides through a single provider.',
  },
  {
    icon: <IconShield />,
    title: 'Accessible by default',
    body: 'Full ARIA attributes, keyboard navigation, focus management, and reduced-motion support baked into every component.',
  },
  {
    icon: <IconCode />,
    title: 'Typed primitives',
    body: 'Every prop is typed. Refs are forwarded. Host className / style is merged safely so you can always override what you need.',
  },
  {
    icon: <IconLayers />,
    title: 'Composable API',
    body: 'Compound components (Accordion, Tabs, Select) and utility styles ship from the same package — pick what you need.',
  },
  {
    icon: <IconMoon />,
    title: 'Light & dark mode',
    body: 'Adaptive color tokens respond to the OS preference or the ThemeProvider — flip it at runtime with zero layout shift.',
  },
] as const

const STATS = [
  { num: '20+', label: 'Components' },
  { num: '100%', label: 'TypeScript' },
  { num: '0 kb', label: 'CSS runtime' },
  { num: 'A11y', label: 'WCAG ready' },
] as const

const statDelays = [
  undefined,
  styles.statCardDelay1,
  styles.statCardDelay2,
  styles.statCardDelay3,
] as const

const featureDelays = [
  styles.featureCard0,
  styles.featureCard1,
  styles.featureCard2,
  styles.featureCard3,
  styles.featureCard4,
  styles.featureCard5,
] as const

// ─── Page ─────────────────────────────────────────────────────────────────────
const INSTALL_CMD = 'npm install react-stylex-ui'

function CopyableInstall() {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* noop */ }
  }, [])

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Copied!' : 'Copy install command'}
      {...stylex.props(ctaStyles.installBlock)}
    >
      <span {...stylex.props(ctaStyles.installPrompt)}>$</span>
      <span {...stylex.props(ctaStyles.installCmd)}>{INSTALL_CMD}</span>
      <span {...stylex.props(ctaStyles.installCopyIcon, copied && ctaStyles.installCopied)}>
        {copied ? (
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth={2} />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth={2} />
          </svg>
        )}
      </span>
    </button>
  )
}

export default function IntroPage() {
  const [switchOn, setSwitchOn] = useState(true)

  return (
    <div {...stylex.props(styles.page)}>
      <div {...stylex.props(styles.glow)} aria-hidden />

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <header {...stylex.props(styles.nav)}>
        <div {...stylex.props(styles.navLeft)}>
          <Link to="/" {...stylex.props(styles.logo)}>
            RSX<span {...stylex.props(styles.logoMuted)}>UI</span>
          </Link>
          <nav {...stylex.props(styles.navLinks)}>
            <Link to="/docs/getting-started" {...stylex.props(styles.navLink)}>
              Docs
            </Link>
            <Link to="/docs/components/button" {...stylex.props(styles.navLink)}>
              Components
            </Link>
            <Link to="/docs/utilities" {...stylex.props(styles.navLink)}>
              Utilities
            </Link>
          </nav>
        </div>

        <div {...stylex.props(styles.navRight)}>
          <a
            href="https://github.com/Faiz-exe/rsxui"
            target="_blank"
            rel="noopener noreferrer"
            {...stylex.props(styles.ghLink)}
            aria-label="GitHub repository"
          >
            <IconGitHub />
          </a>
          <ThemeToggle />
          <Link to="/docs/getting-started" {...stylex.props(styles.ctaLink)}>
            <Button size="sm" severity="primary">
              Get started
            </Button>
          </Link>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section {...stylex.props(styles.hero)}>
        <div {...stylex.props(styles.heroBadge)}>
          <Badge variant="accent">StyleX · React 19 · TypeScript</Badge>
        </div>

        <h1 {...stylex.props(styles.title)}>
          Ship{' '}
          <span {...stylex.props(styles.titleAccent)}>beautiful UIs</span>
          <br />
          at compile-time speed
        </h1>

        <p {...stylex.props(styles.subtitle)}>
          Typed React components with atomic CSS-in-JS, semantic design tokens,
          and adaptive light/dark themes — without a runtime CSS engine.
        </p>

        <CopyableInstall />

        <div {...stylex.props(styles.ctaRow)}>
          <Link to="/docs/getting-started" {...stylex.props(styles.ctaLink)}>
            <Button severity="primary" size="lg" icon={<IconZap />}>
              Get started
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Live component showcase ────────────────────────────────────────── */}
      <div {...stylex.props(styles.showcase)}>
        <Card padding="none">
          <div {...stylex.props(styles.showcaseInner)}>
            <span {...stylex.props(styles.showcaseLabel)}>Live components</span>

            {/* Buttons row */}
            <div {...stylex.props(styles.showcaseRow)}>
              <Button severity="primary" size="sm">Primary</Button>
              <Button severity="secondary" size="sm" outlined>Secondary</Button>
              <Button severity="success" size="sm">Success</Button>
              <Button severity="danger" size="sm" outlined>Danger</Button>
              <Button severity="primary" size="sm" text>Text</Button>
              <Button severity="primary" size="sm" loading>Loading</Button>
            </div>

            <div {...stylex.props(styles.divider)} />

            {/* Badges + Switch + Spinner row */}
            <div {...stylex.props(styles.showcaseRow)}>
              <Badge variant="accent">Accent</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="neutral">Neutral</Badge>
              <Badge variant="outline">Outline</Badge>
              <Switch
                checked={switchOn}
                onChange={e => setSwitchOn(e.target.checked)}
                label="Toggle"
              />
              <Spinner size="sm" tone="accent" />
              <Spinner size="sm" tone="success" />
              <Spinner size="sm" tone="danger" />
            </div>

            <div {...stylex.props(styles.divider)} />

            {/* Typography */}
            <div {...stylex.props(styles.showcaseRow)}>
              <Text variant="subtitle" as="span">Heading</Text>
              <Text variant="body" as="span">Body text</Text>
              <Text variant="small" tone="muted" as="span">Muted small</Text>
              <Text variant="small" mono as="span">{'<Code />'}</Text>
            </div>
          </div>
        </Card>
      </div>

      {/* ── Stats ──────────────────────────────────────────────────────────── */}
      <section {...stylex.props(styles.statsSection)} aria-label="Library statistics">
        <div {...stylex.props(styles.statsGrid)}>
          {STATS.map(({ num, label }, i) => (
            <div key={label} {...stylex.props(styles.statCard, statDelays[i])}>
              <p {...stylex.props(styles.statNumber)}>{num}</p>
              <p {...stylex.props(styles.statLabel)}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────────────── */}
      <section {...stylex.props(styles.featuresSection)} aria-label="Key features">
        <span {...stylex.props(styles.sectionLabel)}>Why RSX UI</span>
        <h2 {...stylex.props(styles.sectionTitle)}>Everything you need to build fast</h2>
        <div {...stylex.props(styles.featuresGrid)}>
          {FEATURES.map(({ icon, title, body }, i) => (
            <div key={title} {...stylex.props(styles.featureCard, featureDelays[i])}>
              <div {...stylex.props(styles.featureIcon)} aria-hidden>
                {icon}
              </div>
              <h3 {...stylex.props(styles.featureTitle)}>{title}</h3>
              <p {...stylex.props(styles.featureText)}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────────────────────────── */}
      <section {...stylex.props(ctaStyles.bottomCta)} aria-label="Get started">
        <Link to="/docs/getting-started" {...stylex.props(styles.ctaLink)}>
          <Button severity="primary" size="lg" icon={<IconZap />}>
            Read the docs
          </Button>
        </Link>
        <a
          href="https://github.com/Faiz-exe/rsxui"
          target="_blank"
          rel="noopener noreferrer"
          {...stylex.props(styles.ctaLink)}
        >
          <Button severity="secondary" size="lg" outlined icon={<IconGitHub />}>
            GitHub
          </Button>
        </a>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer {...stylex.props(ctaStyles.footer)}>
        <span>© 2026 RSX UI. Built with StyleX + React.</span>
        <div {...stylex.props(ctaStyles.footerLinks)}>
          <Link to="/docs/getting-started" {...stylex.props(ctaStyles.footerLink)}>Docs</Link>
          <a
            href="https://www.npmjs.com/package/react-stylex-ui"
            target="_blank"
            rel="noopener noreferrer"
            {...stylex.props(ctaStyles.footerLink)}
          >
            npm
          </a>
          <a
            href="https://github.com/Faiz-exe/rsxui"
            target="_blank"
            rel="noopener noreferrer"
            {...stylex.props(ctaStyles.footerLink)}
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  )
}
