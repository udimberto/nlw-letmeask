import logoImg from '../../assets/images/logo.svg'
import './styles.scss'

export type LogoProps = {
  width?: number;
  height?: number;
}

export function Logo(props: LogoProps) {
  const { width, height } = props

  return (
    <figure className="logo">
      <img
        alt="Letmeask"
        loading="lazy"
        className="logo__img"
        width={width}
        height={height}
        src={logoImg}
      />
    </figure>
  )
}
