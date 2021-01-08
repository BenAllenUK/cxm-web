import React from 'react'

import { BlockType } from '../../types'
import { BlockTypeLabels } from '../blocks'
import Colors from 'config/colors'
import Image from 'next/image'
import styles from './BlockControls.module.scss'

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

  onItemMouseEnter = (selectedIndex: number) => {
    this.setState({ selectedIndex })
  }

  onMouseLeave = () => {
    this.setState({ selectedIndex: -1 })
  }

  onKeyPress = (e: KeyboardEvent) => {
    const { onClick } = this.props
    const { selectedIndex } = this.state

    let items = this.getItems()

    if (e.key === 'Enter' && selectedIndex > -1) {
      onClick(items[selectedIndex].id)
      e.preventDefault()
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
      <div
        style={{
          left: position.x,
          top: position.y,
        }}
        onMouseLeave={this.onMouseLeave}
        className={styles.container}
      >
        {items.map((item, i) => (
          <div
            className={styles.item}
            onClick={() => onClick(item.id)}
            onMouseEnter={() => this.onItemMouseEnter(i)}
            key={i}
            style={i === selectedIndex ? { backgroundColor: Colors.line } : {}}
            ref={(ref) => {
              if (!ref) return
              this.itemRefs[i] = ref
            }}
          >
            <Image className={styles.image} width={46} height={46} src={item.image} />
            <div className={styles.description}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.subtitle}>{item.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

interface IState {
  selectedIndex: number
}

interface IProps {
  position: { x: number; y: number }
  filterText?: string | null
  onClick: (key: BlockType) => void
}

export default BlockControls
