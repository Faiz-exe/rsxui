import { useState } from 'react'
import { Autocomplete, type SelectOption, Stack, Text } from '../../../lib'
import { DocImport } from '../../ui/DocImport'
import { DocPreview } from '../../ui/DocPreview'
import { PropsTable } from '../../ui/PropsTable'
import {
  DocArticle,
  DocH1,
  DocH2,
  DocLead,
  DocP,
  InlineCode,
} from '../../ui/Prose'
import { useDocMeta } from '../../useDocMeta'

const cityOptions: SelectOption[] = [
  { value: 'nyc', label: 'New York', searchText: 'nyc new york' },
  { value: 'lon', label: 'London' },
  { value: 'tok', label: 'Tokyo' },
  { value: 'syd', label: 'Sydney' },
  { value: 'ber', label: 'Berlin' },
]

const acProps = [
  {
    name: 'options',
    type: 'SelectOption[]',
    description: 'Available suggestions. Each entry is matched against its `value`, `searchText`, or string `label`.',
  },
  {
    name: 'value',
    type: 'string',
    description: 'Controlled selected option value.',
  },
  {
    name: 'defaultValue',
    type: 'string',
    default: "''",
    description: 'Uncontrolled initial value.',
  },
  {
    name: 'onValueChange',
    type: '(value: string) => void',
    description: 'Called when the user picks a suggestion.',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: "'Type to search…'",
    description: 'Placeholder text displayed in the input when no value is selected.',
  },
  {
    name: 'name',
    type: 'string',
    description: 'Hidden input for form posts.',
  },
  {
    name: 'label',
    type: 'string',
    description: 'Optional field label.',
  },
  {
    name: 'hint',
    type: 'string',
    description: 'Helper text displayed below the field when the input is valid.',
  },
  {
    name: 'error',
    type: 'string',
    description: 'Validation error message; takes precedence over `hint` when both are set.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'Disables the input.',
  },
  {
    name: 'id',
    type: 'string',
    description: 'Override generated ids.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Merged on the root.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description: 'Merged on the root.',
  },
] as const

export function AutocompleteDoc() {
  useDocMeta('Autocomplete', 'Combobox with type-ahead filtering and keyboard selection.')
  const [city, setCity] = useState('lon')

  return (
    <DocArticle>
      <DocH1>Autocomplete</DocH1>
      <DocLead>
        Combobox with type-ahead filtering. Type to narrow the suggestion list, then navigate with
        arrow keys and confirm with <InlineCode>Enter</InlineCode>. Shares the same option model
        as <InlineCode>Select</InlineCode>.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Autocomplete, type SelectOption" />

      <DocH2 id="usage">Usage</DocH2>
      <DocP>
        Focusing the input opens the suggestion list; clicking outside or pressing{' '}
        <InlineCode>Escape</InlineCode> closes it. The visible input text reflects the
        selected option's label. <InlineCode>aria-activedescendant</InlineCode> tracks the
        highlighted row while keyboard focus remains on the input.
      </DocP>

      <DocH2 id="basic">Basic</DocH2>
      <DocPreview
        title="Basic"
        code={`<Autocomplete label="City" options={cityOptions} />`}
      >
        <div style={{ maxWidth: 420 }}>
          <Autocomplete label="City" options={cityOptions} />
        </div>
      </DocPreview>

      <DocH2 id="controlled">Controlled</DocH2>
      <DocPreview
        title="Controlled"
        code={`const [city, setCity] = useState('lon')

<Autocomplete
  label="City"
  options={cityOptions}
  value={city}
  onValueChange={setCity}
  hint="Try typing “new” or “york”."
/>`}
      >
        <div style={{ maxWidth: 420 }}>
          <Autocomplete
            label="City"
            options={cityOptions}
            value={city}
            onValueChange={setCity}
            hint='Try typing "new" or "york".'
          />
          <Text variant="small" tone="muted" style={{ marginTop: 8 }}>
            value: {city}
          </Text>
        </div>
      </DocPreview>

      <DocH2 id="states">States</DocH2>
      <DocPreview
        title="Disabled / Error"
        code={`<Autocomplete label="Disabled" options={cityOptions} disabled />
<Autocomplete label="With error" options={cityOptions} error="Select a valid city." />`}
      >
        <div style={{ maxWidth: 420 }}>
          <Stack gap="md">
            <Autocomplete label="Disabled" options={cityOptions} disabled />
            <Autocomplete
              label="With error"
              options={cityOptions}
              error="Select a valid city."
            />
          </Stack>
        </div>
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <PropsTable rows={[...acProps]} />

      <DocH2 id="accessibility">Accessibility</DocH2>
      <DocP>
        The input uses <InlineCode>role=&quot;combobox&quot;</InlineCode> with{' '}
        <InlineCode>aria-autocomplete=&quot;list&quot;</InlineCode>,{' '}
        <InlineCode>aria-expanded</InlineCode>, and{' '}
        <InlineCode>aria-activedescendant</InlineCode> while open. The popup uses{' '}
        <InlineCode>role=&quot;listbox&quot;</InlineCode> and options use{' '}
        <InlineCode>role=&quot;option&quot;</InlineCode>.
      </DocP>
      <DocP>
        Keyboard: <InlineCode>ArrowDown</InlineCode> /{' '}
        <InlineCode>ArrowUp</InlineCode> changes highlight,{' '}
        <InlineCode>Enter</InlineCode> selects, and{' '}
        <InlineCode>Escape</InlineCode> closes the popup.
      </DocP>
    </DocArticle>
  )
}
