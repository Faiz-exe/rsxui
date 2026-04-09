import * as stylex from '@stylexjs/stylex'
import { propsTableStyles } from './PropsTable.stylex'

export type UtilityCssRow = {
  /** e.g. u.hidden or hidden */
  name: string
  /** CSS declaration(s) */
  css: string
}

type UtilityCssTableProps = {
  rows: readonly UtilityCssRow[]
  /** First column header */
  utilityLabel?: string
  /** Second column header */
  propertiesLabel?: string
}

/**
 * Two-column reference table (utility key → CSS), similar to PrimeFlex “Classes” tables.
 */
export function UtilityCssTable({
  rows,
  utilityLabel = 'Utility',
  propertiesLabel = 'Properties',
}: UtilityCssTableProps) {
  return (
    <div {...stylex.props(propsTableStyles.wrap)}>
      <table {...stylex.props(propsTableStyles.table)}>
        <thead>
          <tr>
            <th {...stylex.props(propsTableStyles.th)}>{utilityLabel}</th>
            <th {...stylex.props(propsTableStyles.th)}>{propertiesLabel}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const last = i === rows.length - 1
            const bottom = last && propsTableStyles.tdLast
            return (
              <tr key={row.name} {...stylex.props(propsTableStyles.row)}>
                <td
                  {...stylex.props(
                    propsTableStyles.td,
                    propsTableStyles.nameCell,
                    bottom,
                  )}
                >
                  <code {...stylex.props(propsTableStyles.code)}>{row.name}</code>
                </td>
                <td {...stylex.props(propsTableStyles.td, bottom)}>
                  <code {...stylex.props(propsTableStyles.code)}>{row.css}</code>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
