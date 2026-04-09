import { useState } from 'react'
import { SplitButton, Stack, Text } from '../../../lib'
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

const splitProps = [
  {
    name: 'severity',
    type: "'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger'",
    default: "'primary'",
    description:
      'Semantic color preset shared with Button. Primary uses accent; secondary is neutral; other values map to matching status colors.',
  },
  {
    name: 'variant',
    type: "'primary' | 'secondary'",
    description:
      'Deprecated. Use `severity` instead. When `severity` is omitted, `variant="secondary"` maps to `severity="secondary"`.',
  },
  {
    name: 'outlined',
    type: 'boolean',
    default: 'false',
    description: 'Outlined appearance.',
  },
  {
    name: 'text',
    type: 'boolean',
    default: 'false',
    description: 'Text-style appearance.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Padding, type size, and minimum height for both button segments.',
  },
  {
    name: 'raised',
    type: 'boolean',
    default: 'false',
    description: 'Elevation on the outer wrapper.',
  },
  {
    name: 'rounded',
    type: 'boolean',
    default: 'false',
    description: 'Pill-shaped group (wrapper clips both segments).',
  },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    description:
      'Shows a spinner, sets `aria-busy` on the primary button, and disables both segments.',
  },
  {
    name: 'label',
    type: 'string',
    description:
      'Text when you prefer not to use `children`. If both are set, `children` win.',
  },
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Primary content (overrides `label`).',
  },
  {
    name: 'menuItems',
    type: 'SplitButtonMenuItem[]',
    description:
      'Secondary actions (`id`, `label`, optional `disabled`, optional `onSelect`).',
  },
  {
    name: 'onPrimaryClick',
    type: '() => void',
    description: 'Click handler for the left (main) action.',
  },
  {
    name: 'onMenuItemSelect',
    type: '(id: string) => void',
    description: 'Fallback called when an item does not provide `onSelect`.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables primary and menu trigger.',
  },
  {
    name: 'menuTriggerLabel',
    type: 'string',
    default: "'Open menu'",
    description: 'Accessible name for the chevron control.',
  },
  {
    name: 'type',
    type: "'button' | 'submit' | 'reset'",
    default: "'button'",
    description: 'Primary button `type` (menu trigger is always `button`).',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Merged on the root wrapper after generated StyleX classes.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description: 'Inline styles merged on the root wrapper.',
  },
  {
    name: 'primaryButtonClassName',
    type: 'string',
    description: 'Merged on the primary segment.',
  },
  {
    name: 'menuButtonClassName',
    type: 'string',
    description: 'Merged on the menu trigger.',
  },
] as const

