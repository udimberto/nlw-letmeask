import './styles.scss'
import useButtonProps from './hook'
import { ButtonProps } from './type'

export function Button(props: ButtonProps) {
  const {
    children,
    icon,
    ...rest
  } = useButtonProps(props)

  return (
    <button {...rest}>
      {icon && (
        <img className="btn__icon" src={icon} alt="" />
      )}
      {children}
    </button>
  )
}
