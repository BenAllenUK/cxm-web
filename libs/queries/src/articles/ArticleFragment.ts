import gql from 'graphql-tag'

const ArticleFragment = gql`
  fragment ArticleFragment on articles {
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
    coverImage
    # archivedUser {
    #   id
    #   name
    # }
  }
`

export default ArticleFragment
