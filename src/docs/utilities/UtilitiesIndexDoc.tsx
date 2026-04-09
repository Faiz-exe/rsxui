import * as stylex from '@stylexjs/stylex'
import { Link } from 'react-router-dom'
import { mergeSx, Text, u } from '../../lib'
import { indexStyles } from '../DocsIndex.stylex'
import { DocImport } from '../ui/DocImport'
import { DocPreview } from '../ui/DocPreview'
import {
  DocArticle,
  DocH1,
  DocH2,
  DocH3,
  DocLead,
  DocLi,
  DocLink,
  DocP,
  DocUl,
  InlineCode,
} from '../ui/Prose'
import { utilitySectionCards } from './utilitiesNav'
import { useDocMeta } from '../useDocMeta'

export function UtilitiesIndexDoc() {
  useDocMeta('Utilities', 'StyleX utility styles for layout, spacing, typography, and more.')
  return (
    <DocArticle>
      <DocH1>Utilities</DocH1>
      <DocLead>
        Composable StyleX styles for layout, spacing, type, and surfaces. They use the same tokens
        as components, so themes and dark mode stay consistent.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="u, utilities, mergeSx" />
      <DocP>
        <InlineCode>u</InlineCode> is a short alias for <InlineCode>utilities</InlineCode>.
      </DocP>

      <DocH2 id="how">How it works</DocH2>
      <DocUl>
        <DocLi>
          Combine keys:{' '}
          <InlineCode>{'stylex.props(u.flex, u.gapMd, u.pSm)'}</InlineCode>, then spread onto an
          element.
        </DocLi>
        <DocLi>
          StyleX emits scoped classes only for utilities you use—no global utility CSS file.
        </DocLi>
        <DocLi>
          Token-based rules respect <InlineCode>ThemeProvider</InlineCode>. See{' '}
          <DocLink to="/docs/theme">Theme &amp; tokens</DocLink>.
        </DocLi>
      </DocUl>

      <DocH2 id="sections">Guides by topic</DocH2>
      <DocP>
        Each page lists every key in that category, what CSS it applies, and when to use it.
      </DocP>
      <div {...stylex.props(indexStyles.grid)}>
        {utilitySectionCards.map((item) => (
          <Link key={item.to} to={item.to} {...stylex.props(indexStyles.cardLink)}>
            <h3 {...stylex.props(indexStyles.cardTitle)}>{item.title}</h3>
            <p {...stylex.props(indexStyles.cardDesc)}>{item.desc}</p>
          </Link>
        ))}
      </div>

      <DocH2 id="examples">Quick examples</DocH2>

      <DocH3 id="minimal">Utilities only</DocH3>
      <DocPreview
        title="Flex row + gap"
        code={`import * as stylex from '@stylexjs/stylex'
import { u, Text } from 'react-stylex-ui'

<div {...stylex.props(u.flex, u.gapMd, u.itemsCenter)}>
  <Text variant="body">A</Text>
  <Text variant="body">B</Text>
</div>`}
      >
        <div {...stylex.props(u.flex, u.gapMd, u.itemsCenter)}>
          <Text variant="body">A</Text>
          <Text variant="body">B</Text>
        </div>
      </DocPreview>

      <DocH3 id="merge">With mergeSx</DocH3>
      <DocPreview
        title="Optional className / style"
        code={`mergeSx(
  stylex.props(u.flex, u.flexCol, u.gapSm, u.pMd, u.roundedMd, u.border),
  undefined,
  { maxWidth: 360 },
)`}
      >
        <div
          {...mergeSx(
            stylex.props(u.flex, u.flexCol, u.gapSm, u.pMd, u.roundedMd, u.border, u.bgSubtle),
            undefined,
            { maxWidth: 360 },
          )}
        >
          <Text variant="body">Panel</Text>
        </div>
      </DocPreview>

      <DocH2 id="source">Source</DocH2>
      <DocP>
        Definitions live in <InlineCode>src/lib/utilities/utilities.stylex.ts</InlineCode>.
      </DocP>

      <DocH2 id="a11y">Accessibility</DocH2>
      <DocP>
        Utilities are visual only. Use semantic HTML and components for roles, labels, and focus.
      </DocP>
    </DocArticle>
  )
}
