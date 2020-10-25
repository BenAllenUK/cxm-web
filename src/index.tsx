import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { Route, Router } from 'react-router-dom'

import './styles/App.css'
import App from './components/App'

import history from './utils/history'

/* 
0AUTH:
import { Auth0Provider } from './components/Auth/react-auth0-spa'
import { AUTH_CONFIG } from './config/auth0-variables'

const onRedirectCallback = (appState: any) => {
  history.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname)
}

// <Auth0Provider
        //   domain={AUTH_CONFIG.domain}
        //   client_id={AUTH_CONFIG.clientId}
        //   redirect_uri={AUTH_CONFIG.callbackUrl}
        //   onRedirectCallback={onRedirectCallback}
        // />

        */

const mainRoutes = (
  <Router history={history}>
    <Route path="/" render={(props) => <App idToken={'1234'} />} />
  </Router>
)

ReactDOM.render(mainRoutes, document.getElementById('root'))
