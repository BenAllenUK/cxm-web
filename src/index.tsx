import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { Route, Router } from 'react-router-dom'

import './styles/App.css'
import history from './utils/history'

import { Auth0Provider } from './components/auth/Auth0'
import Editor from 'components/editor'
import Store from 'store'

const AUTH_CONFIG = {
  domain: 'dev-6j8frbt8.eu.auth0.com',
  clientId: 'jgsSJzhw4CJk9XHUm7toh2j21f8eZ0L0',
  callbackUrl: 'http://localhost:3000',
}

const onRedirectCallback = (appState: any) => {
  history.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname)
}

const mainRoutes = (
  <Router history={history}>
    <Route
      path="/"
      render={(props) => (
        <Auth0Provider
          domain={AUTH_CONFIG.domain}
          client_id={AUTH_CONFIG.clientId}
          redirect_uri={AUTH_CONFIG.callbackUrl}
          onRedirectCallback={onRedirectCallback}
          audience="cxm"
        />
      )}
    />
  </Router>
)

ReactDOM.render(
  <Store>
    <Editor />
  </Store>,
  document.getElementById('root')
)