export function SplitButtonDoc() {
  const [log, setLog] = useState<string[]>([])

  const push = (msg: string) => {
    setLog((prev) => [msg, ...prev].slice(0, 6))
  }

  const baseMenu = [
    { id: 'copy', label: 'Save and copy link' },
    { id: 'draft', label: 'Save as draft' },
  ] as const

  return (
    <DocArticle>
      <DocH1>SplitButton</DocH1>
      <DocLead>
        Button-style primary action on the left with a secondary action menu on
        the right. Shares severity, size, outlined, text, raised, rounded, and
        loading behavior with{' '}
        <InlineCode>Button</InlineCode>.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="SplitButton, type SplitButtonMenuItem" />

      <DocH2 id="usage">Usage</DocH2>
      <DocP>
        Use <InlineCode>onPrimaryClick</InlineCode> for the main action and{' '}
        <InlineCode>menuItems</InlineCode> for secondary actions. Items can
        handle themselves with <InlineCode>onSelect</InlineCode>, or you can
        centralize handling with <InlineCode>onMenuItemSelect</InlineCode>.
      </DocP>

      <DocH2 id="basic">Basic</DocH2>
      <DocPreview
        title="Basic"
        code={`<SplitButton
  label="Save"
  onPrimaryClick={() => saveDraft()}
  menuItems={[
    { id: 'copy', label: 'Save and copy link' },
    { id: 'draft', label: 'Save as draft' },
  ]}
/>`}
      >
        <Stack gap="sm" style={{ alignItems: 'flex-start' }}>
          <SplitButton
            label="Save"
            onPrimaryClick={() => push('Primary: Save')}
            menuItems={baseMenu}
            onMenuItemSelect={(id) => push(`Menu: ${id}`)}
          />
        </Stack>
      </DocPreview>

      <DocH2 id="severity">Severity</DocH2>
      <DocPreview
        title="Severities"
        code={`<SplitButton severity="primary" label="Primary" menuItems={menu} />
<SplitButton severity="secondary" label="Secondary" menuItems={menu} />
<SplitButton severity="success" label="Success" menuItems={menu} />
<SplitButton severity="danger" label="Danger" menuItems={menu} />`}
      >
        <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
          <SplitButton severity="primary" label="Primary" menuItems={baseMenu} />
          <SplitButton severity="secondary" label="Secondary" menuItems={baseMenu} />
          <SplitButton severity="success" label="Success" menuItems={baseMenu} />
          <SplitButton severity="danger" label="Danger" menuItems={baseMenu} />
        </Stack>
      </DocPreview>

      <DocH2 id="outlined">Outlined</DocH2>
      <DocPreview
        title="Outlined"
        code={`<SplitButton outlined label="Primary" menuItems={menu} />
<SplitButton outlined severity="secondary" label="Secondary" menuItems={menu} />`}
      >
        <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
          <SplitButton outlined label="Primary" menuItems={baseMenu} />
          <SplitButton
            outlined
            severity="secondary"
            label="Secondary"
            menuItems={baseMenu}
          />
        </Stack>
      </DocPreview>

      <DocH2 id="text">Text</DocH2>
      <DocPreview
        title="Text"
        code={`<SplitButton text label="Primary" menuItems={menu} />
<SplitButton text severity="secondary" label="Secondary" menuItems={menu} />`}
      >
        <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
          <SplitButton text label="Primary" menuItems={baseMenu} />
          <SplitButton text severity="secondary" label="Secondary" menuItems={baseMenu} />
        </Stack>
      </DocPreview>

      <DocH2 id="raised-rounded">Raised + Rounded</DocH2>
      <DocPreview
        title="Raised + Rounded"
        code={`<SplitButton raised label="Raised" menuItems={menu} />
<SplitButton rounded label="Rounded" menuItems={menu} />`}
      >
        <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
          <SplitButton raised label="Raised" menuItems={baseMenu} />
          <SplitButton rounded label="Rounded" menuItems={baseMenu} />
        </Stack>
      </DocPreview>

      <DocH2 id="sizes">Sizes</DocH2>
      <DocPreview
        title="Sizes"
        code={`<SplitButton size="sm" label="Small" menuItems={menu} />
<SplitButton size="md" label="Normal" menuItems={menu} />
<SplitButton size="lg" label="Large" menuItems={menu} />`}
      >
        <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
          <SplitButton size="sm" label="Small" menuItems={baseMenu} />
          <SplitButton size="md" label="Normal" menuItems={baseMenu} />
          <SplitButton size="lg" label="Large" menuItems={baseMenu} />
        </Stack>
      </DocPreview>

      <DocH2 id="loading-disabled">Loading / Disabled</DocH2>
      <DocPreview
        title="Loading / Disabled"
        code={`<SplitButton loading label="Saving" menuItems={menu} />
<SplitButton disabled label="Disabled" menuItems={menu} />`}
      >
        <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
          <SplitButton loading label="Saving" menuItems={baseMenu} />
          <SplitButton disabled label="Disabled" menuItems={baseMenu} />
        </Stack>
      </DocPreview>

      <DocH2 id="events">Primary + Menu events</DocH2>
      <DocPreview
        title="Events"
        code={`<SplitButton
  label="Deploy"
  onPrimaryClick={() => push('Primary: Deploy')}
  menuItems={[
    { id: 'staging', label: 'To staging' },
    { id: 'prod', label: 'To production' },
  ]}
  onMenuItemSelect={(id) => push(\`Menu: \${id}\`)}
/>`}
      >
        <Stack gap="sm" style={{ alignItems: 'flex-start' }}>
          <SplitButton
            label="Deploy"
            onPrimaryClick={() => push('Primary: Deploy')}
            menuItems={[
              { id: 'staging', label: 'To staging' },
              { id: 'prod', label: 'To production' },
            ]}
            onMenuItemSelect={(id) => push(`Menu: ${id}`)}
          />
          {log.length > 0 ? (
            <Text
              variant="small"
              tone="muted"
              as="div"
              style={{ margin: 0, whiteSpace: 'pre-wrap' }}
            >
              {log.join('\n')}
            </Text>
          ) : null}
        </Stack>
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <PropsTable rows={[...splitProps]} />

      <DocH2 id="accessibility">Accessibility</DocH2>
      <DocP>
        Keyboard: <InlineCode>Tab</InlineCode> focuses primary action then menu
        trigger. On the trigger, <InlineCode>Enter</InlineCode>,{' '}
        <InlineCode>Space</InlineCode>, and <InlineCode>ArrowDown</InlineCode>{' '}
        open the menu. Inside the menu, use arrows,{' '}
        <InlineCode>Home</InlineCode>, <InlineCode>End</InlineCode>,{' '}
        <InlineCode>Enter</InlineCode>, and <InlineCode>Escape</InlineCode>.
      </DocP>
      <DocP>
        The trigger exposes <InlineCode>aria-haspopup=&quot;menu&quot;</InlineCode>{' '}
        and <InlineCode>aria-expanded</InlineCode>. Set{' '}
        <InlineCode>menuTriggerLabel</InlineCode> to provide a clear
        screen-reader name for the chevron action.
      </DocP>
    </DocArticle>
  )
}
