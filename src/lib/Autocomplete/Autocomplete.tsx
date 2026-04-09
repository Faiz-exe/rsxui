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
  type Ref,
} from 'react'
import { Label } from '../Label/Label'
import { panelStyles } from '../panel/panel.stylex'
import { Text } from '../Text/Text'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Autocomplete.stylex'
import type { SelectOption } from '../Select/Select'

export type AutocompleteProps = {
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

function displayForOption(o: SelectOption | undefined): string {
  if (!o) return ''
  if (typeof o.label === 'string') return o.label
  return o.value
}

function AutocompleteInner(
  {
    options,
    label,
    hint,
    error,
    id: idProp,
    required,
    requiredIndicator = true,
    disabled,
    placeholder = 'Type to search…',
    value: valueProp,
    defaultValue = '',
    onValueChange,
    name,
    className,
    style,
  }: AutocompleteProps,
  ref: Ref<HTMLInputElement>,
) {
  const uid = useId()
  const id = idProp ?? `rsx-autocomplete-${uid}`
  const listboxId = `${id}-listbox`

  const controlled = valueProp !== undefined
  const [internal, setInternal] = useState(defaultValue)
  const selectedValue = controlled ? valueProp! : internal

  const selectedOption = options.find((o) => o.value === selectedValue)
  const displayClosed = displayForOption(selectedOption)

  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [highlightIndex, setHighlightIndex] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const setInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ;(ref as React.MutableRefObject<HTMLInputElement | null>).current = node
      }
    },
    [ref],
  )

  const visibleOptions = useMemo(() => {
    const q = (open ? draft : '').trim().toLowerCase()
    if (!q) return options
    return options.filter((o) => optionMatchesFilter(o, q))
  }, [options, open, draft])

  const commit = useCallback(
    (nextVal: string) => {
      if (!controlled) {
        setInternal(nextVal)
      }
      onValueChange?.(nextVal)
      setOpen(false)
    },
    [controlled, onValueChange],
  )

  useLayoutEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- listbox: sync highlight when opening or clearing filter */
    if (!open) return
    if (visibleOptions.length === 0) {
      setHighlightIndex(0)
      return
    }
    const si = visibleOptions.findIndex((o) => o.value === selectedValue)
    setHighlightIndex(si >= 0 ? si : firstEnabledIndex(visibleOptions))
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [open, visibleOptions, selectedValue])

  useLayoutEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- listbox: first match while filtering */
    if (!open || visibleOptions.length === 0) return
    const q = draft.trim().toLowerCase()
    if (q.length === 0) return
    setHighlightIndex(firstEnabledIndex(visibleOptions))
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [draft, open, visibleOptions])

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
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [open])

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!open) setOpen(true)
    setDraft(e.target.value)
  }

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!open) {
        setOpen(true)
        setHighlightIndex(firstEnabledIndex(visibleOptions))
      } else {
        setHighlightIndex((hi) => findNextEnabled(visibleOptions, hi, 1))
      }
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!open) {
        setOpen(true)
        setHighlightIndex(lastEnabledIndex(visibleOptions))
      } else {
        setHighlightIndex((hi) => findNextEnabled(visibleOptions, hi, -1))
      }
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      if (open && visibleOptions[highlightIndex] && !visibleOptions[highlightIndex].disabled) {
        commit(visibleOptions[highlightIndex].value)
      }
      return
    }
    if (e.key === 'Escape' && open) {
      e.preventDefault()
      setOpen(false)
    }
  }

  const invalid = error != null && error !== ''
  const labelId = `${id}-label`
  const activeDesc =
    open && visibleOptions.length > 0 && highlightIndex >= 0
      ? `${id}-opt-${highlightIndex}`
      : undefined

  return (
    <div {...mergeSx(stylex.props(styles.field), className, style)}>
      {name ? (
        <input type="hidden" name={name} value={selectedValue} readOnly aria-hidden />
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
          <input
            ref={setInputRef}
            id={id}
            type="text"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            disabled={disabled}
            placeholder={placeholder}
            value={open ? draft : displayClosed}
            onChange={onInputChange}
            onKeyDown={onInputKeyDown}
            onFocus={() => {
              if (disabled) return
              setOpen(true)
              setDraft(displayClosed)
            }}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-invalid={invalid ? true : undefined}
            aria-required={required ? true : undefined}
            aria-labelledby={label ? labelId : undefined}
            aria-describedby={
              invalid ? `${id}-error` : hint ? `${id}-hint` : undefined
            }
            aria-activedescendant={open ? activeDesc : undefined}
            {...stylex.props(
              styles.input,
              open && styles.inputOpen,
              invalid && styles.inputError,
            )}
          />
          <span {...stylex.props(styles.iconWrap)} aria-hidden>
            <Chevron />
          </span>

          {open ? (
            <div
              {...stylex.props(
                panelStyles.base,
                panelStyles.dropdown,
                panelStyles.dropdownMotion,
                styles.dropdown,
              )}
            >
              {visibleOptions.length === 0 ? (
                <div {...stylex.props(styles.empty)} role="status">
                  No results found
                </div>
              ) : (
                <ul
                  id={listboxId}
                  role="listbox"
                  tabIndex={-1}
                  aria-labelledby={label ? labelId : undefined}
                  {...stylex.props(styles.list)}
                >
                  {visibleOptions.map((opt, i) => {
                    const isSelected = opt.value === selectedValue
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
                        <span {...stylex.props(styles.optionLabel)}>{opt.label}</span>
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

export const Autocomplete = memo(forwardRef(AutocompleteInner))
