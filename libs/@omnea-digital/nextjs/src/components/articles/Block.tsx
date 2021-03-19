import Text from './blocks/Text'
import Image from './blocks/Image'

import Divider from './blocks/Divider'

import { Block, BlockType, BlockDataText, BlockDataImage } from '../../types'

interface IBlockProps {
  item: Block
  index: number
}

const Block = ({ item, index }: IBlockProps) => {
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
      return <Image content={item.payload as BlockDataImage} />
    default:
      return <div />
  }
}

export default Block
