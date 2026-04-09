import { useMemo, useState } from 'react'
import { Select, type SelectOption, Stack, Text } from '../../../lib'
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

const themeOptions: SelectOption[] = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

const countryOptions: SelectOption[] = [
  { value: 'us', label: 'United States', searchText: 'usa america' },
  { value: 'de', label: 'Germany', searchText: 'deutschland' },
  { value: 'jp', label: 'Japan' },
  { value: 'br', label: 'Brazil' },
]

const selectProps = [
  {
    name: 'options',
    type: 'SelectOption[]',
    description: 'Choices rendered in the dropdown listbox.',
  },
  {
    name: 'label',
    type: 'string',
    description: 'Optional field label.',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: "'Select…'",
    description: 'Empty-state text when nothing matches the current value.',
  },
  {
    name: 'hint',
    type: 'string',
    description: 'Shown below the field when there is no error.',
  },
  {
    name: 'error',
    type: 'string',
    description: 'Validation message; takes precedence over hint.',
  },
  {
    name: 'requiredIndicator',
    type: 'boolean',
    default: 'true',
    description: 'Decorates the label for required fields.',
  },
  {
    name: 'value',
    type: 'string',
    description: 'Controlled mode — pair with onValueChange. Use empty string to clear.',
  },
  {
    name: 'defaultValue',
    type: 'string',
    description: 'Uncontrolled default selection.',
  },
  {
    name: 'onValueChange',
    type: '(value: string) => void',
    description: 'Called after each selection with the option value.',
  },
  {
    name: 'name',
    type: 'string',
    description: 'Optional form field name (hidden input value).',
  },
  {
    name: 'id',
    type: 'string',
    description: 'Override auto-generated ids.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'Disables the control.',
  },
  {
    name: 'required',
    type: 'boolean',
    description: 'Marks the field as required for assistive tech.',
  },
  {
    name: 'showClear',
    type: 'boolean',
    default: 'false',
    description:
      'Shows a clear control when a value is selected; clears to empty string and fires onValueChange.',
  },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    description: 'Use while options are fetched.',
  },
  {
    name: 'loadingPlaceholder',
    type: 'string',
    default: "'Loading…'",
    description: 'Shown when loading is true.',
  },
  {
    name: 'filter',
    type: 'boolean',
    default: 'false',
    description: 'Filters by value, searchText, or string label.',
  },
  {
    name: 'filterPlaceholder',
    type: 'string',
    default: "'Search…'",
    description: 'Shown in the panel search field.',
  },
  {
    name: 'valueTemplate',
    type: '(option: SelectOption | null) => ReactNode',
    description: 'null means no selection — render placeholder yourself if needed.',
  },
  {
    name: 'itemTemplate',
    type: '(option: SelectOption) => ReactNode',
    description: 'Override default option label in the list.',
  },
  {
    name: 'panelFooter',
    type: 'ReactNode',
    description: 'e.g. help text or actions.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'className on the root container.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description: 'Inline styles on the root container.',
  },
] as const

