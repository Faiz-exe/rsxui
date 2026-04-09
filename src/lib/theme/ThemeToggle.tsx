import { memo } from 'react'
import { Button } from '../Button/Button'
import { Stack } from '../Stack/Stack'
import { Text } from '../Text/Text'
import type { ColorScheme } from './ThemeContext'
import { useTheme } from './ThemeContext'

function labelFor(scheme: ColorScheme): string {
  if (scheme === 'system') return 'Theme: System'
  if (scheme === 'light') return 'Theme: Light'
  return 'Theme: Dark'
}

function nextScheme(current: ColorScheme): ColorScheme {
  if (current === 'system') return 'light'
  if (current === 'light') return 'dark'
  return 'system'
}

export const ThemeToggle = memo(function ThemeToggle() {
  const { colorScheme, setColorScheme, resolved } = useTheme()
  return (
    <Stack direction="row" gap="sm" style={{ alignItems: 'center' }}>
      <Text variant="small" tone="muted" as="span">
        {resolved === 'dark' ? 'Dark' : 'Light'} (active)
      </Text>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() => setColorScheme(nextScheme(colorScheme))}
        aria-label={`Switch color scheme. Current: ${colorScheme}. ${labelFor(colorScheme)}.`}
      >
        {labelFor(colorScheme)}
      </Button>
    </Stack>
  )
})
