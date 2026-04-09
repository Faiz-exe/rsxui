import * as stylex from '@stylexjs/stylex'
import {
  forwardRef,
  memo,
  useCallback,
  useId,
  useState,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type Ref,
} from 'react'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Switch.stylex'

export type SwitchProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'type' | 'size' | 'className' | 'style'
> & {
  label?: ReactNode
  description?: string
  invalid?: boolean
  className?: string
  style?: ComponentPropsWithoutRef<'label'>['style']
}

function SwitchInner(
  {
    label,
    description,
    invalid = false,
    id: idProp,
    checked,
    defaultChecked,
    onChange,
    disabled,
    className,
    style,
    required,
    ...inputRest
  }: SwitchProps,
  ref: Ref<HTMLInputElement>,
) {
  const uid = useId()
  const id = idProp ?? `rsx-switch-${uid}`
  const descId = description?.trim() ? `${id}-desc` : undefined

  const controlled = checked !== undefined
  const [internal, setInternal] = useState(Boolean(defaultChecked))
  const resolvedChecked = controlled ? Boolean(checked) : internal

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!controlled) {
        setInternal(e.target.checked)
      }
      onChange?.(e)
    },
    [controlled, onChange],
  )

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
          type="checkbox"
          role="switch"
          disabled={disabled}
          required={required}
          checked={controlled ? checked : undefined}
          defaultChecked={!controlled ? defaultChecked : undefined}
          onChange={handleChange}
          aria-invalid={invalid ? true : undefined}
          aria-describedby={descId}
          {...mergeSx(stylex.props(styles.native))}
        />
        <span
          {...stylex.props(
            styles.track,
            resolvedChecked &&
              !disabled &&
              (invalid ? styles.trackInvalidChecked : styles.trackChecked),
            resolvedChecked &&
              disabled &&
              (invalid
                ? styles.trackInvalidCheckedDisabled
                : styles.trackCheckedDisabled),
            !resolvedChecked && invalid && !disabled && styles.trackInvalid,
            !resolvedChecked && disabled && styles.trackDisabled,
          )}
          aria-hidden
        />
        <span
          {...stylex.props(
            styles.thumb,
            resolvedChecked && styles.thumbChecked,
            disabled && styles.thumbDisabled,
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

export const Switch = memo(forwardRef(SwitchInner))
