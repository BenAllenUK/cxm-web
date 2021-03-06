import * as React from 'react'
import styles from './Login.module.scss'
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0'

const Content = () => {
  const { user, error, isLoading } = useUser()

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <Image width={50} height={50} className={styles.logo} src={'/assets/logo.png'} />
        <div className={styles.title}>
          Marketing smarts for
          <br />
          big ideas
        </div>
        {error && <div>{error.message}</div>}

        <a
          style={{ visibility: isLoading ? 'hidden' : 'visible' }}
          className={styles.loginButton}
          id="qsLoginBtn"
          href={process.env.NEXT_PUBLIC_AUTH0_LOGIN}
        >
          LOGIN
        </a>
      </div>
    </div>
  )
}

const Login = ({}: IProps) => {
  return <Content />
}

export default Login

interface IProps {}
