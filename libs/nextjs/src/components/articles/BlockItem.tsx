import Text from './blocks/Text'
import Image from './blocks/Image'
import Video from './blocks/Video'

import Divider from './blocks/Divider'

import { Block, BlockType, BlockDataText, BlockDataMedia } from '../../types'

interface IBlockProps {
  item: Block
  index: number
}

const BlockItem = ({ item, index }: IBlockProps) => {
  switch (item.type) {
    case BlockType.TEXT:
    case BlockType.H1:
    case BlockType.H2:
    case BlockType.H3:
    case BlockType.CALLOUT:
    case BlockType.CODE:
    case BlockType.QUOTE:
      return <Text type={item.type} content={item.payload as BlockDataText} />
    case BlockType.DIVIDER:
      return <Divider />
    case BlockType.IMAGE:
      return <Image content={item.payload as BlockDataMedia} />
    case BlockType.VIDEO:
      return <Video id={item.id} content={item.payload as BlockDataMedia} />
    default:
      return <div />
  }
}

export default BlockItem
