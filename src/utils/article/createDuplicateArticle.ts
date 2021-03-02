import { Article } from '../../operations/articles/types'

function createDuplicateArticle(article: Article): Article {
  return {
    ...article,
    id: Math.round(Math.random() * -1000000),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    title: `${article.title} Copy`,
    slug: `${article.slug}-copy`,
  }
}

export default createDuplicateArticle
