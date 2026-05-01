import * as stylex from '@stylexjs/stylex'
import { colors, radii, space } from '../theme/tokens.stylex'

export const datePickerStyles = stylex.create({
  wrap: {
    position: 'relative' as const,
    width: '100%',
    boxSizing: 'border-box',
  },

  panel: {
    position: 'absolute' as const,
    left: 0,
    top: '100%',
    marginTop: space.xs,
    zIndex: 100,
    width: '100%',
    maxWidth: 'min(calc(100vw - 32px), 360px)',
    paddingTop: space.md,
    paddingBottom: space.md,
    paddingLeft: space.md,
    paddingRight: space.md,
    boxSizing: 'border-box',
    /** Align open animation under the field (not centered). */
    transformOrigin: 'top left',
  },

  iconBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2rem',
    height: '2rem',
    margin: '-4px -6px -4px 0',
    padding: 0,
    borderWidth: 0,
    borderRadius: radii.sm,
    backgroundColor: 'transparent',
    color: colors.fgMuted,
    cursor: 'pointer',
    transitionProperty: 'color, background-color',
    transitionDuration: '0.12s',
    ':hover': {
      color: colors.fg,
      backgroundColor: colors.bgSubtle,
    },
    ':disabled': {
      opacity: 0.45,
      cursor: 'not-allowed',
    },
  },
})
