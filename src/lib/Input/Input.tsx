import * as stylex from '@stylexjs/stylex'
import {
  forwardRef,
  memo,
  useId,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type Ref,
} from 'react'
import { Label } from '../Label/Label'
import { Text } from '../Text/Text'
import { mergeSx } from '../utils/mergeSx'
import { styles } from './Input.stylex'

export type InputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'size' | 'className' | 'style' | 'prefix'
> & {
  label?: string
  /** Helper text below the input when there is no error. Same as `helperText`; if both are set, `helperText` wins. */
  hint?: string
  /** Helper text below the input when there is no error. Same as `hint`; takes precedence over `hint`. */
  helperText?: string
  /** Error message; non-empty enables error UI and `aria-invalid`. Same as `errorMessage`; if both are set, `errorMessage` wins. */
  error?: string
  /** Error message; takes precedence over `error` when both are set. */
  errorMessage?: string
  /**
   * Marks the control invalid (border + `aria-invalid`) even when `error` / `errorMessage` is empty.
   * Useful for validation state before a message is available.
   */
  invalid?: boolean
  /**
   * Supplementary text between the label and the input; included in `aria-describedby`
   * together with the bottom message when present.
   */
  description?: string
  /** Positive feedback below the input when there is no error and `invalid` is false. */
  successMessage?: string
  /** Optional content before the text (e.g. search or mail icon). */
  prefix?: ReactNode
  /** Optional content after the text (e.g. unit, clear, or calendar icon). */
  suffix?: ReactNode
  /** Accessible label for the prefix slot when it is interactive (e.g. button); decorative icons can omit. */
  prefixAriaLabel?: string
  /** Accessible label for the suffix slot when it is interactive. */
  suffixAriaLabel?: string
  requiredIndicator?: boolean
  inputClassName?: string
  inputStyle?: ComponentPropsWithoutRef<'input'>['style']
  className?: string
  style?: ComponentPropsWithoutRef<'div'>['style']
}

function InputInner(
  {
    label,
    hint,
    helperText,
    error,
    errorMessage,
    invalid = false,
    description,
    successMessage,
    prefix,
    suffix,
    prefixAriaLabel,
    suffixAriaLabel,
    id: idProp,
    required,
    requiredIndicator = true,
    disabled,
    inputClassName,
    inputStyle,
    className,
    style,
    ...inputRest
  }: InputProps,
  ref: Ref<HTMLInputElement>,
) {
  const uid = useId()
  const id = idProp ?? `rsx-input-${uid}`

  const resolvedHelper = (helperText ?? hint)?.trim() ?? ''
  const resolvedError = (errorMessage ?? error)?.trim() ?? ''
  const resolvedDescription = description?.trim() ?? ''
  const resolvedSuccess = successMessage?.trim() ?? ''

  const hasErrorMessage = resolvedError !== ''
  const errorState = hasErrorMessage || invalid

  const hasAffix = prefix != null || suffix != null

  const sxInput = stylex.props(
    hasAffix ? styles.inputAffixed : styles.input,
    !hasAffix && errorState && styles.inputError,
  )

  const sxAffixOuter = stylex.props(
    styles.affixOuter,
    errorState && styles.affixOuterError,
    disabled && styles.affixOuterDisabled,
  )

  const describedBy: string[] = []
  if (resolvedDescription !== '') {
    describedBy.push(`${id}-description`)
  }
  if (hasErrorMessage) {
    describedBy.push(`${id}-error`)
  } else if (resolvedSuccess !== '' && !invalid) {
    describedBy.push(`${id}-success`)
  } else if (resolvedHelper !== '') {
    describedBy.push(`${id}-hint`)
  }

  const ariaDescribedBy =
    describedBy.length > 0 ? describedBy.join(' ') : undefined

  const inputEl = (
    <input
      ref={ref}
      id={id}
      disabled={disabled}
      required={required}
      aria-invalid={errorState ? true : undefined}
      aria-describedby={ariaDescribedBy}
      {...inputRest}
      {...mergeSx(sxInput, inputClassName, inputStyle)}
    />
  )

  const control = hasAffix ? (
    <div {...mergeSx(sxAffixOuter)}>
      {prefix != null ? (
        <span
          {...stylex.props(styles.affixSide, styles.affixInteractive)}
          aria-label={prefixAriaLabel}
          aria-hidden={prefixAriaLabel != null ? undefined : true}
        >
          {prefix}
        </span>
      ) : null}
      {inputEl}
      {suffix != null ? (
        <span
          {...stylex.props(styles.affixSide, styles.affixInteractive)}
          aria-label={suffixAriaLabel}
          aria-hidden={suffixAriaLabel != null ? undefined : true}
        >
          {suffix}
        </span>
      ) : null}
    </div>
  ) : (
    inputEl
  )

  return (
    <div {...mergeSx(stylex.props(styles.field), className, style)}>
      {label != null && label !== '' ? (
        <Label htmlFor={id} requiredIndicator={Boolean(required && requiredIndicator)}>
          {label}
        </Label>
      ) : null}
      {resolvedDescription !== '' ? (
        <div {...stylex.props(styles.description)}>
          <Text as="p" id={`${id}-description`} variant="small" tone="muted">
            {resolvedDescription}
          </Text>
        </div>
      ) : null}
      {control}
      {hasErrorMessage ? (
        <div {...stylex.props(styles.message)}>
          <Text as="p" id={`${id}-error`} role="alert" variant="small" tone="danger">
            {resolvedError}
          </Text>
        </div>
      ) : resolvedSuccess !== '' && !invalid ? (
        <div {...stylex.props(styles.message)}>
          <Text as="p" id={`${id}-success`} variant="small" tone="success">
            {resolvedSuccess}
          </Text>
        </div>
      ) : resolvedHelper !== '' ? (
        <div {...stylex.props(styles.message)}>
          <Text as="p" id={`${id}-hint`} variant="small" tone="muted">
            {resolvedHelper}
          </Text>
        </div>
      ) : null}
    </div>
  )
}

export const Input = memo(forwardRef(InputInner))
