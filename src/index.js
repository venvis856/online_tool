import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux';
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'antd/dist/antd.css'
import redux from './redux'

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
window.store=redux
ReactDOM.render(
  <React.StrictMode>
    <Provider store={redux}>
    {/*<App />*/}
    <Router>
      <Switch>
        <Route render={routeProps => <App {...routeProps} />} />
        <Redirect to='/' />
        <Redirect to='/404' />
      </Switch>
    </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
