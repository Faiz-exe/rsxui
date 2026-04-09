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
  DocLink,
  DocP,
  InlineCode,
} from '../ui/Prose'

export function UtilitiesFlexLayoutDoc() {
  return (
    <DocArticle>
      <DocH1>Flex &amp; gap utilities</DocH1>
      <DocLead>
        Use these on a parent with <InlineCode>u.flex</InlineCode> or{' '}
        <InlineCode>u.inlineFlex</InlineCode> (<DocLink to="/docs/utilities/display">Display</DocLink>
        ). They map to standard flexbox longhands and the shared <InlineCode>space.*</InlineCode>{' '}
        scale for gaps.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="u, utilities" />

      <DocH2 id="preview">Preview</DocH2>
      <DocPreview
        title="Row, centered, with gap"
        code={`<div {...stylex.props(u.flex, u.gapMd, u.itemsCenter, u.justifyBetween)}>
  <Text>Left</Text>
  <Text>Right</Text>
</div>`}
      >
        <div {...stylex.props(u.flex, u.gapMd, u.itemsCenter, u.justifyBetween, u.wFull)}>
          <Text variant="body">Left</Text>
          <Text variant="body">Right</Text>
        </div>
      </DocPreview>

      <DocH2 id="direction">Direction &amp; wrap</DocH2>

      <DocH3 id="flexRow">
        <InlineCode>u.flexRow</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>flex-direction: row</InlineCode> (default for flex). Main axis is horizontal.
      </DocP>

      <DocH3 id="flexCol">
        <InlineCode>u.flexCol</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>flex-direction: column</InlineCode>. Stacks children vertically—common for
        forms and cards.
      </DocP>

      <DocH3 id="flexRowReverse">
        <InlineCode>u.flexRowReverse</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>flex-direction: row-reverse</InlineCode>. Same as row but main-start and
        main-end swap.
      </DocP>

      <DocH3 id="flexColReverse">
        <InlineCode>u.flexColReverse</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>flex-direction: column-reverse</InlineCode>.
      </DocP>

      <DocH3 id="flexWrap">
        <InlineCode>u.flexWrap</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>flex-wrap: wrap</InlineCode>. Items move to the next line when they run out of
        space.
      </DocP>

      <DocH3 id="flexNowrap">
        <InlineCode>u.flexNowrap</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>flex-wrap: nowrap</InlineCode> (flex default). Single line; items may shrink.
      </DocP>

      <DocH2 id="flexibility">Flex growth &amp; shrink</DocH2>

      <DocH3 id="flex1">
        <InlineCode>u.flex1</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>flex: 1 1 0%</InlineCode>. Item grows and shrinks; basis <InlineCode>0%</InlineCode>{' '}
        so siblings split space evenly—typical for “fill remaining” columns.
      </DocP>

      <DocH3 id="flexAuto">
        <InlineCode>u.flexAuto</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>flex: 1 1 auto</InlineCode>. Grows/shrinks from content-based size.
      </DocP>

      <DocH3 id="flexNone">
        <InlineCode>u.flexNone</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>flex: none</InlineCode> (<InlineCode>0 0 auto</InlineCode>). Fixed to content
        size; won’t grow or shrink.
      </DocP>

      <DocH3 id="grow">
        <InlineCode>u.grow</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>flex-grow: 1</InlineCode>. Takes extra space along the main axis; combine with{' '}
        <InlineCode>u.minW0</InlineCode> on flex children if text overflows oddly.
      </DocP>

      <DocH3 id="shrink0">
        <InlineCode>u.shrink0</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>flex-shrink: 0</InlineCode>. Prevents the item from shrinking—use for icons or
        fixed-width labels.
      </DocP>

      <DocH2 id="align">Align &amp; justify</DocH2>
      <DocP>
        <InlineCode>items*</InlineCode> sets <InlineCode>align-items</InlineCode> on the flex
        container (cross axis). <InlineCode>justify*</InlineCode> sets{' '}
        <InlineCode>justify-content</InlineCode> (main axis). <InlineCode>self*</InlineCode> sets{' '}
        <InlineCode>align-self</InlineCode> on a single child.
      </DocP>

      <DocH3 id="items">
        <InlineCode>u.itemsStart</InlineCode>, <InlineCode>u.itemsCenter</InlineCode>,{' '}
        <InlineCode>u.itemsEnd</InlineCode>, <InlineCode>u.itemsStretch</InlineCode>
      </DocH3>
      <DocP>
        Cross-axis alignment: flex-start, center, flex-end, or stretch (default stretch).
      </DocP>

      <DocH3 id="justify">
        <InlineCode>u.justifyStart</InlineCode>, <InlineCode>u.justifyCenter</InlineCode>,{' '}
        <InlineCode>u.justifyEnd</InlineCode>, <InlineCode>u.justifyBetween</InlineCode>,{' '}
        <InlineCode>u.justifyAround</InlineCode>, <InlineCode>u.justifyEvenly</InlineCode>
      </DocH3>
      <DocP>
        Main-axis distribution: start, center, end, space-between, space-around, space-evenly.
      </DocP>

      <DocH3 id="self">
        <InlineCode>u.selfStart</InlineCode>, <InlineCode>u.selfCenter</InlineCode>,{' '}
        <InlineCode>u.selfEnd</InlineCode>, <InlineCode>u.selfStretch</InlineCode>
      </DocH3>
      <DocP>
        Override alignment for one flex item on the cross axis.
      </DocP>

      <DocH2 id="gap">Gap</DocH2>
      <DocP>
        Spacing between flex or grid items using theme space tokens:{' '}
        <InlineCode>gapXs</InlineCode> (<InlineCode>4px</InlineCode>), <InlineCode>gapSm</InlineCode>{' '}
        (<InlineCode>8px</InlineCode>), <InlineCode>gapMd</InlineCode> (<InlineCode>12px</InlineCode>
        ), <InlineCode>gapLg</InlineCode> (<InlineCode>16px</InlineCode>), <InlineCode>gapXl</InlineCode>{' '}
        (<InlineCode>24px</InlineCode>), <InlineCode>gap2Xl</InlineCode> (<InlineCode>32px</InlineCode>
        ).
      </DocP>
    </DocArticle>
  )
}
