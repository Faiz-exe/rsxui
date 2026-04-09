import { CodeBlock } from '../CodeBlock'

type DocImportProps = {
  /** Exported symbol(s), e.g. "Button" or "Button, Stack" */
  names: string
  /** Import path; use your package name when published */
  from?: string
}

/**
 * Standard “Import” block — single place to show the public entry path.
 */
export function DocImport({ names, from = 'react-stylex-ui' }: DocImportProps) {
  return (
    <CodeBlock title="Import" editable={false}>
      {`import { ${names} } from '${from}'`}
    </CodeBlock>
  )
}
