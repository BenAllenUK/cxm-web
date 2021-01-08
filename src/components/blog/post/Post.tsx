import React from 'react'

import { BlockData, BlockType, BlockDataText } from 'components/types'

import Text from './blocks/Text'

import styles from './Post.module.scss'

class Post extends React.Component<IProps> {
  renderBlock = (item: BlockData, i: number) => {
    switch (item.type) {
      case BlockType.TEXT:
      case BlockType.H1:
      case BlockType.H2:
      case BlockType.H3:
        const itemText: BlockDataText = item as BlockDataText
        return <Text key={i} type={item.type} content={itemText.value} />
      default:
        return <div />
    }
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

export default Post
