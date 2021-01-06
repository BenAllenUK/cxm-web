import H1Preview from 'images/preview/h1.png'
import H2Preview from 'images/preview/h2.png'
import H3Preview from 'images/preview/h3.png'
import ImagePreview from 'images/preview/image.png'
import ListBulletPreview from 'images/preview/list_bullet.png'
import TextPreview from 'images/preview/text.png'
import {
  BlockData,
  BlockDataText,
  BlockType,
  BlockDataListBullet,
  BlockDataImage,
} from 'types/editor'

export const BLOCK_CONTAINER_VERTICAL_PADDING = 10

export function isBlockEmpty(block: BlockData) {
  switch (block.type) {
    case BlockType.H1:
    case BlockType.H2:
    case BlockType.H3:
    case BlockType.TEXT:
      return !(block as BlockDataText).value
    case BlockType.LIST_BULLET:
      return (block as BlockDataListBullet).items.length == 0
    case BlockType.IMAGE:
      return !(block as BlockDataImage).source
  }
}

export const BlockInitialHeight = {
  [BlockType.H1]: 38,
  [BlockType.H2]: 29,
  [BlockType.H3]: 23,
  [BlockType.TEXT]: 19,
  [BlockType.LIST_BULLET]: 19,
  [BlockType.IMAGE]: 30,
}

export const BlockTypeLabels = {
  [BlockType.TEXT]: {
    id: BlockType.TEXT,
    title: 'Text',
    subtitle: 'Start writing with plain text.',
    image: TextPreview,
  },
  [BlockType.H1]: {
    id: BlockType.H1,
    title: 'Heading 1',
    subtitle: 'Big section heading.',
    image: H1Preview,
  },
  [BlockType.H2]: {
    id: BlockType.H2,
    title: 'Heading 2',
    subtitle: 'Medium section heading.',
    image: H2Preview,
  },
  [BlockType.H3]: {
    id: BlockType.H3,
    title: 'Heading 3',
    subtitle: 'Small section heading.',
    image: H3Preview,
  },
  [BlockType.LIST_BULLET]: {
    id: BlockType.LIST_BULLET,
    title: 'Bulleted list',
    subtitle: 'Create a simple bullet list.',
    image: ListBulletPreview,
  },
  [BlockType.IMAGE]: {
    id: BlockType.IMAGE,
    title: 'Image',
    subtitle: 'Upload or embed with a link.',
    image: ImagePreview,
  },
}
