import gql from 'graphql-tag'
import ArticleFragment from './ArticleFragment'
import BlockFragment from '../blocks/BlockFragment'

const GetArticles = gql`
  query GetArticles($projectId: Int!) {
    ${ArticleFragment}
    ${BlockFragment}
    projects_by_pk(id: $projectId) {
      id
      articles {
        ...ArticleFragment
        blocks {
          ...BlockFragment
        }
      }
    }
  }
`

export default GetArticles
