import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Stack,
  Text,
} from '../../../lib'
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

const accordionProps = [
  {
    name: 'multiple',
    type: 'boolean',
    default: 'false',
    description:
      'When true, more than one section can be open; value is string[] in controlled mode.',
  },
  {
    name: 'collapsible',
    type: 'boolean',
    default: 'false',
    description:
      'When false (single mode), the open item cannot be fully closed by clicking its trigger again.',
  },
  {
    name: 'value',
    type: 'string | null | string[]',
    description:
      'Controlled open state: string or null in single mode; string[] when multiple is true.',
  },
  {
    name: 'defaultValue',
    type: 'string | null | string[]',
    description: 'Uncontrolled initial open state (same shape as value).',
  },
  {
    name: 'onValueChange',
    type: '(next: string | null | string[]) => void',
    description: 'Called when the open set changes.',
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

const itemProps = [
  {
    name: 'value',
    type: 'string',
    description: 'Stable id for this item; must be unique within the accordion.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the trigger and keeps the section closed.',
  },
  {
    name: '…',
    type: 'ComponentProps<"div">',
    description: 'Other div props for the item wrapper.',
  },
] as const

const triggerContentProps = [
  {
    name: 'AccordionTrigger',
    type: 'ComponentProps<"button">',
    description:
      'Button trigger with aria-expanded, aria-controls, and chevron. Defaults to type="button".',
  },
  {
    name: 'AccordionContent',
    type: 'ComponentProps<"div">',
    description:
      'Animated region with role="region", aria-labelledby, and hidden when closed.',
  },
] as const

export function AccordionDoc() {
  return (
    <DocArticle>
      <DocH1>Accordion</DocH1>
      <DocLead>
        Expandable sections with a compound API:{' '}
        <InlineCode>AccordionItem</InlineCode>, <InlineCode>AccordionTrigger</InlineCode>, and{' '}
        <InlineCode>AccordionContent</InlineCode>. Supports single or multiple open panels,
        optional collapsible behavior, and controlled or uncontrolled state.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Accordion, AccordionItem, AccordionTrigger, AccordionContent, Text" />

      <DocH2 id="usage">Usage</DocH2>
      <DocP>
        Each <InlineCode>AccordionItem</InlineCode> needs a unique <InlineCode>value</InlineCode>.
        Triggers toggle expansion; content is linked with stable ids for accessibility.
      </DocP>
      <DocPreview
        title="Basic"
        code={`<Accordion defaultValue="a" collapsible>
  <AccordionItem value="a">
    <AccordionTrigger>First section</AccordionTrigger>
    <AccordionContent>
      <Text variant="body">Content for the first panel.</Text>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="b">
    <AccordionTrigger>Second section</AccordionTrigger>
    <AccordionContent>
      <Text variant="body">Content for the second panel.</Text>
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
      >
        <Stack gap="md" style={{ maxWidth: 480 }}>
          <Accordion defaultValue="a" collapsible>
            <AccordionItem value="a">
              <AccordionTrigger>First section</AccordionTrigger>
              <AccordionContent>
                <Text variant="body">Content for the first panel.</Text>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>Second section</AccordionTrigger>
              <AccordionContent>
                <Text variant="body">Content for the second panel.</Text>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Stack>
      </DocPreview>

      <DocH2 id="multiple">Multiple sections</DocH2>
      <DocP>
        Set <InlineCode>multiple</InlineCode> to allow several panels open at once. Use{' '}
        <InlineCode>defaultValue</InlineCode> or <InlineCode>value</InlineCode> as a string array.
      </DocP>
      <DocPreview
        title="Multiple"
        code={`<Accordion multiple defaultValue={['x', 'y']}>
  <AccordionItem value="x">…</AccordionItem>
  <AccordionItem value="y">…</AccordionItem>
</Accordion>`}
      >
        <Stack gap="md" style={{ maxWidth: 480 }}>
          <Accordion multiple defaultValue={['x', 'y']}>
            <AccordionItem value="x">
              <AccordionTrigger>Panel X</AccordionTrigger>
              <AccordionContent>
                <Text variant="body">Both can stay open.</Text>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="y">
              <AccordionTrigger>Panel Y</AccordionTrigger>
              <AccordionContent>
                <Text variant="body">Independent toggles.</Text>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Stack>
      </DocPreview>

      <DocH2 id="props-accordion">Props — Accordion</DocH2>
      <PropsTable rows={[...accordionProps]} />

      <DocH2 id="props-item">Props — AccordionItem</DocH2>
      <PropsTable rows={[...itemProps]} />

      <DocH2 id="props-trigger-content">AccordionTrigger &amp; AccordionContent</DocH2>
      <PropsTable rows={[...triggerContentProps]} />
    </DocArticle>
  )
}
