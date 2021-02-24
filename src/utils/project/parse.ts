import { ProjectFragment } from 'generated/graphql'
import { Project } from '../../operations/project/types'
import { fromArticleFragments, toArticleFragments } from '../article/parse'

export function fromProjectFragments(data: ProjectFragment[]): Project[] {
  try {
    return data.map(({ __typename, ...item }) => ({
      ...item,
      articles: item.articles ? fromArticleFragments(item.articles) : [],
      archivedArticles: item.archivedArticles ? fromArticleFragments(item.archivedArticles) : [],
    }))
  } catch (e) {
    console.error(data)
    console.error(e)
    return []
  }
}

export function toBlockFragments(organisationId: number, data: Project[]): ProjectFragment[] {
  try {
    return data.map((item) => ({
      ...item,
      __typename: 'projects',
      articles: item.articles ? toArticleFragments(item.id, item.articles) : [],
      archivedArticles: item.archivedArticles ? toArticleFragments(item.id, item.archivedArticles) : [],
    }))
  } catch (e) {
    console.error(data)
    console.error(e)
    return []
  }
}
