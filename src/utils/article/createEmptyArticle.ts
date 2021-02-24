import { BlockType } from 'components/editor/blocks/types'

function createArticleEmpty(parentId: number | null) {
  return [
    {
      title: 'New page',
      slug: 'new-' + encodeURI(new Date().toISOString()),
      parentId: parentId,
      position: 9, // TODO: Update position
      blocks: [
        {
          type: BlockType.TEXT,
          payload: {
            value: '',
          },
          position: 0,
        },
      ],
    },
  ]
}

export default createArticleEmpty
