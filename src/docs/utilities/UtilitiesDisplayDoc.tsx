import * as stylex from '@stylexjs/stylex'
import { u } from '../../lib'
import { DocImport } from '../ui/DocImport'
import { DocPreview } from '../ui/DocPreview'
import { UtilityCssTable } from '../ui/UtilityCssTable'
import {
  DocArticle,
  DocH1,
  DocH2,
  DocLead,
  DocLink,
  DocP,
  DocExternalLink,
  InlineCode,
} from '../ui/Prose'

/** Shared demo tile (PrimeFlex-style numbered blocks). */
const tileSize = { width: '4rem', height: '4rem', flexShrink: 0 as const }

/** Extra StyleX styles merged onto the demo tile (flex centering + surface). */
function demoTileSx(...extra: ReadonlyArray<unknown>) {
  return stylex.props(
    u.flex,
    u.itemsCenter,
    u.justifyCenter,
    u.pMd,
    u.roundedMd,
    u.border,
    u.bgElevated,
    u.fontBold,
    u.textCenter,
    ...(extra as []),
  )
}

const displayClassRows = [
  { name: 'u.hidden', css: 'display: none;' },
  { name: 'u.block', css: 'display: block;' },
  { name: 'u.inline', css: 'display: inline;' },
  { name: 'u.inlineBlock', css: 'display: inline-block;' },
  { name: 'u.flex', css: 'display: flex;' },
  { name: 'u.inlineFlex', css: 'display: inline-flex;' },
  { name: 'u.grid', css: 'display: grid;' },
] as const

