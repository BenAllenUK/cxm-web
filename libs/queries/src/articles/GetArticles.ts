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

export default GetArticles
