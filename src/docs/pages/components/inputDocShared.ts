export const inputProps = [
  {
    name: 'label',
    type: 'string',
    description: 'Optional visible label above the field.',
  },
  {
    name: 'helperText',
    type: 'string',
    description:
      'Helper copy; paired with `aria-describedby`. Same role as `hint` — `helperText` wins if both are set.',
  },
  {
    name: 'hint',
    type: 'string',
    description: 'Same as `helperText` for backwards compatibility.',
  },
  {
    name: 'description',
    type: 'string',
    description:
      'Supplementary copy (e.g. field purpose). Included in `aria-describedby` with the bottom message.',
  },
  {
    name: 'errorMessage',
    type: 'string',
    description:
      'Error copy; takes precedence over `error` when both are set. Overrides helper, success, and hint below.',
  },
  {
    name: 'error',
    type: 'string',
    description: 'Same as `errorMessage` for backwards compatibility.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    default: 'false',
    description:
      'Use when validation failed but you are not passing a string yet, or alongside `helperText` for rules while invalid.',
  },
  {
    name: 'successMessage',
    type: 'string',
    description: 'Positive feedback below the input (e.g. “Available”).',
  },
  {
    name: 'prefix',
    type: 'React.ReactNode',
    description:
      'When set (or when `suffix` is set), the control uses a single bordered shell with the input inside. Use for icons, currency symbols, or short labels.',
  },
  {
    name: 'suffix',
    type: 'React.ReactNode',
    description: 'Same layout as `prefix`; pair for units, actions, or trailing icons.',
  },
  {
    name: 'prefixAriaLabel',
    type: 'string',
    description:
      'When the prefix is not purely decorative (e.g. a button), set an accessible name. Decorative icons can omit this; the slot is then `aria-hidden` for assistive tech.',
  },
  {
    name: 'suffixAriaLabel',
    type: 'string',
    description: 'Same as `prefixAriaLabel` for the suffix slot.',
  },
  {
    name: 'requiredIndicator',
    type: 'boolean',
    default: 'true',
    description: 'When true and `required` is true, the label shows a * marker.',
  },
  {
    name: 'inputClassName',
    type: 'string',
    description: 'className applied only to the inner input.',
  },
  {
    name: 'inputStyle',
    type: 'React.CSSProperties',
    description: 'Merged onto the input after StyleX styles.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'className for the wrapper around label, description, input, and messages.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description: 'Inline styles for the outer wrapper.',
  },
  {
    name: 'id',
    type: 'string',
    description: 'Optional id for the input and message ids derived from it.',
  },
  {
    name: '…',
    type: 'Native input attrs',
    description:
      'value, onChange, type, placeholder, disabled, required, autoComplete, name, etc.',
  },
] as const

export const previewWrap = { maxWidth: 420 } as const
