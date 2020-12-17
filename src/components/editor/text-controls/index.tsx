import Colors from 'config/colors'
import React from 'react'
import styled from 'styled-components'
import StyleButton, { StyleTypes } from './StyleButton'
import LinkButton from './LinkButton'
import { Point } from 'types'

class TextControls extends React.Component<IProps> {
  render() {
    const { position } = this.props
    return (
      <Container
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        <StyleButton type={StyleTypes.BOLD} />
        <StyleButton type={StyleTypes.ITALIC} />
        <StyleButton type={StyleTypes.UNDERLINE} />
        <StyleButton type={StyleTypes.STRIKE_THROUGH} />
        <LinkButton />
        {/* <StyleButton type="formatBlock" arg="h2" name="heading2" />
        <StyleButton type="formatBlock" arg="h3" name="heading3" /> */}
        {/* <StyleButton
          type="createLink"
          arg="https://github.com/lovasoa/react-contenteditable"
          name="hyperlink"
        /> */}
      </Container>
    )
  }
}

interface IProps {
  position: Point
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 100px;
  left: 100px;
  background-color: ${Colors.background};
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid ${Colors.line};
  border-right: none;
  z-index: 1;
  transform: translate(-50%, -150%);
`

export default TextControls
