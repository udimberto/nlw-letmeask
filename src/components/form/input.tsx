import { InputHTMLAttributes } from 'react'
import './styles.scss'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  const {
    className,
    ...rest
  } = props

  const classNameList = [
    'form-control',
    className,
  ].filter((classNameItem) => classNameItem)

  return (
    <input
      className={classNameList.join(' ')}
      {...rest}
    />
  )
}
