import './styles.scss'
import useButtonProps from './hook'
import { ButtonProps } from './type'

export function Button(props: ButtonProps) {
  const properties = useButtonProps(props)

  return (
    <button
      {...properties}
    />
  )
}
