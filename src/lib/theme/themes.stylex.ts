import * as stylex from '@stylexjs/stylex'
import { colors, elevation } from './tokens.stylex'

/** Dark palette — applied via `stylex.props(..., darkColorTheme)` on a subtree root. */
export const  darkColorTheme = stylex.createTheme(colors, {
  fg: '#f4f4f6',
  fgMuted: '#a1a1aa',
  fgSubtle: '#71717a',
  bg: '#0c0c0e',
  bgElevated: '#18181b',
  bgSubtle: '#141416',
  border: '#27272a',
  borderStrong: '#3f3f46',
  accent: '#a78bfa',
  accentFg: '#1c1024',
  accentMuted: 'rgba(167, 139, 250, 0.18)',
  danger: '#f87171',
  dangerFg: '#1c0909',
  dangerMuted: 'rgba(248, 113, 113, 0.18)',
  success: '#4ade80',
  successFg: '#052e12',
  successMuted: 'rgba(74, 222, 128, 0.18)',
  info: '#60a5fa',
  infoFg: '#0c1929',
  infoMuted: 'rgba(96, 165, 250, 0.18)',
  warning: '#fbbf24',
  warningFg: '#1c1404',
  warningMuted: 'rgba(251, 191, 36, 0.18)',
  help: '#22d3ee',
  helpFg: '#042f36',
  helpMuted: 'rgba(34, 211, 238, 0.18)',
  neutralMuted: 'rgba(244, 244, 246, 0.1)',
  focusRing: 'rgba(167, 139, 250, 0.5)',
  inputBg: '#18181b',
  inputBorder: '#3f3f46',
  placeholder: '#71717a',
})

export const darkElevationTheme = stylex.createTheme(elevation, {
  card: '0 1px 3px rgba(0, 0, 0, 0.45), 0 1px 2px rgba(0, 0, 0, 0.35)',
  cardHover: '0 12px 40px rgba(0, 0, 0, 0.55)',
  input: '0 1px 2px rgba(0, 0, 0, 0.35)',
})
