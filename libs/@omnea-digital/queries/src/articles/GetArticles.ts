import gql from 'graphql-tag'
import ArticleFragment from './ArticleFragment'

const GetArticles = gql`
  query GetArticles($projectId: Int!) {
    ${ArticleFragment}
    projects_by_pk(id: $projectId) {
      id
      articles {
        ...ArticleFragment
      }
    }
  }
`

export const GetArticlesRaw = `
  query GetArticles($projectId: Int!) {
    projects_by_pk(id: $projectId) {
      id
      articles {
        id
    parentId
    projectId
    title
    updatedAt
    createdAt
    archived
    archivedAt
    position
    path
      }
    }
  }
}
`

export default GetArticles
