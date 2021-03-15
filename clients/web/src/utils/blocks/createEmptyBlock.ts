import { Block, BlockType } from 'components/editor/blocks/types'

function createEmptyBlock(newPosition: number): Block {
  return {
    type: BlockType.TEXT,
    payload: {
      value: '',
    },
    id: Math.round(Math.random() * -1000000),
    parentId: null,
    editingUserId: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    position: newPosition,
  }
}

export default createEmptyBlock
