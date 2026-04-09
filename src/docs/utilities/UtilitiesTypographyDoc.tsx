import * as stylex from '@stylexjs/stylex'
import { u } from '../../lib'
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

export function UtilitiesTypographyDoc() {
  return (
    <DocArticle>
      <DocH1>Typography utilities</DocH1>
      <DocLead>
        Font families from <InlineCode>fonts.*</InlineCode>, fixed type scales, weights, semantic
        text colors, alignment, line-height presets, and single-line truncation. Colors follow{' '}
        <DocLink to="/docs/theme">theme tokens</DocLink>.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="u, utilities" />

      <DocH2 id="preview">Preview</DocH2>
      <DocPreview
        title="Stack of type samples"
        code={`<div {...stylex.props(u.flex, u.flexCol, u.gapSm)}>
  <span {...stylex.props(u.fontMono, u.textSm)}>Mono small</span>
  <span {...stylex.props(u.textLg, u.fontSemibold, u.textFg)}>Large semibold</span>
  <span {...stylex.props(u.textMuted)}>Muted tone</span>
</div>`}
      >
        <div {...stylex.props(u.flex, u.flexCol, u.gapSm)}>
          <span {...stylex.props(u.fontMono, u.textSm)}>Mono small</span>
          <span {...stylex.props(u.textLg, u.fontSemibold, u.textFg)}>Large semibold</span>
          <span {...stylex.props(u.textMuted)}>Muted tone</span>
        </div>
      </DocPreview>

      <DocH2 id="families">Font families</DocH2>
      <DocP>
        <InlineCode>u.fontSans</InlineCode> — UI sans stack (<InlineCode>fonts.sans</InlineCode>).
        <InlineCode>u.fontSerif</InlineCode> — long-form serif.{' '}
        <InlineCode>u.fontMono</InlineCode> — monospace for code and data.
      </DocP>

      <DocH2 id="size">Font size &amp; line height</DocH2>
      <DocP>
        <InlineCode>u.textXs</InlineCode> (<InlineCode>0.75rem</InlineCode>),{' '}
        <InlineCode>u.textSm</InlineCode> (<InlineCode>0.875rem</InlineCode>),{' '}
        <InlineCode>u.textBase</InlineCode> (<InlineCode>1rem</InlineCode>),{' '}
        <InlineCode>u.textLg</InlineCode> (<InlineCode>1.125rem</InlineCode>)—each includes a
        matching <InlineCode>lineHeight</InlineCode>.
      </DocP>

      <DocH2 id="weight">Font weight</DocH2>
      <DocP>
        <InlineCode>u.fontNormal</InlineCode> (400), <InlineCode>u.fontMedium</InlineCode> (500),{' '}
        <InlineCode>u.fontSemibold</InlineCode> (600), <InlineCode>u.fontBold</InlineCode> (700).
      </DocP>

      <DocH2 id="color">Text color (semantic)</DocH2>
      <DocP>
        <InlineCode>u.textFg</InlineCode> — primary foreground. <InlineCode>u.textMuted</InlineCode>{' '}
        — secondary. <InlineCode>u.textSubtle</InlineCode> — tertiary. All use{' '}
        <InlineCode>colors.*</InlineCode> variables.
      </DocP>

      <DocH2 id="align">Alignment</DocH2>
      <DocP>
        <InlineCode>u.textStart</InlineCode>, <InlineCode>u.textCenter</InlineCode>,{' '}
        <InlineCode>u.textEnd</InlineCode> — logical start/center/end for text direction support.
      </DocP>

      <DocH2 id="leading">Line height only</DocH2>
      <DocP>
        <InlineCode>u.leadingNone</InlineCode> (1), <InlineCode>u.leadingTight</InlineCode>{' '}
        (1.25), <InlineCode>u.leadingNormal</InlineCode> (1.5)—combine with any font size.
      </DocP>

      <DocH2 id="truncate">Truncation</DocH2>
      <DocH3 id="truncate-ref">
        <InlineCode>u.truncate</InlineCode>
      </DocH3>
      <DocP>
        <InlineCode>overflow: hidden</InlineCode>, <InlineCode>text-overflow: ellipsis</InlineCode>,{' '}
        <InlineCode>white-space: nowrap</InlineCode>. Pair with <InlineCode>u.minW0</InlineCode> on
        flex children (<DocLink to="/docs/utilities/sizing">Sizing</DocLink>).
      </DocP>
    </DocArticle>
  )
}
