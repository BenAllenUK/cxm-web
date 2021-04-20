import { Block } from 'components/editor/blocks/types'

export type Article = {
  id: number
  parentId?: number | null
  title: string
  updatedAt: string
  createdAt: string
  archived: boolean
  published?: boolean
  publishAt: string
  publishedByName: string
  archivedAt?: string
  position: number
  blocks?: Block[]
  path: string
  coverImage?: string | null
}
