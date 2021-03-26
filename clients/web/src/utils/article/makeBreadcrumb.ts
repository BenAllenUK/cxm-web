import { Article } from 'operations/articles/types'
import flatten from 'lodash/flatten'
import { BreadcrumbItem } from 'components/common/breadcrumbs/types'

const makeBreadcrumb = (articles: Article[], id: number): BreadcrumbItem[] => {
  const [article] = articles.filter((item) => item.id === id)
  if (!article) {
    return []
  }
  const breadcrumb: BreadcrumbItem[] = [{ title: article.title, link: article.path }]

  if (!article.parentId) {
    return breadcrumb
  }
  const parentArticle = makeBreadcrumb(articles, article.parentId)
  const breadcrumbs = flatten([...parentArticle, breadcrumb])
  return breadcrumbs
}

export default makeBreadcrumb
