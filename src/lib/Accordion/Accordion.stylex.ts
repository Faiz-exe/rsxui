import * as stylex from '@stylexjs/stylex'
import { colors, elevation, fonts, radii, space } from '../theme/tokens.stylex'

export const styles = stylex.create({
  root: {
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.md,
    backgroundColor: colors.bgElevated,
    boxShadow: elevation.card,
    boxSizing: 'border-box',
    fontFamily: fonts.sans,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
    boxSizing: 'border-box',
    ':last-child': {
      borderBottomWidth: 0,
    },
  },
  trigger: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.md,
    width: '100%',
    margin: 0,
    paddingTop: space.md,
    paddingBottom: space.md,
    paddingLeft: space.lg,
    paddingRight: space.lg,
    borderWidth: 0,
    backgroundColor: 'transparent',
    color: colors.fg,
    fontFamily: 'inherit',
    fontSize: '0.9375rem',
    fontWeight: 600,
    lineHeight: 1.35,
    textAlign: 'left',
    cursor: 'pointer',
    transitionProperty: 'background-color',
    transitionDuration: '0.15s',
    ':hover': {
      backgroundColor: colors.neutralMuted,
    },
    ':focus-visible': {
      outlineStyle: 'none',
      boxShadow: `inset 0 0 0 2px ${colors.focusRing}`,
    },
  },
  triggerDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    ':hover': {
      backgroundColor: 'transparent',
    },
  },
  triggerLabel: {
    flex: 1,
    minWidth: 0,
  },
  chevron: {
    flexShrink: 0,
    width: 20,
    height: 20,
    transitionProperty: 'transform',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'ease',
    color: colors.fgMuted,
  },
  chevronOpen: {
    transform: 'rotate(180deg)',
  },
  contentOuter: {
    display: 'grid',
    gridTemplateRows: '0fr',
    transitionProperty: 'grid-template-rows',
    transitionDuration: '0.22s',
    transitionTimingFunction: 'ease',
  },
  contentOuterOpen: {
    gridTemplateRows: '1fr',
  },
  contentInner: {
    overflow: 'hidden',
    minHeight: 0,
  },
  contentBody: {
    paddingLeft: space.lg,
    paddingRight: space.lg,
    paddingBottom: space.md,
    fontSize: '0.875rem',
    lineHeight: 1.5,
    color: colors.fgMuted,
  },
})
