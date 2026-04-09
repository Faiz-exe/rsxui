import type { PropRow } from './ui/PropsTable'

/** Shared props tables for Installation + Getting started docs. */
export const peerDependencyRows: readonly PropRow[] = [
  {
    name: 'react',
    type: 'npm package',
    default: '—',
    description: 'Same major as your app (this repo uses React 19).',
  },
  {
    name: 'react-dom',
    type: 'npm package',
    default: '—',
    description: 'Must match your React version.',
  },
  {
    name: '@stylexjs/stylex',
    type: 'npm package',
    default: '—',
    description: 'Runtime types and helpers; align with @stylexjs/unplugin.',
  },
  {
    name: '@stylexjs/unplugin',
    type: 'devDependency',
    default: '—',
    description: 'Vite plugin that compiles StyleX in dev and production builds.',
  },
]

export const viteStylexPluginRows: readonly PropRow[] = [
  {
    name: 'useCSSLayers',
    type: 'boolean',
    default: 'true (recommended)',
    description:
      'Emits rules in a CSS cascade layer so host styles can be ordered predictably.',
  },
  {
    name: 'dev',
    type: 'boolean',
    default: 'NODE_ENV !== "production"',
    description: 'Development mode for the plugin (source maps, etc.).',
  },
  {
    name: 'runtimeInjection',
    type: 'boolean',
    default: 'false (recommended)',
    description:
      'When false, styles are extracted at build time instead of injected at runtime.',
  },
]
