import * as React from 'react'
import UserActivity from './user-activity/UserActivity'
import styled from 'styled-components'
import Controls from './controls/Controls'

const Nav = styled.nav`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  background-image: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
  display: flex;
`

const Header = () => {
  return (
    <Nav>
      <div style={{ flex: 1 }}></div>
      <UserActivity />
      <Controls />
    </Nav>
  )
}

export default Header
