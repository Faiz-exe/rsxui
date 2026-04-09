import { ThemeToggle } from '../../../lib'
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

export function ThemeToggleDoc() {
  return (
    <DocArticle>
      <DocH1>ThemeToggle</DocH1>
      <DocLead>
        Demo control that shows the active resolved theme and cycles{' '}
        <InlineCode>colorScheme</InlineCode> (system → light → dark). Must be used
        under <InlineCode>ThemeProvider</InlineCode>.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="ThemeToggle" />

      <DocH2 id="usage">Usage</DocH2>
      <DocP>
        Place anywhere inside the themed tree. The button updates global preference
        (and localStorage when enabled) via <InlineCode>useTheme()</InlineCode>.
      </DocP>
      <DocPreview title="Basic" code={`<ThemeToggle />`}>
        <ThemeToggle />
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <DocP>
        No public props. State is read and updated only through the theme context.
      </DocP>
      <PropsTable
        rows={[
          {
            name: '—',
            type: '—',
            default: '—',
            description:
              'No props. Layout and labels are implementation details and may change without a semver guarantee for this demo-only control.',
          },
        ]}
      />

      <DocH2 id="accessibility">Accessibility</DocH2>
      <DocP>
        The control button exposes a verbose <InlineCode>aria-label</InlineCode>{' '}
        describing the current scheme and the action. Active resolved theme is
        shown as visible text beside the button.
      </DocP>
    </DocArticle>
  )
}
