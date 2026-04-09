import { useState } from 'react'
import { Button, Stack } from '../../../lib'
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

const checkIcon = (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    aria-hidden
    focusable="false"
  >
    <path
      fill="currentColor"
      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
    />
  </svg>
)

const buttonProps = [
  {
    name: 'severity',
    type: "'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger'",
    default: "'primary'",
    description:
      'Semantic color preset. Primary uses the accent token; secondary is a neutral surface; other values map to matching semantic colors.',
  },
  {
    name: 'variant',
    type: "'primary' | 'secondary'",
    description:
      'Deprecated. Use `severity` instead. When `severity` is omitted, `variant="secondary"` maps to `severity="secondary"`.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Padding, type size, and minimum height.',
  },
  {
    name: 'outlined',
    type: 'boolean',
    default: 'false',
    description:
      'Transparent fill with a colored border (“ghost” outline style).',
  },
  {
    name: 'text',
    type: 'boolean',
    default: 'false',
    description:
      'Text-style control with no border and a tinted hover.',
  },
  {
    name: 'raised',
    type: 'boolean',
    default: 'false',
    description: 'Adds elevation shadow from the `elevation.card` token.',
  },
  {
    name: 'rounded',
    type: 'boolean',
    default: 'false',
    description: 'Pill shape via full border radius.',
  },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    description:
      'Shows a spinner, sets `aria-busy`, and disables the button until loading finishes.',
  },
  {
    name: 'icon',
    type: 'ReactNode',
    description:
      'Optional icon node. When there is no label or children, use `aria-label` for accessibility.',
  },
  {
    name: 'iconPos',
    type: "'left' | 'right'",
    default: "'left'",
    description: 'Icon position relative to the label when both are present.',
  },
  {
    name: 'label',
    type: 'string',
    description:
      'Text when you prefer not to use `children`. If both are set, `children` win.',
  },
  {
    name: 'link',
    type: 'boolean',
    default: 'false',
    description:
      'Link-like underline and text colors while keeping a native `<button>`.',
  },
  {
    name: 'type',
    type: "'button' | 'submit' | 'reset'",
    default: "'button'",
    description: 'Forwarded to the native button element.',
  },
  {
    name: 'className',
    type: 'string',
    description:
      'Merged after StyleX classes so you can add utility or scope-specific classes.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description:
      'Merged after any inline styles from StyleX; your values win on duplicate keys.',
  },
  {
    name: '…',
    type: 'ComponentProps<"button">',
    description:
      'Other native button props (`onClick`, `disabled`, `aria-*`, etc.).',
  },
] as const

const BASIC_BUTTON_SNIPPET = `<Button label="Submit" />
<Button>Submit</Button>`

function LoadingExample() {
  const [loading, setLoading] = useState(false)
  return (
    <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
      <Button
        label="Submit"
        icon={checkIcon}
        loading={loading}
        onClick={() => {
          setLoading(true)
          window.setTimeout(() => setLoading(false), 1600)
        }}
      />
    </Stack>
  )
}

