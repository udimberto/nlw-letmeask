import { InputHTMLAttributes } from 'react'
import { FormControlProps } from './type'
import useFormControlProps from './hook'
import './styles.scss'

export interface InputProps extends FormControlProps, InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  const properties = useFormControlProps(props)
  const {
    className,
    classNameMessage,
    message,
    ...rest
  } = properties

  return (
    <fieldset className={className}>
      <input
        {...rest}
      />
      <div className={classNameMessage}>
        {message}
      </div>
    </fieldset>
  )
}
