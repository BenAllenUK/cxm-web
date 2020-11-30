import * as React from 'react'
import { useAuth0 } from './Auth0'
import styled from 'styled-components'
import Colors from '../../config/colors'

const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`
const Title = styled.h1`
  font-family: 'Means';
  color: ${Colors.text1};
  font-size: 50px;
`

const Container = styled.div`
  width: 600px;
  margin-bottom: 100px;
`

const Logo = styled.img`
  width: 50px;
  height: 50px;
`

const LoginButton = styled.button`
  border: ${Colors.text1} solid 1px;
  color: ${Colors.text1};
  padding: 10px;
  width: 200px;
  margin-top: 20px;
  border: 1px solid ${Colors.text1};

  :hover {
    background-color: ${Colors.text1};
    color: #fff;
  }
`

const Login = () => {
  const { loading, loginWithRedirect } = useAuth0()
  return (
    <Background>
      <Container>
        <Logo src={'images/sample-logo.png'} />
        <Title>
          Marketing smarts for
          <br />
          big ideas
        </Title>
        <LoginButton
          id="qsLoginBtn"
          onClick={() => {
            loginWithRedirect({})
          }}
        >
          LOGIN
        </LoginButton>
      </Container>
    </Background>
  )
}

export default Login
