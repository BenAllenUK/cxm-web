import { Project } from '../projects/types'

export type Organisation = {
  id: number
  name: string
  slug: string
  projects?: Project[]

  // Read only
  stats?: {
    aggregate: {
      count: number
    }
  }
}
