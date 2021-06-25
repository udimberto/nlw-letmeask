import './styles.scss'
import useButtonProps from './hook'
import { ButtonAnchorProps } from './type'

export function ButtonAnchor(props: ButtonAnchorProps) {
  const properties = useButtonProps(props)

  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a
      {...properties}
    />
  )
}
