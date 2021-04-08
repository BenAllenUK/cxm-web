import { Article } from 'operations/articles/types'
import flatten from 'lodash/flatten'

const readPathRoute = (articles: Article[], id: number): Article[] => {
  const [article] = articles.filter((item) => item.id === id)

  if (!article) {
    return []
  }

  if (!article.parentId) {
    return [article]
  }
  const parentArticle = readPathRoute(articles, article.parentId)
  return [...flatten(parentArticle), article]
}

export default readPathRoute
