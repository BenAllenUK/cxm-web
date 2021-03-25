import { BlockDataText, BlockType, BlockDataListBullet, BlockDataImage, Block } from './types'

export const BLOCK_CONTAINER_VERTICAL_PADDING = 2

export const DEFAULT_BLOCK = {
  type: BlockType.TEXT,
  payload: {
    value: '',
  },
  id: -1,
  parentId: null,
  editingUserId: null,
  position: 0,
}

export const DEFAULT_BLOCK_START = {
  type: BlockType.H1,
  payload: {
    value: 'Untitled',
  },
  id: -1,
  parentId: null,
  editingUserId: null,
  position: 0,
}

export const DEFAULT_ARTICLE = {
  title: 'New Page',
  blocks: [DEFAULT_BLOCK_START],
}

export function isBlockEmpty(block: Block) {
  switch (block.type) {
    case BlockType.H1:
    case BlockType.H2:
    case BlockType.H3:
    case BlockType.H4:
    case BlockType.H5:
    case BlockType.TEXT:
    case BlockType.CALLOUT:
    case BlockType.CODE:
    case BlockType.QUOTE:
      return !(block.payload as BlockDataText).value
    case BlockType.LIST_BULLET:
      return ((block.payload as BlockDataListBullet).items || []).length == 0
    case BlockType.IMAGE:
      return false
    default:
      return true
  }
}

export function getBlockOptions(filterText?: string | null) {
  let items = Object.values(BlockTypeProperties)

  if (filterText) {
    const text = filterText.replace('/', '').toLowerCase()
    items = items.filter((items) => items.title.toLowerCase().indexOf(text) > -1)
  }
  return items
}

export const BlockTypeProperties = {
  [BlockType.IMAGE]: {
    id: BlockType.IMAGE,
    title: 'Text',
    subtitle: 'Start writing with plain text.',
    image: '/preview/text.png',
    initialHeight: 20,
    isEditable: true,
    initialPayload: {
      value: '',
      comments: [],
      caption: '',
    },
  },
  [BlockType.TEXT]: {
    id: BlockType.TEXT,
    title: 'Text',
    subtitle: 'Start writing with plain text.',
    image: '/preview/text.png',
    initialHeight: 20,
    isEditable: true,
    initialPayload: {
      value: '',
    },
  },
  [BlockType.H1]: {
    id: BlockType.H1,
    title: 'Heading 1',
    subtitle: 'Big section heading.',
    image: '/preview/h1.png',
    initialHeight: 45,
    isEditable: true,
    initialPayload: {
      value: '',
    },
  },
  [BlockType.H2]: {
    id: BlockType.H2,
    title: 'Heading 2',
    subtitle: 'Medium section heading.',
    image: '/preview/h2.png',
    initialHeight: 38,
    isEditable: true,
    initialPayload: {
      value: '',
    },
  },
  [BlockType.H3]: {
    id: BlockType.H3,
    title: 'Heading 3',
    subtitle: 'Small section heading.',
    image: '/preview/h3.png',
    initialHeight: 29,
    isEditable: true,
    initialPayload: {
      value: '',
    },
  },
  [BlockType.H4]: {
    id: BlockType.H4,
    title: 'Heading 4',
    subtitle: 'Small section heading.',
    image: '/preview/h3.png',
    initialHeight: 23,
    isEditable: true,
    initialPayload: {
      value: '',
    },
  },
  [BlockType.H5]: {
    id: BlockType.H5,
    title: 'Heading 5',
    subtitle: 'Small section heading.',
    image: '/preview/h3.png',
    initialHeight: 20,
    isEditable: true,
    initialPayload: {
      value: '',
    },
  },
  [BlockType.LIST_BULLET]: {
    id: BlockType.LIST_BULLET,
    title: 'Bulleted list',
    subtitle: 'Create a simple bullet list.',
    image: '/preview/list_bullet.png',
    initialHeight: 19,
    isEditable: true,
    initialPayload: {
      items: [{ value: '' }],
    },
  },
  [BlockType.LIST_CHECK]: {
    id: BlockType.LIST_CHECK,
    title: 'Checkbox list',
    subtitle: 'Create a simple checkbox list.',
    image: '/preview/list_bullet.png',
    initialHeight: 22,
    isEditable: true,
    initialPayload: {
      items: [{ value: '', selected: false }],
    },
  },
  [BlockType.LIST_NUMBER]: {
    id: BlockType.LIST_NUMBER,
    title: 'Numbered list',
    subtitle: 'Create a simple numbered list.',
    image: '/preview/list_bullet.png',
    initialHeight: 20,
    isEditable: true,
    initialPayload: {
      items: [{ value: '' }],
    },
  },
  [BlockType.IMAGE]: {
    id: BlockType.IMAGE,
    title: 'Image',
    subtitle: 'Upload or embed with a link.',
    image: '/preview/image.png',
    initialHeight: 49,
    isEditable: false,
    initialPayload: {},
  },
  [BlockType.CALLOUT]: {
    id: BlockType.CALLOUT,
    title: 'Callout',
    subtitle: 'Make writing stand out.',
    image: '/preview/image.png',
    initialHeight: 53,
    isEditable: true,
    initialPayload: {
      value: '',
    },
  },
  [BlockType.CODE]: {
    id: BlockType.CODE,
    title: 'Code',
    subtitle: 'Capture a code snippet.',
    image: '/preview/image.png',
    initialHeight: 82,
    isEditable: true,
    initialPayload: {
      value: '',
    },
  },
  [BlockType.QUOTE]: {
    id: BlockType.QUOTE,
    title: 'Quote',
    subtitle: 'Capture a quote.',
    image: '/preview/image.png',
    initialHeight: 34,
    isEditable: true,
    initialPayload: {
      value: '',
    },
  },
  [BlockType.DIVIDER]: {
    id: BlockType.DIVIDER,
    title: 'Divider',
    subtitle: 'Visually divide blocks.',
    image: '/preview/image.png',
    initialHeight: 20,
    isEditable: false,
    initialPayload: {},
  },
}
