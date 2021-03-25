import gql from 'graphql-tag'
import ArticleFragment from './ArticleFragment'

const GetArticles = gql`
  query GetArticles($projectSlug: String!) {
    ${ArticleFragment}
    projects(where: {slug: {_eq: $projectSlug}}) {
      id
      articles {
        ...ArticleFragment
      }
    }
  }
`

export default GetArticles
