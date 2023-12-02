import { Route, Switch } from 'react-router-dom'
import { mainRoutes } from './router'
import Frame from './components/Frame/Index'
import './Frame.css'

function App() {
  return (
    <Frame>
        <Switch>
          {mainRoutes.map(route => {
            return (
              <Route key={route.path} path={route.path} exact={true} render={
                routeProps => {
                  return <route.component {...routeProps} key={route.path} />
                }
              } />
            )
          })}
        </Switch>
    </Frame>
  )
}

export default App
