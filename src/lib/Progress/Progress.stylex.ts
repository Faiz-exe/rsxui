import * as stylex from '@stylexjs/stylex'
import { colors, radii } from '../theme/tokens.stylex'

const indeterminate = stylex.keyframes({
  '0%': { transform: 'translateX(-100%)' },
  '100%': { transform: 'translateX(250%)' },
})

export const styles = stylex.create({
  root: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: radii.full,
    backgroundColor: colors.neutralMuted,
  },

  /* Sizes */
  sm: { height: '4px' },
  md: { height: '8px' },
  lg: { height: '12px' },

  /* Bar fill */
  bar: {
    height: '100%',
    borderRadius: 'inherit',
    transitionProperty: 'width',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'ease-out',
  },

  /* Severity fills */
  primary: { backgroundColor: colors.accent },
  secondary: { backgroundColor: colors.fgSubtle },
  success: { backgroundColor: colors.success },
  danger: { backgroundColor: colors.danger },
  warning: { backgroundColor: colors.warning },
  info: { backgroundColor: colors.info },

  /* Indeterminate animation */
  indeterminate: {
    width: '40%',
    animationName: indeterminate,
    animationDuration: '1.4s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
    '@media (prefers-reduced-motion: reduce)': {
      animationDuration: '3s',
    },
  },

  /* Label */
  wrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
    width: '100%',
  },

  labelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    fontSize: '0.8125rem',
    fontWeight: 500,
    color: colors.fgMuted,
  },

  valueText: {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: colors.fg,
  },
})
