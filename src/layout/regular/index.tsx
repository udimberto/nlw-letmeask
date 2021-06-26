import { ReactNode } from 'react'
import { Logo } from 'components'
import './styles.scss'

export type LayoutRegularProps = {
  children: ReactNode;
}

export default function LayoutRegular(props: LayoutRegularProps) {
  const { children } = props

  return (
    <div className="layout-regular">
      <header className="layout-regular__header">
        <div className="container">
          <Logo height={45} />
        </div>
      </header>
      <main className="layout-regular__main">
        {children}
      </main>
    </div>
  )
}
