import Colors from 'config/Colors'
import React from 'react'
import styled from 'styled-components'
import StyleButton, { StyleTypes } from './controls/StyleButton'
import LinkButton from './controls/LinkButton'
import { Point } from 'types'

const MODAL_OFFSET = 20

class TextControls extends React.Component<IProps> {
  ref: any = React.createRef<HTMLElement>()

  calculatePosition(position: Point) {
    const width = this.ref.current?.offsetWidth
    const height = this.ref.current?.offsetHeight
    return {
      left: position.x - width / 2,
      top: position.y - height - MODAL_OFFSET,
    }
  }

  render() {
    const { position } = this.props
    const containerPositionStyle = this.calculatePosition(position)
    return (
      <Container ref={this.ref} style={containerPositionStyle}>
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
`

export default TextControls
