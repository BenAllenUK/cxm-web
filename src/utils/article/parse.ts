import { Article } from '../../operations/articles/types'
import { ArticleBlocksFragment } from '../../types/types'
import { fromBlockFragments, toBlockFragments } from '../blocks/parse'

export function fromArticleFragments(data: ArticleBlocksFragment[]): Article[] {
  try {
    return data.map(({ __typename, ...item }) => ({
      ...item,
      blocks: item.blocks ? fromBlockFragments(item.blocks) : [],
    }))
  } catch (e) {
    console.error(data)
    console.error(e)
    return []
  }
}

export function toArticleFragments(projectId: number, data: Article[]): ArticleBlocksFragment[] {
  try {
    return data.map((item) => ({
      __typename: 'articles',
      ...item,
      projectId,
      blocks: item.blocks ? toBlockFragments(item.id, item.blocks) : [],
    }))
  } catch (e) {
    console.error(data)
    console.error(e)
    return []
  }
}
