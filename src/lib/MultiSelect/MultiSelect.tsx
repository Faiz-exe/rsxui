import * as stylex from '@stylexjs/stylex'
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type Ref,
} from 'react'
import { Label } from '../Label/Label'
import { panelStyles } from '../panel/panel.stylex'
import type { SelectOption } from '../Select/Select'
import { styles as selectStyles } from '../Select/Select.stylex'
import { Text } from '../Text/Text'
import { mergeSx } from '../utils/mergeSx'
import { styles as multiStyles } from './MultiSelect.stylex'

export type MultiSelectProps = {
  options: SelectOption[]
  label?: string
  hint?: string
  error?: string
  requiredIndicator?: boolean
  placeholder?: string
  value?: string[]
  defaultValue?: string[]
  onValuesChange?: (values: string[]) => void
  name?: string
  id?: string
  disabled?: boolean
  required?: boolean
  className?: string
  style?: React.ComponentPropsWithoutRef<'div'>['style']
  /** Max chips shown in the trigger; remainder summarized as “+N more”. */
  maxChips?: number
}

function Chevron() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function optionMatchesFilter(o: SelectOption, q: string): boolean {
  if (!q) return true
  if (o.value.toLowerCase().includes(q)) return true
  if (o.searchText?.toLowerCase().includes(q)) return true
  if (typeof o.label === 'string' && o.label.toLowerCase().includes(q)) {
    return true
  }
  return false
}

function findNextEnabled(
  opts: SelectOption[],
  from: number,
  dir: 1 | -1,
): number {
  if (opts.length === 0) return 0
  let i = from
  for (let step = 0; step < opts.length; step++) {
    i = (i + dir + opts.length) % opts.length
    if (!opts[i]?.disabled) return i
  }
  return from
}

function firstEnabledIndex(opts: SelectOption[]): number {
  const i = opts.findIndex((o) => !o.disabled)
  return i >= 0 ? i : 0
}

function lastEnabledIndex(opts: SelectOption[]): number {
  for (let i = opts.length - 1; i >= 0; i--) {
    if (!opts[i]?.disabled) return i
  }
  return 0
}

function toggleValue(values: readonly string[], v: string): string[] {
  const i = values.indexOf(v)
  if (i >= 0) {
    return values.slice(0, i).concat(values.slice(i + 1))
  }
  return [...values, v]
}

function labelPlain(o: SelectOption): string {
  return typeof o.label === 'string' ? o.label : o.value
}

