import * as stylex from '@stylexjs/stylex'
import type { CompiledStyles } from '@stylexjs/stylex'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { mergeSx } from '../utils/mergeSx'
import { ThemeContext, type ColorScheme, type ThemeContextValue } from './ThemeContext'
import { styles } from './ThemeProvider.stylex'
import { darkColorTheme, darkElevationTheme } from './themes.stylex'

const defaultDarkLayers = [darkColorTheme, darkElevationTheme] as const

/**
 * Optional StyleX theme layers from `stylex.createTheme(colors, overrides)` /
 * `createTheme(elevation, overrides)` using **this library’s** `colors` and
 * `elevation` contracts (`tokens.stylex.ts`). Applied on the provider root so
 * all descendants pick up new CSS variable values.
 */
export type ThemeLayers = {
  /** Applied when `resolved === 'light'`. Default: none (use `defineVars` defaults). */
  light?: readonly CompiledStyles[]
  /** Applied when `resolved === 'dark'`. Default: built-in dark color + elevation themes. */
  dark?: readonly CompiledStyles[]
}

const STORAGE_KEY = 'rsx-color-scheme'

function readStored(): ColorScheme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'light' || v === 'dark' || v === 'system') return v
  } catch {
    /* ignore */
  }
  return null
}

function resolveScheme(
  scheme: ColorScheme,
  systemIsDark: boolean,
): 'light' | 'dark' {
  if (scheme === 'system') return systemIsDark ? 'dark' : 'light'
  return scheme
}

function layerStyles(
  resolved: 'light' | 'dark',
  themeLayers: ThemeLayers | undefined,
): CompiledStyles[] {
  if (resolved === 'dark') {
    return [...(themeLayers?.dark ?? defaultDarkLayers)]
  }
  return [...(themeLayers?.light ?? [])]
}

export type ThemeProviderProps = {
  children: ReactNode
  /** Uncontrolled default when nothing in `localStorage`. */
  defaultColorScheme?: ColorScheme
  /** Disable reading/writing `localStorage` (e.g. SSR). */
  disableStorage?: boolean
  /**
   * Replace or extend light/dark token layers. Build themes in your app with
   * `stylex.createTheme` targeting the exported `colors` / `elevation` groups.
   */
  themeLayers?: ThemeLayers
  className?: string
  style?: CSSProperties
}

export function ThemeProvider({
  children,
  defaultColorScheme = 'system',
  disableStorage = false,
  themeLayers,
  className,
  style,
}: ThemeProviderProps) {
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(() => {
    if (disableStorage) return defaultColorScheme
    return readStored() ?? defaultColorScheme
  })

  const [systemDark, setSystemDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setSystemDark(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const setColorScheme = useCallback(
    (scheme: ColorScheme) => {
      setColorSchemeState(scheme)
      if (!disableStorage) {
        try {
          localStorage.setItem(STORAGE_KEY, scheme)
        } catch {
          /* ignore */
        }
      }
    },
    [disableStorage],
  )

  const resolved = useMemo(
    () => resolveScheme(colorScheme, systemDark),
    [colorScheme, systemDark],
  )

  const ctx = useMemo<ThemeContextValue>(
    () => ({
      colorScheme,
      setColorScheme,
      resolved,
    }),
    [colorScheme, setColorScheme, resolved],
  )

  const rootSx = stylex.props(styles.root, ...layerStyles(resolved, themeLayers))

  return (
    <ThemeContext.Provider value={ctx}>
      <div {...mergeSx(rootSx, className, style)}>{children}</div>
    </ThemeContext.Provider>
  )
}
