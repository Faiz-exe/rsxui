import * as stylex from '@stylexjs/stylex'
import { colors, fonts, radii, space } from '../theme/tokens.stylex'

export const styles = stylex.create({
  field: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: space.sm,
    cursor: 'pointer',
    width: 'fit-content',
    maxWidth: '100%',
    boxSizing: 'border-box',
    ':has(input:disabled)': {
      cursor: 'not-allowed',
    },
  },
  /** Visually hidden; remains focusable and in the accessibility tree */
  native: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: 0,
    opacity: 0,
    pointerEvents: 'none',
  },
  controlSlot: {
    position: 'relative',
    flexShrink: 0,
    width: '1.125rem',
    height: '1.125rem',
    marginTop: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.sm,
    ':focus-within': {
      boxShadow: `0 0 0 3px ${colors.focusRing}`,
    },
    ':has(input:disabled)': {
      boxShadow: 'none',
    },
  },
  control: {
    position: 'absolute',
    inset: 0,
    boxSizing: 'border-box',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: colors.inputBorder,
    borderRadius: radii.sm,
    backgroundColor: colors.inputBg,
    transitionProperty: 'border-color, background-color, box-shadow',
    transitionDuration: '0.15s',
    pointerEvents: 'none',
  },
  controlChecked: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  checkSvg: {
    position: 'absolute',
    width: '12px',
    height: '12px',
    color: colors.accentFg,
    pointerEvents: 'none',
  },
  controlInvalid: {
    borderColor: colors.danger,
  },
  controlInvalidChecked: {
    borderColor: colors.danger,
    backgroundColor: colors.danger,
  },
  checkSvgDanger: {
    color: colors.dangerFg,
  },
  controlDisabled: {
    borderColor: colors.border,
    backgroundColor: colors.bgSubtle,
    opacity: 0.85,
  },
  controlCheckedDisabled: {
    borderColor: colors.borderStrong,
    backgroundColor: colors.accentMuted,
    opacity: 1,
  },
  controlInvalidCheckedDisabled: {
    borderColor: colors.borderStrong,
    backgroundColor: colors.dangerMuted,
    opacity: 1,
  },
  checkSvgDisabled: {
    color: colors.accent,
    opacity: 0.85,
  },
  checkSvgDangerDisabled: {
    color: colors.danger,
    opacity: 0.85,
  },
  labelTextDisabled: {
    color: colors.fgSubtle,
  },
  descriptionDisabled: {
    color: colors.fgSubtle,
    opacity: 0.9,
  },
  textCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    minWidth: 0,
  },
  labelText: {
    fontFamily: fonts.sans,
    fontSize: '0.9375rem',
    fontWeight: 500,
    lineHeight: 1.4,
    color: colors.fg,
  },
  description: {
    fontFamily: fonts.sans,
    fontSize: '0.8125rem',
    lineHeight: 1.45,
    color: colors.fgMuted,
  },
})
