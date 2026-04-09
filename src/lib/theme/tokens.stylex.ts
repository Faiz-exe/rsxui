import * as stylex from '@stylexjs/stylex'

/**
 * Semantic color tokens — override per theme with `createTheme(colors, overrides)`.
 */
export const colors = stylex.defineVars({
  fg: '#0f0f12',
  fgMuted: '#5c5a66',
  fgSubtle: '#86838f',
  bg: '#ffffff',
  bgElevated: '#f8f8fa',
  bgSubtle: '#f4f4f6',
  border: '#e4e4e8',
  borderStrong: '#c8c8d0',
  accent: '#2563eb',
  accentFg: '#ffffff',
  accentMuted: 'rgba(37, 99, 235, 0.10)',
  danger: '#dc2626',
  dangerFg: '#ffffff',
  dangerMuted: 'rgba(220, 38, 38, 0.12)',
  success: '#16a34a',
  successFg: '#ffffff',
  successMuted: 'rgba(22, 163, 74, 0.12)',
  info: '#2563eb',
  infoFg: '#ffffff',
  infoMuted: 'rgba(37, 99, 235, 0.12)',
  warning: '#d97706',
  warningFg: '#ffffff',
  warningMuted: 'rgba(217, 119, 6, 0.12)',
  help: '#0891b2',
  helpFg: '#ffffff',
  helpMuted: 'rgba(8, 145, 178, 0.12)',
  neutralMuted: 'rgba(15, 15, 18, 0.08)',
  focusRing: 'rgba(37, 99, 235, 0.4)',
  inputBg: '#ffffff',
  inputBorder: '#d1d5db',
  placeholder: '#9ca3af',
  /** Dialog / drawer backdrop — semi-transparent dark wash */
  overlay: 'rgba(15, 15, 18, 0.5)',
})

export const fonts = stylex.defineVars({
  sans: '"DM Sans", system-ui, -apple-system, "Segoe UI", sans-serif',
  /** Long-form docs copy — pair with `sans` for UI chrome. */
  serif: '"Literata", Georgia, "Times New Roman", serif',
  mono: '"JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
})

export const space = stylex.defineVars({
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '32px',
})

export const radii = stylex.defineVars({
  sm: '6px',
  md: '10px',
  lg: '14px',
  full: '9999px',
})

/** Elevation — pair with `darkElevation` theme for dark mode. */
export const elevation = stylex.defineVars({
  card: '0 1px 3px rgba(15, 15, 20, 0.08), 0 1px 2px rgba(15, 15, 20, 0.04)',
  cardHover: '0 10px 28px rgba(15, 15, 20, 0.12)',
  input: '0 1px 2px rgba(15, 15, 20, 0.04)',
})
