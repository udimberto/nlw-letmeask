import { useEffect, useState, SyntheticEvent, ReactNode } from 'react'
import { ButtonProps } from '../Button/type'
import useButtonProps from '../Button/hook'
import clipboardIconImg from '../../assets/images/copy.svg'
import './styles.scss'

export interface ClipboardButtonType extends ButtonProps {
  after?: ReactNode;
  before?: ReactNode;
  children: string;
}

export function ClipboardButton(props: ClipboardButtonType) {
  let timer: NodeJS.Timeout = setTimeout(() => {}, 0)
  const [success, setSuccess] = useState(false)
  const className = `${!success ? 'clipboard-btn' : 'clipboard-btn clipboard-btn--success '}`
  const { after, before, children, ...rest } = useButtonProps(props, 'clipboard-btn')

  function handleCopyToClipboard(evt: SyntheticEvent) {
    evt.preventDefault()

    navigator.clipboard.writeText(children)
    setSuccess(true)

    timer = setTimeout(() => {
      setSuccess(false)
    }, 5000)
  }

  useEffect(() => {
    return () => {
      clearTimeout(timer)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <button
      type="button"
      title="Clique para Copiar"
      {...rest}
      className={className}
      onClick={handleCopyToClipboard}
    >
      <img
        className="clipboard-btn__icon"
        alt=""
        width="40px"
        height="40px"
        loading="lazy"
        src={clipboardIconImg}
      />
      <span className="clipboard-btn__content">
        {before}
        {children}
        {after}
      </span>
    </button>
  )
}
