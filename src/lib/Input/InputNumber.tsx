import { forwardRef, memo, type Ref } from 'react'
import { Input, type InputProps } from './Input'

export type InputNumberProps = Omit<InputProps, 'type'>

function InputNumberInner(
  props: InputNumberProps,
  ref: Ref<HTMLInputElement>,
) {
  return <Input ref={ref} type="number" {...props} />
}

export const InputNumber = memo(forwardRef(InputNumberInner))