export function UtilitiesDisplayDoc() {
  return (
    <DocArticle>
      <DocH1>Display</DocH1>
      <DocLead>
        Defines how an element is displayed on the page. In this library you compose StyleX
        utilities (<InlineCode>u.hidden</InlineCode>, <InlineCode>u.flex</InlineCode>, …) with{' '}
        <InlineCode>stylex.props()</InlineCode> instead of global class names. Section layout and
        examples follow the structure of{' '}
        <DocExternalLink href="https://primeflex.org/display">PrimeFlex — Display</DocExternalLink>.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="u, utilities" />

      <DocH2 id="classes">Classes</DocH2>
      <UtilityCssTable rows={[...displayClassRows]} />

      <DocH2 id="hidden">Hidden</DocH2>
      <DocP>
        A hidden element is not visible and does not take up space in the layout (
        <InlineCode>display: none</InlineCode>). Prefer conditional rendering in React when the
        content should not exist in the DOM for accessibility.
      </DocP>
      <DocPreview
        title="Hidden"
        code={`import * as stylex from '@stylexjs/stylex'
import { u } from 'react-stylex-ui'

<div {...stylex.props(u.flex, u.gapMd, u.itemsCenter)}>
  <div {...stylex.props(u.hidden)} style={{ width: '4rem', height: '4rem' }}>1</div>
  <div {...stylex.props(u.flex, u.itemsCenter, u.justifyCenter, u.pMd, u.roundedMd, u.border, u.bgElevated, u.fontBold)} style={{ width: '4rem', height: '4rem' }}>2</div>
  <div {...stylex.props(u.flex, u.itemsCenter, u.justifyCenter, u.pMd, u.roundedMd, u.border, u.bgElevated, u.fontBold)} style={{ width: '4rem', height: '4rem' }}>3</div>
</div>`}
      >
        <div {...stylex.props(u.flex, u.gapMd, u.itemsCenter)}>
          <div {...stylex.props(u.hidden)} style={tileSize}>
            1
          </div>
          <div {...demoTileSx()} style={tileSize}>
            2
          </div>
          <div {...demoTileSx()} style={tileSize}>
            3
          </div>
        </div>
      </DocPreview>

      <DocH2 id="block">Block</DocH2>
      <DocP>
        A block element starts on a new line and stretches to the full width of its containing
        block (subject to margins).
      </DocP>
      <DocPreview
        title="Block"
        code={`<div {...stylex.props(u.flex, u.flexCol, u.gapMd)}>
  <div {...stylex.props(u.block, u.pMd, u.roundedMd, u.border, u.bgElevated, u.fontBold, u.textCenter)}>1</div>
  <div {...stylex.props(u.block, u.pMd, u.roundedMd, u.border, u.bgElevated, u.fontBold, u.textCenter)}>2</div>
  <div {...stylex.props(u.block, u.pMd, u.roundedMd, u.border, u.bgElevated, u.fontBold, u.textCenter)}>3</div>
</div>`}
      >
        <div {...stylex.props(u.flex, u.flexCol, u.gapMd)}>
          <div {...demoTileSx(u.block)}>1</div>
          <div {...demoTileSx(u.block)}>2</div>
          <div {...demoTileSx(u.block)}>3</div>
        </div>
      </DocPreview>

      <DocH2 id="inline">Inline</DocH2>
      <DocP>
        An inline element does not start on a new line; it only uses as much width as its content.
        Width and height are ignored for sizing the box.
      </DocP>
      <DocPreview
        title="Inline"
        code={`<div {...stylex.props(u.pMd, u.border, u.roundedMd, u.bgSubtle)}>
  <span {...stylex.props(u.inline, u.pMd, u.roundedMd, u.border, u.bgElevated, u.fontBold)}>1</span>
  <span {...stylex.props(u.inline, u.pMd, u.roundedMd, u.border, u.bgElevated, u.fontBold)}> 2 </span>
  <span {...stylex.props(u.inline, u.pMd, u.roundedMd, u.border, u.bgElevated, u.fontBold)}>3</span>
</div>`}
      >
        <div {...stylex.props(u.pMd, u.border, u.roundedMd, u.bgSubtle)}>
          <span {...stylex.props(u.inline, u.pMd, u.roundedSm, u.border, u.bgElevated, u.fontBold)}>
            1
          </span>
          <span {...stylex.props(u.inline, u.pMd, u.roundedSm, u.border, u.bgElevated, u.fontBold)}>
            {' '}
            2{' '}
          </span>
          <span {...stylex.props(u.inline, u.pMd, u.roundedSm, u.border, u.bgElevated, u.fontBold)}>
            3
          </span>
        </div>
      </DocPreview>

      <DocH2 id="inline-block">Inline block</DocH2>
      <DocP>
        Like inline, but width, height, and vertical padding/margin behave like a block—useful for
        fixed-size chips in a text flow.
      </DocP>
      <DocPreview
        title="Inline block"
        code={`<div {...stylex.props(u.pMd, u.border, u.roundedMd, u.bgSubtle)}>
  <div {...stylex.props(u.inlineBlock, u.flex, u.itemsCenter, u.justifyCenter, u.pMd, u.roundedMd, u.border, u.bgElevated, u.fontBold)} style={{ width: '4rem', height: '4rem' }}>1</div>
  <div {...stylex.props(u.inlineBlock, u.flex, u.itemsCenter, u.justifyCenter, u.pMd, u.roundedMd, u.border, u.bgElevated, u.fontBold)} style={{ width: '4rem', height: '4rem', marginInline: 12 }}>2</div>
  <div {...stylex.props(u.inlineBlock, u.flex, u.itemsCenter, u.justifyCenter, u.pMd, u.roundedMd, u.border, u.bgElevated, u.fontBold)} style={{ width: '4rem', height: '4rem' }}>3</div>
</div>`}
      >
        <div {...stylex.props(u.pMd, u.border, u.roundedMd, u.bgSubtle)}>
          <div {...demoTileSx(u.inlineBlock)} style={tileSize}>
            1
          </div>
          <div
            {...demoTileSx(u.inlineBlock)}
            style={{ ...tileSize, marginInline: 12 }}
          >
            2
          </div>
          <div {...demoTileSx(u.inlineBlock)} style={tileSize}>
            3
          </div>
        </div>
      </DocPreview>

      <DocH2 id="flex">Flex</DocH2>
      <DocP>
        A block-level flex container: children become flex items. Add{' '}
        <DocLink to="/docs/utilities/flex-layout">Flex &amp; gap</DocLink> utilities for direction,
        alignment, and spacing.
      </DocP>
      <DocPreview
        title="Flex"
        code={`<div {...stylex.props(u.flex, u.gapMd)}>
  <div {...stylex.props(u.flex1, u.flex, u.itemsCenter, u.justifyCenter, u.pMd, u.roundedMd, u.border, u.bgElevated, u.fontBold)} style={{ minHeight: '4rem' }}>1</div>
  <div {...stylex.props(u.flex1, u.flex, u.itemsCenter, u.justifyCenter, u.pMd, u.roundedMd, u.border, u.bgElevated, u.fontBold)} style={{ minHeight: '4rem' }}>2</div>
  <div {...stylex.props(u.flex1, u.flex, u.itemsCenter, u.justifyCenter, u.pMd, u.roundedMd, u.border, u.bgElevated, u.fontBold)} style={{ minHeight: '4rem' }}>3</div>
</div>`}
      >
        <div {...stylex.props(u.flex, u.gapMd)}>
          <div {...demoTileSx(u.flex1)} style={{ ...tileSize, minHeight: tileSize.height }}>
            1
          </div>
          <div {...demoTileSx(u.flex1)} style={{ ...tileSize, minHeight: tileSize.height }}>
            2
          </div>
          <div {...demoTileSx(u.flex1)} style={{ ...tileSize, minHeight: tileSize.height }}>
            3
          </div>
        </div>
      </DocPreview>

      <DocH2 id="inline-flex">Inline flex</DocH2>
      <DocP>
        An inline-level flex container: the box shrinks to its content width while children use
        flex layout—handy for toolbars or chip groups in a sentence.
      </DocP>
      <DocPreview
        title="Inline flex"
        code={`<div {...stylex.props(u.pMd, u.border, u.roundedMd, u.bgSubtle)}>
  <div {...stylex.props(u.inlineFlex, u.gapMd)}>
    <div {...stylex.props(u.flex1, u.flex, u.itemsCenter, u.justifyCenter, u.pMd, u.roundedMd, u.border, u.bgElevated, u.fontBold)} style={{ minHeight: '4rem', minWidth: '4rem' }}>1</div>
    <div {...stylex.props(u.flex1, u.flex, u.itemsCenter, u.justifyCenter, u.pMd, u.roundedMd, u.border, u.bgElevated, u.fontBold)} style={{ minHeight: '4rem', minWidth: '4rem' }}>2</div>
    <div {...stylex.props(u.flex1, u.flex, u.itemsCenter, u.justifyCenter, u.pMd, u.roundedMd, u.border, u.bgElevated, u.fontBold)} style={{ minHeight: '4rem', minWidth: '4rem' }}>3</div>
  </div>
</div>`}
      >
        <div {...stylex.props(u.pMd, u.border, u.roundedMd, u.bgSubtle)}>
          <div {...stylex.props(u.inlineFlex, u.gapMd)}>
            <div {...demoTileSx(u.flex1)} style={{ ...tileSize, minHeight: tileSize.height }}>
              1
            </div>
            <div {...demoTileSx(u.flex1)} style={{ ...tileSize, minHeight: tileSize.height }}>
              2
            </div>
            <div {...demoTileSx(u.flex1)} style={{ ...tileSize, minHeight: tileSize.height }}>
              3
            </div>
          </div>
        </div>
      </DocPreview>

      <DocH2 id="grid">Grid</DocH2>
      <DocP>
        <InlineCode>display: grid</InlineCode>. Define tracks with{' '}
        <InlineCode>style</InlineCode> (<InlineCode>gridTemplateColumns</InlineCode>) or your own
        StyleX styles.
      </DocP>
      <DocPreview
        title="Grid"
        code={`<div
  {...stylex.props(u.grid, u.gapSm, u.pSm, u.border, u.roundedMd, u.bgSubtle)}
  style={{ gridTemplateColumns: '1fr 1fr 1fr' }}
>
  <div {...stylex.props(u.flex, u.itemsCenter, u.justifyCenter, u.pMd, u.roundedMd, u.border, u.bgElevated, u.fontBold)}>1</div>
  <div {...stylex.props(u.flex, u.itemsCenter, u.justifyCenter, u.pMd, u.roundedMd, u.border, u.bgElevated, u.fontBold)}>2</div>
  <div {...stylex.props(u.flex, u.itemsCenter, u.justifyCenter, u.pMd, u.roundedMd, u.border, u.bgElevated, u.fontBold)}>3</div>
</div>`}
      >
        <div
          {...stylex.props(u.grid, u.gapSm, u.pSm, u.border, u.roundedMd, u.bgSubtle)}
          style={{ gridTemplateColumns: '1fr 1fr 1fr' }}
        >
          <div {...demoTileSx()} style={{ minHeight: tileSize.height }}>
            1
          </div>
          <div {...demoTileSx()} style={{ minHeight: tileSize.height }}>
            2
          </div>
          <div {...demoTileSx()} style={{ minHeight: tileSize.height }}>
            3
          </div>
        </div>
      </DocPreview>

      <DocH2 id="responsive">Responsive</DocH2>
      <DocP>
        PrimeFlex uses breakpoint prefixes such as <InlineCode>md:block</InlineCode>. This library
        does not ship responsive string classes; use StyleX{' '}
        <InlineCode>@media</InlineCode> rules in your own <InlineCode>stylex.create</InlineCode>{' '}
        styles, or toggle utilities from React based on window size / container queries.
      </DocP>
    </DocArticle>
  )
}
