import gql from 'graphql-tag'
import ArticleFragment from './ArticleFragment'
import BlockFragment from '../blocks/BlockFragment'

const GetArticleOne = gql`
  query GetArticleOne($path: String!) {
    ${ArticleFragment}
    ${BlockFragment}
    articles(where: { path: { _eq: $path } }) {
      ...ArticleFragment

      blocks {
        ...BlockFragment
      }
    }
  }
`
export default GetArticleOne
