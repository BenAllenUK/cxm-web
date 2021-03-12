import { useAuth0 } from './Auth0'

const Login = () => {
  const { loading, loginWithRedirect } = useAuth0()
  return (
    <div
      id="qsLoginBtn"
      onClick={() => {
        loginWithRedirect({})
      }}
      style={{ width: 100, height: 100 }}
    >
      LOGIN
    </div>
  )
}

export default Login
