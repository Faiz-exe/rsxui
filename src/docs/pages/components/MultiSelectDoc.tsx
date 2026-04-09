import { useState } from 'react'
import { MultiSelect, type SelectOption, Stack, Text } from '../../../lib'
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

const opts: SelectOption[] = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
  { value: 'd', label: 'Delta' },
]

const multiProps = [
  {
    name: 'options',
    type: 'SelectOption[]',
    description: 'Choices in the listbox; same shape as Select.',
  },
  {
    name: 'value',
    type: 'string[]',
    description: 'Controlled selected values.',
  },
  {
    name: 'defaultValue',
    type: 'string[]',
    description: 'Uncontrolled initial selection.',
  },
  {
    name: 'onValuesChange',
    type: '(values: string[]) => void',
    description: 'Called when the selection set changes.',
  },
  {
    name: 'maxChips',
    type: 'number',
    default: '3',
    description: 'Chips shown in the trigger; extra items summarized as +N more.',
  },
  {
    name: 'name',
    type: 'string',
    description: 'Adds one hidden input per selected value for native forms.',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: "'Choose one or more…'",
    description: 'Empty state in the trigger.',
  },
  {
    name: 'label',
    type: 'string',
    description: 'Optional field label.',
  },
  {
    name: 'hint',
    type: 'string',
    description: 'Helper text when there is no error.',
  },
  {
    name: 'error',
    type: 'string',
    description: 'Validation message.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'Disables the field.',
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

export function MultiSelectDoc() {
  useDocMeta('MultiSelect', 'Multi-value listbox with chips, filter, and form-friendly hidden inputs.')
  const [values, setValues] = useState<string[]>(['a', 'c'])

  return (
    <DocArticle>
      <DocH1>MultiSelect</DocH1>
      <DocLead>
        Listbox with multiple selection, filter field, removable chips in the trigger,
        and the same label / hint / error pattern as Select.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="MultiSelect, type SelectOption" />

      <DocH2 id="usage">Usage</DocH2>
      <DocP>
        Use <InlineCode>value</InlineCode> and <InlineCode>onValuesChange</InlineCode>{' '}
        for controlled mode. The panel stays open while toggling options; click outside
        or press Escape to close.
      </DocP>

      <DocH2 id="basic">Basic</DocH2>
      <DocPreview
        title="Basic"
        code={`<MultiSelect
  label="Tags"
  options={opts}
  defaultValue={['a', 'c']}
/>`}
      >
        <div style={{ maxWidth: 420 }}>
          <MultiSelect label="Tags" options={opts} defaultValue={['a', 'c']} />
        </div>
      </DocPreview>

      <DocH2 id="controlled">Controlled</DocH2>
      <DocPreview
        title="Controlled"
        code={`const [values, setValues] = useState<string[]>(['a', 'c'])

<MultiSelect
  label="Tags"
  options={opts}
  value={values}
  onValuesChange={setValues}
  hint="Pick any combination."
/>`}
      >
        <Stack gap="md" style={{ maxWidth: 420 }}>
          <MultiSelect
            label="Tags"
            options={opts}
            value={values}
            onValuesChange={setValues}
            hint="Pick any combination."
          />
          <Text variant="small" tone="muted">
            Selected: {values.length ? values.join(', ') : 'none'}
          </Text>
        </Stack>
      </DocPreview>

      <DocH2 id="states">States</DocH2>
      <DocPreview
        title="Disabled / Error"
        code={`<MultiSelect label="Disabled" options={opts} disabled />
<MultiSelect label="With error" options={opts} error="Select at least one." />`}
      >
        <Stack gap="md" style={{ maxWidth: 420 }}>
          <MultiSelect label="Disabled" options={opts} disabled />
          <MultiSelect
            label="With error"
            options={opts}
            error="Select at least one."
          />
        </Stack>
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <PropsTable rows={[...multiProps]} />

      <DocH2 id="accessibility">Accessibility</DocH2>
      <DocP>
        The trigger exposes <InlineCode>aria-haspopup=&quot;listbox&quot;</InlineCode>,{' '}
        <InlineCode>aria-expanded</InlineCode>, and links label/hint/error via ids.
        The popup uses <InlineCode>role=&quot;listbox&quot;</InlineCode> with{' '}
        <InlineCode>aria-multiselectable</InlineCode> and each option uses{' '}
        <InlineCode>role=&quot;option&quot;</InlineCode>.
      </DocP>
      <DocP>
        Keyboard: <InlineCode>ArrowUp/ArrowDown</InlineCode> moves highlight,{' '}
        <InlineCode>Enter</InlineCode>/<InlineCode>Space</InlineCode> toggles the
        highlighted option, and <InlineCode>Escape</InlineCode> closes the panel.
      </DocP>
    </DocArticle>
  )
}
