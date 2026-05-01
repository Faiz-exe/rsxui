import { useState } from 'react'
import { Calendar, DatePicker, Input, Stack, Text } from '../../../lib'
import { DocImport } from '../../ui/DocImport'
import { DocPreview } from '../../ui/DocPreview'
import { PropsTable } from '../../ui/PropsTable'
import {
  DocArticle,
  DocH1,
  DocH2,
  DocLead,
  DocLi,
  DocLink,
  DocP,
  DocUl,
  InlineCode,
} from '../../ui/Prose'
import { useDocMeta } from '../../useDocMeta'

const datePickerProps = [
  { name: 'value', type: 'Date | null', description: 'Currently selected date (controlled). Pair with `onValueChange`.' },
  { name: 'defaultValue', type: 'Date | null', default: 'null', description: 'Initial selected date for uncontrolled usage.' },
  { name: 'onValueChange', type: '(date: Date | null) => void', description: 'Called when the user selects or clears a date.' },
  { name: 'onChange', type: '(e: { value: Date | null }) => void', description: 'Alternative callback in event-object form. Equivalent to `onValueChange`.' },
  { name: 'dateFormat', type: 'string', default: "'mm/dd/yyyy'", description: 'Display and parsing pattern. Supports `yyyy`, `yy`, `mm`, `m`, `dd`, `d` and the delimiters `/`, `-`, `.`.' },
  { name: 'format', type: 'string', description: 'Unified display format for date, month, and year views. Takes precedence over `dateFormat`.' },
  { name: 'showIcon', type: 'boolean', default: 'true', description: 'Renders a trailing icon button that opens the calendar overlay.' },
  { name: 'readOnlyInput', type: 'boolean', default: 'false', description: 'When true, the text input is read-only and users must select a date from the popup.' },
  { name: 'showButtonBar', type: 'boolean', default: 'false', description: 'Adds Today and Clear action buttons in the calendar panel footer.' },
  { name: 'placeholder', type: 'string', description: 'Input placeholder text. Defaults to the lowercased `dateFormat` pattern.' },
  {
    name: 'defaultOpenMonthPicker',
    type: 'boolean',
    default: 'false',
    description: 'Popup Calendar opens the month/year grid the first time the overlay mounts.',
  },
  {
    name: 'monthPickerOnly',
    type: 'boolean',
    default: 'false',
    description: 'Popup shows only month/year picker (no day grid).',
  },
  {
    name: 'yearPickerOnly',
    type: 'boolean',
    default: 'false',
    description: 'Popup shows only year picker.',
  },
  { name: 'minDate', type: 'Date', description: 'Inclusive minimum.' },
  { name: 'maxDate', type: 'Date', description: 'Inclusive maximum.' },
  { name: 'weekStartsOn', type: '0 | 1', default: '0', description: 'First day of the week column: `0` for Sunday, `1` for Monday.' },
  { name: 'locale', type: 'string', description: 'Locale string passed to the month grid title for localized month names.' },
  {
    name: 'InputText props',
    type: 'InputProps (subset shown)',
    description:
      'DatePicker forwards field-level props to the underlying input: `label`, `hint` / `helperText`, `error` / `errorMessage`, `invalid`, `successMessage`, `description`, `required`, `disabled`, and `size`.',
  },
  { name: 'label', type: 'string', description: 'Forwarded to the underlying InputText as the visible field label.' },
  { name: 'helperText', type: 'string', description: 'Helper text shown below the input when the field is valid.' },
  { name: 'error', type: 'string', description: 'Validation error message displayed below the input.' },
  { name: 'invalid', type: 'boolean', description: 'Applies error styling without a message string.' },
  { name: 'disabled', type: 'boolean', description: 'Disables the text input and the calendar trigger icon.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls the input height and font size.' },
  { name: '…', type: 'div + input attributes', description: 'Root div props are spread on the wrapper; `ref` targets the text input.' },
] as const

