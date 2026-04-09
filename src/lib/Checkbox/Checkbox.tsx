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
import { styles } from './Checkbox.stylex'

function CheckGlyph(svgProps: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      width={12}
      height={12}
      {...svgProps}
    >
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export type CheckboxProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'type' | 'size' | 'className' | 'style'
> & {
  label?: ReactNode
  description?: string
  invalid?: boolean
  className?: string
  style?: ComponentPropsWithoutRef<'label'>['style']
}

function CheckboxInner(
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
  }: CheckboxProps,
  ref: Ref<HTMLInputElement>,
) {
  const uid = useId()
  const id = idProp ?? `rsx-checkbox-${uid}`
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

  const checkSvgTone =
    disabled && invalid
      ? styles.checkSvgDangerDisabled
      : disabled
        ? styles.checkSvgDisabled
        : invalid
          ? styles.checkSvgDanger
          : null

  return (
    <label {...mergeSx(stylex.props(styles.field), className, style)} htmlFor={id}>
      <span {...stylex.props(styles.controlSlot)}>
        <input
          {...inputRest}
          ref={ref}
          id={id}
          type="checkbox"
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
        {resolvedChecked ? (
          <CheckGlyph
            {...mergeSx(stylex.props(styles.checkSvg, checkSvgTone))}
          />
        ) : null}
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

export const Checkbox = memo(forwardRef(CheckboxInner))
