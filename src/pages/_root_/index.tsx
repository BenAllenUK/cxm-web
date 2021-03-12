import { UserProvider } from '@auth0/nextjs-auth0'
import LoginPage from 'components/pages/auth/login'

const Home = ({}: IProps) => {
  return (
    <UserProvider>
      <LoginPage />
    </UserProvider>
  )
}

export default Home

interface IProps {}
