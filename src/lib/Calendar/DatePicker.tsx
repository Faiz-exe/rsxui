import * as stylex from '@stylexjs/stylex'
import {
  type ClipboardEvent,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  type FormEvent,
  type KeyboardEvent,
  type Ref,
} from 'react'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import { panelStyles } from '../panel/panel.stylex'
import { mergeSx } from '../utils/mergeSx'
import { Calendar } from './Calendar'
import { formatCalendarDate, parseCalendarDate } from './calendarFormat'
import { datePickerStyles as dpStyles } from './DatePicker.stylex'

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function IconCalendar() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth={2} />
      <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}

export type DatePickerProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'defaultValue' | 'onChange'
> & {
  name?: string
  value?: Date | null
  defaultValue?: Date | null
  onValueChange?: (date: Date | null) => void
  /** Alternative change event shape for compatibility. */
  onChange?: (e: { value: Date | null }) => void

  month?: Date
  defaultMonth?: Date
  onMonthChange?: (monthStart: Date) => void

  /** Default `mm/dd/yyyy`. Use `/`, `-`, or `.` as separators (e.g. `dd/mm/yyyy`, `yyyy-mm-dd`). */
  dateFormat?: string
  /** Unified display format across date/month/year variants. Overrides `dateFormat` when provided. */
  format?: string
  locale?: string
  minDate?: Date
  maxDate?: Date
  isDateDisabled?: (date: Date) => boolean
  weekStartsOn?: 0 | 1

  /** Show trailing calendar affordance (default `true`). */
  showIcon?: boolean
  /** If true, the text field is read-only; pick dates from the overlay (default `false`). */
  readOnlyInput?: boolean
  /** Today and Clear actions below the grid. */
  showButtonBar?: boolean
  placeholder?: string
  /** Passed to the popup `Calendar`. Opens the month/year grid on first open (demo / docs). */
  defaultOpenMonthPicker?: boolean
  /** Passed to the popup `Calendar`. Keeps overlay in month/year mode only. */
  monthPickerOnly?: boolean
  /** Passed to the popup `Calendar`. Keeps overlay in year mode only. */
  yearPickerOnly?: boolean

  disabled?: boolean
  invalid?: boolean
  id?: string

  label?: string
  helperText?: string
  error?: string
  required?: boolean
  requiredIndicator?: boolean
  description?: string

  size?: 'sm' | 'md' | 'lg'

  className?: string
  style?: ComponentPropsWithoutRef<'div'>['style']
}

