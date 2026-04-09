# RSX UI (React + StyleX Components)

A React component library and docs site built with TypeScript, Vite, and StyleX.

## Stack

- React 19
- TypeScript
- Vite
- StyleX
- React Router

## Getting Started

```bash
npm install
npm run dev
```

Open:

- `http://localhost:5173/` - intro
- `http://localhost:5173/demo` - playground
- `http://localhost:5173/docs` - full documentation

## Scripts

- `npm run dev` - start dev server
- `npm run build` - type-check + production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

## Library Entry

Use exports from:

- `src/lib/index.ts`

Example:

```tsx
import { Button, ThemeProvider } from './src/lib'

export function App() {
  return (
    <ThemeProvider>
      <Button>Click me</Button>
    </ThemeProvider>
  )
}
```

## Included Components

- Button, SplitButton
- Input, InputNumber
- Checkbox, Switch, Radio/RadioGroup
- Select, MultiSelect, Autocomplete
- ToggleButton, ToggleButtonGroup
- Table
- Toast
- Dialog
- Accordion
- Tabs
- Label, Card, Badge, Stack, Text
- ThemeToggle

## Theming

Theme APIs are exported from `src/lib`:

- `ThemeProvider`
- `useTheme`
- token groups: `colors`, `space`, `radii`, `fonts`, `elevation`
- built-in dark layers: `darkColorTheme`, `darkElevationTheme`

`src/main.tsx` already wraps the app with `ThemeProvider`.

## Utilities

Token-based utility styles are exported as:

- `utilities`
- `u` (alias)

Defined in:

- `src/lib/utilities/utilities.stylex.ts`

Use with `stylex.props(...)`:

```tsx
import * as stylex from '@stylexjs/stylex'
import { u } from './src/lib'

<div {...stylex.props(u.flex, u.gapMd, u.pLg, u.roundedMd, u.border)} />
```

Utilities docs:

- `/docs/utilities`
- `/docs/utilities/display`
- `/docs/utilities/flex-layout`
- `/docs/utilities/spacing`
- `/docs/utilities/sizing`
- `/docs/utilities/typography`
- `/docs/utilities/border-shadow`
- `/docs/utilities/position`
- `/docs/utilities/overflow`
- `/docs/utilities/background`
