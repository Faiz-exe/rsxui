import * as stylex from '@stylexjs/stylex'
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from 'react'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Calendar.stylex'

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function addDays(d: Date, n: number): Date {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
  return startOfDay(x)
}

function addMonths(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + n, 1)
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isBeforeDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() < startOfDay(b).getTime()
}

function isAfterDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() > startOfDay(b).getTime()
}

function clampDayToMonth(day: Date, monthAnchor: Date): Date {
  const first = startOfMonth(monthAnchor)
  const y = first.getFullYear()
  const m = first.getMonth()
  const dim = daysInMonth(y, m)
  const d = Math.min(Math.max(1, day.getDate()), dim)
  return new Date(y, m, d)
}

function buildMonthCells(visibleMonth: Date, weekStartsOn: 0 | 1): Date[] {
  const first = startOfMonth(visibleMonth)
  const year = first.getFullYear()
  const month = first.getMonth()
  const lastDay = daysInMonth(year, month)

  let lead = first.getDay()
  if (weekStartsOn === 1) {
    lead = (lead + 6) % 7
  }

  const cells: Date[] = []
  for (let i = lead; i > 0; i--) {
    cells.push(addDays(first, -i))
  }
  for (let d = 1; d <= lastDay; d++) {
    cells.push(new Date(year, month, d))
  }
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1]!
    cells.push(addDays(last, 1))
  }
  return cells
}

function chunkWeeks(cells: Date[]): Date[][] {
  const weeks: Date[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7))
  }
  return weeks
}

