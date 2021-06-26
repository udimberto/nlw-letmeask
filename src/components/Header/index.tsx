import { BaseHTMLAttributes, ReactNode } from 'react'
import { Pill, PillProps } from '../Pill'
import './styles.scss'

export interface HeaderProps extends BaseHTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  pill?: PillProps;
}

export function Header(props : HeaderProps) {
  const { children, pill } = props

  return (
    <header
      className="header"
    >
      <h2 className="header__title">
        {children}
      </h2>
      {pill && (
        <Pill {...pill} />
      )}
    </header>
  )
}