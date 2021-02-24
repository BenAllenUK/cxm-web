import { Block } from 'components/editor/blocks/types'

export type Article = {
  id: number
  parentId?: number | null
  title: string
  slug: string
  updatedAt: string
  createdAt: string
  archived: boolean
  archivedAt?: string
  position: number
  blocks?: Block[]
}
