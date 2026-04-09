import * as stylex from '@stylexjs/stylex'
import { colors, elevation, fonts, radii, space } from '../theme/tokens.stylex'

/**
 * Composable layout, spacing, and typography helpers backed by the same tokens
 * as components (`colors`, `space`, `fonts`, etc.). Use with `stylex.props`:
 *
 * ```tsx
 * import * as stylex from '@stylexjs/stylex'
 * import { utilities as u } from 'react-stylex-ui'
 *
 * <div {...stylex.props(u.flex, u.flexCol, u.gapMd, u.pLg)} />
 * ```
 */
export const utilities = stylex.create({
  /* display */
  block: { display: 'block' },
  inline: { display: 'inline' },
  inlineBlock: { display: 'inline-block' },
  flex: { display: 'flex' },
  inlineFlex: { display: 'inline-flex' },
  grid: { display: 'grid' },
  hidden: { display: 'none' },

  /* flex */
  flexRow: { flexDirection: 'row' },
  flexCol: { flexDirection: 'column' },
  flexRowReverse: { flexDirection: 'row-reverse' },
  flexColReverse: { flexDirection: 'column-reverse' },
  flexWrap: { flexWrap: 'wrap' },
  flexNowrap: { flexWrap: 'nowrap' },
  flex1: { flex: '1 1 0%' },
  flexAuto: { flex: '1 1 auto' },
  flexNone: { flex: 'none' },
  grow: { flexGrow: 1 },
  shrink0: { flexShrink: 0 },
  itemsStart: { alignItems: 'flex-start' },
  itemsCenter: { alignItems: 'center' },
  itemsEnd: { alignItems: 'flex-end' },
  itemsStretch: { alignItems: 'stretch' },
  justifyStart: { justifyContent: 'flex-start' },
  justifyCenter: { justifyContent: 'center' },
  justifyEnd: { justifyContent: 'flex-end' },
  justifyBetween: { justifyContent: 'space-between' },
  justifyAround: { justifyContent: 'space-around' },
  justifyEvenly: { justifyContent: 'space-evenly' },
  selfStart: { alignSelf: 'flex-start' },
  selfCenter: { alignSelf: 'center' },
  selfEnd: { alignSelf: 'flex-end' },
  selfStretch: { alignSelf: 'stretch' },

  /* gap */
  gapXs: { gap: space.xs },
  gapSm: { gap: space.sm },
  gapMd: { gap: space.md },
  gapLg: { gap: space.lg },
  gapXl: { gap: space.xl },
  gap2Xl: { gap: space['2xl'] },

  /* padding (all sides) */
  p0: { padding: 0 },
  pXs: { padding: space.xs },
  pSm: { padding: space.sm },
  pMd: { padding: space.md },
  pLg: { padding: space.lg },
  pXl: { padding: space.xl },
  p2Xl: { padding: space['2xl'] },
  pxXs: { paddingLeft: space.xs, paddingRight: space.xs },
  pxSm: { paddingLeft: space.sm, paddingRight: space.sm },
  pxMd: { paddingLeft: space.md, paddingRight: space.md },
  pxLg: { paddingLeft: space.lg, paddingRight: space.lg },
  pxXl: { paddingLeft: space.xl, paddingRight: space.xl },
  pyXs: { paddingTop: space.xs, paddingBottom: space.xs },
  pySm: { paddingTop: space.sm, paddingBottom: space.sm },
  pyMd: { paddingTop: space.md, paddingBottom: space.md },
  pyLg: { paddingTop: space.lg, paddingBottom: space.lg },
  pyXl: { paddingTop: space.xl, paddingBottom: space.xl },
  ptMd: { paddingTop: space.md },
  prMd: { paddingRight: space.md },
  pbMd: { paddingBottom: space.md },
  plMd: { paddingLeft: space.md },

  /* margin */
  m0: { margin: 0 },
  mXs: { margin: space.xs },
  mSm: { margin: space.sm },
  mMd: { margin: space.md },
  mLg: { margin: space.lg },
  mXl: { margin: space.xl },
  m2Xl: { margin: space['2xl'] },
  mxAuto: { marginLeft: 'auto', marginRight: 'auto' },
  myAuto: { marginTop: 'auto', marginBottom: 'auto' },

  /* sizing */
  wFull: { width: '100%' },
  hFull: { height: '100%' },
  minW0: { minWidth: 0 },
  minH0: { minHeight: 0 },
  maxWFull: { maxWidth: '100%' },

  /* typography */
  fontSans: { fontFamily: fonts.sans },
  fontSerif: { fontFamily: fonts.serif },
  fontMono: { fontFamily: fonts.mono },
  textXs: { fontSize: '0.75rem', lineHeight: 1.5 },
  textSm: { fontSize: '0.875rem', lineHeight: 1.43 },
  textBase: { fontSize: '1rem', lineHeight: 1.5 },
  textLg: { fontSize: '1.125rem', lineHeight: 1.45 },
  fontNormal: { fontWeight: 400 },
  fontMedium: { fontWeight: 500 },
  fontSemibold: { fontWeight: 600 },
  fontBold: { fontWeight: 700 },
  textFg: { color: colors.fg },
  textMuted: { color: colors.fgMuted },
  textSubtle: { color: colors.fgSubtle },
  textStart: { textAlign: 'start' },
  textCenter: { textAlign: 'center' },
  textEnd: { textAlign: 'end' },
  leadingNone: { lineHeight: 1 },
  leadingTight: { lineHeight: 1.25 },
  leadingNormal: { lineHeight: 1.5 },
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  /* radius */
  roundedNone: { borderRadius: 0 },
  roundedSm: { borderRadius: radii.sm },
  roundedMd: { borderRadius: radii.md },
  roundedLg: { borderRadius: radii.lg },
  roundedFull: { borderRadius: radii.full },

  /* border */
  border0: { borderWidth: 0 },
  border: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.border,
  },
  borderStrong: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.borderStrong,
  },

  /* elevation */
  shadowNone: { boxShadow: 'none' },
  shadowCard: { boxShadow: elevation.card },
  shadowInput: { boxShadow: elevation.input },
  shadowCardHover: { boxShadow: elevation.cardHover },

  /* overflow */
  overflowHidden: { overflow: 'hidden' },
  overflowAuto: { overflow: 'auto' },
  overflowXAuto: { overflowX: 'auto' },
  overflowYAuto: { overflowY: 'auto' },

  /* position */
  static: { position: 'static' },
  relative: { position: 'relative' },
  absolute: { position: 'absolute' },
  fixed: { position: 'fixed' },
  inset0: { top: 0, right: 0, bottom: 0, left: 0 },

  /* surfaces */
  bgDefault: { backgroundColor: colors.bg },
  bgElevated: { backgroundColor: colors.bgElevated },
  bgSubtle: { backgroundColor: colors.bgSubtle },
})

/** Short alias for `utilities` in `stylex.props(u.flex, u.gapMd, …)`. */
export const u = utilities