function cellId(gridId: string, d: Date): string {
  return `${gridId}-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

function monthCellId(gridId: string, year: number, monthIndex: number): string {
  return `${gridId}-m-${year}-${monthIndex}`
}

function monthHasSelectableDay(
  year: number,
  monthIndex: number,
  minDate: Date | undefined,
  maxDate: Date | undefined,
  isDateDisabled: ((date: Date) => boolean) | undefined,
): boolean {
  const dim = daysInMonth(year, monthIndex)
  for (let day = 1; day <= dim; day++) {
    const d = startOfDay(new Date(year, monthIndex, day))
    if (minDate && isBeforeDay(d, startOfDay(minDate))) continue
    if (maxDate && isAfterDay(d, startOfDay(maxDate))) continue
    if (isDateDisabled?.(d)) continue
    return true
  }
  return false
}

function yearHasSelectableMonth(
  year: number,
  minDate: Date | undefined,
  maxDate: Date | undefined,
  isDateDisabled: ((date: Date) => boolean) | undefined,
): boolean {
  for (let m = 0; m < 12; m++) {
    if (monthHasSelectableDay(year, m, minDate, maxDate, isDateDisabled)) return true
  }
  return false
}

const WEEKDAYS_SUN = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const
const WEEKDAYS_MON = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const

export type CalendarProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'defaultValue' | 'onChange'
> & {
  value?: Date | null
  defaultValue?: Date | null
  onValueChange?: (date: Date | null) => void

  month?: Date
  defaultMonth?: Date
  onMonthChange?: (monthStart: Date) => void

  minDate?: Date
  maxDate?: Date
  isDateDisabled?: (date: Date) => boolean

  weekStartsOn?: 0 | 1
  locale?: string

  /** Extra content below the grid (e.g. Today / Clear in DatePicker). */
  footer?: ReactNode

  /**
   * If true, opens the month/year grid on first mount instead of the day grid.
   * Useful for documentation screenshots; users can still switch back to days.
   */
  defaultOpenMonthPicker?: boolean
  /** Keep calendar in month/year mode; days are not shown/selectable. */
  monthPickerOnly?: boolean
  /** Keep calendar in year mode; years are shown/selectable directly. */
  yearPickerOnly?: boolean
  /** Auto-focus month/year grids when those panels open. */
  autoFocusPanelGrid?: boolean

  className?: string
  style?: ComponentPropsWithoutRef<'div'>['style']
}

export const Calendar = memo(
  forwardRef(function Calendar(
    {
      value: valueProp,
      defaultValue = null,
      onValueChange,
      month: monthProp,
      defaultMonth,
      onMonthChange,
      minDate,
      maxDate,
      isDateDisabled,
      weekStartsOn = 0,
      locale,
      footer,
      defaultOpenMonthPicker = false,
      monthPickerOnly = false,
      yearPickerOnly = false,
      autoFocusPanelGrid = true,
      className,
      style,
      ...rest
    }: CalendarProps,
    ref: Ref<HTMLDivElement>,
  ) {
    const labelId = useId()
    const gridId = useId()
    const monthPickerGridId = useId()
    const yearPickerGridId = useId()
    const gridRef = useRef<HTMLDivElement>(null)
    const monthGridRef = useRef<HTMLDivElement>(null)
    const yearGridRef = useRef<HTMLDivElement>(null)

    const yearAnchor = monthProp ?? defaultMonth ?? defaultValue ?? new Date()

    const [panelMode, setPanelMode] = useState<'days' | 'months' | 'years'>(() =>
      yearPickerOnly
        ? 'years'
        : defaultOpenMonthPicker || monthPickerOnly
          ? 'months'
          : 'days',
    )
    const [monthPickerYear, setMonthPickerYear] = useState(() =>
      startOfMonth(yearAnchor).getFullYear(),
    )
    const [yearPageStart, setYearPageStart] = useState(() =>
      startOfMonth(yearAnchor).getFullYear() - 5,
    )
    const [focusMonthIndex, setFocusMonthIndex] = useState(0)
    const [focusYearIndex, setFocusYearIndex] = useState(5)

    const isValueControlled = valueProp !== undefined
    const [valueInner, setValueInner] = useState<Date | null>(defaultValue)
    const selected = isValueControlled ? valueProp! : valueInner
    const setSelected = useCallback(
      (d: Date | null) => {
        if (!isValueControlled) setValueInner(d)
        onValueChange?.(d)
      },
      [isValueControlled, onValueChange],
    )

    const isMonthControlled = monthProp !== undefined
    const initialMonth = useMemo(
      () => startOfMonth(defaultMonth ?? defaultValue ?? new Date()),
      [defaultMonth, defaultValue],
    )
    const [monthInner, setMonthInner] = useState<Date>(initialMonth)
    const viewMonth = isMonthControlled ? startOfMonth(monthProp!) : monthInner
    const setViewMonth = useCallback(
      (d: Date) => {
        const m = startOfMonth(d)
        if (!isMonthControlled) setMonthInner(m)
        onMonthChange?.(m)
      },
      [isMonthControlled, onMonthChange],
    )

    const cells = useMemo(
      () => buildMonthCells(viewMonth, weekStartsOn),
      [viewMonth, weekStartsOn],
    )
    const weeks = useMemo(() => chunkWeeks(cells), [cells])

    const weekdayLabels = weekStartsOn === 1 ? WEEKDAYS_MON : WEEKDAYS_SUN

    const today = useMemo(() => startOfDay(new Date()), [])

    const isDisabled = useCallback(
      (d: Date) => {
        const day = startOfDay(d)
        if (minDate && isBeforeDay(day, startOfDay(minDate))) return true
        if (maxDate && isAfterDay(day, startOfDay(maxDate))) return true
        return isDateDisabled?.(day) ?? false
      },
      [minDate, maxDate, isDateDisabled],
    )

    const [focusDay, setFocusDay] = useState<Date>(() =>
      clampDayToMonth(selected ?? today, viewMonth),
    )

    useEffect(() => {
      setFocusDay((prev) => clampDayToMonth(prev, viewMonth))
    }, [viewMonth])

    const focusDayRef = useRef(focusDay)
    useEffect(() => {
      focusDayRef.current = focusDay
    }, [focusDay])

    const focusMonthRef = useRef(focusMonthIndex)
    useEffect(() => {
      focusMonthRef.current = focusMonthIndex
    }, [focusMonthIndex])

    const focusYearRef = useRef(focusYearIndex)
    useEffect(() => {
      focusYearRef.current = focusYearIndex
    }, [focusYearIndex])

    const isMonthDisabled = useCallback(
      (monthIndex: number) =>
        !monthHasSelectableDay(
          monthPickerYear,
          monthIndex,
          minDate,
          maxDate,
          isDateDisabled,
        ),
      [monthPickerYear, minDate, maxDate, isDateDisabled],
    )

    const bumpMonth = useCallback(
      (delta: number) => {
        setViewMonth(addMonths(viewMonth, delta))
      },
      [viewMonth, setViewMonth],
    )

    const canPrev = useMemo(() => {
      if (!minDate) return true
      const first = startOfMonth(viewMonth)
      return !isBeforeDay(addDays(first, -1), startOfDay(minDate))
    }, [viewMonth, minDate])

    const canNext = useMemo(() => {
      if (!maxDate) return true
      const last = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0)
      return !isAfterDay(addDays(last, 1), startOfDay(maxDate))
    }, [viewMonth, maxDate])

    const canPrevYear = useMemo(
      () => yearHasSelectableMonth(monthPickerYear - 1, minDate, maxDate, isDateDisabled),
      [monthPickerYear, minDate, maxDate, isDateDisabled],
    )

    const canNextYear = useMemo(
      () => yearHasSelectableMonth(monthPickerYear + 1, minDate, maxDate, isDateDisabled),
      [monthPickerYear, minDate, maxDate, isDateDisabled],
    )

    const bumpYear = useCallback((delta: number) => {
      setMonthPickerYear((y) => y + delta)
    }, [])

    const openMonthPicker = useCallback(() => {
      setMonthPickerYear(viewMonth.getFullYear())
      if (yearPickerOnly) {
        setYearPageStart(viewMonth.getFullYear() - 5)
        setPanelMode('years')
        return
      }
      setPanelMode('months')
    }, [viewMonth, yearPickerOnly])

    const openYearPicker = useCallback(() => {
      setYearPageStart(monthPickerYear - 5)
      setPanelMode('years')
    }, [monthPickerYear])

    const closeMonthPicker = useCallback(() => {
      if (monthPickerOnly) return
      setPanelMode('days')
    }, [monthPickerOnly])

    const pickMonth = useCallback(
      (monthIndex: number) => {
        if (isMonthDisabled(monthIndex)) return
        setViewMonth(new Date(monthPickerYear, monthIndex, 1))
        if (!monthPickerOnly && !yearPickerOnly) setPanelMode('days')
      },
      [monthPickerYear, isMonthDisabled, setViewMonth, monthPickerOnly, yearPickerOnly],
    )

    const pickYear = useCallback((year: number) => {
      setMonthPickerYear(year)
      if (yearPickerOnly) {
        setViewMonth(new Date(year, viewMonth.getMonth(), 1))
        return
      }
      setPanelMode('months')
    }, [yearPickerOnly, setViewMonth, viewMonth])

    useEffect(() => {
      if (panelMode !== 'months') return
      let idx =
        viewMonth.getFullYear() === monthPickerYear ? viewMonth.getMonth() : 0
      if (!monthHasSelectableDay(monthPickerYear, idx, minDate, maxDate, isDateDisabled)) {
        idx = 0
        for (let m = 0; m < 12; m++) {
          if (monthHasSelectableDay(monthPickerYear, m, minDate, maxDate, isDateDisabled)) {
            idx = m
            break
          }
        }
      }
      setFocusMonthIndex(idx)
    }, [panelMode, monthPickerYear, viewMonth, minDate, maxDate, isDateDisabled])

    const prevPanelMode = useRef(panelMode)
    useEffect(() => {
      if (panelMode !== 'months') return
      if (!autoFocusPanelGrid) return
      const id = requestAnimationFrame(() => {
        monthGridRef.current?.focus()
      })
      return () => cancelAnimationFrame(id)
    }, [panelMode, autoFocusPanelGrid])

    useEffect(() => {
      if (panelMode !== 'years') return
      if (!autoFocusPanelGrid) return
      const id = requestAnimationFrame(() => {
        yearGridRef.current?.focus()
      })
      return () => cancelAnimationFrame(id)
    }, [panelMode, autoFocusPanelGrid])

    useEffect(() => {
      const prev = prevPanelMode.current
      prevPanelMode.current = panelMode
      if (prev === 'months' && panelMode === 'days') {
        const id = requestAnimationFrame(() => gridRef.current?.focus())
        return () => cancelAnimationFrame(id)
      }
    }, [panelMode])

    const monthTitle = viewMonth.toLocaleString(locale ?? undefined, {
      month: 'long',
      year: 'numeric',
    })

    const selectDay = useCallback(
      (d: Date) => {
        if (isDisabled(d)) return
        setSelected(startOfDay(d))
      },
      [isDisabled, setSelected],
    )

    const moveFocus = useCallback(
      (from: Date, deltaDays: number) => {
        let next = addDays(from, deltaDays)
        let guard = 0
        while (isDisabled(next) && guard < 62) {
          next = addDays(next, deltaDays > 0 ? 1 : -1)
          guard++
        }
        if (guard >= 62) return
        const inView =
          next.getMonth() === viewMonth.getMonth() &&
          next.getFullYear() === viewMonth.getFullYear()
        if (!inView) {
          setViewMonth(startOfMonth(next))
        }
        setFocusDay(clampDayToMonth(next, startOfMonth(next)))
      },
      [isDisabled, viewMonth, setViewMonth],
    )

    const onGridKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        const fd = focusDayRef.current
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault()
            moveFocus(fd, -1)
            break
          case 'ArrowRight':
            e.preventDefault()
            moveFocus(fd, 1)
            break
          case 'ArrowUp':
            e.preventDefault()
            moveFocus(fd, -7)
            break
          case 'ArrowDown':
            e.preventDefault()
            moveFocus(fd, 7)
            break
          case 'Home': {
            e.preventDefault()
            const d = fd.getDay()
            const offset = weekStartsOn === 1 ? (d + 6) % 7 : d
            moveFocus(fd, -offset)
            break
          }
          case 'End': {
            e.preventDefault()
            const d = fd.getDay()
            const offset = weekStartsOn === 1 ? 6 - ((d + 6) % 7) : 6 - d
            moveFocus(fd, offset)
            break
          }
          case 'PageUp':
            e.preventDefault()
            bumpMonth(-1)
            break
          case 'PageDown':
            e.preventDefault()
            bumpMonth(1)
            break
          case 'Enter':
          case ' ': {
            e.preventDefault()
            selectDay(fd)
            break
          }
          default:
            break
        }
      },
      [moveFocus, weekStartsOn, bumpMonth, selectDay],
    )

    const activeDescendant = cellId(gridId, focusDay)

    const focusGrid = useCallback(() => {
      gridRef.current?.focus()
    }, [])

    const onDayClick = useCallback(
      (e: MouseEvent<HTMLButtonElement>, day: Date) => {
        e.preventDefault()
        setFocusDay(day)
        selectDay(day)
        focusGrid()
      },
      [selectDay, focusGrid],
    )

    const onMonthGridKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        const fi = focusMonthRef.current
        switch (e.key) {
          case 'ArrowLeft': {
            e.preventDefault()
            if (fi % 2 > 0) setFocusMonthIndex(fi - 1)
            break
          }
          case 'ArrowRight': {
            e.preventDefault()
            if (fi % 2 < 1) setFocusMonthIndex(fi + 1)
            break
          }
          case 'ArrowUp': {
            e.preventDefault()
            if (fi >= 2) setFocusMonthIndex(fi - 2)
            break
          }
          case 'ArrowDown': {
            e.preventDefault()
            if (fi <= 9) setFocusMonthIndex(fi + 2)
            break
          }
          case 'Home':
            e.preventDefault()
            setFocusMonthIndex(0)
            break
          case 'End':
            e.preventDefault()
            setFocusMonthIndex(11)
            break
          case 'PageUp':
            e.preventDefault()
            if (canPrevYear) bumpYear(-1)
            break
          case 'PageDown':
            e.preventDefault()
            if (canNextYear) bumpYear(1)
            break
          case 'Enter':
          case ' ': {
            e.preventDefault()
            pickMonth(fi)
            break
          }
          case 'Escape':
            e.preventDefault()
            if (!monthPickerOnly) closeMonthPicker()
            break
          case 'y':
          case 'Y':
            e.preventDefault()
            openYearPicker()
            break
          default:
            break
        }
      },
      [
        pickMonth,
        closeMonthPicker,
        canPrevYear,
        canNextYear,
        bumpYear,
        monthPickerOnly,
        openYearPicker,
      ],
    )

    const monthActiveDescendant = monthCellId(
      monthPickerGridId,
      monthPickerYear,
      focusMonthIndex,
    )

    const onYearGridKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        const fi = focusYearRef.current
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault()
            if (fi % 3 > 0) setFocusYearIndex(fi - 1)
            break
          case 'ArrowRight':
            e.preventDefault()
            if (fi % 3 < 2) setFocusYearIndex(fi + 1)
            break
          case 'ArrowUp':
            e.preventDefault()
            if (fi >= 3) setFocusYearIndex(fi - 3)
            break
          case 'ArrowDown':
            e.preventDefault()
            if (fi <= 8) setFocusYearIndex(fi + 3)
            break
          case 'Home':
            e.preventDefault()
            setFocusYearIndex(0)
            break
          case 'End':
            e.preventDefault()
            setFocusYearIndex(11)
            break
          case 'PageUp':
            e.preventDefault()
            setYearPageStart((v) => v - 12)
            break
          case 'PageDown':
            e.preventDefault()
            setYearPageStart((v) => v + 12)
            break
          case 'Enter':
          case ' ':
            e.preventDefault()
            pickYear(yearPageStart + fi)
            break
          case 'Escape':
            e.preventDefault()
            setPanelMode('months')
            break
          default:
            break
        }
      },
      [pickYear, yearPageStart],
    )

    const yearActiveDescendant = `${yearPickerGridId}-y-${yearPageStart + focusYearIndex}`

    const navChevronLeft = (
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      </svg>
    )
    const navChevronRight = (
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
      </svg>
    )

    return (
      <div
        ref={ref}
        role="group"
        aria-labelledby={labelId}
        {...mergeSx(stylex.props(styles.root), className, style)}
        {...rest}
      >
        <div {...stylex.props(styles.header)}>
          {panelMode === 'days' && !monthPickerOnly && !yearPickerOnly ? (
            <>
              <button
                type="button"
                aria-label="Previous month"
                disabled={!canPrev}
                onClick={() => bumpMonth(-1)}
                {...stylex.props(styles.navBtn)}
              >
                {navChevronLeft}
              </button>
              <button
                type="button"
                id={labelId}
                aria-haspopup="grid"
                aria-expanded={false}
                aria-label={`Choose month and year. ${monthTitle}`}
                onClick={openMonthPicker}
                {...stylex.props(styles.monthTitleBtn)}
              >
                <span>{monthTitle}</span>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next month"
                disabled={!canNext}
                onClick={() => bumpMonth(1)}
                {...stylex.props(styles.navBtn)}
              >
                {navChevronRight}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                aria-label={panelMode === 'years' ? 'Previous year range' : 'Previous year'}
                disabled={panelMode === 'years' ? false : !canPrevYear}
                onClick={() => (panelMode === 'years' ? setYearPageStart((v) => v - 12) : bumpYear(-1))}
                {...stylex.props(styles.navBtn)}
              >
                {navChevronLeft}
              </button>
              {panelMode === 'months' ? (
                <button
                  type="button"
                  id={labelId}
                  aria-haspopup="grid"
                  aria-label={`Choose year. ${monthPickerYear}`}
                  onClick={openYearPicker}
                  {...stylex.props(styles.yearTitleBtn)}
                >
                  {monthPickerYear}
                </button>
              ) : (
                <div id={labelId} {...stylex.props(styles.yearLabel)}>
                  {yearPageStart} - {yearPageStart + 11}
                </div>
              )}
              <button
                type="button"
                aria-label={panelMode === 'years' ? 'Next year range' : 'Next year'}
                disabled={panelMode === 'years' ? false : !canNextYear}
                onClick={() => (panelMode === 'years' ? setYearPageStart((v) => v + 12) : bumpYear(1))}
                {...stylex.props(styles.navBtn)}
              >
                {navChevronRight}
              </button>
            </>
          )}
        </div>

        {panelMode === 'days' && !monthPickerOnly && !yearPickerOnly ? (
          <>
            <div {...stylex.props(styles.weekdays)}>
              {weekdayLabels.map((ch, i) => (
                <div key={`${ch}-${i}`} {...stylex.props(styles.weekday)}>
                  <span aria-hidden>{ch}</span>
                </div>
              ))}
            </div>

            <div
              ref={gridRef}
              id={gridId}
              role="grid"
              aria-label="Calendar dates"
              aria-activedescendant={activeDescendant}
              tabIndex={0}
              onKeyDown={onGridKeyDown}
              {...stylex.props(styles.grid)}
            >
              {weeks.map((week, wi) => (
                <div key={wi} role="row" {...stylex.props(styles.gridRow)}>
                  {week.map((day) => {
                    const inMonth =
                      day.getMonth() === viewMonth.getMonth() &&
                      day.getFullYear() === viewMonth.getFullYear()
                    const disabled = isDisabled(day)
                    const sel = selected !== null && isSameDay(day, selected)
                    const isToday = isSameDay(day, today)
                    const id = cellId(gridId, day)

                    return (
                      <button
                        key={id}
                        id={id}
                        type="button"
                        role="gridcell"
                        aria-selected={sel}
                        aria-current={isToday ? 'date' : undefined}
                        disabled={disabled}
                        tabIndex={-1}
                        onClick={(e) => onDayClick(e, day)}
                        {...stylex.props(
                          styles.dayBtn,
                          !inMonth && styles.dayOutside,
                          isToday && !sel && styles.dayToday,
                          sel && styles.daySelected,
                          disabled && styles.dayDisabled,
                        )}
                      >
                        {day.getDate()}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </>
        ) : panelMode === 'months' ? (
          <div {...stylex.props(styles.monthPickerView)}>
            <div
              ref={monthGridRef}
              id={monthPickerGridId}
              role="grid"
              aria-label="Choose month"
              aria-rowcount={6}
              aria-colcount={2}
              aria-activedescendant={monthActiveDescendant}
              tabIndex={0}
              onKeyDown={onMonthGridKeyDown}
              {...stylex.props(styles.monthPickerGrid)}
            >
              {Array.from({ length: 12 }, (_, monthIndex) => {
                const label = new Date(2000, monthIndex, 1).toLocaleString(locale ?? undefined, {
                  month: 'long',
                })
                const disabled = isMonthDisabled(monthIndex)
                const isTodayMonth =
                  today.getFullYear() === monthPickerYear && today.getMonth() === monthIndex
                const isSelMonth =
                  (selected !== null &&
                    selected.getFullYear() === monthPickerYear &&
                    selected.getMonth() === monthIndex) ||
                  (viewMonth.getFullYear() === monthPickerYear &&
                    viewMonth.getMonth() === monthIndex)
                const mcId = monthCellId(monthPickerGridId, monthPickerYear, monthIndex)
                const row = Math.floor(monthIndex / 2) + 1
                const col = (monthIndex % 2) + 1

                return (
                  <button
                    key={mcId}
                    id={mcId}
                    type="button"
                    role="gridcell"
                    aria-selected={isSelMonth}
                    aria-rowindex={row}
                    aria-colindex={col}
                    aria-current={isTodayMonth ? 'date' : undefined}
                    disabled={disabled}
                    tabIndex={-1}
                    onClick={() => pickMonth(monthIndex)}
                    {...stylex.props(
                      styles.monthCell,
                      isTodayMonth && !isSelMonth && styles.monthCellCurrent,
                      isSelMonth && styles.monthCellSelected,
                      disabled && styles.monthCellDisabled,
                    )}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <div {...stylex.props(styles.monthPickerView)}>
            <div
              ref={yearGridRef}
              id={yearPickerGridId}
              role="grid"
              aria-label="Choose year"
              aria-rowcount={4}
              aria-colcount={3}
              aria-activedescendant={yearActiveDescendant}
              tabIndex={0}
              onKeyDown={onYearGridKeyDown}
              {...stylex.props(styles.yearPickerGrid)}
            >
              {Array.from({ length: 12 }, (_, i) => {
                const year = yearPageStart + i
                const id = `${yearPickerGridId}-y-${year}`
                const isCurrent = year === today.getFullYear()
                const isActive = year === monthPickerYear
                return (
                  <button
                    key={id}
                    id={id}
                    type="button"
                    role="gridcell"
                    aria-selected={isActive}
                    aria-current={isCurrent ? 'date' : undefined}
                    tabIndex={-1}
                    onClick={() => pickYear(year)}
                    {...stylex.props(
                      styles.yearCell,
                      isCurrent && !isActive && styles.yearCellCurrent,
                      isActive && styles.yearCellSelected,
                    )}
                  >
                    {year}
                  </button>
                )
              })}
            </div>
          </div>
        )}
        {footer != null ? <div {...stylex.props(styles.footer)}>{footer}</div> : null}
      </div>
    )
  }),
)

Calendar.displayName = 'Calendar'
