import Colors from 'config/colors'
import React from 'react'
import styled from 'styled-components'
import { Point } from 'types'
import { BlockType } from 'types/editor'
import { BlockTypeLabels } from '../blocks'

class BlockControls extends React.Component<IProps> {
  render() {
    const { position, filterText, onClick } = this.props
    let items = Object.values(BlockTypeLabels)

    if (filterText) {
      items = items.filter((items) => items.title.toLowerCase().indexOf(filterText) > -1)
    }

    return (
      <Container
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        {items.map((item, index) => (
          <Item onClick={() => onClick(item.id)} key={index}>
            <Image src={item.image} />
            <Description>
              <Title>{item.title}</Title>
              <SubTitle>{item.subtitle}</SubTitle>
            </Description>
          </Item>
        ))}
      </Container>
    )
  }
}

interface IProps {
  position: Point
  filterText?: string | null
  onClick: (key: BlockType) => void
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
  width: 320px;
  max-height: 300px;
  overflow: scroll;
  border-radius: 5px;
`

const Item = styled.div`
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  cursor: pointer;
  align-items: center;
  justify-content: flex-start;

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
  padding-left: 8px;
`

const Image = styled.img`
  border-radius: 5px;
  height: 46px;
  width: 46px;
  border: 1px solid ${Colors.border};
`

const Title = styled.span`
  font-size: 14px;
  color: ${Colors.text1};
  text-align: left;
  margin-bottom: 2px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const SubTitle = styled.span`
  font-size: 12px;
  color: ${Colors.text2};
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export default BlockControls
