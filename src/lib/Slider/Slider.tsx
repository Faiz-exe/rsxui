import * as stylex from '@stylexjs/stylex'
import {
  forwardRef,
  useCallback,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from 'react'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Slider.stylex'

export type SliderProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'onChange' | 'value' | 'defaultValue'
> & {
  value?: number | [number, number]
  defaultValue?: number | [number, number]
  onChange?: (value: number | [number, number]) => void
  min?: number
  max?: number
  step?: number | null
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  marks?: boolean | { value: number; label?: ReactNode }[]
  valueLabelDisplay?: 'on' | 'auto' | 'off'
  valueLabelFormat?: (value: number, index: number) => ReactNode
  disableSwap?: boolean
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function roundToStep(value: number, step: number, min: number) {
  return Math.round((value - min) / step) * step + min
}

function valueToPercent(value: number, min: number, max: number) {
  return ((value - min) / (max - min)) * 100
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(
  {
    value: valueProp,
    defaultValue = 0,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    orientation = 'horizontal',
    marks,
    valueLabelDisplay = 'off',
    valueLabelFormat = (val) => val,
    disableSwap = false,
    className,
    style,
    ...rest
  },
  ref,
) {
  const isControlled = valueProp !== undefined
  const [internalValue, setInternalValue] = useState<number | [number, number]>(
    defaultValue,
  )

  const value = isControlled ? valueProp : internalValue
  const isRange = Array.isArray(value)

  const trackRef = useRef<HTMLDivElement>(null)
  const activeThumbRef = useRef<'start' | 'end' | null>(null)

  // State to force re-render for dragging/hover so value labels update
  const [draggingThumb, setDraggingThumb] = useState<'start' | 'end' | null>(null)
  const [hoveredThumb, setHoveredThumb] = useState<'start' | 'end' | null>(null)

  const getValidValue = useCallback(
    (val: number) => {
      let next = clamp(val, min, max)
      if (step !== null && step > 0) {
        next = roundToStep(next, step, min)
      } else if (step === null && Array.isArray(marks) && marks.length > 0) {
        // Snap to closest mark
        const closestMark = marks.reduce((prev, curr) =>
          Math.abs(curr.value - val) < Math.abs(prev.value - val) ? curr : prev,
        )
        next = closestMark.value
      }
      return clamp(next, min, max)
    },
    [min, max, step, marks],
  )

  const handleUpdate = useCallback(
    (clientX: number, clientY: number) => {
      if (!trackRef.current) return
      const rect = trackRef.current.getBoundingClientRect()
      let percent: number
      if (orientation === 'vertical') {
        percent = clamp((rect.bottom - clientY) / rect.height, 0, 1)
      } else {
        percent = clamp((clientX - rect.left) / rect.width, 0, 1)
      }
      const nextRaw = min + percent * (max - min)
      let nextValue = getValidValue(nextRaw)

      if (isRange) {
        const [start, end] = value as [number, number]
        if (activeThumbRef.current === null) {
          const distStart = Math.abs(nextValue - start)
          const distEnd = Math.abs(nextValue - end)
          activeThumbRef.current = distStart <= distEnd ? 'start' : 'end'
          setDraggingThumb(activeThumbRef.current)
        }

        let nextRange: [number, number]

        if (disableSwap) {
          if (activeThumbRef.current === 'start') {
            nextValue = clamp(nextValue, min, end)
            nextRange = [nextValue, end]
          } else {
            nextValue = clamp(nextValue, start, max)
            nextRange = [start, nextValue]
          }
        } else {
          if (activeThumbRef.current === 'start') {
            nextRange = [Math.min(nextValue, end), Math.max(nextValue, end)]
            // If they cross, we swap active thumb visually but wait, 
            // swapping active thumb ref during drag can cause issues.
            // Simplified swap handling:
            if (nextValue > end) activeThumbRef.current = 'end'
          } else {
            nextRange = [Math.min(nextValue, start), Math.max(nextValue, start)]
            if (nextValue < start) activeThumbRef.current = 'start'
          }
          if (activeThumbRef.current !== draggingThumb) {
            setDraggingThumb(activeThumbRef.current)
          }
        }

        if (nextRange[0] !== start || nextRange[1] !== end) {
          if (!isControlled) setInternalValue(nextRange)
          onChange?.(nextRange)
        }
      } else {
        if (nextValue !== value) {
          if (!isControlled) setInternalValue(nextValue)
          onChange?.(nextValue)
        }
      }
    },
    [isRange, value, min, max, getValidValue, isControlled, onChange, orientation, disableSwap, draggingThumb],
  )

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (disabled) return
    e.preventDefault()
    activeThumbRef.current = null
    trackRef.current?.setPointerCapture(e.pointerId)
    handleUpdate(e.clientX, e.clientY)
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (disabled || !trackRef.current?.hasPointerCapture(e.pointerId)) return
    handleUpdate(e.clientX, e.clientY)
  }

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (disabled) return
    trackRef.current?.releasePointerCapture(e.pointerId)
    activeThumbRef.current = null
    setDraggingThumb(null)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, thumb: 'start' | 'end') => {
    if (disabled) return
    const dir =
      e.key === 'ArrowRight' || e.key === 'ArrowUp'
        ? 1
        : e.key === 'ArrowLeft' || e.key === 'ArrowDown'
          ? -1
          : 0
    if (dir === 0) return

    e.preventDefault()

    const stepAmount = step !== null && step > 0 ? step : (max - min) / 10

    if (isRange) {
      const [start, end] = value as [number, number]
      const current = thumb === 'start' ? start : end
      let nextValue = getValidValue(current + dir * stepAmount)

      let nextRange: [number, number]

      if (disableSwap) {
        if (thumb === 'start') {
          nextValue = clamp(nextValue, min, end)
          nextRange = [nextValue, end]
        } else {
          nextValue = clamp(nextValue, start, max)
          nextRange = [start, nextValue]
        }
      } else {
        if (thumb === 'start') {
          nextRange = [Math.min(nextValue, end), Math.max(nextValue, end)]
        } else {
          nextRange = [Math.min(nextValue, start), Math.max(nextValue, start)]
        }
      }

      if (nextRange[0] !== start || nextRange[1] !== end) {
        if (!isControlled) setInternalValue(nextRange)
        onChange?.(nextRange)
      }
    } else {
      const nextValue = getValidValue((value as number) + dir * stepAmount)
      if (nextValue !== value) {
        if (!isControlled) setInternalValue(nextValue)
        onChange?.(nextValue)
      }
    }
  }

  const renderThumb = (val: number, type: 'start' | 'end', index: number) => {
    const percent = valueToPercent(val, min, max)
    const isVertical = orientation === 'vertical'

    const showLabel =
      valueLabelDisplay === 'on' ||
      (valueLabelDisplay === 'auto' && (draggingThumb === type || hoveredThumb === type))

    return (
      <div
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={val}
        aria-disabled={disabled}
        onKeyDown={(e) => handleKeyDown(e, type)}
        onMouseEnter={() => setHoveredThumb(type)}
        onMouseLeave={() => setHoveredThumb(null)}
        {...stylex.props(styles.thumb, isVertical && styles.thumbVertical, disabled && styles.thumbDisabled)}
        style={isVertical
          ? { bottom: `${percent}%`, left: '50%' }
          : { left: `${percent}%`, top: '50%' }
        }
      >
        {valueLabelDisplay !== 'off' && (
          <div
            {...stylex.props(
              styles.valueLabel,
              isVertical && styles.valueLabelVertical,
              showLabel && (isVertical ? styles.valueLabelOpenVertical : styles.valueLabelOpen)
            )}
          >
            {valueLabelFormat(val, index)}
          </div>
        )}
      </div>
    )
  }

  const renderMarks = () => {
    if (!marks) return null
    let marksArray: { value: number; label?: ReactNode }[] = []

    if (marks === true) {
      if (step === null || step <= 0) return null
      for (let v = min; v <= max; v += step) {
        marksArray.push({ value: v })
      }
    } else if (Array.isArray(marks)) {
      marksArray = marks
    }


    return marksArray.map((mark, index) => {
      const percent = valueToPercent(mark.value, min, max)
      let isActive = false
      if (isRange) {
        const [start, end] = value as [number, number]
        isActive = mark.value >= start && mark.value <= end
      } else {
        isActive = mark.value <= (value as number)
      }

      return (
        <div
          key={index}
          {...stylex.props(
            styles.mark,
            isVertical ? styles.markVertical : styles.markHorizontal,
            isActive && styles.markActive,
          )}
          style={isVertical
            ? { bottom: `${percent}%` }
            : { left: `${percent}%` }
          }
        >
          {mark.label != null && (
            <div
              {...stylex.props(
                styles.markLabel,
                orientation === 'vertical' && styles.markLabelVertical,
              )}
            >
              {mark.label}
            </div>
          )}
        </div>
      )
    })
  }

  const isVertical = orientation === 'vertical'

  return (
    <div
      ref={ref}
      {...mergeSx(
        stylex.props(
          styles.root,
          isVertical && styles.rootVertical,
          disabled && styles.rootDisabled,
        ),
        className,
        style,
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      {...rest}
    >
      <div
        ref={trackRef}
        {...stylex.props(styles.track, isVertical && styles.trackVertical)}
      >
        {isRange ? (
          <div
            {...stylex.props(styles.range, isVertical && styles.rangeVertical)}
            style={{
              [isVertical ? 'bottom' : 'left']: `${valueToPercent(
                (value as [number, number])[0],
                min,
                max,
              )}%`,
              [isVertical ? 'height' : 'width']: `${valueToPercent((value as [number, number])[1], min, max) -
                valueToPercent((value as [number, number])[0], min, max)
                }%`,
            }}
          />
        ) : (
          <div
            {...stylex.props(styles.range, isVertical && styles.rangeVertical)}
            style={{
              [isVertical ? 'bottom' : 'left']: '0%',
              [isVertical ? 'height' : 'width']: `${valueToPercent(
                value as number,
                min,
                max,
              )}%`,
            }}
          />
        )}
        {renderMarks()}
      </div>
      {isRange ? (
        <>
          {renderThumb((value as [number, number])[0], 'start', 0)}
          {renderThumb((value as [number, number])[1], 'end', 1)}
        </>
      ) : (
        renderThumb(value as number, 'end', 0)
      )}
    </div>
  )
})
