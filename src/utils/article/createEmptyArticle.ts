import { Article } from '../../operations/articles/types'
import createEmptyBlock from '../blocks/createEmptyBlock'

function createArticleEmpty(parentId: number | null, position: number): Article {
  const newBlock = createEmptyBlock(0)
  return {
    id: Math.round(Math.random() * -1000000),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    title: 'New page',
    slug: 'new-' + encodeURI(new Date().toISOString()),
    parentId: parentId,
    position,
    archived: false,
    blocks: [newBlock],
  }
}

export default createArticleEmpty
