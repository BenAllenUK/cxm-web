import { Block, BlockType } from 'components/types'
import { GetArticleOneQuery } from 'generated/graphql'

export function parseBlocks(data: NonNullable<GetArticleOneQuery['articles'][0]>['blocks']): Block[] {
  return data.map(({ __typename, ...item }) => ({
    ...item,
    type: item.type as BlockType,
    payload: item.payload ? JSON.parse(item.payload) : null,
  }))
}
