import gql from 'graphql-tag'

const BlockFragment = gql`
  fragment BlockFragment on blocks {
    __typename
    id
    articleId
    parentId
    editingUserId
    updatedAt
    createdAt
    payload
    type
    position
  }
`

export default BlockFragment
