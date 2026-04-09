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
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from 'react'
import { Label } from '../Label/Label'
import { panelStyles } from '../panel/panel.stylex'
import { Text } from '../Text/Text'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Select.stylex'

export type SelectOption = {
  value: string
  label: ReactNode
  disabled?: boolean
  /** Used for filter matching when `label` is not a plain string */
  searchText?: string
}

export type SelectProps = {
  options: SelectOption[]
  label?: string
  hint?: string
  error?: string
  requiredIndicator?: boolean
  placeholder?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  name?: string
  id?: string
  disabled?: boolean
  required?: boolean
  className?: string
  style?: React.ComponentPropsWithoutRef<'div'>['style']
  /** Show a clear control when a value is selected */
  showClear?: boolean
  /** Loading state — trigger shows a spinner and the panel does not open */
  loading?: boolean
  loadingPlaceholder?: string
  /** Filter options in the panel by typing */
  filter?: boolean
  filterPlaceholder?: string
  /** Selected value in the trigger; `null` means empty */
  valueTemplate?: (option: SelectOption | null) => ReactNode
  /** Row content in the list; checkmark column is still shown */
  itemTemplate?: (option: SelectOption) => ReactNode
  /** Optional footer below the list (e.g. actions or help) */
  panelFooter?: ReactNode
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

function CheckIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ClearIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Spinner() {
  return (
    <svg
      {...stylex.props(styles.spinner)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="42"
        strokeDashoffset="12"
        opacity={0.9}
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

function SelectInner(
  {
    options,
    label,
    hint,
    error,
    id: idProp,
    required,
    requiredIndicator = true,
    disabled,
    placeholder = 'Select…',
    value: valueProp,
    defaultValue,
    onValueChange,
    name,
    className,
    style,
    showClear = false,
    loading = false,
    loadingPlaceholder = 'Loading…',
    filter = false,
    filterPlaceholder = 'Search…',
    valueTemplate,
    itemTemplate,
    panelFooter,
  }: SelectProps,
  ref: Ref<HTMLButtonElement>,
) {
  const uid = useId()
  const id = idProp ?? `rsx-select-${uid}`
  const listboxId = `${id}-listbox`
  const filterId = `${id}-filter`
  const controlled = valueProp !== undefined
  const [internal, setInternal] = useState(defaultValue ?? '')
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
    if (!filter) return options
    const q = filterQuery.trim().toLowerCase()
    if (!q) return options
    return options.filter((o) => optionMatchesFilter(o, q))
  }, [options, filter, filterQuery])

  const selectedOption = options.find((o) => o.value === selected)

  const displayLabel = loading ? (
    <span {...stylex.props(styles.triggerLabel)}>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Spinner />
        {loadingPlaceholder}
      </span>
    </span>
  ) : valueTemplate != null ? (
    <span {...stylex.props(styles.triggerLabel)}>
      {valueTemplate(selectedOption ?? null)}
    </span>
  ) : selectedOption != null ? (
    <span {...stylex.props(styles.triggerLabel)}>{selectedOption.label}</span>
  ) : (
    <span {...stylex.props(styles.triggerLabel, styles.placeholder)}>
      {placeholder}
    </span>
  )

  const commit = useCallback(
    (next: string) => {
      if (!controlled) {
        setInternal(next)
      }
      onValueChange?.(next)
      setOpen(false)
      setFilterQuery('')
      requestAnimationFrame(() => buttonRef.current?.focus())
    },
    [controlled, onValueChange],
  )

  const clearSelection = useCallback(() => {
    if (disabled || loading) return
    if (!controlled) {
      setInternal('')
    }
    onValueChange?.('')
    requestAnimationFrame(() => buttonRef.current?.focus())
  }, [controlled, disabled, loading, onValueChange])

  const onClearPointer = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.preventDefault()
      e.stopPropagation()
      clearSelection()
    },
    [clearSelection],
  )

  const openMenu = useCallback(() => {
    if (disabled || loading || options.length === 0) return
    setFilterQuery('')
    setOpen(true)
  }, [disabled, loading, options.length])

  useLayoutEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- listbox: sync highlight when opening or clearing filter */
    if (!open) return
    if (filter && filterQuery.trim().length > 0) return
    if (visibleOptions.length === 0) {
      setHighlightIndex(0)
      return
    }
    const si = visibleOptions.findIndex((o) => o.value === selected)
    setHighlightIndex(si >= 0 ? si : firstEnabledIndex(visibleOptions))
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [open, visibleOptions, selected, filter, filterQuery])

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- listbox: first match while filtering */
    if (!open || !filter) return
    const q = filterQuery.trim()
    if (q.length === 0) return
    setHighlightIndex(firstEnabledIndex(visibleOptions))
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [filterQuery, open, filter, visibleOptions])

  useLayoutEffect(() => {
    if (!open) return
    if (filter) {
      filterInputRef.current?.focus()
    } else if (listRef.current) {
      listRef.current.focus()
    }
  }, [open, filter])

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
    if (disabled || loading) return
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!open) {
        openMenu()
      } else {
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
      else if (
        visibleOptions[highlightIndex] &&
        !visibleOptions[highlightIndex].disabled
      ) {
        commit(visibleOptions[highlightIndex].value)
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
      if (opt && !opt.disabled) commit(opt.value)
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

  const onFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterQuery(e.target.value)
  }

  const invalid = error != null && error !== ''
  const labelId = `${id}-label`
  const activeDesc =
    open && visibleOptions.length > 0 && highlightIndex >= 0
      ? `${id}-opt-${highlightIndex}`
      : undefined

  const triggerDisabled = Boolean(disabled || loading || options.length === 0)
  const showClearBtn =
    showClear &&
    selected !== '' &&
    !disabled &&
    !loading

  return (
    <div {...mergeSx(stylex.props(styles.field), className, style)}>
      {name ? (
        <input type="hidden" name={name} value={selected} readOnly aria-hidden />
      ) : null}
      {label != null && label !== '' ? (
        <Label
          id={labelId}
          htmlFor={id}
          requiredIndicator={Boolean(required && requiredIndicator)}
        >
          {label}
        </Label>
      ) : null}
      <div ref={containerRef} {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.control)}>
          <button
            ref={setButtonRef}
            id={id}
            type="button"
            disabled={triggerDisabled}
            aria-busy={loading ? true : undefined}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-invalid={invalid ? true : undefined}
            aria-required={required ? true : undefined}
            aria-labelledby={label ? labelId : undefined}
            aria-describedby={
              invalid ? `${id}-error` : hint ? `${id}-hint` : undefined
            }
            {...stylex.props(
              styles.trigger,
              open && styles.triggerOpen,
              invalid && styles.triggerError,
            )}
            onClick={() =>
              open ? setOpen(false) : openMenu()
            }
            onKeyDown={onButtonKeyDown}
          >
            <span {...stylex.props(styles.triggerMain)}>
              {displayLabel}
            </span>
            <span {...stylex.props(styles.triggerActions)}>
              {showClearBtn ? (
                <span
                  role="button"
                  tabIndex={-1}
                  aria-label="Clear selection"
                  {...stylex.props(styles.clearBtn)}
                  onClick={onClearPointer}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      clearSelection()
                    }
                  }}
                >
                  <ClearIcon />
                </span>
              ) : null}
              <span
                {...stylex.props(styles.iconWrap, open && styles.iconOpen)}
                aria-hidden
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
                styles.dropdown,
              )}
            >
              {filter ? (
                <div {...stylex.props(styles.filterWrap)}>
                  <input
                    ref={filterInputRef}
                    id={filterId}
                    type="search"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    placeholder={filterPlaceholder}
                    value={filterQuery}
                    onChange={onFilterChange}
                    onKeyDown={onFilterKeyDown}
                    {...stylex.props(styles.filterInput)}
                    aria-controls={listboxId}
                    aria-label="Filter options"
                  />
                </div>
              ) : null}
              {visibleOptions.length === 0 ? (
                <div {...stylex.props(styles.emptyFilter)} role="status">
                  No results found
                </div>
              ) : (
                <ul
                  ref={listRef}
                  id={listboxId}
                  role="listbox"
                  tabIndex={0}
                  aria-labelledby={label ? labelId : undefined}
                  aria-activedescendant={activeDesc}
                  {...stylex.props(styles.list)}
                  onKeyDown={onListKeyDown}
                >
                  {visibleOptions.map((opt, i) => {
                    const isSelected = opt.value === selected
                    const isHi = i === highlightIndex
                    return (
                      <li
                        key={opt.value}
                        id={`${id}-opt-${i}`}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={opt.disabled ? true : undefined}
                        {...stylex.props(
                          styles.option,
                          isHi && styles.optionHighlighted,
                          isSelected && styles.optionSelected,
                          opt.disabled && styles.optionDisabled,
                        )}
                        onMouseEnter={() => !opt.disabled && setHighlightIndex(i)}
                        onMouseDown={(e) => {
                          if (opt.disabled) return
                          e.preventDefault()
                          commit(opt.value)
                        }}
                      >
                        <span
                          {...stylex.props(
                            styles.check,
                            isSelected && styles.checkVisible,
                          )}
                        >
                          <CheckIcon />
                        </span>
                        <span {...stylex.props(styles.optionLabel)}>
                          {itemTemplate != null ? itemTemplate(opt) : opt.label}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              )}
              {panelFooter != null ? (
                <div {...stylex.props(styles.panelFooter)}>{panelFooter}</div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      {invalid ? (
        <div {...stylex.props(styles.message)}>
          <Text as="p" id={`${id}-error`} role="alert" variant="small" tone="danger">
            {error}
          </Text>
        </div>
      ) : hint != null && hint !== '' ? (
        <div {...stylex.props(styles.message)}>
          <Text as="p" id={`${id}-hint`} variant="small" tone="muted">
            {hint}
          </Text>
        </div>
      ) : null}
    </div>
  )
}

export const Select = memo(forwardRef(SelectInner))
