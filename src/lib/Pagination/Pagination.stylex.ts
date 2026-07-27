import * as stylex from '@stylexjs/stylex'
import { colors, fonts, radii, space } from '../theme/tokens.stylex'

export const pagerStyles = stylex.create({
  /* ── Root wrapper ── */
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2px',
    fontFamily: fonts.sans,
  },

  /* ── Disabled container ── pointer-events off, faded */
  disabled: {
    opacity: 0.38,
    pointerEvents: 'none' as const,
  },

  /*
   * ── Base item ──
   * ALL page items (arrows + numbers) share this — default style:
   * no border, pill shape, transparent bg, hover shows subtle fill.
   */
  item: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '32px',
    height: '32px',
    paddingInline: '4px',
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderRadius: radii.full,
    backgroundColor: 'transparent',
    color: colors.fg,
    cursor: 'pointer',
    fontFamily: fonts.sans,
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1,
    transitionProperty: 'background-color, color, filter',
    transitionDuration: '0.15s',
    transitionTimingFunction: 'ease',
    outlineStyle: 'none',
    ':hover': {
      backgroundColor: colors.neutralMuted,
    },
    ':focus-visible': {
      boxShadow: `0 0 0 3px ${colors.focusRing}`,
    },
    ':disabled': {
      opacity: 0.38,
      cursor: 'not-allowed',
      backgroundColor: 'transparent',
    },
  },

  /* ── Active page — primary (default accent) ── */
  itemActive: {
    backgroundColor: colors.accent,
    color: colors.accentFg,
    fontWeight: 700,
    ':hover': {
      backgroundColor: colors.accent,
      filter: 'brightness(0.9)',
    },
  },

  /* ── Active page — secondary colour ── */
  itemActiveSecondary: {
    backgroundColor: colors.fgSubtle,
    color: colors.bg,
    fontWeight: 700,
    ':hover': {
      backgroundColor: colors.fgSubtle,
      filter: 'brightness(1.1)',
    },
  },

  /* ── Active page — standard (neutral dark) ── */
  itemActiveStandard: {
    backgroundColor: colors.fg,
    color: colors.bg,
    fontWeight: 700,
    ':hover': {
      backgroundColor: colors.fg,
      filter: 'brightness(1.15)',
    },
  },

  /* ── Variant: outlined ── add a border to every item */
  itemOutlined: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    ':hover': {
      borderColor: colors.borderStrong,
      backgroundColor: colors.neutralMuted,
    },
    ':disabled': {
      borderColor: colors.border,
    },
  },

  /* ── Outlined active extra — accent border on active page ── */
  itemOutlinedActive: {
    borderColor: colors.accent,
    ':hover': {
      borderColor: colors.accent,
    },
  },

  /* ── Shape: rounded (square-ish, not full pill) ── */
  itemRounded: {
    borderRadius: radii.sm,
  },

  /* ── Size: small ── */
  itemSm: {
    minWidth: '26px',
    height: '26px',
    fontSize: '0.8125rem',
  },

  /* ── Size: large ── */
  itemLg: {
    minWidth: '40px',
    height: '40px',
    fontSize: '1rem',
  },

  /* ── Ellipsis "…" separator — non-interactive ── */
  ellipsis: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '32px',
    height: '32px',
    color: colors.fgMuted,
    fontFamily: fonts.sans,
    fontSize: '0.875rem',
    userSelect: 'none' as const,
    cursor: 'default',
    letterSpacing: '0.05em',
  },

  ellipsisSm: {
    minWidth: '26px',
    height: '26px',
    fontSize: '0.8125rem',
  },

  ellipsisLg: {
    minWidth: '40px',
    height: '40px',
    fontSize: '1rem',
  },
})

/** Styles used by Table's paginator footer (rows-per-page + record range) */
export const tablePagerStyles = stylex.create({
  footer: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.sm,
    fontFamily: fonts.sans,
  },
  footerDisabled: {
    opacity: 0.38,
    pointerEvents: 'none' as const,
  },
  info: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: space.sm,
  },
  count: {
    fontFamily: fonts.sans,
    fontSize: '0.8125rem',
    fontWeight: 400,
    color: colors.fgMuted,
    whiteSpace: 'nowrap' as const,
  },
  select: {
    height: '32px',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radii.sm,
    backgroundColor: colors.bg,
    color: colors.fg,
    paddingInline: space.sm,
    paddingBlock: '0',
    fontFamily: fonts.sans,
    fontSize: '0.8125rem',
    fontWeight: 500,
    cursor: 'pointer',
    outlineStyle: 'none',
    transitionProperty: 'border-color, box-shadow',
    transitionDuration: '0.12s',
    ':hover': {
      borderColor: colors.borderStrong,
    },
    ':focus': {
      borderColor: colors.accent,
      boxShadow: `0 0 0 3px ${colors.focusRing}`,
    },
  },
})
