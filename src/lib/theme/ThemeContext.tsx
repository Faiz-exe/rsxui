import { createContext, useContext } from 'react'

export type ColorScheme = 'light' | 'dark' | 'system'

export type ThemeContextValue = {
  colorScheme: ColorScheme
  setColorScheme: (scheme: ColorScheme) => void
  /** Resolved after applying `system` + `prefers-color-scheme`. */
  resolved: 'light' | 'dark'
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (ctx == null) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}
