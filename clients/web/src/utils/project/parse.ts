import { Project } from 'operations/projects/types'
import { ProjectArticleWithArchivedFragment } from 'types/types'
import { fromArticleFragments, toArticleFragments } from '../article/parse'

export function fromProjectFragments(data: ProjectArticleWithArchivedFragment[]): Project[] {
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

export function toProjectFragments(organisationId: number, data: Project[]): ProjectArticleWithArchivedFragment[] {
  try {
    return data.map((item) => ({
      ...item,
      __typename: 'projects',
      organisationId,
      articles: item.articles ? toArticleFragments(item.id, item.articles) : [],
      archivedArticles: item.archivedArticles ? toArticleFragments(item.id, item.archivedArticles) : [],
    }))
  } catch (e) {
    console.error(data)
    console.error(e)
    return []
  }
}
