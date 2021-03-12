import { Article } from 'operations/articles/types'
import flatten from 'lodash/flatten'

export function updateChildPaths(articles: Article[], oldPath: string, newPath: string, parentId: number) {
  const childrenArticles = articles.filter((item) => item.parentId === parentId)

  const modifiedChildrenChildrenAll: Article[][] = []
  childrenArticles.forEach((item) => {
    const modifiedChildrenChildren = updateChildPaths(articles, oldPath, newPath, item.id)
    modifiedChildrenChildrenAll.push(modifiedChildrenChildren)
  })

  const modifiedChildrenArticles = childrenArticles.map((item) => ({
    ...item,
    path: item.path.replace(oldPath, newPath),
  }))

  return [...modifiedChildrenArticles, ...flatten(modifiedChildrenChildrenAll)]
}

export default updateChildPaths
