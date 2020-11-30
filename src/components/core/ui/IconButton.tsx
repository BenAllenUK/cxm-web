import React from 'react'
import Colors, { hexToRGB } from 'config/colors'
import styled from 'styled-components'

const IconButton = ({ children, ...otherProps }: React.HTMLAttributes<HTMLDivElement>) => (
  <Container {...otherProps}>{children}</Container>
)

export const Container = styled.div`
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 3px;

  :hover {
    background-color: ${Colors.line};
    color: ${Colors.background};
  }
`

export default IconButton
