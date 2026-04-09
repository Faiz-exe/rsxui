import { Button, Stack, Tooltip } from '../../../lib'
import { DocImport } from '../../ui/DocImport'
import { DocPreview } from '../../ui/DocPreview'
import { PropsTable } from '../../ui/PropsTable'
import {
  DocArticle,
  DocH1,
  DocH2,
  DocP,
  InlineCode,
} from '../../ui/Prose'
import { useDocMeta } from '../../useDocMeta'

const tooltipProps = [
  {
    name: 'content',
    type: 'ReactNode',
    required: true,
    description: 'Text or elements rendered in the floating tooltip.',
  },
  {
    name: 'position',
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'top'",
    description: 'Placement relative to the trigger; coordinates update after open.',
  },
  {
    name: 'delay',
    type: 'number',
    default: '200',
    description: 'Delay in milliseconds before the tooltip appears on hover or focus.',
  },
  {
    name: 'children',
    type: 'ReactElement',
    required: true,
    description: 'Single React element that receives hover, focus, and aria-describedby wiring.',
  },
] as const

export function TooltipDoc() {
  useDocMeta('Tooltip', 'Hover and focus hints with four positions and configurable delay.')
  return (
    <DocArticle>
      <DocH1
        description={
          <>
            Accessible hover and focus hints: portals the tooltip to{' '}
            <InlineCode>document.body</InlineCode>, positions it from the trigger rect, and sets{' '}
            <InlineCode>aria-describedby</InlineCode> while open.
          </>
        }
      >
        Tooltip
      </DocH1>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Tooltip, Button, Stack" />

      <DocH2 id="basic">Basic</DocH2>
      <DocP>
        Wrap a single element (for example <InlineCode>Button</InlineCode>) as{' '}
        <InlineCode>children</InlineCode>; only one element is supported because refs and event
        handlers are merged onto it.
      </DocP>
      <DocPreview
        title="Button trigger"
        code={`<Tooltip content="Save your changes">
  <Button label="Save" />
</Tooltip>`}
      >
        <Tooltip content="Save your changes">
          <Button label="Save" />
        </Tooltip>
      </DocPreview>

      <DocH2 id="positions">Positions</DocH2>
      <DocP>
        Set <InlineCode>position</InlineCode> to <InlineCode>top</InlineCode>,{' '}
        <InlineCode>bottom</InlineCode>, <InlineCode>left</InlineCode>, or <InlineCode>right</InlineCode>.
      </DocP>
      <DocPreview
        title="All sides"
        code={`<Stack direction="row" gap="md" style={{ flexWrap: 'wrap' }}>
  <Tooltip content="Top" position="top">
    <Button label="Top" />
  </Tooltip>
  <Tooltip content="Bottom" position="bottom">
    <Button label="Bottom" />
  </Tooltip>
  <Tooltip content="Left" position="left">
    <Button label="Left" />
  </Tooltip>
  <Tooltip content="Right" position="right">
    <Button label="Right" />
  </Tooltip>
</Stack>`}
      >
        <Stack direction="row" gap="md" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
          <Tooltip content="Top" position="top">
            <Button label="Top" />
          </Tooltip>
          <Tooltip content="Bottom" position="bottom">
            <Button label="Bottom" />
          </Tooltip>
          <Tooltip content="Left" position="left">
            <Button label="Left" />
          </Tooltip>
          <Tooltip content="Right" position="right">
            <Button label="Right" />
          </Tooltip>
        </Stack>
      </DocPreview>

      <DocH2 id="custom-content">Custom content</DocH2>
      <DocP>
        <InlineCode>content</InlineCode> accepts any <InlineCode>ReactNode</InlineCode>, not only
        strings.
      </DocP>
      <DocPreview
        title="Rich content"
        code={`<Tooltip
  content={
    <span>
      <strong>Tip:</strong> use keyboard <kbd>⌘S</kbd> to save.
    </span>
  }
>
  <Button label="Shortcuts" />
</Tooltip>`}
      >
        <Tooltip
          content={
            <span>
              <strong>Tip:</strong> use keyboard <kbd>⌘S</kbd> to save.
            </span>
          }
        >
          <Button label="Shortcuts" />
        </Tooltip>
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <PropsTable rows={[...tooltipProps]} showRequiredLegend />
    </DocArticle>
  )
}
