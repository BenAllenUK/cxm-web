import * as React from 'react'
import Header from './header/Header'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 100%;
`

const GridBackground = styled.div`
  background-image: url('images/grid.png');
  width: 100%;
  height: 100%;
`

const Workflow = () => (
  <Container>
    <Header />
    <GridBackground></GridBackground>
  </Container>
)

export default Workflow