export const DatePicker = memo(
  forwardRef(function DatePicker(
    {
      value: valueProp,
      defaultValue = null,
      onValueChange,
      onChange,
      month: monthProp,
      defaultMonth,
      onMonthChange,
      dateFormat = 'mm/dd/yyyy',
      format,
      locale,
      minDate,
      maxDate,
      isDateDisabled,
      weekStartsOn = 0,
      showIcon = true,
      readOnlyInput = false,
      showButtonBar = false,
      placeholder,
      defaultOpenMonthPicker = false,
      monthPickerOnly = false,
      yearPickerOnly = false,
      disabled = false,
      invalid = false,
      name,
      id: idProp,
      label,
      helperText,
      error,
      required,
      requiredIndicator,
      description,
      size = 'md',
      className,
      style,
      ...rest
    }: DatePickerProps,
    ref: Ref<HTMLInputElement>,
  ) {
    const uid = useId()
    const panelId = `rsx-datepicker-panel-${uid}`
    const containerRef = useRef<HTMLDivElement>(null)

    const isValueControlled = valueProp !== undefined
    const [inner, setInner] = useState<Date | null>(defaultValue)
    const selected = isValueControlled ? valueProp! : inner

    const setSelected = useCallback(
      (d: Date | null) => {
        if (!isValueControlled) setInner(d)
        onValueChange?.(d)
        onChange?.({ value: d })
      },
      [isValueControlled, onValueChange, onChange],
    )

    const [open, setOpen] = useState(false)
    const [inputInvalid, setInputInvalid] = useState(false)
    const effectiveFormat = useMemo(() => {
      if (format != null && format.trim() !== '') return format
      if (yearPickerOnly) return 'yyyy'
      if (monthPickerOnly) return 'mm/yyyy'
      return dateFormat
    }, [format, yearPickerOnly, monthPickerOnly, dateFormat])

    const [inputStr, setInputStr] = useState(() =>
      selected
        ? formatCalendarDate(selected, effectiveFormat, locale)
        : '',
    )

    useEffect(() => {
      setInputStr(
        selected
          ? formatCalendarDate(selected, effectiveFormat, locale)
          : '',
      )
    }, [selected, effectiveFormat, locale])

    useEffect(() => {
      if (!open) return
      const onDocMouseDown = (e: globalThis.MouseEvent) => {
        const t = e.target as Node
        if (containerRef.current?.contains(t)) return
        setOpen(false)
      }
      const onDocKeyDown = (e: globalThis.KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpen(false)
        }
      }
      document.addEventListener('mousedown', onDocMouseDown)
      document.addEventListener('keydown', onDocKeyDown)
      return () => {
        document.removeEventListener('mousedown', onDocMouseDown)
        document.removeEventListener('keydown', onDocKeyDown)
      }
    }, [open])

    const commitFromInput = useCallback(() => {
      if (monthPickerOnly || yearPickerOnly) {
        setInputStr(selected ? formatCalendarDate(selected, effectiveFormat, locale) : '')
        setInputInvalid(false)
        return
      }
      const trimmed = inputStr.trim()
      if (trimmed === '') {
        setSelected(null)
        setInputStr('')
        setInputInvalid(false)
        return
      }
      const parsed = parseCalendarDate(inputStr, effectiveFormat)
      if (parsed) {
        setSelected(parsed)
        setInputStr(formatCalendarDate(parsed, effectiveFormat, locale))
        setInputInvalid(false)
        return
      }
      // If parsing fails, keep the user's typed text and mark invalid.
      setInputInvalid(true)
    }, [
      inputStr,
      effectiveFormat,
      locale,
      selected,
      setSelected,
      monthPickerOnly,
      yearPickerOnly,
    ])

    const onCalendarValueChange = useCallback(
      (d: Date | null) => {
        setSelected(d)
        if (d != null) setOpen(false)
      },
      [setSelected],
    )

    const onCalendarMonthChange = useCallback(
      (monthStart: Date) => {
        onMonthChange?.(monthStart)
        // In month/year-only popup mode, picking a month should commit and close.
        if (monthPickerOnly) {
          // Commit a concrete date value so the input reflects the picked month.
          setSelected(startOfDay(monthStart))
          setOpen(false)
          return
        }
        if (yearPickerOnly) {
          // Year-only picker commits Jan 1 of selected year for stable value semantics.
          setSelected(startOfDay(new Date(monthStart.getFullYear(), 0, 1)))
          setOpen(false)
        }
      },
      [onMonthChange, monthPickerOnly, yearPickerOnly, setSelected],
    )

    const onToday = useCallback(() => {
      const t = startOfDay(new Date())
      if (minDate && startOfDay(t) < startOfDay(minDate)) return
      if (maxDate && startOfDay(t) > startOfDay(maxDate)) return
      if (isDateDisabled?.(t)) return
      setSelected(t)
      setOpen(false)
    }, [setSelected, minDate, maxDate, isDateDisabled])

    const onClear = useCallback(() => {
      setSelected(null)
      setOpen(false)
    }, [setSelected])

    const toggleOpen = useCallback(() => {
      if (disabled) return
      setOpen((v) => !v)
    }, [disabled])

    const footer = useMemo(() => {
      if (!showButtonBar) return null
      return (
        <>
          <Button type="button" size="sm" text severity="secondary" onClick={onToday}>
            Today
          </Button>
          <Button type="button" size="sm" text severity="secondary" onClick={onClear}>
            Clear
          </Button>
        </>
      )
    }, [showButtonBar, onToday, onClear])

    const suffix = showIcon ? (
      <button
        type="button"
        tabIndex={-1}
        disabled={disabled}
        aria-label="Open calendar"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          toggleOpen()
        }}
        {...stylex.props(dpStyles.iconBtn)}
      >
        <IconCalendar />
      </button>
    ) : undefined

    const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return
      if (e.key === 'Escape' && open) {
        e.preventDefault()
        setOpen(false)
        return
      }
      if (e.key === 'Enter' && open) {
        e.preventDefault()
        commitFromInput()
        setOpen(false)
        return
      }
      if ((e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') && !open) {
        e.preventDefault()
        setOpen(true)
        return
      }
      if (readOnlyInput) {
        // Pseudo-readonly: keep caret visible, but block any text-editing keys.
        if (
          e.key.length === 1 ||
          e.key === 'Backspace' ||
          e.key === 'Delete' ||
          e.key === 'Cut' ||
          ((e.metaKey || e.ctrlKey) &&
            (e.key.toLowerCase() === 'x' || e.key.toLowerCase() === 'v'))
        ) {
          e.preventDefault()
        }
      }
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (inputInvalid) setInputInvalid(false)
      setInputStr(e.target.value)
    }

    const onInputBeforeInput = (e: FormEvent<HTMLInputElement>) => {
      if (readOnlyInput) e.preventDefault()
    }

    const onInputPaste = (e: ClipboardEvent<HTMLInputElement>) => {
      if (readOnlyInput) e.preventDefault()
    }

    const ensureCaretVisible = useCallback((el: HTMLInputElement) => {
      const pos = el.value.length
      requestAnimationFrame(() => {
        el.focus()
        try {
          el.setSelectionRange(pos, pos)
        } catch {
          // Some input types may not support selection range.
        }
        // Some browsers reset caret after click/open paint; restore once more next frame.
        requestAnimationFrame(() => {
          if (document.activeElement === el) {
            try {
              el.setSelectionRange(pos, pos)
            } catch {
              // Some input types may not support selection range.
            }
          }
        })
      })
    }, [])

    const mergedInvalid = invalid || inputInvalid
    const mergedError =
      error ??
      (inputInvalid
        ? `Invalid value. Expected format: ${effectiveFormat.toLowerCase()}`
        : undefined)

    const inputId = idProp ?? `rsx-datepicker-${uid}`

    return (
      <div
        ref={containerRef}
        {...mergeSx(stylex.props(dpStyles.wrap), className, style)}
        {...rest}
      >
        <Input
          ref={ref}
          id={inputId}
          size={size}
          label={label}
          helperText={helperText}
          error={mergedError}
          description={description}
          required={required}
          requiredIndicator={requiredIndicator}
          disabled={disabled}
          invalid={mergedInvalid}
          placeholder={
            placeholder ?? effectiveFormat.toLowerCase()
          }
          value={inputStr}
          name={name}
          readOnly={readOnlyInput || monthPickerOnly || yearPickerOnly}
          aria-readonly={readOnlyInput ? true : undefined}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-controls={panelId}
          autoComplete="off"
          suffix={suffix}
          suffixAriaLabel={showIcon ? 'Open calendar' : undefined}
          onChange={readOnlyInput || monthPickerOnly || yearPickerOnly ? undefined : onInputChange}
          onBeforeInput={onInputBeforeInput}
          onPaste={onInputPaste}
          onKeyDown={onInputKeyDown}
          onBlur={
            readOnlyInput || monthPickerOnly || yearPickerOnly
              ? undefined
              : () => commitFromInput()
          }
          onFocus={(e) => {
            if (readOnlyInput || monthPickerOnly || yearPickerOnly) {
              ensureCaretVisible(e.currentTarget)
            }
          }}
          onClick={(e) => {
            if (disabled) return
            setOpen(true)
            if (readOnlyInput || monthPickerOnly || yearPickerOnly) {
              ensureCaretVisible(e.currentTarget)
            }
          }}
          onMouseUp={(e) => {
            if (readOnlyInput || monthPickerOnly || yearPickerOnly) {
              ensureCaretVisible(e.currentTarget)
            }
          }}
        />
        {open ? (
          <div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Choose date"
            {...stylex.props(
              panelStyles.base,
              panelStyles.dropdown,
              panelStyles.dropdownMotion,
              dpStyles.panel,
            )}
          >
            <Calendar
              value={selected}
              onValueChange={onCalendarValueChange}
              month={monthProp}
              defaultMonth={defaultMonth ?? selected ?? undefined}
              onMonthChange={onCalendarMonthChange}
              minDate={minDate}
              maxDate={maxDate}
              isDateDisabled={isDateDisabled}
              weekStartsOn={weekStartsOn}
              locale={locale}
              footer={footer}
              defaultOpenMonthPicker={defaultOpenMonthPicker}
              monthPickerOnly={monthPickerOnly}
              yearPickerOnly={yearPickerOnly}
              autoFocusPanelGrid={false}
            />
          </div>
        ) : null}
      </div>
    )
  }),
)

DatePicker.displayName = 'DatePicker'
