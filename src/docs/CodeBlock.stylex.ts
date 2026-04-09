import * as stylex from '@stylexjs/stylex'
import { colors, elevation, fonts, radii, space } from '../lib/theme/tokens.stylex'

export const styles = stylex.create({
  wrap: {
    marginTop: space.lg,
    marginBottom: space['2xl'],
    borderRadius: radii.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: colors.bg,
    boxShadow: elevation.card,
  },

  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.md,
    flexWrap: 'wrap' as const,
    paddingBlock: '8px',
    paddingInline: space.md,
    backgroundColor: colors.bgSubtle,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
  },

  toolbarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: space.sm,
    minWidth: 0,
  },

  langBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: fonts.mono,
    fontSize: '0.6875rem',
    fontWeight: 600,
    letterSpacing: '0.04em',
    color: colors.accent,
    backgroundColor: colors.accentMuted,
    paddingBlock: '2px',
    paddingInline: '7px',
    borderRadius: radii.sm,
  },

  title: {
    fontFamily: fonts.sans,
    fontSize: '0.75rem',
    fontWeight: 500,
    color: colors.fgSubtle,
  },

  toolbarActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    flexShrink: 0,
  },

  toolBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontFamily: fonts.sans,
    fontSize: '0.75rem',
    fontWeight: 500,
    paddingBlock: '5px',
    paddingInline: space.sm,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    backgroundColor: colors.bg,
    color: colors.fgMuted,
    cursor: 'pointer',
    transitionProperty: 'background-color, border-color, color',
    transitionDuration: '0.12s',
    ':hover': {
      backgroundColor: colors.bgSubtle,
      color: colors.fg,
      borderColor: colors.borderStrong,
    },
  },

  toolBtnOn: {
    backgroundColor: colors.accentMuted,
    color: colors.accent,
    borderColor: colors.accent,
  },

  toolBtnCopied: {
    color: colors.success,
    borderColor: colors.success,
    backgroundColor: colors.successMuted,
  },

  body: {
    backgroundColor: colors.bgSubtle,
  },

  pre: {
    margin: 0,
    padding: space.lg,
    overflowX: 'auto' as const,
    maxHeight: 'min(70vh, 520px)',
    overflowY: 'auto' as const,
  },

  code: {
    fontFamily: fonts.mono,
    fontSize: '0.8125rem',
    lineHeight: 1.7,
    color: colors.fg,
    whiteSpace: 'pre' as const,
    display: 'block',
    tabSize: 2,
  },

  textarea: {
    display: 'block',
    width: '100%',
    margin: 0,
    padding: space.lg,
    minHeight: '120px',
    maxHeight: 'min(70vh, 520px)',
    boxSizing: 'border-box',
    fontFamily: fonts.mono,
    fontSize: '0.8125rem',
    lineHeight: 1.7,
    color: colors.fg,
    backgroundColor: colors.bg,
    borderWidth: 0,
    borderStyle: 'none',
    outlineStyle: 'none',
    resize: 'vertical' as const,
    tabSize: 2,
  },
})
