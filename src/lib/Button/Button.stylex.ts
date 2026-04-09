import * as stylex from '@stylexjs/stylex'
import { colors, elevation, fonts, radii, space } from '../theme/tokens.stylex'

const spin = stylex.keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
})

export const styles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.sm,
    fontFamily: fonts.sans,
    fontWeight: 600,
    lineHeight: 1.2,
    borderStyle: 'solid',
    borderWidth: 1,
    cursor: 'pointer',
    textDecoration: 'none',
    /** Faster taps on touch; avoids double-tap-to-zoom wait. */
    touchAction: 'manipulation',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    transitionProperty:
      'background-color, border-color, color, box-shadow, transform, filter, opacity',
    transitionDuration: '0.12s',
    transitionTimingFunction: 'ease',
    outlineStyle: 'none',
    ':focus-visible': {
      boxShadow: `0 0 0 3px ${colors.focusRing}`,
    },
    /** Press feedback: transform is compositor-friendly (no layout). */
    ':active': {
      transform: 'scale(0.97)',
    },
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
      transform: 'none',
    },
    '@media (prefers-reduced-motion: reduce)': {
      ':active': {
        transform: 'none',
      },
    },
  },
  sm: {
    fontSize: '0.8125rem',
    paddingInline: space.md,
    paddingBlock: space.sm,
    borderRadius: radii.sm,
    minHeight: '32px',
  },
  md: {
    fontSize: '0.9375rem',
    paddingInline: space.lg,
    paddingBlock: space.md,
    borderRadius: radii.md,
    minHeight: '40px',
  },
  lg: {
    fontSize: '1.0625rem',
    paddingInline: space.xl,
    paddingBlock: space.md,
    borderRadius: radii.lg,
    minHeight: '48px',
  },
  rounded: {
    borderRadius: radii.full,
  },
  raised: {
    boxShadow: elevation.card,
    ':hover': {
      boxShadow: elevation.cardHover,
    },
    ':disabled': {
      boxShadow: elevation.card,
    },
  },
  loading: {
    cursor: 'wait',
    position: 'relative',
  },
  iconOnly: {
    paddingInline: space.md,
    minWidth: 'unset',
    aspectRatio: '1',
  },
  iconOnlySm: {
    paddingInline: space.sm,
  },
  iconOnlyLg: {
    paddingInline: space.lg,
  },
  spinner: {
    display: 'inline-block',
    width: '1em',
    height: '1em',
    border: '2px solid currentColor',
    borderRightColor: 'transparent',
    borderRadius: '50%',
    animationName: spin,
    animationDuration: '0.6s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
    flexShrink: 0,
  },
  fullWidth: {
    width: '100%',
  },
  linkUnderline: {
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  },

  solidPrimary: {
    color: colors.accentFg,
    backgroundColor: colors.accent,
    borderColor: colors.accent,
    ':hover': { filter: 'brightness(0.94)' },
  },
  solidSecondary: {
    color: colors.fg,
    backgroundColor: colors.bg,
    borderColor: colors.border,
    ':hover': { backgroundColor: colors.bgSubtle },
    ':active': { backgroundColor: colors.bgElevated },
  },
  solidSuccess: {
    color: colors.successFg,
    backgroundColor: colors.success,
    borderColor: colors.success,
    ':hover': { filter: 'brightness(0.94)' },
  },
  solidDanger: {
    color: colors.dangerFg,
    backgroundColor: colors.danger,
    borderColor: colors.danger,
    ':hover': { filter: 'brightness(0.94)' },
  },
  solidInfo: {
    color: colors.infoFg,
    backgroundColor: colors.info,
    borderColor: colors.info,
    ':hover': { filter: 'brightness(0.94)' },
  },
  solidWarning: {
    color: colors.warningFg,
    backgroundColor: colors.warning,
    borderColor: colors.warning,
    ':hover': { filter: 'brightness(0.94)' },
  },
  solidHelp: {
    color: colors.helpFg,
    backgroundColor: colors.help,
    borderColor: colors.help,
    ':hover': { filter: 'brightness(0.94)' },
  },

  outlinedPrimary: {
    color: colors.accent,
    backgroundColor: 'transparent',
    borderColor: colors.accent,
    ':hover': { backgroundColor: colors.accentMuted },
  },
  outlinedSecondary: {
    color: colors.fg,
    backgroundColor: 'transparent',
    borderColor: colors.border,
    ':hover': { backgroundColor: colors.neutralMuted },
  },
  outlinedSuccess: {
    color: colors.success,
    backgroundColor: 'transparent',
    borderColor: colors.success,
    ':hover': { backgroundColor: colors.successMuted },
  },
  outlinedDanger: {
    color: colors.danger,
    backgroundColor: 'transparent',
    borderColor: colors.danger,
    ':hover': { backgroundColor: colors.dangerMuted },
  },
  outlinedInfo: {
    color: colors.info,
    backgroundColor: 'transparent',
    borderColor: colors.info,
    ':hover': { backgroundColor: colors.infoMuted },
  },
  outlinedWarning: {
    color: colors.warning,
    backgroundColor: 'transparent',
    borderColor: colors.warning,
    ':hover': { backgroundColor: colors.warningMuted },
  },
  outlinedHelp: {
    color: colors.help,
    backgroundColor: 'transparent',
    borderColor: colors.help,
    ':hover': { backgroundColor: colors.helpMuted },
  },

  textPrimary: {
    color: colors.accent,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    ':hover': { backgroundColor: colors.accentMuted },
  },
  textSecondary: {
    color: colors.fg,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    ':hover': { backgroundColor: colors.neutralMuted },
  },
  textSuccess: {
    color: colors.success,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    ':hover': { backgroundColor: colors.successMuted },
  },
  textDanger: {
    color: colors.danger,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    ':hover': { backgroundColor: colors.dangerMuted },
  },
  textInfo: {
    color: colors.info,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    ':hover': { backgroundColor: colors.infoMuted },
  },
  textWarning: {
    color: colors.warning,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    ':hover': { backgroundColor: colors.warningMuted },
  },
  textHelp: {
    color: colors.help,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    ':hover': { backgroundColor: colors.helpMuted },
  },
})
