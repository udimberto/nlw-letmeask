import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Layout from './layout'
import * as pagesRef from './pages'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          {Object.values(pagesRef).map((PageComponent, index) => {
            const {
              exact = false,
              path = '',
            } = PageComponent || {}

            return (
              <Route
                key={`route-${index}-${path}`}
                exact={exact}
                path={path}
                component={PageComponent}
              />
            )
          })}
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}
