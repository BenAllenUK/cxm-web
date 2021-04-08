import gql from 'graphql-tag'
import ArticleFragment from './ArticleFragment'
import BlockFragment from '../blocks/BlockFragment'

const GetArticleOne = gql`
  query GetArticleOne($projectSlug: String!, $path: String!) {
    ${ArticleFragment}
    ${BlockFragment}
    articles(where: {path: {_eq: $path}, project: {slug: {_eq: $projectSlug} }, archived: { _eq: false }, published: { _eq: true }}) {
      ...ArticleFragment

      blocks {
        ...BlockFragment
      }
    }
  }
`
export default GetArticleOne
