import * as stylex from '@stylexjs/stylex'
import { colors, elevation, fonts, radii, space } from '../../lib/theme/tokens.stylex'

export const docPreviewStyles = stylex.create({
  wrap: {
    marginTop: space.xl,
    marginBottom: space['2xl'],
    borderRadius: radii.lg,
    overflow: 'visible',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    boxShadow: elevation.card,
  },

  /* ── Tab bar ── */
  tabBar: {
    display: 'flex',
    alignItems: 'stretch',
    gap: 0,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
    backgroundColor: colors.bgSubtle,
    paddingInline: space.md,
    paddingTop: '6px',
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
  },

  tab: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: fonts.sans,
    fontSize: '0.75rem',
    fontWeight: 500,
    color: colors.fgSubtle,
    paddingBlock: '8px',
    paddingInline: space.md,
    borderRadius: '0',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'transparent',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    transitionProperty: 'color, border-color',
    transitionDuration: '0.12s',
    ':hover': {
      color: colors.fgMuted,
    },
  },

  tabActive: {
    color: colors.fg,
    fontWeight: 600,
    borderBottomColor: colors.accent,
    ':hover': {
      color: colors.fg,
    },
  },

  tabDot: {
    width: '7px',
    height: '7px',
    borderRadius: radii.full,
    backgroundColor: 'currentColor',
    opacity: 0.5,
  },

  tabSpacer: {
    flex: 1,
  },

  tabActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    paddingBottom: '6px',
  },

  copyBtn: {
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

  copyBtnCopied: {
    color: colors.success,
    borderColor: colors.success,
    backgroundColor: colors.successMuted,
  },

  /* ── Preview panel ── */
  previewBody: {
    padding: space.xl,
    minHeight: '5rem',
    boxSizing: 'border-box',
    backgroundColor: colors.bg,
    backgroundImage:
      'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)',
    backgroundSize: '20px 20px',
    borderBottomLeftRadius: radii.lg,
    borderBottomRightRadius: radii.lg,
  },

  /* ── Code panel ── */
  codeBody: {
    backgroundColor: colors.bgSubtle,
    borderBottomLeftRadius: radii.lg,
    borderBottomRightRadius: radii.lg,
    overflow: 'hidden',
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
})
