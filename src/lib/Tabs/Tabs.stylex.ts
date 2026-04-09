import * as stylex from '@stylexjs/stylex'
import { colors, elevation, fonts, radii, space } from '../theme/tokens.stylex'

export const styles = stylex.create({
  root: {
    width: '100%',
    fontFamily: fonts.sans,
    boxSizing: 'border-box',
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    padding: 4,
    borderRadius: radii.md,
    backgroundColor: colors.bgSubtle,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    boxSizing: 'border-box',
  },
  tab: {
    position: 'relative',
    margin: 0,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    borderWidth: 0,
    borderRadius: radii.sm,
    backgroundColor: 'transparent',
    color: colors.fgMuted,
    fontFamily: 'inherit',
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.25,
    cursor: 'pointer',
    transitionProperty: 'color, background-color, box-shadow',
    transitionDuration: '0.15s',
    ':hover': {
      color: colors.fg,
      backgroundColor: colors.neutralMuted,
    },
    ':focus-visible': {
      outlineStyle: 'none',
      boxShadow: `0 0 0 2px ${colors.focusRing}`,
    },
  },
  tabSelected: {
    color: colors.fg,
    backgroundColor: colors.bgElevated,
    boxShadow: elevation.input,
    ':hover': {
      color: colors.fg,
      backgroundColor: colors.bgElevated,
    },
  },
  tabDisabled: {
    opacity: 0.45,
    cursor: 'not-allowed',
    ':hover': {
      color: colors.fgMuted,
      backgroundColor: 'transparent',
    },
  },
  panel: {
    paddingTop: space.lg,
    fontSize: '0.9375rem',
    lineHeight: 1.55,
    color: colors.fg,
    outlineStyle: 'none',
  },
})
