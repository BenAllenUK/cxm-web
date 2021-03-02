import { Article } from '../articles/types'

export type Project = {
  id: number
  name: string
  slug: string
  articles?: Article[]
  archivedArticles?: Article[]
}
