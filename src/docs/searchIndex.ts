export type SearchEntry = {
  to: string
  title: string
  desc: string
  category: string
  keywords: string[]
}

export const SEARCH_INDEX: SearchEntry[] = [
  // Getting started
  { to: '/docs', title: 'Overview', desc: 'Component index and library summary.', category: 'Getting started', keywords: ['overview', 'index', 'home'] },
  { to: '/docs/getting-started', title: 'Quick start', desc: 'Install, configure Vite, import CSS, and wrap your app in ThemeProvider.', category: 'Getting started', keywords: ['install', 'setup', 'vite', 'provider'] },
  { to: '/docs/theme', title: 'Theme & tokens', desc: 'ThemeProvider, useTheme, createTheme, custom token overrides.', category: 'Theming', keywords: ['theme', 'tokens', 'dark', 'light', 'colors', 'variables'] },
  { to: '/docs/utilities', title: 'Utilities', desc: 'StyleX layout and typography helpers aligned with design tokens.', category: 'Theming', keywords: ['utility', 'flex', 'spacing', 'padding', 'margin'] },

  // Inputs
  { to: '/docs/components/input-text', title: 'InputText', desc: 'Text field with label, helper text, disabled, and validation states.', category: 'Inputs', keywords: ['input', 'text', 'field', 'form'] },
  { to: '/docs/components/input-text-with-icon', title: 'Input with icon', desc: 'Prefix/suffix slots for icons, units, and action buttons.', category: 'Inputs', keywords: ['input', 'icon', 'prefix', 'suffix'] },
  { to: '/docs/components/input-number', title: 'InputNumber', desc: 'Numeric field with min, max, and step controls.', category: 'Inputs', keywords: ['input', 'number', 'numeric', 'step'] },

  // Forms
  { to: '/docs/components/checkbox', title: 'Checkbox', desc: 'Labeled checkbox with description, invalid, and indeterminate states.', category: 'Forms', keywords: ['checkbox', 'check', 'indeterminate', 'form'] },
  { to: '/docs/components/switch', title: 'Switch', desc: 'Toggle with track and thumb; semantically a checkbox with role=switch.', category: 'Forms', keywords: ['switch', 'toggle', 'on', 'off'] },
  { to: '/docs/components/slider', title: 'Slider', desc: 'Range slider for picking a single value or range with min, max, and step.', category: 'Forms', keywords: ['slider', 'range', 'input', 'thumb'] },
  { to: '/docs/components/radio', title: 'Radio', desc: 'RadioGroup and Radio options with a shared accessible name.', category: 'Forms', keywords: ['radio', 'group', 'option', 'select'] },
  { to: '/docs/components/select', title: 'Select', desc: 'Custom listbox with keyboard support, animations, and form API.', category: 'Forms', keywords: ['select', 'dropdown', 'listbox', 'option'] },
  { to: '/docs/components/multi-select', title: 'MultiSelect', desc: 'Multi-value listbox with chips, filter, and form-friendly hidden inputs.', category: 'Forms', keywords: ['multiselect', 'multi', 'chips', 'tags'] },
  { to: '/docs/components/autocomplete', title: 'Autocomplete', desc: 'Combobox with type-ahead filtering and keyboard selection.', category: 'Forms', keywords: ['autocomplete', 'combobox', 'search', 'filter', 'typeahead'] },

  // Actions
  { to: '/docs/components/button', title: 'Button', desc: 'Severities, sizes, outlined, text, loading, and icon variants.', category: 'Actions', keywords: ['button', 'click', 'action', 'submit'] },
  { to: '/docs/components/toggle-button', title: 'ToggleButton', desc: 'Pressed-state buttons and single or multi-select groups.', category: 'Actions', keywords: ['toggle', 'button', 'pressed', 'group'] },
  { to: '/docs/components/split-button', title: 'SplitButton', desc: 'Primary action with an attached dropdown menu.', category: 'Actions', keywords: ['split button', 'action', 'menu', 'dropdown'] },

  // Data
  { to: '/docs/components/table', title: 'Table', desc: 'Sortable columns, pagination, loading, and empty states.', category: 'Data', keywords: ['table', 'data', 'sort', 'pagination', 'grid'] },
  { to: '/docs/components/pagination', title: 'Pagination', desc: 'Standalone pagination control with rich configuration options.', category: 'Data', keywords: ['pagination', 'page', 'navigation', 'list'] },

  // Feedback
  { to: '/docs/components/toast', title: 'Toast', desc: 'Snackbar: anchor positions, filled severities, and ref API.', category: 'Feedback', keywords: ['toast', 'snackbar', 'notification', 'message'] },
  { to: '/docs/components/dialog', title: 'Dialog', desc: 'Modal dialog with backdrop, focus trap, sizes, and footer actions.', category: 'Feedback', keywords: ['dialog', 'modal', 'popup', 'overlay'] },
  { to: '/docs/components/spinner', title: 'Spinner', desc: 'Loading indicator with size and semantic tone variants.', category: 'Feedback', keywords: ['spinner', 'loading', 'progress', 'indicator'] },
  { to: '/docs/components/alert', title: 'Alert', desc: 'Static banners for info, success, warning, and danger messages.', category: 'Feedback', keywords: ['alert', 'banner', 'warning', 'error', 'info'] },
  { to: '/docs/components/progress', title: 'Progress', desc: 'Determinate and indeterminate progress bars with severity colors.', category: 'Feedback', keywords: ['progress', 'bar', 'loading', 'percent'] },
  { to: '/docs/components/tooltip', title: 'Tooltip', desc: 'Hover and focus hints with four positions and configurable delay.', category: 'Feedback', keywords: ['tooltip', 'hover', 'hint', 'popover'] },

  // Navigation
  { to: '/docs/components/accordion', title: 'Accordion', desc: 'Expandable sections; single or multiple open, ARIA wired.', category: 'Navigation', keywords: ['accordion', 'collapse', 'expand', 'section'] },
  { to: '/docs/components/tabs', title: 'Tabs', desc: 'Tablist, tabs, and panels with keyboard navigation.', category: 'Navigation', keywords: ['tabs', 'tab', 'panel', 'tablist'] },
  { to: '/docs/components/breadcrumb', title: 'Breadcrumb', desc: 'Accessible navigation trail for hierarchical page paths.', category: 'Navigation', keywords: ['breadcrumb', 'navigation', 'trail', 'path', 'nav'] },

  // Display
  { to: '/docs/components/label', title: 'Label', desc: 'Form labels with optional required marker.', category: 'Display', keywords: ['label', 'form', 'required'] },
  { to: '/docs/components/badge', title: 'Badge', desc: 'Semantic pill badges in multiple sizes and colors.', category: 'Display', keywords: ['badge', 'pill', 'tag', 'status'] },
  { to: '/docs/components/avatar', title: 'Avatar', desc: 'User images, initials, sizes, severities, and AvatarGroup.', category: 'Display', keywords: ['avatar', 'user', 'image', 'initials', 'group'] },
  { to: '/docs/components/card', title: 'Card', desc: 'Elevated surfaces with padding and interactive variants.', category: 'Display', keywords: ['card', 'surface', 'container', 'elevated'] },
  { to: '/docs/components/calendar', title: 'Calendar', desc: 'DatePicker (input + popup) and inline calendar with month/year picker; with flexible date formatting.', category: 'Display', keywords: ['calendar', 'date', 'datepicker', 'picker', 'month', 'year', 'month picker', 'year picker'] },
  { to: '/docs/components/divider', title: 'Divider', desc: 'Horizontal or vertical separator with optional label.', category: 'Display', keywords: ['divider', 'separator', 'line', 'hr'] },
  { to: '/docs/components/skeleton', title: 'Skeleton', desc: 'Shimmer placeholders for text, circles, and rectangles.', category: 'Display', keywords: ['skeleton', 'placeholder', 'loading', 'shimmer'] },
  { to: '/docs/components/stack', title: 'Stack', desc: 'Flex row or column with gap, align, and justify props.', category: 'Display', keywords: ['stack', 'layout', 'flex', 'row', 'column'] },
  { to: '/docs/components/text', title: 'Text', desc: 'Typography variants, tones, truncation, and line clamping.', category: 'Display', keywords: ['text', 'typography', 'heading', 'paragraph'] },
  { to: '/docs/components/theme-toggle', title: 'ThemeToggle', desc: 'Cycle between system, light, and dark themes.', category: 'Display', keywords: ['theme', 'toggle', 'dark', 'light', 'mode'] },
]
