import React from 'react'

import { BlockData, BlockType, BlockDataText, BlockDataImage } from 'components/types'

import Text from './blocks/Text'
import Image from './blocks/Image'

import styles from './Article.module.scss'
import Divider from './blocks/Divider'
import { BLOCK_CONTAINER_VERTICAL_PADDING } from 'components/editor/blocks'

class Article extends React.Component<IProps> {
  renderBlockItem = (item: BlockData, i: number) => {
    switch (item.type) {
      case BlockType.TEXT:
      case BlockType.H1:
      case BlockType.H2:
      case BlockType.H3:
      case BlockType.CALLOUT:
      case BlockType.CODE:
      case BlockType.QUOTE:
        return <Text content={item as BlockDataText} />
      case BlockType.DIVIDER:
        return <Divider />
      case BlockType.IMAGE:
        return <Image content={item as BlockDataImage} />
      default:
        return <div />
    }
  }

  renderBlock = (item: BlockData, i: number) => {
    return (
      <div
        key={i}
        style={{
          marginTop: BLOCK_CONTAINER_VERTICAL_PADDING,
          marginBottom: BLOCK_CONTAINER_VERTICAL_PADDING,
        }}
      >
        {this.renderBlockItem(item, i)}
      </div>
    )
  }

  render() {
    const { blocks } = this.props
    return (
      <div className={styles.container}>{blocks.map((item, i) => this.renderBlock(item, i))}</div>
    )
  }
}

interface IProps {
  blocks: BlockData[]
}

export default Article
