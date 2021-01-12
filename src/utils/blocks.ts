import { BlockData } from 'components/types'
import { GetBlocksQueryResult } from 'generated/graphql'

type Data = NonNullable<GetBlocksQueryResult['data']>

export function formatBlocks(data: Data): BlockData[] {
  const list = data.blocks.map((item) => ({
    id: item.id,
    type: item.type,
    children: [],
    parentId: item.parent_id || null,
    ...item.payload,
  }))

  return list
}
