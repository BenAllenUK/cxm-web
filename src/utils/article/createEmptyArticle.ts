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
          payload: JSON.stringify({
            value: 'Start writing...',
          }),
          position: 9, // TODO: Update position
        },
      ],
    },
  ]
}

export default createArticleEmpty
