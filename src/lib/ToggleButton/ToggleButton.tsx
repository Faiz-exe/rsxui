import * as stylex from '@stylexjs/stylex'
import {
  createContext,
  forwardRef,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './ToggleButton.stylex'

export type ToggleButtonSeverity = 'secondary' | 'primary'

type GroupContextValue = {
  type: 'single' | 'multiple'
  value: string[]
  toggle: (v: string) => void
}

const GroupContext = createContext<GroupContextValue | null>(null)

export type ToggleButtonGroupProps = {
  children: ReactNode
  /** One selected value, or empty when nothing is pressed. */
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  /** Many values can be on at once. */
  type?: 'single' | 'multiple'
  values?: string[]
  defaultValues?: string[]
  onValuesChange?: (values: string[]) => void
  className?: string
  style?: React.ComponentPropsWithoutRef<'div'>['style']
  /** Accessible label for the group */
  'aria-label'?: string
  'aria-labelledby'?: string
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'className' | 'style' | 'defaultValue'>

function normalizeMulti(
  prop: string[] | undefined,
  def: string[] | undefined,
): string[] {
  if (prop !== undefined) return [...prop]
  if (def !== undefined) return [...def]
  return []
}

function ToggleButtonGroupInner(
  {
    children,
    type = 'single',
    value: valueProp,
    defaultValue = null,
    onValueChange,
    values: valuesProp,
    defaultValues,
    onValuesChange,
    className,
    style,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    ...rest
  }: ToggleButtonGroupProps,
  ref: Ref<HTMLDivElement>,
) {
  const singleControlled = valueProp !== undefined
  const multiControlled = valuesProp !== undefined

  const [singleInternal, setSingleInternal] = useState<string | null>(
    () => defaultValue,
  )
  const [multiInternal, setMultiInternal] = useState<string[]>(() =>
    normalizeMulti(undefined, defaultValues),
  )

  const singleVal = singleControlled ? valueProp! : singleInternal
  const multiVal = multiControlled ? valuesProp! : multiInternal

  const valueArr = useMemo(() => {
    if (type === 'single') {
      return singleVal != null && singleVal !== '' ? [singleVal] : []
    }
    return multiVal
  }, [type, singleVal, multiVal])

  const toggle = useCallback(
    (v: string) => {
      if (type === 'single') {
        const next = singleVal === v ? null : v
        if (!singleControlled) setSingleInternal(next)
        onValueChange?.(next)
        return
      }
      const set = new Set(multiVal)
      if (set.has(v)) set.delete(v)
      else set.add(v)
      const next = [...set]
      if (!multiControlled) setMultiInternal(next)
      onValuesChange?.(next)
    },
    [
      type,
      singleVal,
      multiVal,
      singleControlled,
      multiControlled,
      onValueChange,
      onValuesChange,
    ],
  )

  const ctx = useMemo<GroupContextValue>(
    () => ({ type, value: valueArr, toggle }),
    [type, valueArr, toggle],
  )

  return (
    <GroupContext.Provider value={ctx}>
      <div
        ref={ref}
        role="group"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        {...rest}
        {...mergeSx(stylex.props(styles.group), className, style)}
      >
        {children}
      </div>
    </GroupContext.Provider>
  )
}

export const ToggleButtonGroup = memo(forwardRef(ToggleButtonGroupInner))

export type ToggleButtonProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'type'
> & {
  type?: 'button' | 'submit' | 'reset'
  /** Value when used inside ToggleButtonGroup */
  value?: string
  /** Standalone: controlled pressed state */
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  size?: 'sm' | 'md' | 'lg'
  /** `primary` uses solid fill when selected; `secondary` uses muted outline. */
  severity?: ToggleButtonSeverity
  rounded?: boolean
}

function ToggleButtonInner(
  {
    value,
    pressed: pressedProp,
    defaultPressed = false,
    onPressedChange,
    size = 'md',
    severity = 'secondary',
    rounded = false,
    className,
    style,
    disabled,
    onClick,
    children,
    type = 'button',
    ...rest
  }: ToggleButtonProps,
  ref: Ref<HTMLButtonElement>,
) {
  const group = useContext(GroupContext)
  const standaloneControlled = pressedProp !== undefined
  const [standaloneInternal, setStandaloneInternal] = useState(defaultPressed)
  const standalonePressed = standaloneControlled
    ? pressedProp!
    : standaloneInternal

  const selected =
    group != null && value != null
      ? group.value.includes(value)
      : standalonePressed

  const sizeStyle =
    size === 'sm' ? styles.sm : size === 'lg' ? styles.lg : styles.md

  const onBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || disabled) return
    if (group != null && value != null) {
      group.toggle(value)
      return
    }
    const next = !standalonePressed
    if (!standaloneControlled) setStandaloneInternal(next)
    onPressedChange?.(next)
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      aria-pressed={selected}
      {...rest}
      {...mergeSx(
        stylex.props(
          styles.base,
          sizeStyle,
          selected &&
            (severity === 'primary'
              ? styles.primaryWhenSelected
              : styles.selected),
          rounded && styles.rounded,
        ),
        className,
        style,
      )}
      onClick={onBtnClick}
    >
      {children}
    </button>
  )
}

export const ToggleButton = memo(forwardRef(ToggleButtonInner))
