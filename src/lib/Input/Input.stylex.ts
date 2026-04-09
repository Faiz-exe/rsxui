import * as stylex from '@stylexjs/stylex'
import { colors, elevation, fonts, radii, space } from '../theme/tokens.stylex'

export const styles = stylex.create({
  field: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%',
    boxSizing: 'border-box',
  },
  description: {
    marginTop: space.xs,
    marginBottom: space.sm,
  },
  /** Single-line text control (no prefix/suffix) */
  input: {
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: fonts.sans,
    fontSize: '0.9375rem',
    lineHeight: 1.4,
    color: colors.fg,
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.inputBorder,
    borderRadius: radii.md,
    paddingBlock: space.sm,
    paddingInline: space.md,
    outlineStyle: 'none',
    boxShadow: elevation.input,
    transitionProperty: 'border-color, box-shadow',
    transitionDuration: '0.15s',
    transitionTimingFunction: 'ease',
    minWidth: 0,
    '::placeholder': {
      color: colors.placeholder,
    },
    ':focus-visible': {
      borderColor: colors.accent,
      boxShadow: `0 0 0 3px ${colors.focusRing}`,
    },
    ':disabled': {
      opacity: 0.55,
      cursor: 'not-allowed',
    },
  },
  inputError: {
    borderColor: colors.danger,
    ':focus-visible': {
      borderColor: colors.danger,
      boxShadow: `0 0 0 3px ${colors.dangerMuted}`,
    },
  },
  /** Wraps prefix + input + suffix; one border and focus ring */
  affixOuter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.inputBorder,
    borderRadius: radii.md,
    boxShadow: elevation.input,
    overflow: 'hidden',
    transitionProperty: 'border-color, box-shadow',
    transitionDuration: '0.15s',
    transitionTimingFunction: 'ease',
    ':focus-within': {
      borderColor: colors.accent,
      boxShadow: `0 0 0 3px ${colors.focusRing}`,
    },
  },
  affixOuterError: {
    borderColor: colors.danger,
    boxShadow: elevation.input,
    ':focus-within': {
      borderColor: colors.danger,
      boxShadow: `0 0 0 3px ${colors.dangerMuted}`,
    },
  },
  affixOuterDisabled: {
    opacity: 0.55,
    cursor: 'not-allowed',
  },
  affixSide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    paddingInline: space.md,
    color: colors.fgMuted,
    fontSize: '1rem',
    lineHeight: 1,
    userSelect: 'none',
  },
  affixInteractive: {
    cursor: 'text',
  },
  /** Input when nested inside affixOuter */
  inputAffixed: {
    flex: 1,
    minWidth: 0,
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: fonts.sans,
    fontSize: '0.9375rem',
    lineHeight: 1.4,
    color: colors.fg,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderStyle: 'none',
    outlineStyle: 'none',
    paddingBlock: space.sm,
    paddingInline: 0,
    boxShadow: 'none',
    '::placeholder': {
      color: colors.placeholder,
    },
    ':focus-visible': {
      boxShadow: 'none',
      outlineStyle: 'none',
    },
    ':disabled': {
      cursor: 'not-allowed',
    },
  },
  message: {
    marginTop: space.xs,
  },
  // ── Size overrides ──────────────────────────────────────────────────────────
  sizeSm: {
    fontSize: '0.8125rem',
    paddingBlock: space.xs,
    paddingInline: space.sm,
    minHeight: '32px',
  },
  sizeMd: {
    fontSize: '0.9375rem',
    paddingBlock: space.sm,
    paddingInline: space.md,
    minHeight: '40px',
  },
  sizeLg: {
    fontSize: '1.0625rem',
    paddingBlock: space.md,
    paddingInline: space.lg,
    minHeight: '48px',
  },
  affixSizeSm: {
    fontSize: '0.8125rem',
    minHeight: '32px',
  },
  affixSizeMd: {
    fontSize: '0.9375rem',
    minHeight: '40px',
  },
  affixSizeLg: {
    fontSize: '1.0625rem',
    minHeight: '48px',
  },
})
