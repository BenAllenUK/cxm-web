import Colors from 'config/colors'
import { closestIndexTo } from 'date-fns/fp'
import React from 'react'
import styled from 'styled-components'
import { Point } from 'types'
import { BlockType } from 'types/editor'
import { BlockTypeLabels } from '../blocks'

class BlockControls extends React.Component<IProps, IState> {
  state = {
    selectedIndex: 0,
  }

  itemRefs: HTMLDivElement[] = []

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPress)
  }

  onItemMouseOver = (selectedIndex: number) => {
    this.setState({ selectedIndex })
  }

  onMouseOut = () => {
    this.setState({ selectedIndex: -1 })
  }

  onKeyPress = (e: KeyboardEvent) => {
    const { onClick } = this.props
    const { selectedIndex } = this.state

    let items = this.getItems()

    if (e.key === 'Enter') {
      onClick(items[selectedIndex].id)
      return
    }

    let index = 0
    if (e.key === 'ArrowUp') {
      index = selectedIndex > -1 ? selectedIndex - 1 : -1
    } else if (e.key === 'ArrowDown') {
      index = selectedIndex < items.length - 1 ? selectedIndex + 1 : items.length - 1
    }

    this.setState({
      selectedIndex: index,
    })

    if (index > -1) {
      this.itemRefs[index].scrollIntoView(false)
    }
  }

  getItems() {
    const { filterText } = this.props
    let items = Object.values(BlockTypeLabels)

    if (filterText) {
      items = items.filter((items) => items.title.toLowerCase().indexOf(filterText) > -1)
    }
    return items
  }

  render() {
    const { position, onClick } = this.props
    const { selectedIndex } = this.state
    let items = this.getItems()

    return (
      <Container
        style={{
          left: position.x,
          top: position.y,
        }}
        onMouseOut={this.onMouseOut}
      >
        {items.map((item, i) => (
          <Item
            onClick={() => onClick(item.id)}
            onMouseOver={() => this.onItemMouseOver(i)}
            key={i}
            style={i === selectedIndex ? { backgroundColor: Colors.line } : {}}
            ref={(ref) => {
              if (!ref) return
              this.itemRefs[i] = ref
            }}
          >
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

interface IState {
  selectedIndex: number
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
