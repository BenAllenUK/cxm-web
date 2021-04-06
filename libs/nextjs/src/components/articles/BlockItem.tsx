import Text from './blocks/Text'
import TextInput from './blocks/TextInput'
import Image from './blocks/Image'
import ButtonBlock from './blocks/ButtonBlock'
import Divider from './blocks/Divider'
import File from './blocks/File'

import {
  Block,
  BlockType,
  BlockDataText,
  BlockDataMedia,
  BlockDataButton,
  BlockDataTextInput
} from '../../types'

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
    case BlockType.BUTTON:
      return <ButtonBlock content={item.payload as BlockDataButton} />
    case BlockType.TEXT_INPUT:
      return <TextInput content={item.payload as BlockDataTextInput} />
    case BlockType.FILE:
      return <File content={item.payload as BlockDataMedia} />
    default:
      return <div />
  }
}

export default BlockItem
