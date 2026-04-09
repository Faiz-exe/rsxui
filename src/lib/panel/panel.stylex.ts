import * as stylex from '@stylexjs/stylex'
import { colors, elevation, radii } from '../theme/tokens.stylex'

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

const modalIn = stylex.keyframes({
  from: {
    opacity: 0,
    transform: 'scale(0.96) translateY(8px)',
  },
  to: {
    opacity: 1,
    transform: 'scale(1) translateY(0)',
  },
})

export const panelStyles = stylex.create({
  base: {
    borderRadius: radii.lg,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: colors.bgElevated,
    color: colors.fg,
    boxSizing: 'border-box',
  },
  dropdown: {
    boxShadow: elevation.cardHover,
    overflow: 'hidden',
    transformOrigin: 'top center',
  },
  dropdownMotion: {
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
  modal: {
    boxShadow:
      '0 4px 6px rgba(15, 15, 22, 0.06), 0 24px 48px rgba(15, 15, 22, 0.16), 0 0 0 1px rgba(15, 15, 22, 0.05)',
    overflow: 'hidden',
  },
  modalMotion: {
    animationName: modalIn,
    animationDuration: '0.22s',
    animationTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    animationFillMode: 'both',
  },
})
