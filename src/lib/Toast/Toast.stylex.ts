import * as stylex from '@stylexjs/stylex'
import { colors, fonts, radii, space } from '../theme/tokens.stylex'

/**
 * Material Design elevation 6 — matches Snackbar / Paper floating above UI.
 * @see https://mui.com/material-ui/react-snackbar/
 */
const elevation6 =
  '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)'

/** MUI Grow transition: scale + opacity (default Snackbar transition) */
const growEnter = stylex.keyframes({
  from: {
    opacity: 0,
    transform: 'scale(0.8)',
  },
  to: {
    opacity: 1,
    transform: 'scale(1)',
  },
})

/** Slide + fade for bottom-anchored snackbars (common MUI pattern) */
const slideUpEnter = stylex.keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(24px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
})

/** Slide + fade for top-anchored snackbars */
const slideDownEnter = stylex.keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-24px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
})

export const styles = stylex.create({
  region: {
    position: 'fixed',
    zIndex: 1400,
    display: 'flex',
    flexDirection: 'column',
    gap: space.sm,
    maxWidth: 'min(568px, calc(100vw - 48px))',
    pointerEvents: 'none',
    boxSizing: 'border-box',
    fontFamily: fonts.sans,
  },
  /** Default: MUI Grow */
  itemWrapGrow: {
    pointerEvents: 'auto',
    animationName: growEnter,
    animationDuration: '300ms',
    animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    animationFillMode: 'both',
  },
  itemWrapSlideUp: {
    pointerEvents: 'auto',
    animationName: slideUpEnter,
    animationDuration: '300ms',
    animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    animationFillMode: 'both',
  },
  itemWrapSlideDown: {
    pointerEvents: 'auto',
    animationName: slideDownEnter,
    animationDuration: '300ms',
    animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    animationFillMode: 'both',
  },
  /**
   * SnackbarContent-like surface: rounded rect, elevation, not a pill.
   */
  item: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 48,
    boxSizing: 'border-box',
    borderRadius: radii.sm,
    boxShadow: elevation6,
    overflow: 'hidden',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 8,
    minWidth: 0,
    flex: 1,
  },
  body: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    paddingRight: 4,
  },
  /** Primary line — MUI body2 / Snackbar message */
  summary: {
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.43,
    letterSpacing: '0.01071em',
  },
  /** Secondary line under message */
  detail: {
    fontSize: '0.8125rem',
    lineHeight: 1.5,
    fontWeight: 400,
  },
  /** Icon button — MUI Snackbar close */
  close: {
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    padding: 0,
    margin: 0,
    borderWidth: 0,
    borderRadius: radii.full,
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transitionProperty: 'background-color',
    transitionDuration: '150ms',
    transitionTimingFunction: 'ease',
    ':focus-visible': {
      outlineStyle: 'none',
      boxShadow: `0 0 0 2px currentColor`,
    },
  },
  /** On dark / filled surfaces */
  closeInverse: {
    color: 'rgba(255, 255, 255, 0.54)',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      color: 'rgba(255, 255, 255, 0.87)',
    },
  },
  /** On light Paper-style surface */
  closeOnPaper: {
    color: colors.fgSubtle,
    ':hover': {
      backgroundColor: colors.neutralMuted,
      color: colors.fg,
    },
  },
  /** Default Snackbar: dark grey surface, light text (MUI default on light theme) */
  neutralDark: {
    backgroundColor: '#323232',
    color: '#ffffff',
    boxShadow: elevation6,
  },
  detailOnDark: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  /** Light “Paper” snackbar — subtle elevation on page */
  paper: {
    backgroundColor: colors.bgElevated,
    color: colors.fg,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
    boxShadow: elevation6,
  },
  detailOnPaper: {
    color: colors.fgMuted,
  },
  /** Filled Alert-style (Snackbar wrapping Alert pattern) */
  filledSuccess: {
    backgroundColor: colors.success,
    color: colors.successFg,
    boxShadow: elevation6,
  },
  filledInfo: {
    backgroundColor: colors.info,
    color: colors.infoFg,
    boxShadow: elevation6,
  },
  filledWarning: {
    backgroundColor: colors.warning,
    color: colors.warningFg,
    boxShadow: elevation6,
  },
  filledDanger: {
    backgroundColor: colors.danger,
    color: colors.dangerFg,
    boxShadow: elevation6,
  },
  filledPrimary: {
    backgroundColor: colors.accent,
    color: colors.accentFg,
    boxShadow: elevation6,
  },
  filledHelp: {
    backgroundColor: colors.help,
    color: colors.helpFg,
    boxShadow: elevation6,
  },
  filledMuted: {
    color: 'rgba(255, 255, 255, 0.85)',
  },
  /** Same as default dark snackbar */
  contrast: {
    backgroundColor: '#212121',
    color: '#ffffff',
    boxShadow: elevation6,
  },
  topLeft: {
    top: 24,
    left: 24,
    alignItems: 'flex-start',
  },
  topCenter: {
    top: 24,
    left: '50%',
    transform: 'translateX(-50%)',
    alignItems: 'stretch',
  },
  topRight: {
    top: 24,
    right: 24,
    alignItems: 'flex-end',
  },
  center: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    alignItems: 'stretch',
  },
  bottomLeft: {
    bottom: 24,
    left: 24,
    alignItems: 'flex-start',
  },
  bottomCenter: {
    bottom: 24,
    left: '50%',
    transform: 'translateX(-50%)',
    alignItems: 'stretch',
  },
  bottomRight: {
    bottom: 24,
    right: 24,
    alignItems: 'flex-end',
  },
})
