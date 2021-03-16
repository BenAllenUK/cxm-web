import { Project } from '../projects/types'

export type Organisation = {
  id: number
  name: string
  slug: string
  projects?: Project[]

  // Read only
  // TODO: Make cleaner format
  stats?: {
    aggregate?: {
      count?: number | null
    } | null
  }
}
