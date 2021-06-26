import { useLocation } from 'react-router-dom'
import LayoutRegular from './regular'
import LayoutSplitted from './splitted'

const routesSplitted = ['/', '/rooms/new']

export default function Layout(props: any) {
  const { pathname } = useLocation()
  const { children } = props
  const LayoutComponent = routesSplitted.includes(pathname) ? LayoutSplitted : LayoutRegular

  return (
    <LayoutComponent>
      {children}
    </LayoutComponent>
  )
}
