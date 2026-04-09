import * as stylex from '@stylexjs/stylex'
import { colors, elevation, radii, space } from '../theme/tokens.stylex'

export const styles = stylex.create({
  root: {
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.lg,
    boxShadow: elevation.card,
    boxSizing: 'border-box',
    transitionProperty: 'box-shadow, border-color',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'ease',
  },
  interactive: {
    cursor: 'pointer',
    ':hover': {
      boxShadow: elevation.cardHover,
      borderColor: colors.borderStrong,
    },
    ':focus-visible': {
      outlineStyle: 'none',
      boxShadow: `${elevation.cardHover}, 0 0 0 3px ${colors.focusRing}`,
    },
  },
  padNone: {
    padding: 0,
  },
  padMd: {
    padding: space.lg,
  },
  padLg: {
    padding: space.xl,
  },
})
