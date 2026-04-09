import * as stylex from '@stylexjs/stylex'
import { propsTableStyles as s } from './PropsTable.stylex'

export type PropRow = {
  /** Prop name (without `…` prefix unless spread) */
  name: string
  type: string
  default?: string
  /** If true, shows a filled red dot next to the prop name */
  required?: boolean
  description: string
}

type PropsTableProps = {
  rows: readonly PropRow[]
  title?: string
  /** Shown below the table when any row has required: true */
  showRequiredLegend?: boolean
}

/**
 * Classify the type string to choose a color pill.
 * We match common primitive / React types; everything else gets the default pill.
 */
function getTypePillStyle(type: string) {
  const t = type.trim().toLowerCase()
  if (t === 'boolean' || t === 'bool') return s.typePillBoolean
  if (t === 'string') return s.typePillString
  if (t === 'number' || t === 'int' || t === 'float') return s.typePillNumber
  if (
    t === 'reactnode' ||
    t === 'react.reactnode' ||
    t === 'jsx.element' ||
    t === 'reactelement'
  )
    return s.typePillNode
  return s.typePillDefault
}

export function PropsTable({ rows, title, showRequiredLegend }: PropsTableProps) {
  const anyRequired = showRequiredLegend ?? rows.some((r) => r.required)
  return (
    <div {...stylex.props(s.section)}>
      {title != null && title !== '' ? (
        <p {...stylex.props(s.heading)}>{title}</p>
      ) : null}
      <div {...stylex.props(s.wrap)}>
        <table {...stylex.props(s.table)}>
          <thead>
            <tr>
              <th {...stylex.props(s.th)}>Prop</th>
              <th {...stylex.props(s.th)}>Type</th>
              <th {...stylex.props(s.th)}>Default</th>
              <th {...stylex.props(s.th)}>Description</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const last = i === rows.length - 1
              const bottom = last ? s.tdLast : undefined
              const pillStyle = getTypePillStyle(row.type)
              return (
                <tr key={`${row.name}-${i}`} {...stylex.props(s.row)}>
                  {/* Name */}
                  <td {...stylex.props(s.td, bottom)}>
                    <code {...stylex.props(s.nameCode)}>{row.name}</code>
                    {row.required ? (
                      <span
                        {...stylex.props(s.requiredDot)}
                        aria-label="required"
                        title="Required"
                      />
                    ) : null}
                  </td>

                  {/* Type pill */}
                  <td {...stylex.props(s.td, bottom)}>
                    <span {...stylex.props(s.typePill, pillStyle)}>{row.type}</span>
                  </td>

                  {/* Default */}
                  <td {...stylex.props(s.td, bottom)}>
                    {row.default != null && row.default !== '' ? (
                      <code {...stylex.props(s.defaultCode)}>{row.default}</code>
                    ) : (
                      <span {...stylex.props(s.dash)}>—</span>
                    )}
                  </td>

                  {/* Description */}
                  <td {...stylex.props(s.td, bottom)}>{row.description}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {anyRequired ? (
          <p {...stylex.props(s.footnote)}>
            <span {...stylex.props(s.requiredDot)} aria-hidden />
            Required prop
          </p>
        ) : null}
      </div>
    </div>
  )
}
