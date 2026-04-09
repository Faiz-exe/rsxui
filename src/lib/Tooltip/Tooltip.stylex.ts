import * as stylex from '@stylexjs/stylex'
import { colors, fonts, radii, space } from '../theme/tokens.stylex'

const fadeIn = stylex.keyframes({
  '0%': { opacity: 0, transform: 'scale(0.96)' },
  '100%': { opacity: 1, transform: 'scale(1)' },
})

export const styles = stylex.create({
  trigger: {
    display: 'inline-flex',
  },

  tooltip: {
    position: 'fixed' as const,
    zIndex: 9999,
    pointerEvents: 'none',
    maxWidth: '280px',
    paddingBlock: '6px',
    paddingInline: space.sm,
    borderRadius: radii.sm,
    backgroundColor: colors.fg,
    color: colors.bg,
    fontFamily: fonts.sans,
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: 1.45,
    letterSpacing: '0.01em',
    boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
    animationName: fadeIn,
    animationDuration: '0.12s',
    animationTimingFunction: 'ease-out',
    animationFillMode: 'both',
    '@media (prefers-reduced-motion: reduce)': {
      animationDuration: '0.01ms',
    },
  },
})
