import { Article } from '../articles/types'

export type Project = {
  id: number
  name: string
  slug: string
  image?: string | null
  articles?: Article[]
  archivedArticles?: Article[]
}
