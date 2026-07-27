import { useState } from 'react'
import { Slider } from '../../../lib'
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

export function SliderDoc() {
  useDocMeta('Slider', 'Single-value and range sliders with marks, vertical orientation, and value labels.')
  const [singleValue, setSingleValue] = useState<number | [number, number]>(50)
  const [rangeValue, setRangeValue] = useState<number | [number, number]>([20, 80])
  const [stepValue, setStepValue] = useState<number | [number, number]>(20)

  return (
    <DocArticle>
      <DocH1>Slider</DocH1>
      <DocLead>
        Sliders let users select a value from a continuous or discrete range.
        Supports single-value, range, vertical, stepped, and marked variants.
        Ref is forwarded to the underlying <InlineCode>{'<div>'}</InlineCode>.
      </DocLead>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Slider" />

      <DocH2 id="basic">Basic</DocH2>
      <DocP>
        Pass a number to <InlineCode>value</InlineCode> or{' '}
        <InlineCode>defaultValue</InlineCode> for a standard single-handle slider.
      </DocP>
      <DocPreview title="Single Slider" code={`const [val, setVal] = useState(50)

<Slider value={val} onChange={setVal} />`}>
        <div style={{ padding: '0 16px' }}>
          <Slider value={singleValue} onChange={setSingleValue} />
          <div style={{ marginTop: 16, fontSize: 14 }}>Value: {singleValue as number}</div>
        </div>
      </DocPreview>

      <DocH2 id="range">Range Slider</DocH2>
      <DocP>
        Pass an array of two numbers <InlineCode>[min, max]</InlineCode> to create
        a two-handle range slider.
      </DocP>
      <DocPreview title="Range Slider" code={`const [range, setRange] = useState([20, 80])

<Slider value={range} onChange={setRange} />`}>
        <div style={{ padding: '0 16px' }}>
          <Slider value={rangeValue} onChange={setRangeValue} />
          <div style={{ marginTop: 16, fontSize: 14 }}>
            Range: {(rangeValue as [number, number])[0]} — {(rangeValue as [number, number])[1]}
          </div>
        </div>
      </DocPreview>

      <DocH2 id="step">Step Size</DocH2>
      <DocP>
        Use the <InlineCode>step</InlineCode> prop to snap values to specific increments.
        Set <InlineCode>step={'{null}'}</InlineCode> to restrict the slider to only
        the positions defined in the <InlineCode>marks</InlineCode> array.
      </DocP>
      <DocPreview title="Step Size" code={`const [val, setVal] = useState(20)

<Slider value={val} onChange={setVal} step={20} />`}>
        <div style={{ padding: '0 16px' }}>
          <Slider value={stepValue} onChange={setStepValue} step={20} />
          <div style={{ marginTop: 16, fontSize: 14 }}>Value: {stepValue as number}</div>
        </div>
      </DocPreview>

      <DocH2 id="marks">Marks</DocH2>
      <DocP>
        Set <InlineCode>marks</InlineCode> to <InlineCode>true</InlineCode> to
        auto-generate tick marks at every <InlineCode>step</InlineCode> interval.
        Pass an array of objects to render custom ticks with optional labels.
      </DocP>
      <DocPreview title="Slider with Marks" code={`<Slider defaultValue={40} step={20} marks />

<Slider
  defaultValue={50}
  marks={[
    { value: 0, label: '0°C' },
    { value: 50, label: '50°C' },
    { value: 100, label: '100°C' },
  ]}
/>`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: '16px 16px 32px 16px' }}>
          <Slider defaultValue={40} step={20} marks />
          <Slider
            defaultValue={50}
            marks={[
              { value: 0, label: '0°C' },
              { value: 50, label: '50°C' },
              { value: 100, label: '100°C' },
            ]}
          />
        </div>
      </DocPreview>

      <DocH2 id="value-label">Value Labels</DocH2>
      <DocP>
        The <InlineCode>valueLabelDisplay</InlineCode> prop controls when the value
        label appears. Use <InlineCode>valueLabelFormat</InlineCode> to customize
        the displayed text.
      </DocP>
      <DocPreview title="Value Labels" code={`<Slider defaultValue={50} valueLabelDisplay="auto" />
<Slider defaultValue={30} valueLabelDisplay="on" />
<Slider
  defaultValue={75}
  valueLabelDisplay="auto"
  valueLabelFormat={(val) => \`\${val}%\`}
/>`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48, padding: '32px 16px 16px 16px' }}>
          <Slider defaultValue={50} valueLabelDisplay="auto" />
          <Slider defaultValue={30} valueLabelDisplay="on" />
          <Slider
            defaultValue={75}
            valueLabelDisplay="auto"
            valueLabelFormat={(val) => `${val}%`}
          />
        </div>
      </DocPreview>

      <DocH2 id="restricted-marks">Restricted Values</DocH2>
      <DocP>
        Set <InlineCode>step={'{null}'}</InlineCode> to restrict the selection
        strictly to the values provided in the <InlineCode>marks</InlineCode> array.
      </DocP>
      <DocPreview title="Restricted to Marks" code={`<Slider
  defaultValue={20}
  step={null}
  marks={[
    { value: 0, label: 'Start' },
    { value: 20, label: '20' },
    { value: 37, label: '37' },
    { value: 100, label: 'End' },
  ]}
/>`}>
        <div style={{ padding: '16px 16px 32px 16px' }}>
          <Slider
            defaultValue={20}
            step={null}
            marks={[
              { value: 0, label: 'Start' },
              { value: 20, label: '20' },
              { value: 37, label: '37' },
              { value: 100, label: 'End' },
            ]}
          />
        </div>
      </DocPreview>

      <DocH2 id="vertical">Vertical</DocH2>
      <DocP>
        Set <InlineCode>orientation="vertical"</InlineCode> to render the slider
        vertically. The slider progresses from bottom to top. The{' '}
        <InlineCode>valueLabelDisplay</InlineCode> and <InlineCode>marks</InlineCode>{' '}
        props both work in vertical mode.
      </DocP>
      <DocPreview title="Vertical Sliders" code={`<Slider defaultValue={50} orientation="vertical" />
<Slider defaultValue={[20, 80]} orientation="vertical" />
<Slider defaultValue={30} step={10} marks orientation="vertical" />`}>
        <div style={{ display: 'flex', gap: 48, height: 200, padding: '16px' }}>
          <Slider defaultValue={50} orientation="vertical" />
          <Slider defaultValue={[20, 80]} orientation="vertical" />
          <Slider defaultValue={30} step={10} marks orientation="vertical" />
        </div>
      </DocPreview>

      <DocH2 id="disable-swap">Disable Swap</DocH2>
      <DocP>
        Pass <InlineCode>disableSwap</InlineCode> to a range slider to prevent
        the two thumbs from crossing each other. Each thumb is clamped to the
        range defined by the other.
      </DocP>
      <DocPreview title="Disable Swap" code={`<Slider defaultValue={[20, 40]} disableSwap />`}>
        <div style={{ padding: '0 16px' }}>
          <Slider defaultValue={[20, 40]} disableSwap />
        </div>
      </DocPreview>

      <DocH2 id="disabled">Disabled</DocH2>
      <DocP>
        Add the <InlineCode>disabled</InlineCode> prop to prevent all interaction.
      </DocP>
      <DocPreview title="Disabled Slider" code={`<Slider defaultValue={50} disabled />
<Slider defaultValue={[30, 70]} disabled />`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '0 16px' }}>
          <Slider defaultValue={50} disabled />
          <Slider defaultValue={[30, 70]} disabled />
        </div>
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <PropsTable
        rows={[
          {
            name: 'value',
            type: 'number | [number, number]',
            default: '-',
            description: 'The controlled value. Pass an array for a range slider.',
          },
          {
            name: 'defaultValue',
            type: 'number | [number, number]',
            default: '0',
            description: 'The default value for an uncontrolled slider.',
          },
          {
            name: 'onChange',
            type: '(value: number | [number, number]) => void',
            default: '-',
            description: 'Callback fired when the value changes.',
          },
          {
            name: 'min',
            type: 'number',
            default: '0',
            description: 'The minimum allowed value.',
          },
          {
            name: 'max',
            type: 'number',
            default: '100',
            description: 'The maximum allowed value.',
          },
          {
            name: 'step',
            type: 'number | null',
            default: '1',
            description: 'Step interval. Set to null to snap only to provided marks.',
          },
          {
            name: 'orientation',
            type: "'horizontal' | 'vertical'",
            default: "'horizontal'",
            description: 'The orientation of the slider.',
          },
          {
            name: 'marks',
            type: 'boolean | { value: number; label?: ReactNode }[]',
            default: '-',
            description: 'If true, ticks are generated at every step. An array renders custom ticks with optional labels.',
          },
          {
            name: 'valueLabelDisplay',
            type: "'on' | 'auto' | 'off'",
            default: "'off'",
            description: "Controls when the value label appears. 'auto' shows on hover or drag.",
          },
          {
            name: 'valueLabelFormat',
            type: '(value: number, index: number) => ReactNode',
            default: '(val) => val',
            description: 'A function to format the value label content.',
          },
          {
            name: 'disableSwap',
            type: 'boolean',
            default: 'false',
            description: 'If true, range thumbs cannot cross each other.',
          },
          {
            name: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'When true, the slider is non-interactive.',
          },
        ]}
      />

      <DocH2 id="accessibility">Accessibility</DocH2>
      <DocP>
        Each thumb renders as a native <InlineCode>role="slider"</InlineCode> element
        with <InlineCode>aria-valuemin</InlineCode>,{' '}
        <InlineCode>aria-valuemax</InlineCode>, and{' '}
        <InlineCode>aria-valuenow</InlineCode> attributes kept in sync with the
        current value. Focus styles use <InlineCode>:focus-visible</InlineCode>{' '}
        (keyboard only).
      </DocP>
      <DocP>
        Keyboard:{' '}
        <InlineCode>ArrowRight</InlineCode> / <InlineCode>ArrowUp</InlineCode>{' '}
        increase the value; <InlineCode>ArrowLeft</InlineCode> /{' '}
        <InlineCode>ArrowDown</InlineCode> decrease it. Both horizontal and vertical
        orientations respond consistently.
      </DocP>
    </DocArticle>
  )
}
