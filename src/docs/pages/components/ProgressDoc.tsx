import { Progress, Stack } from '../../../lib'
import { DocImport } from '../../ui/DocImport'
import { DocPreview } from '../../ui/DocPreview'
import { PropsTable } from '../../ui/PropsTable'
import { DocArticle, DocH1, DocH2, DocP, InlineCode } from '../../ui/Prose'

const componentProps = [
  {
    name: 'value',
    type: 'number | null',
    description:
      'Completion from 0–100. Omit or pass `null` for an indeterminate (animated) bar.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Track height.',
  },
  {
    name: 'severity',
    type: "'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'",
    default: "'primary'",
    description: 'Fill color token.',
  },
  {
    name: 'label',
    type: 'string',
    description: 'Optional text shown above the bar.',
  },
  {
    name: 'showValue',
    type: 'boolean',
    default: 'false',
    description: 'When true, shows the numeric percentage next to the label row.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Merged onto the root (or wrapper when label/showValue is used).',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description: 'Merged onto the root or wrapper.',
  },
] as const

export function ProgressDoc() {
  return (
    <DocArticle>
      <DocH1 description="Accessible progress bar with sizes, semantic colors, optional label, and indeterminate mode.">
        Progress
      </DocH1>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Progress, Stack"  />

      <DocH2 id="basic">Basic</DocH2>
      <DocPreview
        title="Basic"
        code={`<Progress value={65} />`}
      >
        <Progress value={65} />
      </DocPreview>

      <DocH2 id="sizes">Sizes</DocH2>
      <DocPreview
        title="sm, md, lg"
        code={`<Stack gap="md">
  <Progress value={40} size="sm" />
  <Progress value={55} size="md" />
  <Progress value={70} size="lg" />
</Stack>`}
      >
        <Stack gap="md">
          <Progress value={40} size="sm" />
          <Progress value={55} size="md" />
          <Progress value={70} size="lg" />
        </Stack>
      </DocPreview>

      <DocH2 id="severity">Severity colors</DocH2>
      <DocPreview
        title="Severities"
        code={`<Stack gap="md">
  <Progress value={20} severity="primary" />
  <Progress value={35} severity="secondary" />
  <Progress value={50} severity="success" />
  <Progress value={65} severity="danger" />
  <Progress value={80} severity="warning" />
  <Progress value={90} severity="info" />
</Stack>`}
      >
        <Stack gap="md">
          <Progress value={20} severity="primary" />
          <Progress value={35} severity="secondary" />
          <Progress value={50} severity="success" />
          <Progress value={65} severity="danger" />
          <Progress value={80} severity="warning" />
          <Progress value={90} severity="info" />
        </Stack>
      </DocPreview>

      <DocH2 id="label-value">With label and showValue</DocH2>
      <DocP>
        Set <InlineCode>label</InlineCode> and <InlineCode>showValue</InlineCode> to show a heading
        row with the clamped percentage.
      </DocP>
      <DocPreview
        title="Label + percentage"
        code={`<Progress value={65} label="Uploading" showValue />`}
      >
        <Progress value={65} label="Uploading" showValue />
      </DocPreview>

      <DocH2 id="indeterminate">Indeterminate</DocH2>
      <DocP>
        Omit <InlineCode>value</InlineCode> or set it to <InlineCode>null</InlineCode> for an
        indeterminate animation; <InlineCode>aria-valuenow</InlineCode> is omitted.
      </DocP>
      <DocPreview
        title="Indeterminate"
        code={`<Progress />`}
      >
        <Progress />
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <PropsTable rows={componentProps} />
    </DocArticle>
  )
}
