import { Navigate } from 'react-router-dom'

/** @deprecated Use `/docs/getting-started` — kept for old links. */
export function InstallationDoc() {
  return <Navigate to="/docs/getting-started#peer-dependencies" replace />
}
