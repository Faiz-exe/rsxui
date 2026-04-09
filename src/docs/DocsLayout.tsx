import * as stylex from '@stylexjs/stylex'
import { useCallback, useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ThemeToggle } from '../lib'
import { styles } from './DocsLayout.stylex'
import { SearchDialog } from './ui/SearchDialog'

function NavItem({
  to,
  end,
  children,
  onClick,
}: {
  to: string
  end?: boolean
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        stylex.props(styles.navLink, isActive && styles.navLinkActive).className ?? ''
      }
    >
      {children}
    </NavLink>
  )
}

function IconMenu() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}

function IconGitHub() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function IconSearch() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth={2} />
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}

export function DocsLayout() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const openSearch = useCallback(() => setSearchOpen(true), [])
  const closeSearch = useCallback(() => setSearchOpen(false), [])
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])
  const toggleDrawer = useCallback(() => setDrawerOpen((v) => !v), [])

  const location = useLocation()
  useEffect(() => { setDrawerOpen(false) }, [location.pathname])

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [drawerOpen])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((v) => !v)
      }
      if (e.key === 'Escape' && drawerOpen) {
        setDrawerOpen(false)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [drawerOpen])

  return (
    <div {...stylex.props(styles.shell)}>
      <SearchDialog open={searchOpen} onClose={closeSearch} />
      <header {...stylex.props(styles.header)}>
        <div {...stylex.props(styles.headerLeft)}>
          <button
            type="button"
            aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
            onClick={toggleDrawer}
            {...stylex.props(styles.menuBtn)}
          >
            {drawerOpen ? <IconClose /> : <IconMenu />}
          </button>
          <Link to="/" aria-label="RSX UI home" {...stylex.props(styles.brandRow)}>
            <div {...stylex.props(styles.logoMark)} aria-hidden>
              R
            </div>
            <div {...stylex.props(styles.brandBlock)}>
              <span {...stylex.props(styles.brand)}>RSX UI</span>
              <span {...stylex.props(styles.brandSub)}>Documentation</span>
            </div>
          </Link>
        </div>

        <div {...stylex.props(styles.headerActions)}>
          <Link to="/" {...stylex.props(styles.headerLink)}>
            Home
          </Link>
          <div {...stylex.props(styles.headerDivider)} aria-hidden />
          <a
            href="https://www.npmjs.com/package/react-stylex-ui"
            target="_blank"
            rel="noreferrer"
            aria-label="npm"
            {...stylex.props(styles.headerLink)}
          >
            npm
          </a>
          <a
            href="https://github.com/Faiz-exe/rsxui"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            {...stylex.props(styles.iconBtn)}
          >
            <IconGitHub />
          </a>
          <button
            type="button"
            aria-label="Search docs"
            onClick={openSearch}
            {...stylex.props(styles.searchBtn)}
          >
            <IconSearch />
            <span {...stylex.props(styles.searchBtnLabel)}>Search…</span>
            <kbd {...stylex.props(styles.searchKbd)}>⌘K</kbd>
          </button>
          <ThemeToggle />
        </div>
      </header>

      {/* Mobile drawer backdrop */}
      {drawerOpen && (
        <div
          {...stylex.props(styles.drawerBackdrop)}
          onClick={closeDrawer}
          aria-hidden
        />
      )}

      <div {...stylex.props(styles.body)}>
        <aside {...stylex.props(styles.sidebar, drawerOpen && styles.sidebarOpen)}>
          <div {...stylex.props(styles.sidebarVersion)}>
            <span>v1.0</span>
          </div>

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
          <NavItem to="/docs/components/input-text-with-icon">Input with icon</NavItem>
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
          <NavItem to="/docs/components/spinner">Spinner</NavItem>
          <NavItem to="/docs/components/alert">Alert</NavItem>
          <NavItem to="/docs/components/progress">Progress</NavItem>
          <NavItem to="/docs/components/tooltip">Tooltip</NavItem>

          <div {...stylex.props(styles.navLabel)}>Display</div>
          <NavItem to="/docs/components/label">Label</NavItem>
          <NavItem to="/docs/components/badge">Badge</NavItem>
          <NavItem to="/docs/components/avatar">Avatar</NavItem>
          <NavItem to="/docs/components/card">Card</NavItem>
          <NavItem to="/docs/components/divider">Divider</NavItem>
          <NavItem to="/docs/components/skeleton">Skeleton</NavItem>
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
