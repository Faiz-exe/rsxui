import { Divider, Stack, Text } from '../../../lib'
import { DocImport } from '../../ui/DocImport'
import { DocPreview } from '../../ui/DocPreview'
import { PropsTable } from '../../ui/PropsTable'
import { DocArticle, DocH1, DocH2, DocP, InlineCode } from '../../ui/Prose'

const componentProps = [
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: 'Layout of the rule; vertical dividers need a row layout and height.',
  },
  {
    name: 'label',
    type: 'ReactNode',
    description: 'Optional content centered on the line (with segments on each side).',
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'end'",
    default: "'center'",
    description: 'Where the label sits along the main axis; controls which side gets a line.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Merged onto the root after StyleX.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description: 'Merged onto the root.',
  },
] as const

export function DividerDoc() {
  return (
    <DocArticle>
      <DocH1 description="Visual separator with optional in-line label and horizontal or vertical orientation.">
        Divider
      </DocH1>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Divider, Stack, Text"  />

      <DocH2 id="basic-horizontal">Basic horizontal</DocH2>
      <DocP>
        Default <InlineCode>orientation</InlineCode> is horizontal; the rule spans the full width of
        its container.
      </DocP>
      <DocPreview
        title="Basic horizontal"
        code={`<Stack gap="md">
  <Text>Content above</Text>
  <Divider />
  <Text>Content below</Text>
</Stack>`}
      >
        <Stack gap="md">
          <Text>Content above</Text>
          <Divider />
          <Text>Content below</Text>
        </Stack>
      </DocPreview>

      <DocH2 id="with-label">With label</DocH2>
      <DocPreview
        title="With label"
        code={`<Divider label="Section" />`}
      >
        <Divider label="Section" />
      </DocPreview>

      <DocH2 id="label-alignment">Label alignment</DocH2>
      <DocP>
        Use <InlineCode>align</InlineCode> to pin the label to the start, center, or end of the line.
      </DocP>
      <DocPreview
        title="Start, center, end"
        code={`<Stack gap="lg">
  <Divider label="Start" align="start" />
  <Divider label="Center" align="center" />
  <Divider label="End" align="end" />
</Stack>`}
      >
        <Stack gap="lg">
          <Divider label="Start" align="start" />
          <Divider label="Center" align="center" />
          <Divider label="End" align="end" />
        </Stack>
      </DocPreview>

      <DocH2 id="vertical">Vertical</DocH2>
      <DocP>
        In a row <InlineCode>Stack</InlineCode>, give the row a fixed height so the vertical rule
        can stretch.
      </DocP>
      <DocPreview
        title="Vertical"
        code={`<Stack direction="row" gap="md" align="center" style={{ height: 100 }}>
  <Text>Left</Text>
  <Divider orientation="vertical" />
  <Text>Right</Text>
</Stack>`}
      >
        <Stack direction="row" gap="md" align="center" style={{ height: 100 }}>
          <Text>Left</Text>
          <Divider orientation="vertical" />
          <Text>Right</Text>
        </Stack>
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <PropsTable rows={componentProps} />
    </DocArticle>
  )
}
