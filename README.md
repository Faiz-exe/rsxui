# RSX UI

A modern React component library built with [StyleX](https://stylexjs.com). Zero-runtime CSS, fully typed, accessible by default, and themeable with design tokens.

## Features

- **30+ components** — Buttons, Inputs, Select, Dialog, Table, Toast, Tabs, Accordion, and more
- **StyleX powered** — Zero-runtime CSS with compile-time extraction
- **TypeScript first** — Full type safety with exported prop types
- **Accessible** — ARIA patterns, keyboard navigation, and focus management built in
- **Themeable** — Design tokens for colors, spacing, radii, fonts, and elevation
- **Dark mode** — Built-in light/dark themes with system preference detection

## Installation

```bash
npm install rsx-ui @stylexjs/stylex react react-dom
```

> **Note:** Your project needs a StyleX compiler plugin configured (e.g. `@stylexjs/unplugin` for Vite/Webpack, or `@stylexjs/babel-plugin` for Babel).

## Quick Start

```tsx
import { ThemeProvider, Button } from 'rsx-ui'
import 'rsx-ui/styles.css'

function App() {
  return (
    <ThemeProvider>
      <Button label="Get started" />
    </ThemeProvider>
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
`Toast` · `Dialog` · `Spinner`

### Layout
`Stack` · `Card` · `Accordion` · `Tabs` / `TabList` / `Tab` / `TabPanel`

### Display
`Text` · `Label` · `Badge`

### Theme
`ThemeProvider` · `ThemeToggle` · `useTheme`

## Theming

Wrap your app with `ThemeProvider` to enable theming and dark mode:

```tsx
import { ThemeProvider } from 'rsx-ui'

<ThemeProvider defaultColorScheme="system">
  {/* your app */}
</ThemeProvider>
```

### Design tokens

Override any token using `stylex.createTheme()`:

```tsx
import * as stylex from '@stylexjs/stylex'
import { colors, space, radii, fonts, elevation } from 'rsx-ui'
```

Built-in dark mode themes are also exported:

```tsx
import { darkColorTheme, darkElevationTheme } from 'rsx-ui'
```

## Utilities

Token-aligned StyleX utility styles for layout, spacing, and typography:

```tsx
import * as stylex from '@stylexjs/stylex'
import { u } from 'rsx-ui'

<div {...stylex.props(u.flex, u.gapMd, u.pLg, u.roundedMd)} />
```

## Requirements

| Dependency | Version |
|---|---|
| React | >= 18.0.0 |
| React DOM | >= 18.0.0 |
| StyleX | >= 0.10.0 |

Your bundler must have a [StyleX compiler plugin](https://stylexjs.com/docs/learn/installation/) configured.

## Development

```bash
# Install dependencies
npm install

# Start the docs site dev server
npm run dev

# Build the library for npm
npm run build:lib

# Build the docs site
npm run build
```

## License

MIT
