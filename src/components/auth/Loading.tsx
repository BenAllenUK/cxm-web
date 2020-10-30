import * as React from 'react'
import styled from 'styled-components'

const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const Loading = () => {
  return (
    <Background>
      <img width={20} src={'./images/loading.gif'} alt="Loading" />
    </Background>
  )
}

export default Loading
