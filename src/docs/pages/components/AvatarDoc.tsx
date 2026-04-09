import { Avatar, AvatarGroup, Stack } from '../../../lib'
import { DocImport } from '../../ui/DocImport'
import { DocPreview } from '../../ui/DocPreview'
import { PropsTable } from '../../ui/PropsTable'
import {
  DocArticle,
  DocH1,
  DocH2,
  DocP,
  InlineCode,
} from '../../ui/Prose'

const avatarProps = [
  {
    name: 'src',
    type: 'string | null',
    description: 'Image URL. When missing, empty, or on load error, initials, icon, or the default silhouette are shown.',
  },
  {
    name: 'alt',
    type: 'string',
    description: 'Alt text for the image and accessible name when used as fallback for aria-label.',
  },
  {
    name: 'label',
    type: 'string',
    description: 'Display name used to derive initials when no image or icon is shown.',
  },
  {
    name: 'icon',
    type: 'ReactNode',
    description: 'Custom fallback content when there is no usable image.',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
    description: 'Avatar dimensions and type size for initials.',
  },
  {
    name: 'shape',
    type: "'circle' | 'square'",
    default: "'circle'",
    description: 'Full pill vs rounded square.',
  },
  {
    name: 'severity',
    type: "'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'",
    default: "'primary'",
    description: 'Semantic background and text colors for non-image content.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Merged after StyleX classes.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description: 'Merged after StyleX.',
  },
] as const

const avatarGroupProps = [
  {
    name: 'children',
    type: 'ReactNode',
    required: true,
    description: 'Typically multiple <Avatar /> nodes laid out in a row.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Merged after StyleX.',
  },
  {
    name: 'style',
    type: 'React.CSSProperties',
    description: 'Merged after StyleX.',
  },
] as const

const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop'

export function AvatarDoc() {
  return (
    <DocArticle>
      <DocH1
        description={
          <>
            User image with initials, custom icon, or default silhouette fallbacks; token-based sizes,
            shapes, and severities. <InlineCode>AvatarGroup</InlineCode> stacks multiple avatars inline.
          </>
        }
      >
        Avatar
      </DocH1>

      <DocH2 id="import" first>
        Import
      </DocH2>
      <DocImport names="Avatar, AvatarGroup, Stack" />

      <DocH2 id="basic">Basic</DocH2>
      <DocP>
        With <InlineCode>label</InlineCode> and no <InlineCode>src</InlineCode>, initials are derived
        from the name (e.g. &quot;John Doe&quot; → JD).
      </DocP>
      <DocPreview
        title="Initials"
        code={`<Avatar label="John Doe" alt="John Doe" />`}
      >
        <Avatar label="John Doe" alt="John Doe" />
      </DocPreview>

      <DocH2 id="sizes">Sizes</DocH2>
      <DocP>
        Five presets from <InlineCode>xs</InlineCode> to <InlineCode>xl</InlineCode>; default is{' '}
        <InlineCode>md</InlineCode>.
      </DocP>
      <DocPreview
        title="Sizes"
        code={`<Stack direction="row" gap="sm" style={{ alignItems: 'center' }}>
  <Avatar size="xs" label="A" />
  <Avatar size="sm" label="A" />
  <Avatar size="md" label="A" />
  <Avatar size="lg" label="A" />
  <Avatar size="xl" label="A" />
</Stack>`}
      >
        <Stack direction="row" gap="sm" style={{ alignItems: 'center', flexWrap: 'wrap' }}>
          <Avatar size="xs" label="Alex Kim" alt="Alex Kim" />
          <Avatar size="sm" label="Alex Kim" alt="Alex Kim" />
          <Avatar size="md" label="Alex Kim" alt="Alex Kim" />
          <Avatar size="lg" label="Alex Kim" alt="Alex Kim" />
          <Avatar size="xl" label="Alex Kim" alt="Alex Kim" />
        </Stack>
      </DocPreview>

      <DocH2 id="image">Image</DocH2>
      <DocP>
        Pass <InlineCode>src</InlineCode> for a photo; <InlineCode>alt</InlineCode> or{' '}
        <InlineCode>label</InlineCode> supports accessibility.
      </DocP>
      <DocPreview
        title="With src"
        code={`<Avatar
  src="https://example.com/photo.jpg"
  alt="Portrait"
/>`}
      >
        <Avatar src={SAMPLE_IMAGE} alt="Portrait" />
      </DocPreview>

      <DocH2 id="shape">Shape</DocH2>
      <DocP>
        <InlineCode>circle</InlineCode> (default) or <InlineCode>square</InlineCode> with rounded corners.
      </DocP>
      <DocPreview
        title="Circle vs square"
        code={`<Stack direction="row" gap="sm">
  <Avatar label="CD" shape="circle" />
  <Avatar label="SQ" shape="square" />
</Stack>`}
      >
        <Stack direction="row" gap="sm" style={{ alignItems: 'center' }}>
          <Avatar label="Circle" alt="Circle" shape="circle" />
          <Avatar label="Square" alt="Square" shape="square" />
        </Stack>
      </DocPreview>

      <DocH2 id="severity">Severity colors</DocH2>
      <DocP>
        Background and text colors follow semantic tokens when showing initials or icons.
      </DocP>
      <DocPreview
        title="Severities"
        code={`<Stack direction="row" gap="sm" style={{ flexWrap: 'wrap' }}>
  <Avatar label="P" severity="primary" />
  <Avatar label="S" severity="secondary" />
  <Avatar label="OK" severity="success" />
  <Avatar label="!" severity="danger" />
  <Avatar label="W" severity="warning" />
  <Avatar label="i" severity="info" />
</Stack>`}
      >
        <Stack direction="row" gap="sm" style={{ flexWrap: 'wrap', alignItems: 'center' }}>
          <Avatar label="Pri" alt="Primary" severity="primary" />
          <Avatar label="Sec" alt="Secondary" severity="secondary" />
          <Avatar label="OK" alt="Success" severity="success" />
          <Avatar label="!" alt="Danger" severity="danger" />
          <Avatar label="W" alt="Warning" severity="warning" />
          <Avatar label="i" alt="Info" severity="info" />
        </Stack>
      </DocPreview>

      <DocH2 id="avatar-group">AvatarGroup</DocH2>
      <DocP>
        Wrap several avatars to lay them out in a compact horizontal group (row-reverse so the first
        child appears on top visually).
      </DocP>
      <DocPreview
        title="AvatarGroup"
        code={`<AvatarGroup>
  <Avatar label="Ada Lovelace" />
  <Avatar label="Grace Hopper" />
  <Avatar label="Margaret Hamilton" />
</AvatarGroup>`}
      >
        <AvatarGroup>
          <Avatar label="Ada Lovelace" alt="Ada Lovelace" />
          <Avatar label="Grace Hopper" alt="Grace Hopper" />
          <Avatar label="Margaret Hamilton" alt="Margaret Hamilton" />
        </AvatarGroup>
      </DocPreview>

      <DocH2 id="props">Props</DocH2>
      <PropsTable title="Avatar" rows={[...avatarProps]} />
      <PropsTable title="AvatarGroup" rows={[...avatarGroupProps]} showRequiredLegend />
    </DocArticle>
  )
}
