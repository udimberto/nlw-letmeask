import './styles.scss'
import useButtonProps from './hook'
import { ButtonAnchorProps } from './type'

export function ButtonAnchor(props: ButtonAnchorProps) {
  const {
    children,
    icon,
    ...rest
  } = useButtonProps(props)

  return (
    <a {...rest}>
      {icon && (
        <img className="btn__icon" src={icon} alt="" />
      )}
      {children}
    </a>
  )
}
