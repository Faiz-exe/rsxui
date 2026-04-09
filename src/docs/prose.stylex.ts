import * as stylex from '@stylexjs/stylex'
import { colors, fonts, radii, space } from '../lib/theme/tokens.stylex'

export const prose = stylex.create({
  article: {
    maxWidth: '100%',
    marginInline: 0,
    paddingInline: 0,
    paddingBlock: 0,
    boxSizing: 'border-box',
  },

  /* ── Headings ── */
  h1: {
    fontFamily: fonts.sans,
    fontSize: 'clamp(1.875rem, 4.5vw, 2.5rem)',
    fontWeight: 800,
    letterSpacing: '-0.04em',
    lineHeight: 1.1,
    marginTop: 0,
    marginBottom: space.md,
    color: colors.fg,
  },

  h1Desc: {
    fontFamily: fonts.sans,
    fontSize: '1.0625rem',
    fontWeight: 400,
    lineHeight: 1.65,
    color: colors.fgMuted,
    marginTop: 0,
    marginBottom: space.xl,
    paddingBottom: space.xl,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },

  h2: {
    fontFamily: fonts.sans,
    fontSize: '1.25rem',
    fontWeight: 700,
    letterSpacing: '-0.025em',
    lineHeight: 1.3,
    color: colors.fg,
    marginTop: '2.5rem',
    marginBottom: space.md,
    paddingBottom: space.sm,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },

  h2First: {
    marginTop: space.lg,
  },

  h3: {
    fontFamily: fonts.sans,
    fontSize: '1.0625rem',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    color: colors.fg,
    marginTop: space.xl,
    marginBottom: space.sm,
  },

  p: {
    fontFamily: fonts.sans,
    fontSize: '0.9375rem',
    lineHeight: 1.75,
    color: colors.fgMuted,
    marginTop: 0,
    marginBottom: space.md,
  },

  ul: {
    fontFamily: fonts.sans,
    fontSize: '0.9375rem',
    lineHeight: 1.7,
    color: colors.fgMuted,
    marginTop: 0,
    marginBottom: space.md,
    paddingInlineStart: space.xl,
  },

  li: {
    marginBottom: '6px',
  },

  inlineCode: {
    fontFamily: fonts.mono,
    fontSize: '0.82em',
    fontWeight: 500,
    paddingInline: '6px',
    paddingBlock: '2px',
    borderRadius: radii.sm,
    backgroundColor: colors.bgSubtle,
    color: colors.fg,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
  },

  lead: {
    fontFamily: fonts.sans,
    fontSize: '1rem',
    lineHeight: 1.7,
    color: colors.fgMuted,
    marginBottom: space.xl,
    paddingBlock: space.md,
    paddingInline: space.lg,
    borderRadius: radii.md,
    backgroundColor: colors.bgSubtle,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderLeftWidth: '3px',
    borderLeftColor: colors.accent,
  },

  link: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 500,
    color: colors.accent,
    textDecoration: 'underline',
    textDecorationColor: colors.accentMuted,
    textUnderlineOffset: '3px',
    transitionProperty: 'color, text-decoration-color',
    transitionDuration: '0.12s',
    ':hover': {
      color: colors.fg,
      textDecorationColor: colors.fg,
    },
  },

  /* ── Callout variants ── */
  callout: {
    display: 'flex',
    gap: space.md,
    padding: space.lg,
    borderRadius: radii.md,
    borderWidth: 1,
    borderStyle: 'solid',
    marginBottom: space.lg,
    boxSizing: 'border-box',
    fontSize: '0.9375rem',
    lineHeight: 1.65,
    fontFamily: fonts.sans,
  },

  calloutNote: {
    backgroundColor: colors.infoMuted,
    borderColor: colors.info,
    color: colors.fg,
  },

  calloutTip: {
    backgroundColor: colors.successMuted,
    borderColor: colors.success,
    color: colors.fg,
  },

  calloutWarning: {
    backgroundColor: colors.warningMuted,
    borderColor: colors.warning,
    color: colors.fg,
  },

  calloutDanger: {
    backgroundColor: colors.dangerMuted,
    borderColor: colors.danger,
    color: colors.fg,
  },

  calloutIcon: {
    flexShrink: 0,
    fontSize: '1.125rem',
    lineHeight: 1.65,
  },

  calloutBody: {
    flex: 1,
    minWidth: 0,
  },

  calloutTitle: {
    fontWeight: 700,
    marginBottom: '4px',
    display: 'block',
  },
})
