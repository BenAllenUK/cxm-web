import { Block, BlockType } from 'components/editor/blocks/types'
import { GetArticleOneQuery } from 'generated/graphql'

export function parseBlocks(data: NonNullable<GetArticleOneQuery['articles'][0]>['blocks']): Block[] {
  try {
    return data.map(({ __typename, ...item }) => ({
      ...item,
      type: item.type as BlockType,
      payload: item.payload ? JSON.parse(item.payload) : null,
    }))
  } catch (e) {
    console.error(data)
    console.error(e)
    return []
  }
}