function MultiSelectInner(
  {
    options,
    label,
    hint,
    error,
    id: idProp,
    required,
    requiredIndicator = true,
    disabled,
    placeholder = 'Choose one or more…',
    value: valueProp,
    defaultValue,
    onValuesChange,
    name,
    className,
    style,
    maxChips = 3,
  }: MultiSelectProps,
  ref: Ref<HTMLButtonElement>,
) {
  const uid = useId()
  const id = idProp ?? `rsx-multiselect-${uid}`
  const listboxId = `${id}-listbox`
  const filterId = `${id}-filter`

  const controlled = valueProp !== undefined
  const [internal, setInternal] = useState<string[]>(() => defaultValue ?? [])
  const selected = controlled ? valueProp! : internal

  const [open, setOpen] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(0)
  const [filterQuery, setFilterQuery] = useState('')

  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const filterInputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const setButtonRef = useCallback(
    (node: HTMLButtonElement | null) => {
      buttonRef.current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ;(ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
      }
    },
    [ref],
  )

  const visibleOptions = useMemo(() => {
    const q = filterQuery.trim().toLowerCase()
    if (!q) return options
    return options.filter((o) => optionMatchesFilter(o, q))
  }, [options, filterQuery])

  const selectedSet = useMemo(() => new Set(selected), [selected])

  const commitToggle = useCallback(
    (v: string) => {
      const opt = options.find((o) => o.value === v)
      if (opt?.disabled) return
      const next = toggleValue(selected, v)
      if (!controlled) {
        setInternal(next)
      }
      onValuesChange?.(next)
    },
    [controlled, onValuesChange, options, selected],
  )

  const openMenu = useCallback(() => {
    if (disabled || options.length === 0) return
    setFilterQuery('')
    setOpen(true)
  }, [disabled, options.length])

  useLayoutEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- listbox: sync highlight when opening or clearing filter */
    if (!open) return
    if (filterQuery.trim().length > 0) return
    if (visibleOptions.length === 0) {
      setHighlightIndex(0)
      return
    }
    setHighlightIndex(firstEnabledIndex(visibleOptions))
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [open, visibleOptions, filterQuery])

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- listbox: first match while filtering */
    if (!open) return
    const q = filterQuery.trim()
    if (q.length === 0) return
    setHighlightIndex(firstEnabledIndex(visibleOptions))
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [filterQuery, open, visibleOptions])

  useLayoutEffect(() => {
    if (!open) return
    filterInputRef.current?.focus()
  }, [open])

  useLayoutEffect(() => {
    if (!open || visibleOptions.length === 0) return
    const safe = Math.min(Math.max(highlightIndex, 0), visibleOptions.length - 1)
    const el = document.getElementById(`${id}-opt-${safe}`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [highlightIndex, open, visibleOptions.length, id])

  useEffect(() => {
    if (!open) return
    const onMouseDown = (e: globalThis.MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false)
        setFilterQuery('')
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [open])

  const onButtonKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!open) openMenu()
      else {
        setHighlightIndex((hi) =>
          e.key === 'ArrowDown'
            ? findNextEnabled(visibleOptions, hi, 1)
            : findNextEnabled(visibleOptions, hi, -1),
        )
      }
      return
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (!open) openMenu()
      else {
        const opt = visibleOptions[highlightIndex]
        if (opt && !opt.disabled) commitToggle(opt.value)
      }
      return
    }
    if (e.key === 'Escape' && open) {
      e.preventDefault()
      setOpen(false)
      setFilterQuery('')
    }
  }

  const onListKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
      setFilterQuery('')
      buttonRef.current?.focus()
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIndex((hi) => findNextEnabled(visibleOptions, hi, 1))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIndex((hi) => findNextEnabled(visibleOptions, hi, -1))
      return
    }
    if (e.key === 'Home') {
      e.preventDefault()
      setHighlightIndex(firstEnabledIndex(visibleOptions))
      return
    }
    if (e.key === 'End') {
      e.preventDefault()
      setHighlightIndex(lastEnabledIndex(visibleOptions))
      return
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      const opt = visibleOptions[highlightIndex]
      if (opt && !opt.disabled) commitToggle(opt.value)
    }
  }

  const onFilterKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      listRef.current?.focus()
      setHighlightIndex(firstEnabledIndex(visibleOptions))
    }
    if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
      setFilterQuery('')
      buttonRef.current?.focus()
    }
  }

  const invalid = error != null && error !== ''
  const labelId = `${id}-label`
  const activeDesc =
    open && visibleOptions.length > 0 && highlightIndex >= 0
      ? `${id}-opt-${highlightIndex}`
      : undefined

  const triggerDisabled = Boolean(disabled || options.length === 0)

  const selectedOptions = useMemo(
    () => selected.map((v) => options.find((o) => o.value === v)).filter(Boolean) as SelectOption[],
    [options, selected],
  )

  const displayTrigger = () => {
    if (selected.length === 0) {
      return (
        <span {...stylex.props(multiStyles.placeholder)}>{placeholder}</span>
      )
    }
    const shown = selectedOptions.slice(0, maxChips)
    const rest = selected.length - shown.length
    return (
      <span {...stylex.props(multiStyles.triggerMain)}>
        {shown.map((o) => (
          <span key={o.value} {...stylex.props(multiStyles.chip)}>
            <span {...stylex.props(multiStyles.chipLabel)}>{labelPlain(o)}</span>
            <button
              type="button"
              aria-label={`Remove ${labelPlain(o)}`}
              disabled={disabled}
              {...stylex.props(multiStyles.chipRemove)}
              onClick={(e) => {
                e.stopPropagation()
                commitToggle(o.value)
              }}
            >
              ×
            </button>
          </span>
        ))}
        {rest > 0 ? (
          <span {...stylex.props(multiStyles.summary)}>+{rest} more</span>
        ) : null}
      </span>
    )
  }

  return (
    <div {...mergeSx(stylex.props(selectStyles.field), className, style)}>
      {name && selected.length > 0
        ? selected.map((v) => (
            <input key={v} type="hidden" name={name} value={v} readOnly aria-hidden />
          ))
        : null}
      {label != null && label !== '' ? (
        <Label
          id={labelId}
          htmlFor={id}
          requiredIndicator={Boolean(required && requiredIndicator)}
        >
          {label}
        </Label>
      ) : null}
      <div ref={containerRef} {...stylex.props(selectStyles.container)}>
        <div {...stylex.props(selectStyles.control)}>
          <button
            ref={setButtonRef}
            id={id}
            type="button"
            disabled={triggerDisabled}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-multiselectable={open ? true : undefined}
            aria-invalid={invalid ? true : undefined}
            aria-required={required ? true : undefined}
            aria-labelledby={label ? labelId : undefined}
            aria-describedby={
              invalid ? `${id}-error` : hint ? `${id}-hint` : undefined
            }
            {...stylex.props(
              selectStyles.trigger,
              open && selectStyles.triggerOpen,
              invalid && selectStyles.triggerError,
            )}
            onClick={() => (open ? setOpen(false) : openMenu())}
            onKeyDown={onButtonKeyDown}
          >
            <span {...stylex.props(selectStyles.triggerMain)}>{displayTrigger()}</span>
            <span {...stylex.props(selectStyles.triggerActions)} aria-hidden>
              <span
                {...stylex.props(selectStyles.iconWrap, open && selectStyles.iconOpen)}
              >
                <Chevron />
              </span>
            </span>
          </button>

          {open ? (
            <div
              {...stylex.props(
                panelStyles.base,
                panelStyles.dropdown,
                panelStyles.dropdownMotion,
                selectStyles.dropdown,
              )}
            >
              <div {...stylex.props(selectStyles.filterWrap)}>
                <input
                  ref={filterInputRef}
                  id={filterId}
                  type="search"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder="Filter…"
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  onKeyDown={onFilterKeyDown}
                  {...stylex.props(selectStyles.filterInput)}
                  aria-controls={listboxId}
                  aria-label="Filter options"
                />
              </div>
              {visibleOptions.length === 0 ? (
                <div {...stylex.props(selectStyles.emptyFilter)} role="status">
                  No results found
                </div>
              ) : (
                <ul
                  ref={listRef}
                  id={listboxId}
                  role="listbox"
                  tabIndex={0}
                  aria-multiselectable="true"
                  aria-labelledby={label ? labelId : undefined}
                  aria-activedescendant={activeDesc}
                  {...stylex.props(selectStyles.list)}
                  onKeyDown={onListKeyDown}
                >
                  {visibleOptions.map((opt, i) => {
                    const isOn = selectedSet.has(opt.value)
                    const isHi = i === highlightIndex
                    return (
                      <li
                        key={opt.value}
                        id={`${id}-opt-${i}`}
                        role="option"
                        aria-selected={isOn}
                        aria-disabled={opt.disabled ? true : undefined}
                        {...stylex.props(
                          selectStyles.option,
                          isHi && selectStyles.optionHighlighted,
                          isOn && selectStyles.optionSelected,
                          opt.disabled && selectStyles.optionDisabled,
                        )}
                        onMouseEnter={() => !opt.disabled && setHighlightIndex(i)}
                        onMouseDown={(e) => {
                          if (opt.disabled) return
                          e.preventDefault()
                          commitToggle(opt.value)
                        }}
                      >
                        <span
                          {...stylex.props(
                            multiStyles.checkMulti,
                            isOn && multiStyles.checkMultiOn,
                          )}
                          aria-hidden
                        >
                          {isOn ? '✓' : ''}
                        </span>
                        <span {...stylex.props(selectStyles.optionLabel)}>
                          {opt.label}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {invalid ? (
        <div {...stylex.props(selectStyles.message)}>
          <Text as="p" id={`${id}-error`} role="alert" variant="small" tone="danger">
            {error}
          </Text>
        </div>
      ) : hint != null && hint !== '' ? (
        <div {...stylex.props(selectStyles.message)}>
          <Text as="p" id={`${id}-hint`} variant="small" tone="muted">
            {hint}
          </Text>
        </div>
      ) : null}
    </div>
  )
}

export const MultiSelect = memo(forwardRef(MultiSelectInner))
