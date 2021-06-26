import { TextareaHTMLAttributes } from 'react'
import { FormControlProps } from './type'
import useFormControlProps from './hook'
import './styles.scss'

export interface TextAreaProps extends FormControlProps, TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextArea(props: TextAreaProps) {
  const properties = useFormControlProps(props)
  const {
    className,
    classNameMessage,
    message,
    ...rest
  } = properties

  return (
    <fieldset className={className}>
      <textarea
        {...rest}
      />
      <div className={classNameMessage}>
        {message}
      </div>
    </fieldset>
  )
}
