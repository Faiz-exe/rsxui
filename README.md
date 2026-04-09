# RSX UI

A modern React component library built with [StyleX](https://stylexjs.com). Zero-runtime CSS, fully typed, accessible by default, and themeable with design tokens.

[![npm](https://img.shields.io/npm/v/react-stylex-ui)](https://www.npmjs.com/package/react-stylex-ui)
[![license](https://img.shields.io/npm/l/react-stylex-ui)](./LICENSE)

## Features

- **36+ components** — Buttons, Inputs, Select, Dialog, Table, Toast, Tabs, Accordion, and more
- **StyleX powered** — Zero-runtime CSS with compile-time extraction
- **TypeScript first** — Full type safety with exported prop types
- **Accessible** — ARIA patterns, keyboard navigation, and focus management built in
- **Themeable** — Design tokens for colors, spacing, radii, fonts, and elevation
- **Dark mode** — Built-in light/dark themes with system preference detection

## Installation

```bash
npm install react-stylex-ui @stylexjs/stylex
npm install -D @stylexjs/unplugin
```

## Vite Setup

Add the StyleX plugin **before** `@vitejs/plugin-react`:

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import stylex from '@stylexjs/unplugin'

export default defineConfig({
  plugins: [
    stylex.vite({
      useCSSLayers: true,
    }),
    react(),
  ],
})
```

## Quick Start

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'react-stylex-ui'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultColorScheme="system">
      <App />
    </ThemeProvider>
  </StrictMode>,
)
```

```tsx
// App.tsx
import { Button } from 'react-stylex-ui'

export default function App() {
  return (
    <Button severity="primary" onClick={() => alert('It works!')}>
      Hello RSX UI
    </Button>
  )
}
```

## Components

### Inputs
`Input` · `InputNumber` · `Checkbox` · `Switch` · `Radio` / `RadioGroup` · `Select` · `MultiSelect` · `Autocomplete`

### Actions
`Button` · `SplitButton` · `ToggleButton` / `ToggleButtonGroup`

### Data
`Table` (sortable, paginated, selectable)

### Feedback
`Toast` · `Dialog` · `Spinner` · `Alert` · `Progress`

### Layout
`Stack` · `Card` · `Accordion` · `Tabs` / `TabList` / `Tab` / `TabPanel` · `Divider`

### Display
`Text` · `Label` · `Badge` · `Avatar` / `AvatarGroup` · `Tooltip` · `Skeleton`

### Theme
`ThemeProvider` · `ThemeToggle` · `useTheme`

## Theming

Override design tokens with `stylex.createTheme()`:

```tsx
import * as stylex from '@stylexjs/stylex'
import { colors, space, radii, fonts, elevation } from 'react-stylex-ui'

const brandColors = stylex.createTheme(colors, {
  accent: '#2dd4bf',
  accentFg: '#042f2e',
})
```

## Utilities

Token-aligned StyleX utility styles for layout, spacing, and typography:

```tsx
import * as stylex from '@stylexjs/stylex'
import { u } from 'react-stylex-ui'

<div {...stylex.props(u.flex, u.gapMd, u.pLg, u.roundedMd)} />
```

## Requirements

| Dependency | Version |
|---|---|
| React | >= 18.0.0 |
| React DOM | >= 18.0.0 |
| @stylexjs/stylex | >= 0.10.0 |
| @stylexjs/unplugin | >= 0.10.0 (dev) |

## Development

```bash
npm install
npm run dev          # docs site dev server
npm run build:lib    # build library for npm
npm run build        # build docs site
```

## License

MIT
