import { Skeleton, Stack } from '../../../lib'
import { DocImport } from '../../ui/DocImport'
import { DocPreview } from '../../ui/DocPreview'
import { PropsTable } from '../../ui/PropsTable'
import { DocArticle, DocH1, DocH2, DocP, InlineCode } from '../../ui/Prose'

const componentProps = [
  {
    name: 'variant',
    type: "'text' | 'circular' | 'rectangular'",
    default: "'text'",
    description: 'Shape preset; text supports multiple lines via `lines`.',
  },
  {
    name: 'width',
    type: 'number | string',
    description: 'CSS width (number becomes px).',
  },
  {
    name: 'height',
    type: 'number | string',
    description: 'CSS height (number becomes px). Circular defaults height to width when height omitted.',
  },
  {
    name: 'lines',
    type: 'number',
    default: '1',
    description: 'For `variant="text"`, repeat line placeholders; last line is narrower.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Merged onto the root after StyleX.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description: 'Merged onto the root (or outer flex wrapper for multi-line text).',
  },
] as const

export function SkeletonDoc() {
  return (
    <DocArticle>
      <DocH1 description="Loading placeholders for text, avatars, blocks, and composed card layouts.">
        Skeleton
      </DocH1>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Skeleton, Stack"  />

      <DocH2 id="text">Text</DocH2>
      <DocP>
        Default <InlineCode>variant</InlineCode> is <InlineCode>text</InlineCode> — a single muted
        bar.
      </DocP>
      <DocPreview
        title="Text (default)"
        code={`<Skeleton />`}
      >
        <Skeleton />
      </DocPreview>

      <DocH2 id="multiline">Multi-line</DocH2>
      <DocPreview
        title="lines={3}"
        code={`<Skeleton lines={3} />`}
      >
        <Skeleton lines={3} />
      </DocPreview>

      <DocH2 id="circular">Circular</DocH2>
      <DocPreview
        title="Avatar-sized"
        code={`<Skeleton variant="circular" width={48} />`}
      >
        <Skeleton variant="circular" width={48} />
      </DocPreview>

      <DocH2 id="rectangular">Rectangular</DocH2>
      <DocPreview
        title="Block"
        code={`<Skeleton variant="rectangular" width="100%" height={120} />`}
      >
        <Skeleton variant="rectangular" width="100%" height={120} />
      </DocPreview>

      <DocH2 id="card-placeholder">Card placeholder</DocH2>
      <DocP>
        Combine circular and text skeletons to mimic a media object or card header while content
        loads.
      </DocP>
      <DocPreview
        title="Loading card"
        code={`<Stack direction="row" gap="md" align="start">
  <Skeleton variant="circular" width={48} />
  <Stack gap="sm" style={{ flex: 1, minWidth: 0 }}>
    <Skeleton lines={2} />
    <Skeleton width="80%" />
  </Stack>
</Stack>`}
      >
        <Stack direction="row" gap="md" align="start">
          <Skeleton variant="circular" width={48} />
          <Stack gap="sm" style={{ flex: 1, minWidth: 0 }}>
            <Skeleton lines={2} />
            <Skeleton width="80%" />
          </Stack>
        </Stack>
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <PropsTable rows={componentProps} />
    </DocArticle>
  )
}