const calendarProps = [
  {
    name: 'value',
    type: 'Date | null',
    description: 'Selected day (controlled). Normalized to local midnight when chosen.',
  },
  {
    name: 'defaultValue',
    type: 'Date | null',
    default: 'null',
    description: 'Initial selection (uncontrolled).',
  },
  {
    name: 'onValueChange',
    type: '(date: Date | null) => void',
    description: 'Called when the user picks a day.',
  },
  {
    name: 'month',
    type: 'Date',
    description: 'Visible month (controlled). Only year and month are used.',
  },
  {
    name: 'defaultMonth',
    type: 'Date',
    description: 'Initial visible month (uncontrolled).',
  },
  {
    name: 'onMonthChange',
    type: '(monthStart: Date) => void',
    description:
      'Called when the visible month changes (prev/next, keyboard, or month picker).',
  },
  {
    name: 'minDate',
    type: 'Date',
    description: 'Earliest selectable day (inclusive).',
  },
  {
    name: 'maxDate',
    type: 'Date',
    description: 'Latest selectable day (inclusive).',
  },
  {
    name: 'isDateDisabled',
    type: '(date: Date) => boolean',
    description: 'Return true to disable individual days.',
  },
  {
    name: 'weekStartsOn',
    type: '0 | 1',
    default: '0',
    description: 'First day of the week: Sunday (0) or Monday (1).',
  },
  {
    name: 'locale',
    type: 'string',
    description: 'Locale for month title, month picker labels, and weekday letters (Date#toLocaleString).',
  },
  {
    name: 'footer',
    type: 'React.ReactNode',
    description: 'Optional footer below the grid (DatePicker uses this for Today / Clear).',
  },
  {
    name: 'defaultOpenMonthPicker',
    type: 'boolean',
    default: 'false',
    description: 'Start on the month/year grid instead of the day grid (e.g. documentation demos).',
  },
  {
    name: 'monthPickerOnly',
    type: 'boolean',
    default: 'false',
    description: 'Render month/year picker only (no day grid interaction).',
  },
  {
    name: 'yearPickerOnly',
    type: 'boolean',
    default: 'false',
    description: 'Render year picker only (no month/day grids).',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Merged after StyleX on the root element.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description: 'Inline styles on the root element.',
  },
  {
    name: '…',
    type: 'ComponentProps<"div">',
    description: 'Other div attributes on the root.',
  },
] as const

function fmt(d: Date | null) {
  if (!d) return 'None'
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function fmtMonth(d: Date) {
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
  })
}

