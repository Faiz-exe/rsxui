import * as stylex from '@stylexjs/stylex'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { ThemeToggle } from '../lib'
import { styles } from './DocsLayout.stylex'

function NavItem({
  to,
  end,
  children,
}: {
  to: string
  end?: boolean
  children: React.ReactNode
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        stylex.props(styles.navLink, isActive && styles.navLinkActive).className ??
        ''
      }
    >
      {children}
    </NavLink>
  )
}

export function DocsLayout() {
  return (
    <div {...stylex.props(styles.shell)}>
      <header {...stylex.props(styles.header)}>
        <div {...stylex.props(styles.brandRow)}>
          <Link to="/" {...stylex.props(styles.logoMark)} aria-label="RSX UI home">
            R
          </Link>
          <div {...stylex.props(styles.brandBlock)}>
            <Link to="/" {...stylex.props(styles.brand)}>
              RSX UI
            </Link>
            <span {...stylex.props(styles.brandSub)}>Documentation</span>
          </div>
        </div>
        <div {...stylex.props(styles.headerActions)}>
          <Link to="/" {...stylex.props(styles.headerLink)}>
            Intro
          </Link>
          <Link to="/demo" {...stylex.props(styles.headerLink)}>
            Playground
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div {...stylex.props(styles.body)}>
        <aside {...stylex.props(styles.sidebar)}>
          <div {...stylex.props(styles.navLabel, styles.navLabelFirst)}>
            Getting started
          </div>
          <NavItem to="/docs/getting-started">Quick start</NavItem>
          <NavItem to="/docs" end>
            Overview
          </NavItem>

          <div {...stylex.props(styles.navLabel)}>Theming</div>
          <NavItem to="/docs/theme">Theme &amp; tokens</NavItem>
          <NavItem to="/docs/utilities">Utilities</NavItem>

          <div {...stylex.props(styles.navLabel)}>Inputs</div>
          <NavItem to="/docs/components/input-text">InputText</NavItem>
          <NavItem to="/docs/components/input-text-with-icon">Input text with icon</NavItem>
          <NavItem to="/docs/components/input-number">InputNumber</NavItem>

          <div {...stylex.props(styles.navLabel)}>Components</div>
          <NavItem to="/docs/components/button">Button</NavItem>
          <NavItem to="/docs/components/checkbox">Checkbox</NavItem>
          <NavItem to="/docs/components/switch">Switch</NavItem>
          <NavItem to="/docs/components/radio">Radio</NavItem>
          <NavItem to="/docs/components/select">Select</NavItem>
          <NavItem to="/docs/components/multi-select">MultiSelect</NavItem>
          <NavItem to="/docs/components/autocomplete">Autocomplete</NavItem>
          <NavItem to="/docs/components/toggle-button">ToggleButton</NavItem>
          <NavItem to="/docs/components/split-button">SplitButton</NavItem>
          <NavItem to="/docs/components/table">Table</NavItem>
          <NavItem to="/docs/components/toast">Toast</NavItem>
          <NavItem to="/docs/components/dialog">Dialog</NavItem>
          <NavItem to="/docs/components/accordion">Accordion</NavItem>
          <NavItem to="/docs/components/tabs">Tabs</NavItem>
          <NavItem to="/docs/components/label">Label</NavItem>
          <NavItem to="/docs/components/card">Card</NavItem>
          <NavItem to="/docs/components/badge">Badge</NavItem>
          <NavItem to="/docs/components/stack">Stack</NavItem>
          <NavItem to="/docs/components/text">Text</NavItem>
          <NavItem to="/docs/components/theme-toggle">ThemeToggle</NavItem>
        </aside>

        <main {...stylex.props(styles.main)}>
          <div {...stylex.props(styles.mainInner)}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
