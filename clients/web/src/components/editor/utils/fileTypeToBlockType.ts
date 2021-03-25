import { BlockType } from '../blocks/types'

export default (fileType: string) => {
  if (fileType.includes('image')) {
    return BlockType.IMAGE
  }
  if (fileType.includes('video')) {
    return BlockType.VIDEO
  }
  return BlockType.FILE
}
