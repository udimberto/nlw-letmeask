import './styles.scss'
import { NavLink } from 'react-router-dom'
import useButtonProps from './hook'
import { ButtonLinkProps } from './type'

export function ButtonLink(props: ButtonLinkProps) {
  const {
    children,
    icon,
    ...rest
  } = useButtonProps(props)

  return (
    <NavLink {...rest}>
      {icon && (
        <img className="btn__icon" src={icon} alt="" />
      )}
      {children}
    </NavLink>
  )
}
