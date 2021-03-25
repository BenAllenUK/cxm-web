import { BlockType } from '../blocks/types'

const fileTypeToBlockType = (fileType: string) => {
  if (fileType.includes('image')) {
    return BlockType.IMAGE
  }
  if (fileType.includes('video')) {
    return BlockType.VIDEO
  }
  return BlockType.FILE
}

export default fileTypeToBlockType
