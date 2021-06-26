import { BaseHTMLAttributes, ReactNode } from 'react'
import './styles.scss'

export interface PillProps extends BaseHTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export function Pill(props: PillProps) {
  const { children } = props

  return (
    <span className="pill">
      {children}
    </span>
  )
}
