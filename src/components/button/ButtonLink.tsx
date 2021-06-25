import './styles.scss'
import { NavLink } from 'react-router-dom'
import useButtonProps from './hook'
import { ButtonLinkProps } from './type'

export function ButtonLink(props: ButtonLinkProps) {
  const properties = useButtonProps(props)

  return (
    <NavLink
      {...properties}
    />
  )
}
