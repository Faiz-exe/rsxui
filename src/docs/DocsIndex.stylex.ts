import * as stylex from '@stylexjs/stylex'
import { colors, elevation, fonts, radii, space } from '../lib/theme/tokens.stylex'

export const indexStyles = stylex.create({
  /* ── Hero ── */
  hero: {
    paddingBottom: space['2xl'],
    marginBottom: space['2xl'],
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },

  heroEyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: fonts.sans,
    fontSize: '0.75rem',
    fontWeight: 600,
    color: colors.accent,
    backgroundColor: colors.accentMuted,
    paddingBlock: '4px',
    paddingInline: space.sm,
    borderRadius: radii.full,
    marginBottom: space.md,
    letterSpacing: '0.02em',
  },

  heroTitle: {
    fontFamily: fonts.sans,
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 800,
    letterSpacing: '-0.04em',
    lineHeight: 1.1,
    color: colors.fg,
    marginTop: 0,
    marginBottom: space.md,
  },

  heroLead: {
    fontFamily: fonts.sans,
    fontSize: '1.0625rem',
    lineHeight: 1.7,
    color: colors.fgMuted,
    maxWidth: '36rem',
    marginTop: 0,
    marginBottom: space.xl,
  },

  heroCta: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: space.sm,
    alignItems: 'center',
  },

  ctaPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: fonts.sans,
    fontSize: '0.875rem',
    fontWeight: 600,
    color: colors.accentFg,
    backgroundColor: colors.accent,
    paddingBlock: '9px',
    paddingInline: space.lg,
    borderRadius: radii.md,
    textDecoration: 'none',
    transitionProperty: 'opacity, transform',
    transitionDuration: '0.14s',
    ':hover': { opacity: 0.88 },
  },

  ctaSecondary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: fonts.sans,
    fontSize: '0.875rem',
    fontWeight: 500,
    color: colors.fgMuted,
    backgroundColor: 'transparent',
    paddingBlock: '9px',
    paddingInline: space.lg,
    borderRadius: radii.md,
    textDecoration: 'none',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    transitionProperty: 'color, background-color, border-color',
    transitionDuration: '0.14s',
    ':hover': {
      color: colors.fg,
      backgroundColor: colors.bgSubtle,
      borderColor: colors.borderStrong,
    },
  },

  installSnippet: {
    display: 'flex',
    alignItems: 'center',
    gap: space.sm,
    fontFamily: fonts.mono,
    fontSize: '0.8125rem',
    color: colors.fgMuted,
    backgroundColor: colors.bgSubtle,
    paddingBlock: '8px',
    paddingInline: space.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    marginTop: space.lg,
    maxWidth: 'max-content',
    userSelect: 'all' as const,
    letterSpacing: '-0.01em',
  },

  installPrompt: {
    color: colors.fgSubtle,
    userSelect: 'none' as const,
  },

  /* ── Stats strip ── */
  stats: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: space.lg,
    marginBottom: space['2xl'],
    paddingBottom: space['2xl'],
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },

  stat: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2px',
  },

  statValue: {
    fontFamily: fonts.sans,
    fontSize: '1.5rem',
    fontWeight: 800,
    letterSpacing: '-0.04em',
    color: colors.fg,
    lineHeight: 1.1,
  },

  statLabel: {
    fontFamily: fonts.sans,
    fontSize: '0.75rem',
    fontWeight: 500,
    color: colors.fgSubtle,
    letterSpacing: '0.02em',
  },

  statDivider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.border,
    marginInline: '4px',
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },

  /* ── Sections ── */
  section: {
    marginBottom: space['2xl'],
  },

  sectionLabel: {
    fontFamily: fonts.sans,
    fontSize: '0.6875rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: colors.fgSubtle,
    marginBottom: space.md,
    marginTop: 0,
    display: 'flex',
    alignItems: 'center',
    gap: space.sm,
  },

  sectionCount: {
    fontFamily: fonts.sans,
    fontSize: '0.625rem',
    fontWeight: 700,
    color: colors.accentFg,
    backgroundColor: colors.accent,
    paddingBlock: '2px',
    paddingInline: '6px',
    borderRadius: radii.full,
    letterSpacing: '0.02em',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: space.md,
  },

  cardLink: {
    display: 'block',
    textDecoration: 'none',
    color: 'inherit',
    borderRadius: radii.md,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: colors.bg,
    padding: space.lg,
    boxSizing: 'border-box',
    transitionProperty: 'border-color, box-shadow, transform',
    transitionDuration: '0.16s',
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
    ':hover': {
      borderColor: colors.accent,
      boxShadow: elevation.cardHover,
      transform: 'translateY(-2px)',
    },
    '@media (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
      ':hover': {
        transform: 'none',
      },
    },
  },

  cardTitle: {
    fontFamily: fonts.sans,
    fontSize: '0.9375rem',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    color: colors.fg,
    marginTop: 0,
    marginBottom: '4px',
  },

  cardDesc: {
    fontFamily: fonts.sans,
    fontSize: '0.8125rem',
    lineHeight: 1.55,
    color: colors.fgSubtle,
    margin: 0,
  },
})
