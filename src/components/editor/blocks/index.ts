import {
  BlockData,
  BlockDataText,
  BlockType,
  BlockDataListBullet,
  BlockDataImage,
} from '../../types'

export const BLOCK_CONTAINER_VERTICAL_PADDING = 10

export const DEFAULT_BLOCK = {
  type: BlockType.TEXT,
  value: '',
}

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
    image: '/preview/text.png',
  },
  [BlockType.H1]: {
    id: BlockType.H1,
    title: 'Heading 1',
    subtitle: 'Big section heading.',
    image: '/preview/h1.png',
  },
  [BlockType.H2]: {
    id: BlockType.H2,
    title: 'Heading 2',
    subtitle: 'Medium section heading.',
    image: '/preview/h2.png',
  },
  [BlockType.H3]: {
    id: BlockType.H3,
    title: 'Heading 3',
    subtitle: 'Small section heading.',
    image: '/preview/h3.png',
  },
  [BlockType.LIST_BULLET]: {
    id: BlockType.LIST_BULLET,
    title: 'Bulleted list',
    subtitle: 'Create a simple bullet list.',
    image: '/preview/list_bullet.png',
  },
  [BlockType.IMAGE]: {
    id: BlockType.IMAGE,
    title: 'Image',
    subtitle: 'Upload or embed with a link.',
    image: '/preview/image.png',
  },
}
