import * as stylex from '@stylexjs/stylex'
import {
  createContext,
  forwardRef,
  memo,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type Ref,
} from 'react'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Radio.stylex'

type RadioGroupContextValue = {
  name: string
  value: string
  setValue: (next: string) => void
  disabled: boolean
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

export type RadioGroupProps = {
  children: ReactNode
  /** Shared `name` for radios; generated when omitted. */
  name?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  /** Visible group label; sets `aria-labelledby` on the radiogroup. */
  label?: string
  className?: string
  style?: ComponentPropsWithoutRef<'div'>['style']
}

function RadioGroupInner({
  children,
  name: nameProp,
  value: valueProp,
  defaultValue = '',
  onValueChange,
  disabled = false,
  label,
  className,
  style,
}: RadioGroupProps) {
  const uid = useId()
  const groupName = nameProp ?? `rsx-radio-${uid}`
  const labelId = label != null && label !== '' ? `${groupName}-label` : undefined
  const controlled = valueProp !== undefined
  const [inner, setInner] = useState(defaultValue)
  const value = controlled ? (valueProp ?? '') : inner

  const setValue = useCallback(
    (next: string) => {
      if (!controlled) {
        setInner(next)
      }
      onValueChange?.(next)
    },
    [controlled, onValueChange],
  )

  const ctx = useMemo(
    (): RadioGroupContextValue => ({
      name: groupName,
      value,
      setValue,
      disabled,
    }),
    [groupName, value, setValue, disabled],
  )

  return (
    <RadioGroupContext.Provider value={ctx}>
      <div
        {...mergeSx(
          stylex.props(styles.groupRoot, disabled && styles.groupDisabled),
          className,
          style,
        )}
      >
        {label != null && label !== '' ? (
          <span
            {...stylex.props(
              styles.groupLabel,
              disabled && styles.groupLabelDisabled,
            )}
            id={labelId}
          >
            {label}
          </span>
        ) : null}
        <div
          role="radiogroup"
          aria-labelledby={labelId}
          aria-disabled={disabled ? true : undefined}
          {...stylex.props(styles.groupOptions)}
        >
          {children}
        </div>
      </div>
    </RadioGroupContext.Provider>
  )
}

export const RadioGroup = memo(RadioGroupInner)

export type RadioProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'type' | 'size' | 'className' | 'style'
> & {
  /** Option value; compared with `RadioGroup` value when inside a group. */
  value: string
  label?: ReactNode
  description?: string
  invalid?: boolean
  className?: string
  style?: ComponentPropsWithoutRef<'label'>['style']
}

function RadioInner(
  {
    value: optionValue,
    label,
    description,
    invalid = false,
    id: idProp,
    name: nameProp,
    checked: checkedProp,
    defaultChecked,
    onChange,
    disabled: disabledProp,
    className,
    style,
    required,
    ...inputRest
  }: RadioProps,
  ref: Ref<HTMLInputElement>,
) {
  const ctx = useContext(RadioGroupContext)
  const uid = useId()
  const id = idProp ?? `rsx-radio-opt-${uid}`
  const descId = description?.trim() ? `${id}-desc` : undefined

  const inGroup = ctx != null
  const name = inGroup ? ctx.name : nameProp ?? ''
  const disabled = Boolean(disabledProp) || (inGroup && ctx.disabled)

  const [internalChecked, setInternalChecked] = useState(Boolean(defaultChecked))
  const controlledStandalone = !inGroup && checkedProp !== undefined
  const selectedInGroup = inGroup && ctx.value === optionValue

  const resolvedChecked = inGroup
    ? selectedInGroup
    : controlledStandalone
      ? Boolean(checkedProp)
      : internalChecked

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (inGroup) {
        ctx!.setValue(optionValue)
      } else if (!controlledStandalone) {
        setInternalChecked(e.target.checked)
      }
      onChange?.(e)
    },
    [inGroup, ctx, optionValue, controlledStandalone, onChange],
  )

  if (!inGroup && name === '' && import.meta.env.DEV) {
    console.warn(
      'Radio: provide `name` when using outside RadioGroup, or wrap options in <RadioGroup>.',
    )
  }

  const labelText =
    label != null && label !== '' ? (
      <span
        {...stylex.props(styles.labelText, disabled && styles.labelTextDisabled)}
      >
        {label}
      </span>
    ) : null

  return (
    <label {...mergeSx(stylex.props(styles.field), className, style)} htmlFor={id}>
      <span {...stylex.props(styles.controlSlot)}>
        <input
          {...inputRest}
          ref={ref}
          id={id}
          type="radio"
          name={name}
          value={optionValue}
          disabled={disabled}
          required={required}
          checked={inGroup || controlledStandalone ? resolvedChecked : undefined}
          defaultChecked={
            !inGroup && !controlledStandalone ? defaultChecked : undefined
          }
          onChange={handleChange}
          aria-invalid={invalid ? true : undefined}
          aria-describedby={descId}
          {...mergeSx(stylex.props(styles.native))}
        />
        <span
          {...stylex.props(
            styles.control,
            disabled && styles.controlDisabled,
            resolvedChecked &&
              !disabled &&
              (invalid ? styles.controlInvalidChecked : styles.controlChecked),
            resolvedChecked &&
              disabled &&
              (invalid
                ? styles.controlInvalidCheckedDisabled
                : styles.controlCheckedDisabled),
            !resolvedChecked && invalid && !disabled && styles.controlInvalid,
          )}
          aria-hidden
        />
        <span
          {...stylex.props(
            styles.dot,
            resolvedChecked && styles.dotChecked,
            resolvedChecked &&
              disabled &&
              (invalid ? styles.dotInvalidDisabled : styles.dotCheckedDisabled),
            resolvedChecked && !disabled && invalid && styles.dotInvalid,
          )}
          aria-hidden
        />
      </span>
      {labelText != null || description?.trim() ? (
        <span {...stylex.props(styles.textCol)}>
          {labelText}
          {description?.trim() ? (
            <span
              {...stylex.props(
                styles.description,
                disabled && styles.descriptionDisabled,
              )}
              id={descId}
            >
              {description.trim()}
            </span>
          ) : null}
        </span>
      ) : null}
    </label>
  )
}

export const Radio = memo(forwardRef(RadioInner))
