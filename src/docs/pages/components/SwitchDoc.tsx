import { useState } from 'react'
import { Switch } from '../../../lib'
import { DocImport } from '../../ui/DocImport'
import { DocPreview } from '../../ui/DocPreview'
import { PropsTable } from '../../ui/PropsTable'
import {
  DocArticle,
  DocH1,
  DocH2,
  DocH3,
  DocLead,
  DocLi,
  DocP,
  DocUl,
  InlineCode,
} from '../../ui/Prose'

const previewWrap = { maxWidth: 420 } as const

const switchProps = [
  {
    name: 'label',
    type: 'React.ReactNode',
    description: 'Clickable label; the whole row is a `<label>`.',
  },
  {
    name: 'description',
    type: 'string',
    description: 'Optional; wired with `aria-describedby` on the input.',
  },
  {
    name: 'invalid',
    type: 'boolean',
    default: 'false',
    description: 'Use when validation failed.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Mutes the control, label, and description.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Merged after StyleX.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description: 'Inline styles on the label.',
  },
  {
    name: 'id',
    type: 'string',
    description: 'Optional; a stable id is generated when omitted.',
  },
  {
    name: '…',
    type: 'Native input (checkbox)',
    description:
      'checked, defaultChecked, onChange, disabled, required, name, value, aria-label, aria-labelledby, etc. The element uses `type="checkbox"` and `role="switch"`.',
  },
] as const

export function SwitchDoc() {
  const [basicOn, setBasicOn] = useState(false)
  const [invalidOn, setInvalidOn] = useState(false)

  return (
    <DocArticle>
      <DocH1>Switch</DocH1>
      <DocLead>
        Switch is used to select a boolean value (on / off). It wraps a native checkbox with{' '}
        <InlineCode>role=&quot;switch&quot;</InlineCode>, optional label and description, and styles
        aligned with the rest of the library. Example sections follow import, then each mode with a
        preview and a read-only snippet. Use the toolbar to show the snippet and Copy to paste it
        into your project.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Switch" />

      <DocH2 id="basic">Basic</DocH2>
      <DocP>
        Use as a controlled input with <InlineCode>checked</InlineCode> and{' '}
        <InlineCode>onChange</InlineCode>. Read <InlineCode>e.target.checked</InlineCode> in the
        handler.
      </DocP>
      <DocPreview
        title="Basic"
        code={`const [checked, setChecked] = useState(false)

<Switch
  label="Enabled"
  name="enabled"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>`}
      >
        <div style={previewWrap}>
          <Switch
            label="Enabled"
            name="basic-preview"
            checked={basicOn}
            onChange={(e) => setBasicOn(e.target.checked)}
          />
        </div>
      </DocPreview>

      <DocH2 id="preselection">Preselection</DocH2>
      <DocP>
        Set <InlineCode>defaultChecked</InlineCode> for an uncontrolled switch that starts in the on
        position (or pass <InlineCode>checked</InlineCode> for a controlled default).
      </DocP>
      <DocPreview
        title="Preselection"
        code={`<Switch label="Notifications" name="notifications" defaultChecked />

<Switch label="Marketing emails" name="marketing" defaultChecked={false} />`}
      >
        <div style={previewWrap}>
          <Switch label="Notifications" name="pre-notifications" defaultChecked />
          <div style={{ marginTop: 12 }}>
            <Switch label="Marketing emails" name="pre-marketing" />
          </div>
        </div>
      </DocPreview>

      <DocH2 id="label-description">Label and description</DocH2>
      <DocP>
        Use <InlineCode>description</InlineCode> for supporting text under the label. It is included
        in <InlineCode>aria-describedby</InlineCode>.
      </DocP>
      <DocPreview
        title="Label and description"
        code={`<Switch
  label="Public profile"
  description="Anyone signed in can see your posts."
  name="public"
/>`}
      >
        <div style={previewWrap}>
          <Switch
            label="Public profile"
            description="Anyone signed in can see your posts."
            name="desc-preview"
          />
        </div>
      </DocPreview>

      <DocH2 id="invalid">Invalid</DocH2>
      <DocP>
        Set <InlineCode>invalid</InlineCode> to show error styling and <InlineCode>aria-invalid</InlineCode>{' '}
        when validation failed (for example a required setting that must be turned on).
      </DocP>
      <DocPreview
        title="Invalid"
        code={`const [on, setOn] = useState(false)

<Switch
  label="Accept terms"
  name="terms"
  checked={on}
  onChange={(e) => setOn(e.target.checked)}
  invalid={!on}
/>`}
      >
        <div style={previewWrap}>
          <Switch
            label="Accept terms"
            name="invalid-preview"
            checked={invalidOn}
            onChange={(e) => setInvalidOn(e.target.checked)}
            invalid={!invalidOn}
          />
        </div>
      </DocPreview>

      <DocH2 id="disabled">Disabled</DocH2>
      <DocP>
        With <InlineCode>disabled</InlineCode>, the switch cannot be focused or toggled. Styling
        reflects both on and off disabled states.
      </DocP>
      <DocPreview
        title="Disabled"
        code={`<Switch label="Beta features" name="beta" disabled defaultChecked />

<Switch label="Unavailable" name="off" disabled />`}
      >
        <div style={previewWrap}>
          <Switch label="Beta features" name="dis-beta" disabled defaultChecked />
          <div style={{ marginTop: 12 }}>
            <Switch label="Unavailable" name="dis-off" disabled />
          </div>
        </div>
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <PropsTable rows={[...switchProps]} />

      <DocH2 id="accessibility">Accessibility</DocH2>
      <DocH3 id="a11y-screen-reader">Screen reader</DocH3>
      <DocP>
        The focusable control is a visually hidden checkbox with <InlineCode>role=&quot;switch&quot;</InlineCode>
        . Provide a name using the built-in <InlineCode>label</InlineCode>, or pass{' '}
        <InlineCode>aria-label</InlineCode> / <InlineCode>aria-labelledby</InlineCode> on the switch
        when there is no visible label (same as native input props).
      </DocP>
      <DocPreview
        title="aria-label (no visible label)"
        code={`<Switch aria-label="Mute notifications" name="mute" />`}
      >
        <div style={previewWrap}>
          <Switch aria-label="Mute notifications" name="a11y-mute" />
        </div>
      </DocPreview>

      <DocH3 id="a11y-keyboard">Keyboard</DocH3>
      <DocUl>
        <DocLi>
          <strong>Tab</strong> — moves focus to the switch.
        </DocLi>
        <DocLi>
          <strong>Space</strong> — toggles the checked state when focused.
        </DocLi>
      </DocUl>
    </DocArticle>
  )
}
