import { IAction } from 'actions'
import actions, { types } from 'actions/app'

type Project = {
  id: number
  name: string
  slug: string
  image?: string | null
}

export interface IAppState {
  projects: Project[]
  currentProjectIndex: number | null

  organisationId: number | null
  userId: number | null
}

export const initialState: IAppState = {
  projects: [],
  currentProjectIndex: null,
  organisationId: null,
  userId: null,
}

export default function reducer(state: IAppState = initialState, action: IAction) {
  switch (action.type) {
    default:
      return state
  }
}
