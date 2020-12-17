import Colors from 'config/colors'
import React from 'react'
import styled from 'styled-components'
import { Point } from 'types'

class BlockControls extends React.Component<IProps> {
  render() {
    const { position } = this.props
    return (
      <Container
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        <Item>
          <Image></Image>
          <Description>
            <Title>Text</Title>
            <SubTitle>Just start writing with plain text</SubTitle>
          </Description>
        </Item>
        <Item>
          <Image></Image>
          <Description>
            <Title>Page</Title>
            <SubTitle>Just start writing with plain text</SubTitle>
          </Description>
        </Item>
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
  flex-direction: column;
  position: absolute;
  top: 200px;
  left: 200px;
  background-color: ${Colors.background};
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid ${Colors.line};
  border-right: none;
  z-index: 1;
  transform: translate(-50%, -150%);
`

const Item = styled.div`
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  :hover {
    background-color: ${Colors.line};
  }
`

const Description = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  padding: 5px;
  padding-left: 10px;
`

const Image = styled.div`
  border-radius: 5px;
  height: 40px;
  width: 40px;
  border: 1px solid ${Colors.controls};
`

const Title = styled.span`
  font-size: 14px;
  color: ${Colors.text1};
  text-align: left;
  margin-bottom: 5px;
`

const SubTitle = styled.span`
  font-size: 12px;
  color: ${Colors.text2};
  text-align: left;
`

export default BlockControls
