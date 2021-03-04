import { Auth0Provider } from 'components/auth/Auth0'

const AUTH_CONFIG = {
  domain: 'dev-6j8frbt8.eu.auth0.com',
  clientId: 'jgsSJzhw4CJk9XHUm7toh2j21f8eZ0L0',
  callbackUrl: 'http://localhost:3000',
}

const onRedirectCallback = (appState: any) => {
  // history.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname)
  console.log(`callback called`)
}

const ComponentName = ({}: IProps) => {
  return (
    <div>
      <>
        <Auth0Provider
          domain={AUTH_CONFIG.domain}
          client_id={AUTH_CONFIG.clientId}
          redirect_uri={AUTH_CONFIG.callbackUrl}
          onRedirectCallback={onRedirectCallback}
          audience="cxm"
        />
      </>
    </div>
  )
}

export default ComponentName

interface IProps {}
