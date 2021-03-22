import gql from 'graphql-tag'
import ArticleFragment from './ArticleFragment'
import BlockFragment from '../blocks/BlockFragment'

const GetArticlesWithBlocks = gql`
  query GetArticlesWithBlocks($projectId: Int!) {
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

export default GetArticlesWithBlocks
