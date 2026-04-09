import * as stylex from '@stylexjs/stylex'
import { Link } from 'react-router-dom'
import { Text, ThemeToggle } from '../lib'
import { styles } from './IntroPage.stylex'

const PILL_COPY = ['Compile-time CSS', 'Token themes', 'Light & dark'] as const

const featureAnim = [styles.feature0, styles.feature1, styles.feature2] as const

export default function IntroPage() {
  return (
    <div {...stylex.props(styles.page)}>
      <div {...stylex.props(styles.glow)} aria-hidden />

      <header {...stylex.props(styles.nav)}>
        <Link to="/" {...stylex.props(styles.logo)}>
          RSX<span {...stylex.props(styles.logoMuted)}>UI</span>
        </Link>
        <div {...stylex.props(styles.navLinks)}>
          <Link
            to="/docs/getting-started"
            {...stylex.props(styles.navLink, styles.navLinkAccent)}
          >
            Documentation
          </Link>
          <Link to="/demo" {...stylex.props(styles.navLink)}>
            Playground
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <section {...stylex.props(styles.hero)}>
        <p {...stylex.props(styles.kicker)}>StyleX · React 19</p>
        <h1 {...stylex.props(styles.title)}>Components that stay fast at scale</h1>
        <p {...stylex.props(styles.subtitle)}>
          Typed primitives with compile-time styles, semantic tokens, and light or
          dark themes—without shipping a runtime CSS-in-JS engine.
        </p>

        <div {...stylex.props(styles.pillRow)} aria-hidden>
          {PILL_COPY.map((label, i) => (
            <span
              key={label}
              {...stylex.props(
                styles.pill,
                i === 1 ? styles.pillDelay1 : null,
                i === 2 ? styles.pillDelay2 : null,
              )}
            >
              {label}
            </span>
          ))}
        </div>

        <div {...stylex.props(styles.ctaRow)}>
          <Link to="/docs/getting-started" {...stylex.props(styles.ctaPrimary)}>
            Get started
          </Link>
          <Link to="/demo" {...stylex.props(styles.ctaSecondary)}>
            Playground
          </Link>
        </div>
      </section>

      <section {...stylex.props(styles.features)} aria-label="Highlights">
        <div {...stylex.props(styles.feature, featureAnim[0])}>
          <h2 {...stylex.props(styles.featureTitle)}>Compile-time CSS</h2>
          <p {...stylex.props(styles.featureText)}>
            StyleX emits static classes. No style injection in production when
            configured with <code>runtimeInjection: false</code>.
          </p>
        </div>
        <div {...stylex.props(styles.feature, featureAnim[1])}>
          <h2 {...stylex.props(styles.featureTitle)}>Token-driven themes</h2>
          <p {...stylex.props(styles.featureText)}>
            <code>defineVars</code> plus <code>createTheme</code> swap palettes for a
            subtree—brand overrides plug in through the provider.
          </p>
        </div>
        <div {...stylex.props(styles.feature, featureAnim[2])}>
          <h2 {...stylex.props(styles.featureTitle)}>Composable API</h2>
          <p {...stylex.props(styles.featureText)}>
            Components forward refs, merge host <code>className</code> /{' '}
            <code>style</code> safely, and expose predictable variant props.
          </p>
        </div>
      </section>

      <footer {...stylex.props(styles.footer)}>
        <Text variant="small" tone="muted" as="p" style={{ margin: 0 }}>
          Built for documentation and playground in this repo—publish as a package
          when you are ready.
        </Text>
      </footer>
    </div>
  )
}
