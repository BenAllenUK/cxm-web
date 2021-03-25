import gql from 'graphql-tag'
import ArticleFragment from './ArticleFragment'
import BlockFragment from '../blocks/BlockFragment'

const GetArticlesWithBlocks = gql`
  query GetArticlesWithBlocks($projectSlug: String!) {
    ${ArticleFragment}
    ${BlockFragment}
    projects(where: {slug: {_eq: $projectSlug}}) {
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
