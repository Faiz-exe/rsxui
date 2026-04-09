import * as stylex from '@stylexjs/stylex'
import { colors, fonts, radii, space } from '../lib/theme/tokens.stylex'

const HEADER_H = '60px'

export const styles = stylex.create({
  shell: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    boxSizing: 'border-box',
    backgroundColor: colors.bg,
    color: colors.fg,
  },

  /* ── Header ── */
  header: {
    flexShrink: 0,
    position: 'sticky' as const,
    top: 0,
    zIndex: 50,
    height: HEADER_H,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.lg,
    paddingInline: `clamp(${space.lg}, 4vw, 28px)`,
    backgroundColor: colors.bg,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },

  brandRow: {
    display: 'flex',
    alignItems: 'center',
    gap: space.md,
    minWidth: 0,
    textDecoration: 'none',
  },

  logoMark: {
    flexShrink: 0,
    width: '30px',
    height: '30px',
    borderRadius: radii.sm,
    backgroundColor: colors.accent,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: fonts.sans,
    fontSize: '0.8125rem',
    fontWeight: 800,
    letterSpacing: '-0.05em',
    color: colors.accentFg,
    transitionProperty: 'opacity',
    transitionDuration: '0.12s',
    ':hover': { opacity: 0.85 },
  },

  brandBlock: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1px',
    minWidth: 0,
  },

  brand: {
    fontFamily: fonts.sans,
    fontSize: '0.9375rem',
    fontWeight: 700,
    letterSpacing: '-0.03em',
    color: colors.fg,
    textDecoration: 'none',
    lineHeight: 1.2,
  },

  brandSub: {
    fontFamily: fonts.sans,
    fontSize: '0.5625rem',
    fontWeight: 600,
    color: colors.fgSubtle,
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
  },

  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    flexShrink: 0,
  },

  headerDivider: {
    width: 1,
    height: '20px',
    backgroundColor: colors.border,
    marginInline: '4px',
  },

  headerLink: {
    fontFamily: fonts.sans,
    fontSize: '0.8125rem',
    fontWeight: 500,
    color: colors.fgMuted,
    textDecoration: 'none',
    paddingBlock: '6px',
    paddingInline: space.sm,
    borderRadius: radii.sm,
    transitionProperty: 'color, background-color',
    transitionDuration: '0.12s',
    ':hover': {
      color: colors.fg,
      backgroundColor: colors.bgSubtle,
    },
  },

  iconBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: 'transparent',
    color: colors.fgMuted,
    cursor: 'pointer',
    textDecoration: 'none',
    transitionProperty: 'color, background-color, border-color',
    transitionDuration: '0.12s',
    ':hover': {
      color: colors.fg,
      backgroundColor: colors.bgSubtle,
      borderColor: colors.borderStrong,
    },
  },

  /* ── Body layout ── */
  body: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr)',
    minHeight: 0,
    '@media (min-width: 900px)': {
      gridTemplateColumns: '256px minmax(0, 1fr)',
    },
  },

  /* ── Sidebar ── */
  sidebar: {
    paddingTop: space.lg,
    paddingBottom: '40px',
    paddingInline: space.md,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
    backgroundColor: colors.bg,
    boxSizing: 'border-box',
    '@media (min-width: 900px)': {
      borderBottomWidth: 0,
      borderRightWidth: 1,
      borderRightStyle: 'solid',
      borderRightColor: colors.border,
      position: 'sticky' as const,
      top: HEADER_H,
      alignSelf: 'start',
      height: `calc(100vh - ${HEADER_H})`,
      overflowY: 'auto' as const,
    },
  },

  sidebarVersion: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontFamily: fonts.sans,
    fontSize: '0.6875rem',
    fontWeight: 600,
    color: colors.fgSubtle,
    backgroundColor: colors.bgSubtle,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.full,
    paddingBlock: '3px',
    paddingInline: space.sm,
    marginBottom: space.lg,
  },

  navLabel: {
    fontFamily: fonts.sans,
    fontSize: '0.625rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: colors.fgSubtle,
    marginBottom: '4px',
    marginTop: space.xl,
    paddingInline: space.sm,
  },

  navLabelFirst: {
    marginTop: 0,
  },

  navLink: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: fonts.sans,
    fontSize: '0.8125rem',
    fontWeight: 400,
    color: colors.fgMuted,
    textDecoration: 'none',
    paddingBlock: '6px',
    paddingInline: space.sm,
    borderRadius: radii.sm,
    marginBottom: '1px',
    transitionProperty: 'color, background-color',
    transitionDuration: '0.12s',
    ':hover': {
      color: colors.fg,
      backgroundColor: colors.bgSubtle,
    },
  },

  navLinkActive: {
    color: colors.accent,
    fontWeight: 600,
    backgroundColor: colors.accentMuted,
    ':hover': {
      color: colors.accent,
      backgroundColor: colors.accentMuted,
    },
  },

  /* ── Main content ── */
  main: {
    minWidth: 0,
    overflowX: 'hidden' as const,
    backgroundColor: colors.bgSubtle,
    boxSizing: 'border-box',
  },

  mainInner: {
    maxWidth: 'min(54rem, 100%)',
    marginInline: 'auto',
    paddingBlock: `clamp(${space['2xl']}, 4vw, 48px)`,
    paddingInline: `clamp(${space.lg}, 4vw, ${space['2xl']})`,
    boxSizing: 'border-box',
  },
})
