import iconGoogle from '../../assets/images/google.svg'
import iconGoogleWhite from '../../assets/images/google-white.svg'
import iconLogIn from '../../assets/images/log-in.svg'

function getIcon(slug: string) {
  switch (slug) {
    case 'google':
      return iconGoogle

    case 'google-white':
      return iconGoogleWhite

    case 'login':
    case 'log-in':
      return iconLogIn

    default:
      return undefined
  }
}

export default function useButtonProps(
  props: any,
  classNamePrefix: string = 'btn',
) {
  const {
    block,
    bordered,
    className: classNameRaw,
    icon: iconRaw,
    small,
    variant,
    ...rest
  } = props

  const icon = getIcon(iconRaw)
  const className = [
    classNamePrefix,
    !block ? '' : `${classNamePrefix}--block`,
    !bordered ? '' : `${classNamePrefix}--bordered`,
    !small ? '' : `${classNamePrefix}--small`,
    !variant ? '' : `${classNamePrefix}--${variant}`,
    classNameRaw,
  ]
  .filter((classNameItem) => classNameItem)
  .join(' ')

  return {
    ...rest,
    className,
    ...(!icon ? {} : {
      icon,
    }),
  }
}
