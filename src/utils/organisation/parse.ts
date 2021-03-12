import { ProjectFragment } from 'generated/graphql'
import { Organisation } from 'operations/organisations/types'
import { OrganisationProjectFragment } from 'types/types'
import { fromProjectFragments, toProjectFragments } from '../project/parse'

export function fromOrganisationFragments(data: OrganisationProjectFragment[]): Organisation[] {
  try {
    return data.map(({ __typename, ...item }) => ({
      ...item,
      projects: item.projects ? fromProjectFragments(item.projects) : [],
    }))
  } catch (e) {
    console.error(data)
    console.error(e)
    return []
  }
}

export function toOrganisationFragments(data: Organisation[]): OrganisationProjectFragment[] {
  try {
    return data.map((item) => ({
      ...item,
      __typename: 'organisations',
      projects: item.projects ? toProjectFragments(item.id, item.projects) : [],
    }))
  } catch (e) {
    console.error(data)
    console.error(e)
    return []
  }
}
