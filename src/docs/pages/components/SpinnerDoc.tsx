import { Spinner, Stack, Text } from '../../../lib'
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

const spinnerProps = [
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Rendered size of the spinner.',
  },
  {
    name: 'tone',
    type: "'accent' | 'muted' | 'fg' | 'danger' | 'success' | 'warning' | 'info'",
    default: "'accent'",
    description: 'Color tone using semantic token colors.',
  },
  {
    name: 'label',
    type: 'string',
    default: "'Loading'",
    description: 'Accessible name announced by assistive tech.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Merged after StyleX on root span.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description: 'Inline styles merged on root span.',
  },
  {
    name: '…',
    type: 'ComponentProps<"span">',
    description: 'Other span props except children.',
  },
] as const

export function SpinnerDoc() {
  return (
    <DocArticle>
      <DocH1>Spinner</DocH1>
      <DocLead>
        Lightweight loading indicator for async states like buttons, panels, and table overlays.
        Uses semantic tones and reduced-motion support.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Spinner" />

      <DocH2 id="usage">Usage</DocH2>
      <DocP>
        Add a spinner while content loads. For screen readers, keep a clear{' '}
        <InlineCode>label</InlineCode> when context is not obvious.
      </DocP>
      <DocPreview
        title="Basic"
        code={`<Spinner />
<Spinner size="sm" tone="muted" />
<Spinner size="lg" tone="success" label="Loading profile" />`}
      >
        <Stack direction="row" gap="md" style={{ alignItems: 'center', flexWrap: 'wrap' }}>
          <Spinner />
          <Spinner size="sm" tone="muted" />
          <Spinner size="lg" tone="success" label="Loading profile" />
        </Stack>
      </DocPreview>

      <DocH2 id="tones">Tones</DocH2>
      <DocPreview
        title="Semantic tones"
        code={`<Stack direction="row" gap="md" style={{ alignItems: 'center', flexWrap: 'wrap' }}>
  <Spinner tone="accent" />
  <Spinner tone="fg" />
  <Spinner tone="muted" />
  <Spinner tone="success" />
  <Spinner tone="warning" />
  <Spinner tone="danger" />
  <Spinner tone="info" />
</Stack>`}
      >
        <Stack direction="row" gap="md" style={{ alignItems: 'center', flexWrap: 'wrap' }}>
          <Spinner tone="accent" />
          <Spinner tone="fg" />
          <Spinner tone="muted" />
          <Spinner tone="success" />
          <Spinner tone="warning" />
          <Spinner tone="danger" />
          <Spinner tone="info" />
        </Stack>
      </DocPreview>

      <DocH2 id="inline-with-text">Inline with text</DocH2>
      <DocPreview
        title="Loading row"
        code={`<div style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
  <Spinner size="sm" tone="muted" label="Loading data" />
  <Text variant="small" tone="muted">Loading data…</Text>
</div>`}
      >
        <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
          <Spinner size="sm" tone="muted" label="Loading data" />
          <Text variant="small" tone="muted">
            Loading data...
          </Text>
        </div>
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <PropsTable rows={[...spinnerProps]} />
    </DocArticle>
  )
}
