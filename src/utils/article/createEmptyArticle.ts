import { Article } from 'operations/articles/types'
import createEmptyBlock from '../blocks/createEmptyBlock'

function createArticleEmpty(parentId: number | null, basePath: string | null, position: number): Article {
  const newBlock = createEmptyBlock(0)
  const num = Math.round(Math.random() * 100)

  return {
    id: Math.round(Math.random() * -1000000),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    title: 'New page ' + num,
    parentId: parentId,
    position,
    archived: false,
    path: basePath ? `${basePath}/${'new-' + num}` : 'new-' + num,
    blocks: [newBlock],
  }
}

export default createArticleEmpty
