import { NavLink } from 'react-router-dom'
import logoImg from '../../assets/images/logo.svg'
import './styles.scss'

export type LogoProps = {
  width?: number;
  height?: number;
}

export function Logo(props: LogoProps) {
  const { width, height = 75 } = props

  return (
    <NavLink
      to="/"
      title="Ir ao Início"
      className="logo"
    >
      <figure className="logo__figure">
        <img
          alt="Letmeask"
          loading="lazy"
          className="logo__figure__img"
          width={width}
          height={height}
          src={logoImg}
        />
      </figure>
    </NavLink>
  )
}
