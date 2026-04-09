import * as stylex from '@stylexjs/stylex'
import { colors, elevation, fonts, radii, space } from '../theme/tokens.stylex'

export const styles = stylex.create({
  group: {
    display: 'inline-flex',
    flexWrap: 'wrap' as const,
    gap: space.xs,
    alignItems: 'center',
  },
  base: {
    display:  'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: space.sm,
    fontFamily: fonts.sans,
    fontWeight: 600,
    lineHeight: 1.2,
    borderStyle: 'solid',
    borderWidth: 1,
    cursor: 'pointer',
    touchAction: 'manipulation',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    transitionProperty:
      'background-color, border-color, color, box-shadow, transform',
    transitionDuration: '0.12s',
    transitionTimingFunction: 'ease',
    outlineStyle: 'none',
    backgroundColor: colors.inputBg,
    borderColor: colors.inputBorder,
    color: colors.fg,
    ':hover': {
      borderColor: colors.borderStrong,
      backgroundColor: colors.bgSubtle,
    },
    ':focus-visible': {
      boxShadow: `0 0 0 3px ${colors.focusRing}`,
    },
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
  selected: {
    backgroundColor: colors.accentMuted,
    borderColor: colors.accent,
    color: colors.accent,
    boxShadow: `inset 0 0 0 1px ${colors.accent}`,
    ':hover': {
      borderColor: colors.accent,
      filter: 'brightness(0.97)',
    },
  },
  primaryWhenSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
    color: colors.accentFg,
    boxShadow: elevation.card,
    ':hover': {
      borderColor: colors.accent,
      filter: 'brightness(0.94)',
    },
  },
  rounded: {
    borderRadius: radii.full,
  },
})
