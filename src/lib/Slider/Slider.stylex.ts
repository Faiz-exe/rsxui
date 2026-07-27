import * as stylex from '@stylexjs/stylex'
import { colors, radii } from '../theme/tokens.stylex'

export const styles = stylex.create({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
    touchAction: 'none',
    width: '100%',
    height: '24px',
    cursor: 'pointer',
  },
  rootVertical: {
    width: '24px',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rootDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  track: {
    position: 'absolute',
    width: '100%',
    height: '6px',
    backgroundColor: colors.border,
    borderRadius: radii.full,
  },
  trackVertical: {
    width: '6px',
    height: '100%',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  range: {
    position: 'absolute',
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: radii.full,
  },
  rangeVertical: {
    width: '100%',
    height: 'auto',
    bottom: 0,
    left: 0,
  },
  thumb: {
    position: 'absolute',
    width: '20px',
    height: '20px',
    backgroundColor: colors.bg,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: colors.accent,
    borderRadius: radii.full,
    transform: 'translate(-50%, -50%)',
    transitionProperty: 'box-shadow',
    transitionDuration: '0.2s',
    outlineStyle: 'none',
    ':hover': {
      boxShadow: `0 0 0 6px ${colors.accentMuted}`,
    },
    ':focus-visible': {
      boxShadow: `0 0 0 4px ${colors.focusRing}`,
    },
    ':active': {
      boxShadow: `0 0 0 8px ${colors.accentMuted}`,
    },
  },
  thumbDisabled: {
    ':hover': { boxShadow: 'none' },
    ':active': { boxShadow: 'none' },
  },
  thumbVertical: {
    // When positioned via `bottom`, we shift DOWN to center the thumb
    transform: 'translate(-50%, 50%)',
  },
  mark: {
    position: 'absolute',
    width: '4px',
    height: '4px',
    borderRadius: radii.full,
    backgroundColor: colors.border,
    transform: 'translate(-50%, -50%)',
  },
  markHorizontal: {
    top: '50%',
  },
  markVertical: {
    left: '50%',
    transform: 'translate(-50%, 50%)',
  },
  markActive: {
    backgroundColor: colors.bg,
  },
  markLabel: {
    position: 'absolute',
    fontSize: '0.75rem',
    color: colors.fgMuted,
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    marginTop: '6px',
    whiteSpace: 'nowrap',
  },
  markLabelVertical: {
    transform: 'translateY(-50%)',
    marginTop: 0,
    marginLeft: '16px',
  },
  valueLabel: {
    position: 'absolute',
    top: '-36px',
    left: '50%',
    transform: 'translateX(-50%) scale(0)',
    transformOrigin: 'bottom center',
    transitionProperty: 'transform',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    backgroundColor: colors.fg,
    color: colors.bg,
    fontSize: '0.75rem',
    fontWeight: 600,
    padding: '2px 8px',
    borderRadius: radii.sm,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
  },
  valueLabelVertical: {
    top: '50%',
    left: '32px',
    transform: 'translateY(-50%) scale(0)',
    transformOrigin: 'left center',
  },
  valueLabelOpen: {
    transform: 'translateX(-50%) scale(1)',
  },
  valueLabelOpenVertical: {
    transform: 'translateY(-50%) scale(1)',
  }
})
