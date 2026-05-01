# react-stylex-ui

## 1.0.3

### Patch Changes

- daa6a3e: docs: polish documentation prose across all component pages

  Rewrote lead paragraphs, usage sections, and prop descriptions throughout
  the docs site to match the tone and clarity of standard component libraries
  (Radix UI, shadcn/ui, MUI).

  **Key changes:**

  - `Switch` — replaced a lead paragraph that described the docs UI itself with a proper component description
  - `Autocomplete` — rewrote lead and usage paragraph; improved `options`, `placeholder`, `hint`, and `error` prop descriptions
  - `Badge` — rewritten lead for clarity and formality
  - `Checkbox` — usage paragraph rewritten from telegraphic shorthand into proper prose
  - `Toast` — removed internal hex color codes (`#323`) and informal shorthand from the `severity` field description
  - `ThemeDoc` — merged three choppy sentences into a single cohesive lead paragraph
  - `Calendar` / `DatePicker` — rewrote lead and all terse prop descriptions (e.g. `"Selection callback."` → full sentences with context); removed internal implementation notes from consumer-facing docs
  - `Card`, `Text`, `Stack` — leads rewritten to remove colloquialisms and em-dash list constructions
  - `ToggleButton` — improved `type`, `onPressedChange`, and `size` prop descriptions
  - `MultiSelect` — improved `options`, `maxChips`, and `placeholder` prop descriptions
  - `gettingStartedContent` — removed `"this repo uses React 19"` internal reference from the peer dependency table
  - `DocsIndex` — polished card descriptions for `Toast`, `Switch`, `SplitButton`, and `Calendar`
