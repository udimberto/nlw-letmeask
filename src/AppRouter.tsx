import { BrowserRouter, Route } from 'react-router-dom'
import { LayoutStarter } from './layout'
import * as pages from './pages'

export default function AppRouter() {
  const pagesAsList = Object.values(pages)
  const pagesStarter = pagesAsList.filter(({ layout }) => layout === 'LayoutStarter')

  return (
    <BrowserRouter>
      <LayoutStarter>
        {pagesStarter.map((PageComponent, index) => {
          const { exact, path } = PageComponent

          return (
            <Route
              key={`route-${index}`}
              component={PageComponent}
              exact={exact}
              path={path}
            />
          )
        })}
      </LayoutStarter>
    </BrowserRouter>
  )
}
