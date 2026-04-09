import * as stylex from '@stylexjs/stylex'
import { colors, radii } from '../theme/tokens.stylex'

const shimmer = stylex.keyframes({
  '0%': { backgroundPosition: '-200% 0' },
  '100%': { backgroundPosition: '200% 0' },
})

export const styles = stylex.create({
  root: {
    display: 'block',
    backgroundColor: colors.neutralMuted,
    backgroundImage: `linear-gradient(90deg, transparent 0%, ${colors.bgSubtle} 50%, transparent 100%)`,
    backgroundSize: '200% 100%',
    animationName: shimmer,
    animationDuration: '1.8s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
    '@media (prefers-reduced-motion: reduce)': {
      animationName: 'none',
    },
  },

  /* Variants */
  text: {
    height: '1em',
    borderRadius: radii.sm,
    width: '100%',
  },

  circular: {
    borderRadius: radii.full,
  },

  rectangular: {
    borderRadius: radii.md,
  },
})
