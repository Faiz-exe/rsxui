import { useState } from 'react'
import { Stack, Tab, TabList, TabPanel, Tabs, Text } from '../../../lib'
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
import { useDocMeta } from '../../useDocMeta'

const tabsProps = [
  {
    name: 'value',
    type: 'string',
    description: 'Controlled selected tab id; must match a Tab / TabPanel value.',
  },
  {
    name: 'defaultValue',
    type: 'string',
    default: "''",
    description: 'Uncontrolled initial selection.',
  },
  {
    name: 'onValueChange',
    type: '(value: string) => void',
    description: 'Called when the user selects a tab.',
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

const tabListProps = [
  {
    name: 'aria-label',
    type: 'string',
    description: 'Accessible name for the tablist (recommended).',
  },
  {
    name: 'onKeyDown',
    type: 'KeyboardEventHandler',
    description:
      'Merged with built-in Arrow Left/Right, Home, and End focus management between tabs.',
  },
  {
    name: '…',
    type: 'ComponentProps<"div">',
    description: 'Other div props for the tab strip container.',
  },
] as const

const tabProps = [
  {
    name: 'value',
    type: 'string',
    description: 'Id for this tab; must match the corresponding TabPanel value.',
  },
  {
    name: '…',
    type: 'Omit<ComponentProps<"button">, "value">',
    description:
      'Other button props (disabled, className, etc.). Native button value is omitted in favor of tab selection.',
  },
] as const

const tabPanelProps = [
  {
    name: 'value',
    type: 'string',
    description: 'Which tab controls this panel; hidden when not selected.',
  },
  {
    name: '…',
    type: 'ComponentProps<"div">',
    description: 'Other div props. Children stay mounted; use hidden + CSS if you need lazy panels.',
  },
] as const

export function TabsDoc() {
  useDocMeta('Tabs', 'Tablist, tabs, and panels with keyboard navigation.')
  const [tab, setTab] = useState('one')

  return (
    <DocArticle>
      <DocH1>Tabs</DocH1>
      <DocLead>
        Tabbed interface with <InlineCode>TabList</InlineCode>, <InlineCode>Tab</InlineCode>, and{' '}
        <InlineCode>TabPanel</InlineCode>. Keyboard navigation on the tab strip, correct ARIA roles,
        and controlled or uncontrolled selection.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Tabs, TabList, Tab, TabPanel, Text" />

      <DocH2 id="usage">Usage</DocH2>
      <DocP>
        Give each tab and panel the same <InlineCode>value</InlineCode> string. Set{' '}
        <InlineCode>defaultValue</InlineCode> on <InlineCode>Tabs</InlineCode> (or control with{' '}
        <InlineCode>value</InlineCode> / <InlineCode>onValueChange</InlineCode>).
      </DocP>
      <DocPreview
        title="Basic"
        code={`<Tabs defaultValue="one">
  <TabList aria-label="Example tabs">
    <Tab value="one">First</Tab>
    <Tab value="two">Second</Tab>
  </TabList>
  <TabPanel value="one">
    <Text variant="body">First panel</Text>
  </TabPanel>
  <TabPanel value="two">
    <Text variant="body">Second panel</Text>
  </TabPanel>
</Tabs>`}
      >
        <Stack gap="md" style={{ maxWidth: 480 }}>
          <Tabs defaultValue="one">
            <TabList aria-label="Example tabs">
              <Tab value="one">First</Tab>
              <Tab value="two">Second</Tab>
            </TabList>
            <TabPanel value="one">
              <Text variant="body">First panel</Text>
            </TabPanel>
            <TabPanel value="two">
              <Text variant="body">Second panel</Text>
            </TabPanel>
          </Tabs>
        </Stack>
      </DocPreview>

      <DocH2 id="controlled">Controlled</DocH2>
      <DocP>
        Drive <InlineCode>value</InlineCode> from state to sync tabs with routing or other UI.
      </DocP>
      <DocPreview
        title="Controlled"
        code={`const [tab, setTab] = useState('one')

<Tabs value={tab} onValueChange={setTab}>
  <TabList aria-label="Controlled example">
    <Tab value="one">One</Tab>
    <Tab value="two">Two</Tab>
  </TabList>
  <TabPanel value="one">…</TabPanel>
  <TabPanel value="two">…</TabPanel>
</Tabs>`}
      >
        <Stack gap="md" style={{ maxWidth: 480 }}>
          <Tabs value={tab} onValueChange={setTab}>
            <TabList aria-label="Controlled example">
              <Tab value="one">One</Tab>
              <Tab value="two">Two</Tab>
            </TabList>
            <TabPanel value="one">
              <Text variant="body">Selected: {tab}</Text>
            </TabPanel>
            <TabPanel value="two">
              <Text variant="body">Still {tab}.</Text>
            </TabPanel>
          </Tabs>
        </Stack>
      </DocPreview>

      <DocH2 id="props-tabs">Props — Tabs</DocH2>
      <PropsTable rows={[...tabsProps]} />

      <DocH2 id="props-tablist">Props — TabList</DocH2>
      <PropsTable rows={[...tabListProps]} />

      <DocH2 id="props-tab">Props — Tab</DocH2>
      <PropsTable rows={[...tabProps]} />

      <DocH2 id="props-tabpanel">Props — TabPanel</DocH2>
      <PropsTable rows={[...tabPanelProps]} />
    </DocArticle>
  )
}
