import Text from './blocks/Text'
import TextInput from './blocks/TextInput'
import Image from './blocks/Image'
import ButtonBlock from './blocks/ButtonBlock'
import Video from './blocks/Video'
import Divider from './blocks/Divider'
import File from './blocks/File'
import List from './blocks/List'
import {
  Block,
  BlockType,
  BlockDataText,
  BlockDataMedia,
  BlockDataButton,
  BlockDataTextInput,
  BlockDataListBullet
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
    case BlockType.H4:
    case BlockType.H5:
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
    case BlockType.VIDEO:
      return <Video id={item.id} content={item.payload as BlockDataMedia} />
    case BlockType.LIST_BULLET:
    case BlockType.LIST_CHECK:
    case BlockType.LIST_NUMBER:
      const initialPayload = item.payload as BlockDataListBullet
      return <List items={initialPayload.value} type={item.type} />
    default:
      return <div />
  }
}

export default BlockItem