export function SelectDoc() {
  const [theme, setTheme] = useState('system')
  const [clearValue, setClearValue] = useState('light')
  const [loadingValue, setLoadingValue] = useState('system')
  const [loadingSim, setLoadingSim] = useState(false)
  const [filterValue, setFilterValue] = useState('de')
  const [templateValue, setTemplateValue] = useState('de')

  const loadingOpts = useMemo<SelectOption[]>(
    () => (loadingSim ? [] : themeOptions),
    [loadingSim],
  )

  return (
    <DocArticle>
      <DocH1>Select</DocH1>
      <DocLead>
        Listbox on a button trigger with optional clear, loading, filter, and
        value/item templates. Ref targets the trigger{' '}
        <InlineCode>&lt;button&gt;</InlineCode>.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Select, type SelectOption" />

      <DocH2 id="usage">Usage</DocH2>
      <DocP>
        Pass an <InlineCode>options</InlineCode> array. Use{' '}
        <InlineCode>value</InlineCode> + <InlineCode>onValueChange</InlineCode> for
        controlled state, or <InlineCode>defaultValue</InlineCode> for uncontrolled.
      </DocP>
      <DocPreview
        title="Basic"
        code={`const options = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

<Select label="Appearance" options={options} defaultValue="system" />`}
      >
        <div style={{ maxWidth: 380 }}>
          <Stack gap="md">
            <Select label="Appearance" options={themeOptions} value={theme} onValueChange={setTheme} />
            <DocP>
              Current: <InlineCode>{theme}</InlineCode>
            </DocP>
          </Stack>
        </div>
      </DocPreview>

      <DocH2 id="clear">Clear</DocH2>
      <DocP>
        Set <InlineCode>showClear</InlineCode> to show a clear control when a value is
        selected. Clearing sets the value to <InlineCode>''</InlineCode> and calls{' '}
        <InlineCode>onValueChange('')</InlineCode>.
      </DocP>
      <DocPreview
        title="showClear"
        code={`<Select
  label="Theme"
  options={options}
  value={value}
  onValueChange={setValue}
  showClear
/>`}
      >
        <div style={{ maxWidth: 380 }}>
          <Stack gap="md">
            <Select
              label="Theme"
              options={themeOptions}
              value={clearValue}
              onValueChange={setClearValue}
              showClear
            />
            <DocP>
              Value: <InlineCode>{clearValue === '' ? '(empty)' : clearValue}</InlineCode>
            </DocP>
          </Stack>
        </div>
      </DocPreview>

      <DocH2 id="loading">Loading</DocH2>
      <DocP>
        While <InlineCode>loading</InlineCode> is true, the trigger shows a spinner and
        <InlineCode> loadingPlaceholder</InlineCode>, sets <InlineCode>aria-busy</InlineCode>,
        and the panel does not open. Pair with empty <InlineCode>options</InlineCode>{' '}
        while data is fetching.
      </DocP>
      <DocPreview
        title="loading"
        code={`<Select
  label="Theme"
  options={options}
  value={value}
  onValueChange={setValue}
  loading={isFetching}
  loadingPlaceholder="Fetching themes…"
/>`}
      >
        <div style={{ maxWidth: 400 }}>
          <Stack gap="md">
            <Select
              label="Theme"
              options={loadingOpts}
              value={loadingValue}
              onValueChange={setLoadingValue}
              loading={loadingSim}
              loadingPlaceholder="Fetching themes…"
            />
            <Text variant="small" tone="muted" as="p">
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  checked={loadingSim}
                  onChange={(e) => setLoadingSim(e.target.checked)}
                />
                Simulate loading (empty options)
              </label>
            </Text>
          </Stack>
        </div>
      </DocPreview>

      <DocH2 id="filter">Filter</DocH2>
      <DocP>
        Set <InlineCode>filter</InlineCode> to add a search field above the list.
        Matching uses each option&apos;s <InlineCode>value</InlineCode>, optional{' '}
        <InlineCode>searchText</InlineCode>, and plain-string <InlineCode>label</InlineCode>.
        Use <InlineCode>filterPlaceholder</InlineCode> for the input hint.
      </DocP>
      <DocPreview
        title="filter"
        code={`<Select
  label="Country"
  options={countries}
  value={value}
  onValueChange={setValue}
  filter
  filterPlaceholder="Search countries…"
/>`}
      >
        <div style={{ maxWidth: 380 }}>
          <Stack gap="md">
            <Select
              label="Country"
              options={countryOptions}
              value={filterValue}
              onValueChange={setFilterValue}
              filter
              filterPlaceholder="Search countries…"
            />
            <DocP>
              Selected: <InlineCode>{filterValue}</InlineCode>
            </DocP>
          </Stack>
        </div>
      </DocPreview>

      <DocH2 id="disabled">Disabled</DocH2>
      <DocP>
        Native <InlineCode>disabled</InlineCode> on the trigger: no open, muted styling.
      </DocP>
      <DocPreview
        title="disabled"
        code={`<Select label="Theme" options={options} value="light" disabled />`}
      >
        <div style={{ maxWidth: 380 }}>
          <Select label="Theme" options={themeOptions} value="light" disabled />
        </div>
      </DocPreview>

      <DocH2 id="templates">Templating</DocH2>
      <DocP>
        <InlineCode>valueTemplate</InlineCode> controls the trigger;
        <InlineCode> itemTemplate</InlineCode> controls each row;{' '}
        <InlineCode>panelFooter</InlineCode> renders below the list.
      </DocP>
      <DocPreview
        title="valueTemplate · itemTemplate · panelFooter"
        code={`<Select
  options={options}
  value={v}
  onValueChange={setV}
  filter
  valueTemplate={(opt) =>
    opt ? (
      <span><strong>{opt.value}</strong> — {opt.label}</span>
    ) : (
      <span>Pick one</span>
    )
  }
  itemTemplate={(opt) => (
    <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <span aria-hidden>🏳️</span>
      {opt.label}
    </span>
  )}
  panelFooter={<span>Footer slot</span>}
/>`}
      >
        <div style={{ maxWidth: 400 }}>
          <Select
            label="Country"
            options={countryOptions}
            value={templateValue}
            onValueChange={setTemplateValue}
            filter
            valueTemplate={(opt) =>
              opt ? (
                <span>
                  <strong>{opt.value}</strong>
                  {' — '}
                  {opt.label}
                </span>
              ) : (
                <span>Pick a country</span>
              )
            }
            itemTemplate={(opt) => (
              <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span aria-hidden>🏳️</span>
                {opt.label}
              </span>
            )}
            panelFooter={
              <span style={{ fontSize: '0.75rem' }}>
                Footer slot — help text or actions.
              </span>
            }
          />
        </div>
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <PropsTable rows={[...selectProps]} />

      <DocH2 id="accessibility">Accessibility</DocH2>
      <DocP>
        The trigger uses <InlineCode>aria-haspopup=&quot;listbox&quot;</InlineCode>,{' '}
        <InlineCode>aria-expanded</InlineCode>, and{' '}
        <InlineCode>aria-controls</InlineCode>. The list uses{' '}
        <InlineCode>role=&quot;listbox&quot;</InlineCode> with{' '}
        <InlineCode>aria-activedescendant</InlineCode> for the highlighted option.
        Options use <InlineCode>role=&quot;option&quot;</InlineCode> and{' '}
        <InlineCode>aria-selected</InlineCode>. Clear uses{' '}
        <InlineCode>role=&quot;button&quot;</InlineCode> to avoid nested native
        buttons. Errors use <InlineCode>role=&quot;alert&quot;</InlineCode>.
      </DocP>
    </DocArticle>
  )
}
