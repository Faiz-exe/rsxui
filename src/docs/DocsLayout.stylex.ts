import * as stylex from '@stylexjs/stylex'
import { colors, fonts, radii, space } from '../lib/theme/tokens.stylex'

const HEADER_H = '60px'
const SIDEBAR_W = '256px'

const fadeIn = stylex.keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

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
    gap: space.md,
    paddingInline: `clamp(${space.sm}, 3vw, 28px)`,
    backgroundColor: colors.bg,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },

  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: space.sm,
    minWidth: 0,
    overflow: 'hidden' as const,
  },

  menuBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: radii.sm,
    borderWidth: 0,
    backgroundColor: 'transparent',
    color: colors.fgMuted,
    cursor: 'pointer',
    transitionProperty: 'color, background-color',
    transitionDuration: '0.12s',
    ':hover': {
      color: colors.fg,
      backgroundColor: colors.bgSubtle,
    },
    '@media (min-width: 900px)': {
      display: 'none',
    },
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
    '@media (max-width: 420px)': {
      display: 'none',
    },
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
    gap: '6px',
    flexShrink: 0,
    '@media (max-width: 480px)': {
      gap: '4px',
    },
  },

  headerDivider: {
    width: 1,
    height: '20px',
    backgroundColor: colors.border,
    marginInline: '4px',
    '@media (max-width: 640px)': {
      display: 'none',
    },
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
    '@media (max-width: 640px)': {
      display: 'none',
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
    '@media (max-width: 480px)': {
      display: 'none',
    },
  },

  searchBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: space.sm,
    height: '34px',
    minWidth: '200px',
    paddingInline: '12px',
    borderRadius: radii.full,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: colors.bgSubtle,
    color: colors.fgMuted,
    cursor: 'pointer',
    fontFamily: fonts.sans,
    fontSize: '0.8125rem',
    fontWeight: 400,
    transitionProperty: 'border-color, box-shadow',
    transitionDuration: '0.15s',
    ':hover': {
      borderColor: colors.borderStrong,
      boxShadow: `0 0 0 3px ${colors.accentMuted}`,
    },
    '@media (max-width: 640px)': {
      minWidth: '34px',
      paddingInline: '0px',
      justifyContent: 'center',
    },
  },

  searchBtnLabel: {
    flex: 1,
    fontFamily: fonts.sans,
    fontSize: '0.8125rem',
    fontWeight: 400,
    color: colors.fgSubtle,
    textAlign: 'left' as const,
    '@media (max-width: 640px)': {
      display: 'none',
    },
  },

  searchKbd: {
    fontFamily: fonts.mono,
    fontSize: '0.5625rem',
    fontWeight: 600,
    color: colors.fgSubtle,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.sm,
    paddingBlock: '2px',
    paddingInline: '5px',
    lineHeight: 1.3,
    letterSpacing: '0.02em',
    '@media (max-width: 640px)': {
      display: 'none',
    },
  },

  /* ── Drawer backdrop (mobile only) ── */
  drawerBackdrop: {
    display: 'none',
    '@media (max-width: 899px)': {
      display: 'block',
      position: 'fixed' as const,
      inset: 0,
      top: HEADER_H,
      zIndex: 39,
      backgroundColor: colors.overlay,
      animationName: fadeIn,
      animationDuration: '0.2s',
      animationFillMode: 'forwards',
    },
  },

  /* ── Body layout ── */
  body: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr)',
    minHeight: 0,
    '@media (min-width: 900px)': {
      gridTemplateColumns: `${SIDEBAR_W} minmax(0, 1fr)`,
    },
  },

  /* ── Sidebar ── */
  sidebar: {
    paddingTop: space.lg,
    paddingBottom: '40px',
    paddingInline: space.md,
    backgroundColor: colors.bg,
    boxSizing: 'border-box',
    '@media (max-width: 899px)': {
      position: 'fixed' as const,
      top: HEADER_H,
      left: 0,
      bottom: 0,
      width: SIDEBAR_W,
      maxWidth: '85vw',
      zIndex: 40,
      overflowY: 'auto' as const,
      transform: 'translateX(-100%)',
      transitionProperty: 'transform',
      transitionDuration: '0.25s',
      transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      borderRightWidth: 1,
      borderRightStyle: 'solid',
      borderRightColor: colors.border,
      boxShadow: '4px 0 16px rgba(0,0,0,0.08)',
    },
    '@media (min-width: 900px)': {
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

  sidebarOpen: {
    '@media (max-width: 899px)': {
      transform: 'translateX(0)',
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
