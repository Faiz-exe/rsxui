import * as stylex from '@stylexjs/stylex'
import { colors, radii, space } from '../../lib/theme/tokens.stylex'

export const styles = stylex.create({
  wrap: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: space.lg,
    width: '100%',
    minWidth: 0,
  },
  nav: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    gap: space.xs,
    padding: space.sm,
    borderRadius: radii.md,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: colors.bgElevated,
    boxSizing: 'border-box',
  },
  navLink: {
    paddingBlock: 6,
    paddingInline: 10,
    borderRadius: radii.sm,
    fontFamily: 'inherit',
    fontSize: '0.8125rem',
    fontWeight: 500,
    color: colors.fgMuted,
    textDecoration: 'none',
    whiteSpace: 'nowrap' as const,
    transitionProperty: 'color, background-color',
    transitionDuration: '0.12s',
    ':hover': {
      color: colors.fg,
      backgroundColor: colors.neutralMuted,
    },
  },
  navLinkActive: {
    color: colors.fg,
    backgroundColor: colors.bg,
    boxShadow: `0 0 0 1px ${colors.border}`,
  },
})
