import * as stylex from '@stylexjs/stylex'
import { propsTableStyles } from './PropsTable.stylex'

export type PropRow = {
  /** Prop name (without `…` prefix unless spread) */
  name: string
  type: string
  default?: string
  /** If true, shows a * in the name column */
  required?: boolean
  description: string
}

type PropsTableProps = {
  rows: readonly PropRow[]
  /** Shown below the table when any row has required: true */
  showRequiredLegend?: boolean
}

export function PropsTable({ rows, showRequiredLegend }: PropsTableProps) {
  const anyRequired = showRequiredLegend ?? rows.some((r) => r.required)
  return (
    <div {...stylex.props(propsTableStyles.wrap)}>
      <table {...stylex.props(propsTableStyles.table)}>
        <thead>
          <tr>
            <th {...stylex.props(propsTableStyles.th)}>Prop</th>
            <th {...stylex.props(propsTableStyles.th)}>Type</th>
            <th {...stylex.props(propsTableStyles.th)}>Default</th>
            <th {...stylex.props(propsTableStyles.th)}>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const last = i === rows.length - 1
            const bottom = last && propsTableStyles.tdLast
            return (
              <tr key={`${row.name}-${i}`} {...stylex.props(propsTableStyles.row)}>
                <td
                  {...stylex.props(
                    propsTableStyles.td,
                    propsTableStyles.nameCell,
                    bottom,
                  )}
                >
                  <code {...stylex.props(propsTableStyles.code)}>{row.name}</code>
                  {row.required ? (
                    <span {...stylex.props(propsTableStyles.requiredMark)} aria-hidden>
                      {' '}
                      *
                    </span>
                  ) : null}
                </td>
                <td {...stylex.props(propsTableStyles.td, bottom)}>
                  <code {...stylex.props(propsTableStyles.code)}>{row.type}</code>
                </td>
                <td {...stylex.props(propsTableStyles.td, bottom)}>
                  {row.default != null && row.default !== '' ? (
                    <code {...stylex.props(propsTableStyles.code)}>{row.default}</code>
                  ) : (
                    <span>—</span>
                  )}
                </td>
                <td {...stylex.props(propsTableStyles.td, bottom)}>{row.description}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {anyRequired ? (
        <p {...stylex.props(propsTableStyles.footnote)}>
          <span {...stylex.props(propsTableStyles.requiredMark)}>*</span> Required
        </p>
      ) : null}
    </div>
  )
}
