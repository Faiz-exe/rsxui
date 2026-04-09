import * as stylex from '@stylexjs/stylex'
import { colors, elevation, fonts, radii, space } from '../theme/tokens.stylex'

const panelIn = stylex.keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-6px) scale(0.98)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0) scale(1)',
  },
})

const panelInReduced = stylex.keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

export const styles = stylex.create({
  root: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'stretch',
    verticalAlign: 'middle',
    width: 'fit-content',
    maxWidth: '100%',
  },
  rootRaised: {
    boxShadow: elevation.card,
    borderRadius: radii.md,
    ':hover': {
      boxShadow: elevation.cardHover,
    },
  },
  rootRounded: {
    borderRadius: radii.full,
  },
  primary: {
    flexShrink: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0,
    borderRightStyle: 'none',
  },
  primaryRounded: {
    borderTopLeftRadius: radii.full,
    borderBottomLeftRadius: radii.full,
  },
  menuTrigger: {
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '2.25rem',
    paddingInline: space.sm,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 1,
    borderLeftStyle: 'solid',
  },
  menuTriggerRounded: {
    borderTopRightRadius: radii.full,
    borderBottomRightRadius: radii.full,
  },
  dividerNeutral: {
    borderLeftColor: colors.borderStrong,
  },
  dividerOnEmphasis: {
    borderLeftColor: 'rgba(255, 255, 255, 0.28)',
  },
  chevron: {
    width: '1rem',
    height: '1rem',
  },
  menu: {
    position: 'absolute',
    right: 0,
    top: '100%',
    marginTop: space.xs,
    minWidth: '12rem',
    maxWidth: 'min(20rem, 90vw)',
    zIndex: 100,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: colors.bgElevated,
    boxShadow: elevation.cardHover,
    padding: space.xs,
    listStyle: 'none',
    margin: 0,
    outlineStyle: 'none',
    '@media (prefers-reduced-motion: no-preference)': {
      animationName: panelIn,
      animationDuration: '0.22s',
      animationFillMode: 'both' as const,
      animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
    },
    '@media (prefers-reduced-motion: reduce)': {
      animationName: panelInReduced,
      animationDuration: '0.12s',
      animationFillMode: 'both' as const,
    },
  },
  menuItem: {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: fonts.sans,
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.35,
    textAlign: 'left' as const,
    color: colors.fg,
    paddingBlock: space.sm,
    paddingInline: space.md,
    borderWidth: 0,
    borderRadius: radii.sm,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    outlineStyle: 'none',
    transitionProperty: 'background-color, color',
    transitionDuration: '0.1s',
    ':hover': {
      backgroundColor: colors.bgSubtle,
    },
    ':focus-visible': {
      backgroundColor: colors.accentMuted,
      boxShadow: `0 0 0 2px ${colors.focusRing}`,
    },
  },
  menuItemDisabled: {
    opacity: 0.45,
    cursor: 'not-allowed',
    ':hover': {
      backgroundColor: 'transparent',
    },
  },
})
