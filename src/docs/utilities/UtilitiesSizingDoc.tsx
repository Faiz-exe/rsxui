import * as stylex from '@stylexjs/stylex'
import { Text, u } from '../../lib'
import { DocImport } from '../ui/DocImport'
import { DocPreview } from '../ui/DocPreview'
import {
  DocArticle,
  DocH1,
  DocH2,
  DocH3,
  DocLead,
  DocP,
  InlineCode,
} from '../ui/Prose'

export function UtilitiesSizingDoc() {
  return (
    <DocArticle>
      <DocH1>Sizing utilities</DocH1>
      <DocLead>
        Width, height, and min/max constraints for layout—especially inside flex and grid, where
        defaults can cause overflow or unwanted stretching.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="u, utilities" />

      <DocH2 id="preview">Preview</DocH2>
      <DocPreview
        title="Full width + min-width 0 (flex child)"
        code={`<div {...stylex.props(u.flex)}>
  <div {...stylex.props(u.minW0, u.flex1, u.border, u.pSm)}>
    <Text>Truncates instead of overflowing parent</Text>
  </div>
</div>`}
      >
        <div {...stylex.props(u.flex, u.wFull)}>
          <div {...stylex.props(u.minW0, u.flex1, u.border, u.pSm, u.truncate)}>
            <Text variant="body">
              Long text that would overflow without minW0 on a flex item…
            </Text>
          </div>
        </div>
      </DocPreview>

      <DocH2 id="reference">Reference</DocH2>

      <DocH3 id="wFull">
        <InlineCode>u.wFull</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>width: 100%</InlineCode>. Fills the parent’s content box.
      </DocP>

      <DocH3 id="hFull">
        <InlineCode>u.hFull</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>height: 100%</InlineCode>. Parent usually needs an explicit height for this to
        show an effect.
      </DocP>

      <DocH3 id="minW0">
        <InlineCode>u.minW0</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>min-width: 0</InlineCode>. Flex items default to <InlineCode>min-width: auto</InlineCode>
        , which blocks shrinking below content size—this resets that so truncation and scrolling work.
      </DocP>

      <DocH3 id="minH0">
        <InlineCode>u.minH0</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>min-height: 0</InlineCode>. Same idea as <InlineCode>minW0</InlineCode> on the
        block axis for nested flex/grid scroll areas.
      </DocP>

      <DocH3 id="maxWFull">
        <InlineCode>u.maxWFull</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>max-width: 100%</InlineCode>. Prevents an element from overflowing its
        containing block—handy for images and wide tables.
      </DocP>
    </DocArticle>
  )
}