export function CalendarDoc() {
  useDocMeta(
    'Calendar',
    'DatePicker and inline Calendar with month/year picker in the header, day grid, min/max, and flexible formatting.',
  )
  const [single, setSingle] = useState<Date | null>(null)
  const [picker, setPicker] = useState<Date | null>(null)

  const start = new Date()
  start.setHours(0, 0, 0, 0)
  const min = new Date(start)
  min.setDate(min.getDate() - 3)
  const max = new Date(start)
  max.setDate(max.getDate() + 14)

  const docYear = start.getFullYear()
  const [monthOnlyDemo, setMonthOnlyDemo] = useState<Date>(
    () => new Date(docYear, 4, 1),
  )

  return (
    <DocArticle>
      <DocH1>Calendar</DocH1>
      <DocLead>
        Two complementary components for date selection.{' '}
        <strong>DatePicker</strong> is the standard form pattern — a text input paired with a
        popup calendar, supporting date formatting, optional button bar, and validation
        integration via <InlineCode>error</InlineCode> and <InlineCode>invalid</InlineCode>.{' '}
        <strong>Calendar</strong> is the standalone inline month grid that powers the popup,
        with a built-in{' '}
        <DocLink to="/docs/components/calendar#month-picker">month &amp; year picker</DocLink>.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="DatePicker, Calendar, formatCalendarDate" />

      <DocH2 id="datepicker">DatePicker</DocH2>
      <DocP>
        The input can be typed into and is parsed on blur using the active{' '}
        <InlineCode>dateFormat</InlineCode>. Set <InlineCode>readOnlyInput</InlineCode> to
        restrict entry to the popup only. If the typed string is invalid or incomplete,
        the field reverts to the last committed value. Use <InlineCode>error</InlineCode>{' '}
        or <InlineCode>invalid</InlineCode> from your own validation logic to surface
        parse errors explicitly.
      </DocP>
      <DocPreview
        title="Basic"
        code={`const [value, setValue] = useState<Date | null>(null)

<DatePicker value={value} onValueChange={setValue} />`}
      >
        <Stack gap="sm">
          <DatePicker value={picker} onValueChange={setPicker} label="Date" />
          <Text as="p" variant="body" tone="muted">
            Selected: {fmt(picker)}
          </Text>
        </Stack>
      </DocPreview>

      <DocPreview
        title="Format, button bar, EU week start"
        code={`<DatePicker
  dateFormat="dd/mm/yyyy"
  showButtonBar
  weekStartsOn={1}
  placeholder="dd/mm/yyyy"
/>`}
      >
        <DatePicker
          dateFormat="dd/mm/yyyy"
          showButtonBar
          weekStartsOn={1}
          placeholder="dd/mm/yyyy"
        />
      </DocPreview>

      <DocPreview
        title="Disabled and invalid states (regular Input)"
        code={`<Input
  label="Disabled date"
  value="04/27/2026"
  disabled
/>
<Input
  label="Start date"
  value="13/44/2026"
  invalid
  error="Please enter a valid date."
/>`}
      >
        <Stack gap="sm">
          <Input label="Disabled date" value="04/27/2026" disabled />
          <Input label="Start date" value="13/44/2026" invalid error="Please enter a valid date." />
        </Stack>
      </DocPreview>

      <DocPreview
        title="DatePicker — month grid when popup opens"
        code={`<DatePicker
  label="Pick a date"
  defaultOpenMonthPicker
/>`}
      >
        <Stack gap="sm">
          <Text as="p" variant="body" tone="muted">
            Open the field: the calendar starts on the <strong>month</strong> view once per overlay open (then behaves
            normally).
          </Text>
          <DatePicker label="Pick a date" defaultOpenMonthPicker />
        </Stack>
      </DocPreview>

      <DocH2 id="month-picker">Month &amp; year picker</DocH2>
      <DocP>
        The calendar header shows the current month and year (for example, “April 2026”). That label is a{' '}
        <strong>button</strong> (with a chevron): activate it to switch from the day grid to a{' '}
        <strong>12-month grid</strong> (two wide columns, full month names) for the selected year. Use the header
        chevrons to change year; months that have no allowed days (because of <InlineCode>minDate</InlineCode>,{' '}
        <InlineCode>maxDate</InlineCode>, or <InlineCode>isDateDisabled</InlineCode>) appear disabled. For docs and
        demos, <InlineCode>monthPickerOnly</InlineCode> renders a compact month/year-only picker.
      </DocP>
      <DocUl>
        <DocLi>
          Choose a month to set the visible month (and trigger <InlineCode>onMonthChange</InlineCode>).
          In <InlineCode>monthPickerOnly</InlineCode> mode, the component stays in month/year view.
        </DocLi>
        <DocLi>
          <InlineCode>Escape</InlineCode> closes the month view without changing the visible month (not in{' '}
          <InlineCode>monthPickerOnly</InlineCode> mode).
        </DocLi>
        <DocLi>
          Keyboard: focus the month grid with <InlineCode>Tab</InlineCode>, move with arrow keys, confirm with{' '}
          <InlineCode>Enter</InlineCode> or <InlineCode>Space</InlineCode>, <InlineCode>Home</InlineCode> /{' '}
          <InlineCode>End</InlineCode> for January / December, <InlineCode>Page Up</InlineCode> /{' '}
          <InlineCode>Page Down</InlineCode> to change year. Roving focus uses{' '}
          <InlineCode>aria-activedescendant</InlineCode>.
        </DocLi>
      </DocUl>

      <DocPreview
        title="Non-inline month & year picker (DatePicker popup)"
        code={`const y = new Date().getFullYear()
const [month, setMonth] = useState(new Date(y, 4, 1))

<DatePicker
  label="Billing month"
  month={month}
  onMonthChange={setMonth}
  defaultOpenMonthPicker
  monthPickerOnly
  format="mm/yyyy"
/>`}
      >
        <Stack gap="sm">
          <div style={{ maxWidth: 340 }}>
            <DatePicker
              label="Billing month"
              month={monthOnlyDemo}
              onMonthChange={setMonthOnlyDemo}
              defaultOpenMonthPicker
              monthPickerOnly
              format="mm/yyyy"
            />
          </div>
          <Text as="p" variant="body" tone="muted">
            This is non-inline: open the input popup, and both month and year are pickable (no day grid). Selected
            month: {fmtMonth(monthOnlyDemo)}
          </Text>
        </Stack>
      </DocPreview>

      <DocPreview
        title="Year-only picker (DatePicker popup)"
        code={`const y = new Date().getFullYear()
const [year, setYear] = useState(new Date(y, 0, 1))

<DatePicker
  label="Fiscal year"
  month={year}
  onMonthChange={setYear}
  yearPickerOnly
  format="yyyy"
/>`}
      >
        <div style={{ maxWidth: 260 }}>
          <DatePicker
            label="Fiscal year"
            month={monthOnlyDemo}
            onMonthChange={setMonthOnlyDemo}
            yearPickerOnly
            format="yyyy"
          />
        </div>
      </DocPreview>

      <DocH2 id="calendar-grid">Inline Calendar</DocH2>
      <DocP>
        In the <strong>day</strong> view, move by month with the header chevrons or with{' '}
        <InlineCode>Page Up</InlineCode> / <InlineCode>Page Down</InlineCode> while the date grid is focused.
        Tab into the date grid, use arrows to move, <InlineCode>Enter</InlineCode> / <InlineCode>Space</InlineCode>{' '}
        to select a day.
      </DocP>
      <DocPreview
        title="Basic"
        code={`const [value, setValue] = useState<Date | null>(null)

<Calendar value={value} onValueChange={setValue} />`}
      >
        <Stack gap="md">
          <Calendar value={single} onValueChange={setSingle} />
          <Text as="p" variant="body" tone="muted">
            Selected: {fmt(single)}
          </Text>
        </Stack>
      </DocPreview>

      <DocH2 id="bounds">Bounds &amp; weekdays</DocH2>
      <DocPreview
        title="Min / max and Monday week start"
        code={`<Calendar
  defaultValue={new Date()}
  minDate={min}
  maxDate={max}
  weekStartsOn={1}
/>`}
      >
        <Calendar defaultValue={new Date()} minDate={min} maxDate={max} weekStartsOn={1} />
      </DocPreview>

      <DocH2 id="props-datepicker">DatePicker props</DocH2>
      <DocP>
        DatePicker includes picker-specific props plus the same field-level API as the regular{' '}
        <DocLink to="/docs/components/input-text">InputText</DocLink> component.
      </DocP>
      <PropsTable rows={[...datePickerProps]} />

      <DocH2 id="props-calendar">Calendar props</DocH2>
      <PropsTable rows={[...calendarProps]} />
    </DocArticle>
  )
}
