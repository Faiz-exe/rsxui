import * as stylex from '@stylexjs/stylex'
import { NavLink, Outlet } from 'react-router-dom'
import { utilityNavItems } from './utilitiesNav'
import { styles } from './UtilitiesSubLayout.stylex'

const base = '/docs/utilities'

export function UtilitiesSubLayout() {
  return (
    <div {...stylex.props(styles.wrap)}>
      <nav aria-label="Utilities sections" {...stylex.props(styles.nav)}>
        {utilityNavItems.map(({ path, label, end }) => {
          const to = path === '' ? base : `${base}/${path}`
          return (
            <NavLink
              key={to}
              to={to}
              end={end ?? false}
              className={({ isActive }) =>
                stylex.props(styles.navLink, isActive && styles.navLinkActive).className ?? ''
              }
            >
              {label}
            </NavLink>
          )
        })}
      </nav>
      <Outlet />
    </div>
  )
}
