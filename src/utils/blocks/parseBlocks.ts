import { Block, BlockType } from 'components/editor/blocks/types'
import { BlockFragment } from 'generated/graphql'

export function fromBlockFragments(data: BlockFragment[]): Block[] {
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

export function toBlockFragments(articleId: number, data: Block[]): BlockFragment[] {
  try {
    return data.map((item) => ({
      __typename: 'blocks',
      articleId,
      ...item,
      type: Number(item.type),
      payload: item.payload ? JSON.stringify(item.payload) : null,
    }))
  } catch (e) {
    console.error(data)
    console.error(e)
    return []
  }
}
