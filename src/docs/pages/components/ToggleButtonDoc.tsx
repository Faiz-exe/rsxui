import { useState } from 'react'
import { Stack, Text, ToggleButton, ToggleButtonGroup } from '../../../lib'
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

const groupProps = [
  {
    name: 'type',
    type: "'single' | 'multiple'",
    default: "'single'",
    description: 'Single selection or many toggles on at once.',
  },
  {
    name: 'value',
    type: 'string | null',
    description: 'Controlled selected value when type is single.',
  },
  {
    name: 'defaultValue',
    type: 'string | null',
    default: 'null',
    description: 'Uncontrolled initial value for single mode.',
  },
  {
    name: 'onValueChange',
    type: '(value: string | null) => void',
    description: 'Fires when the single selection changes.',
  },
  {
    name: 'values',
    type: 'string[]',
    description: 'Controlled selected values when type is multiple.',
  },
  {
    name: 'defaultValues',
    type: 'string[]',
    description: 'Uncontrolled initial values for multiple mode.',
  },
  {
    name: 'onValuesChange',
    type: '(values: string[]) => void',
    description: 'Fires when the set changes in multiple mode.',
  },
  {
    name: 'aria-label',
    type: 'string',
    description: 'Accessible name for the group.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Merged on the group container.',
  },
] as const

const btnProps = [
  {
    name: 'value',
    type: 'string',
    description: 'Token for this toggle when inside ToggleButtonGroup.',
  },
  {
    name: 'pressed',
    type: 'boolean',
    description: 'Standalone controlled pressed state.',
  },
  {
    name: 'defaultPressed',
    type: 'boolean',
    default: 'false',
    description: 'Standalone uncontrolled default.',
  },
  {
    name: 'onPressedChange',
    type: '(pressed: boolean) => void',
    description: 'Standalone mode only.',
  },
  {
    name: 'severity',
    type: "'secondary' | 'primary'",
    default: "'secondary'",
    description: 'Visual weight when selected.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Height and padding.',
  },
  {
    name: 'rounded',
    type: 'boolean',
    default: 'false',
    description: 'Pill-shaped buttons.',
  },
  {
    name: '…',
    type: 'button props',
    description: 'Native button attributes; ref forwarded.',
  },
] as const

export function ToggleButtonDoc() {
  const [align, setAlign] = useState<string | null>('left')
  const [filters, setFilters] = useState<string[]>(['bold'])
  const [solo, setSolo] = useState(false)

  return (
    <DocArticle>
      <DocH1>ToggleButton</DocH1>
      <DocLead>
        Pressable controls with <InlineCode>aria-pressed</InlineCode>. Use{' '}
        <InlineCode>ToggleButtonGroup</InlineCode> for single- or multi-select toolbars;
        use a lone <InlineCode>ToggleButton</InlineCode> for independent on/off state.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="ToggleButton, ToggleButtonGroup" />

      <DocH2 id="usage">Usage</DocH2>
      <DocP>
        In a group, each child should set a distinct <InlineCode>value</InlineCode>{' '}
        string. Clicking the active single-select button clears the selection (
        <InlineCode>null</InlineCode>).
      </DocP>

      <DocH2 id="single">Single-select group</DocH2>
      <DocPreview
        title="Single-select group"
        code={`<ToggleButtonGroup
  aria-label="Text alignment"
  value={align}
  onValueChange={setAlign}
>
  <ToggleButton value="left">Left</ToggleButton>
  <ToggleButton value="center">Center</ToggleButton>
  <ToggleButton value="right">Right</ToggleButton>
</ToggleButtonGroup>`}
      >
        <Stack gap="sm">
          <ToggleButtonGroup
            aria-label="Text alignment"
            value={align}
            onValueChange={setAlign}
          >
            <ToggleButton value="left">Left</ToggleButton>
            <ToggleButton value="center">Center</ToggleButton>
            <ToggleButton value="right">Right</ToggleButton>
          </ToggleButtonGroup>
          <Text variant="small" tone="muted">
            value: {align ?? 'null'}
          </Text>
        </Stack>
      </DocPreview>

      <DocH2 id="multiple">Multi-select group</DocH2>
      <DocPreview
        title="Multi-select group"
        code={`<ToggleButtonGroup
  type="multiple"
  aria-label="Formatting"
  values={filters}
  onValuesChange={setFilters}
>
  <ToggleButton value="bold">Bold</ToggleButton>
  <ToggleButton value="italic">Italic</ToggleButton>
  <ToggleButton value="underline">Underline</ToggleButton>
</ToggleButtonGroup>`}
      >
        <Stack gap="sm">
          <ToggleButtonGroup
            type="multiple"
            aria-label="Formatting"
            values={filters}
            onValuesChange={setFilters}
          >
            <ToggleButton value="bold">Bold</ToggleButton>
            <ToggleButton value="italic">Italic</ToggleButton>
            <ToggleButton value="underline">Underline</ToggleButton>
          </ToggleButtonGroup>
          <Text variant="small" tone="muted">
            {filters.join(', ') || 'none'}
          </Text>
        </Stack>
      </DocPreview>

      <DocH2 id="standalone">Standalone</DocH2>
      <DocPreview
        title="Standalone"
        code={`<ToggleButton
  pressed={solo}
  onPressedChange={setSolo}
  severity="primary"
>
  Solo
</ToggleButton>`}
      >
        <Stack gap="sm" style={{ alignItems: 'flex-start' }}>
          <ToggleButton pressed={solo} onPressedChange={setSolo} severity="primary">
            Solo
          </ToggleButton>
          <Text variant="small" tone="muted">
            pressed: {solo ? 'true' : 'false'}
          </Text>
        </Stack>
      </DocPreview>

      <DocH2 id="props-group">ToggleButtonGroup props</DocH2>
      <PropsTable rows={[...groupProps]} />

      <DocH2 id="props-button">ToggleButton props</DocH2>
      <PropsTable rows={[...btnProps]} />

      <DocH2 id="accessibility">Accessibility</DocH2>
      <DocP>
        <InlineCode>ToggleButton</InlineCode> uses{' '}
        <InlineCode>aria-pressed</InlineCode>. In groups, provide an accessible
        name with <InlineCode>aria-label</InlineCode> or{' '}
        <InlineCode>aria-labelledby</InlineCode>.
      </DocP>
      <DocP>
        Keyboard follows native button behavior: <InlineCode>Tab</InlineCode>{' '}
        moves focus and <InlineCode>Enter</InlineCode> /{' '}
        <InlineCode>Space</InlineCode> toggles the pressed state.
      </DocP>
    </DocArticle>
  )
}
