import { BlockData } from 'components/types'

export function parseBlocks(
  data: { id: number; type: string; parent_id?: number | null; payload: any }[]
): BlockData[] {
  const list = data.map((item) => ({
    id: item.id,
    type: item.type,
    children: [],
    parentId: item.parent_id || null,
    ...item.payload,
  }))
  return list
}
