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
    case BlockType.CALLOUT:
    case BlockType.CODE:
    case BlockType.QUOTE:
      return !(block as BlockDataText).value
    case BlockType.LIST_BULLET:
      return (block as BlockDataListBullet).items.length == 0
    case BlockType.IMAGE:
      return !(block as BlockDataImage).source
    default:
      return true
  }
}

export const BlockTypeProperties = {
  [BlockType.TEXT]: {
    id: BlockType.TEXT,
    title: 'Text',
    subtitle: 'Start writing with plain text.',
    image: '/preview/text.png',
    initialHeight: 19,
    isEditable: true,
  },
  [BlockType.H1]: {
    id: BlockType.H1,
    title: 'Heading 1',
    subtitle: 'Big section heading.',
    image: '/preview/h1.png',
    initialHeight: 38,
    isEditable: true,
  },
  [BlockType.H2]: {
    id: BlockType.H2,
    title: 'Heading 2',
    subtitle: 'Medium section heading.',
    image: '/preview/h2.png',
    initialHeight: 29,
    isEditable: true,
  },
  [BlockType.H3]: {
    id: BlockType.H3,
    title: 'Heading 3',
    subtitle: 'Small section heading.',
    image: '/preview/h3.png',
    initialHeight: 23,
    isEditable: true,
  },
  [BlockType.LIST_BULLET]: {
    id: BlockType.LIST_BULLET,
    title: 'Bulleted list',
    subtitle: 'Create a simple bullet list.',
    image: '/preview/list_bullet.png',
    initialHeight: 19,
    isEditable: true,
  },
  [BlockType.IMAGE]: {
    id: BlockType.IMAGE,
    title: 'Image',
    subtitle: 'Upload or embed with a link.',
    image: '/preview/image.png',
    initialHeight: 49,
    isEditable: false,
  },
  [BlockType.CALLOUT]: {
    id: BlockType.CALLOUT,
    title: 'Callout',
    subtitle: 'Make writing stand out.',
    image: '/preview/image.png',
    initialHeight: 53,
    isEditable: true,
  },
  [BlockType.CODE]: {
    id: BlockType.CODE,
    title: 'Code',
    subtitle: 'Capture a code snippet.',
    image: '/preview/image.png',
    initialHeight: 82,
    isEditable: true,
  },
  [BlockType.QUOTE]: {
    id: BlockType.QUOTE,
    title: 'Quote',
    subtitle: 'Capture a quote.',
    image: '/preview/image.png',
    initialHeight: 34,
    isEditable: true,
  },
  [BlockType.DIVIDER]: {
    id: BlockType.DIVIDER,
    title: 'Divider',
    subtitle: 'Visually divide blocks.',
    image: '/preview/image.png',
    initialHeight: 13,
    isEditable: false,
  },
}
