import { Article } from '../types'
import flatten from 'lodash/flatten'
import { BreadcrumbItem } from '../components/common/breadcrumbs/types'

const makeBreadcrumb = (articles: Article[], id: number): BreadcrumbItem[] => {
  console.log('in bredcrymbs')
  const [article] = articles.filter((item) => item.id === id)
  if (!article) {
    console.log('no artcile')
    return []
  }
  const breadcrumb: BreadcrumbItem[] = [
    { title: article.title, link: article.path }
  ]

  if (!article.parentId) {
    console.log('no parentid')
    return breadcrumb
  }
  const parentArticle = makeBreadcrumb(articles, article.parentId)
  console.log('21')
  const breadcrumbs = flatten([...parentArticle, breadcrumb])
  console.log('23')
  return breadcrumbs
}

export default makeBreadcrumb