export function ButtonDoc() {
  useDocMeta('Button', 'Severities, sizes, outlined, text, and loading variants.')
  return (
    <DocArticle>
      <DocH1>Button</DocH1>
      <DocLead>
        Actions with semantic severities, sizes, and optional outlined, text,
        raised, rounded, loading, and icon patterns. Ref is forwarded to the
        underlying <InlineCode>&lt;button&gt;</InlineCode>.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Button" />

      <DocH2 id="usage">Usage</DocH2>
      <DocP>
        Use <InlineCode>severity</InlineCode> for color intent, optional{' '}
        <InlineCode>outlined</InlineCode>, <InlineCode>text</InlineCode>,{' '}
        <InlineCode>raised</InlineCode>, and <InlineCode>rounded</InlineCode> for
        chrome, and <InlineCode>size</InlineCode> for density. The older{' '}
        <InlineCode>variant</InlineCode> prop still maps to{' '}
        <InlineCode>severity</InlineCode> for compatibility.
      </DocP>

      <DocH2 id="basic">Basic</DocH2>
      <DocP>
        Use <InlineCode>children</InlineCode> or <InlineCode>label</InlineCode> for
        the visible text.
      </DocP>
      <DocPreview title="Basic" code={BASIC_BUTTON_SNIPPET}>
        <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
          <Button label="Submit" />
          <Button>Submit</Button>
        </Stack>
      </DocPreview>

      <DocH2 id="severity">Severity</DocH2>
      <DocP>
        The <InlineCode>severity</InlineCode> prop selects primary, secondary,
        success, info, warning, help, or danger.
      </DocP>
      <DocPreview
        title="Severities"
        code={`<Button severity="primary" label="Primary" />
<Button severity="secondary" label="Secondary" />
<Button severity="success" label="Success" />
<Button severity="info" label="Info" />
<Button severity="warning" label="Warning" />
<Button severity="help" label="Help" />
<Button severity="danger" label="Danger" />`}
      >
        <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
          <Button severity="primary" label="Primary" />
          <Button severity="secondary" label="Secondary" />
          <Button severity="success" label="Success" />
          <Button severity="info" label="Info" />
          <Button severity="warning" label="Warning" />
          <Button severity="help" label="Help" />
          <Button severity="danger" label="Danger" />
        </Stack>
      </DocPreview>

      <DocH2 id="outlined">Outlined</DocH2>
      <DocPreview
        title="Outlined"
        code={`<Button outlined label="Primary" />
<Button outlined severity="secondary" label="Secondary" />
<Button outlined severity="success" label="Success" />`}
      >
        <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
          <Button outlined label="Primary" />
          <Button outlined severity="secondary" label="Secondary" />
          <Button outlined severity="success" label="Success" />
          <Button outlined severity="danger" label="Danger" />
        </Stack>
      </DocPreview>

      <DocH2 id="text-variant">Text</DocH2>
      <DocPreview
        title="Text"
        code={`<Button text label="Primary" />
<Button text severity="secondary" label="Secondary" />`}
      >
        <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
          <Button text label="Primary" />
          <Button text severity="secondary" label="Secondary" />
          <Button text severity="danger" label="Danger" />
        </Stack>
      </DocPreview>

      <DocH2 id="raised">Raised</DocH2>
      <DocPreview
        title="Raised"
        code={`<Button raised label="Primary" />
<Button raised severity="secondary" label="Secondary" />`}
      >
        <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
          <Button raised label="Primary" />
          <Button raised severity="secondary" label="Secondary" />
        </Stack>
      </DocPreview>

      <DocH2 id="rounded">Rounded</DocH2>
      <DocPreview
        title="Rounded"
        code={`<Button rounded label="Primary" />
<Button rounded severity="secondary" outlined label="Secondary" />`}
      >
        <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
          <Button rounded label="Primary" />
          <Button rounded severity="secondary" outlined label="Secondary" />
        </Stack>
      </DocPreview>

      <DocH2 id="disabled">Disabled</DocH2>
      <DocPreview title="Disabled" code={`<Button disabled label="Submit" />`}>
        <Stack direction="row" gap="sm">
          <Button disabled label="Submit" />
        </Stack>
      </DocPreview>

      <DocH2 id="loading">Loading</DocH2>
      <DocP>
        Sets <InlineCode>aria-busy</InlineCode>, disables interaction, and shows a
        spinner in place of a left icon when <InlineCode>loading</InlineCode> is
        true.
      </DocP>
      <DocPreview
        title="Loading"
        code={`<Button loading label="Submit" icon={checkIcon} />`}
      >
        <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
          <Button loading label="Submit" icon={checkIcon} />
          <LoadingExample />
        </Stack>
      </DocPreview>

      <DocH2 id="sizes">Sizes</DocH2>
      <DocPreview
        title="Sizes"
        code={`<Button size="sm" label="Small" />
<Button size="md" label="Normal" />
<Button size="lg" label="Large" />`}
      >
        <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
          <Button size="sm" label="Small" />
          <Button size="md" label="Normal" />
          <Button size="lg" label="Large" />
        </Stack>
      </DocPreview>

      <DocH2 id="icons">Icons</DocH2>
      <DocP>
        Pass any <InlineCode>ReactNode</InlineCode> as <InlineCode>icon</InlineCode>.
        Use <InlineCode>iconPos=&quot;right&quot;</InlineCode> to align after the
        label. For icon-only buttons, set <InlineCode>aria-label</InlineCode>.
      </DocP>
      <DocPreview
        title="Icons"
        code={`<Button icon={checkIcon} label="Save" />
<Button icon={checkIcon} label="Save" iconPos="right" />
<Button icon={checkIcon} rounded aria-label="Save" />`}
      >
        <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
          <Button icon={checkIcon} label="Save" />
          <Button icon={checkIcon} label="Save" iconPos="right" />
          <Button icon={checkIcon} rounded aria-label="Save" />
        </Stack>
      </DocPreview>

      <DocH2 id="link">Link</DocH2>
      <DocP>
        Renders as an underlined text control (still a <InlineCode>button</InlineCode>
        ). Pair with <InlineCode>onClick</InlineCode> for in-app navigation or use an
        anchor elsewhere when you need a real URL.
      </DocP>
      <DocPreview title="Link" code={`<Button link label="Open docs" onClick={() => {}} />`}>
        <Stack direction="row" gap="sm">
          <Button link label="Open docs" type="button" />
        </Stack>
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <PropsTable rows={[...buttonProps]} />

      <DocH2 id="accessibility">Accessibility</DocH2>
      <DocP>
        Focus styles use <InlineCode>:focus-visible</InlineCode> (keyboard focus
        only). Disabled and loading states use reduced opacity and{' '}
        <InlineCode>cursor: not-allowed</InlineCode> / <InlineCode>wait</InlineCode>.
        For icon-only buttons, provide <InlineCode>aria-label</InlineCode> (or
        another accessible name) so screen readers announce the control.
      </DocP>
      <DocP>
        Keyboard: <InlineCode>Tab</InlineCode> moves focus to the button;{' '}
        <InlineCode>Enter</InlineCode> and <InlineCode>Space</InlineCode> activate
        it when enabled.
      </DocP>
    </DocArticle>
  )
}
