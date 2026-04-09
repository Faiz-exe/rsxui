import * as stylex from '@stylexjs/stylex'
import { colors } from '../theme/tokens.stylex'

const spin = stylex.keyframes({
  to: { transform: 'rotate(360deg)' },
})

export const styles = stylex.create({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    color: colors.accent,
    animationName: spin,
    animationDuration: '0.7s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
    '@media (prefers-reduced-motion: reduce)': {
      animationName: 'none',
    },
  },
  sizeSm: { width: '1rem', height: '1rem' },
  sizeMd: { width: '1.25rem', height: '1.25rem' },
  sizeLg: { width: '1.75rem', height: '1.75rem' },

  toneAccent: { color: colors.accent },
  toneMuted: { color: colors.fgMuted },
  toneFg: { color: colors.fg },
  toneDanger: { color: colors.danger },
  toneSuccess: { color: colors.success },
  toneWarning: { color: colors.warning },
  toneInfo: { color: colors.info },
})
