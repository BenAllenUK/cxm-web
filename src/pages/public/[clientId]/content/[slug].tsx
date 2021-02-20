import { BlockType } from 'components/editor/blocks/types'
import Content from 'components/content'
import { createGraphQLClient } from 'config/graphql'
import GET_PROJECTS from 'queries/project/GET_PROJECTS.gql'

export default function ContentPage({ blocks }: any) {
  return <Content blocks={blocks} />
}

export async function getStaticProps() {
  const client = createGraphQLClient()
  const { data } = await client.query({ query: GET_PROJECTS })
  // const { projects_by_pk: projectData } = data

  // Note that in this case we're returning the state directly, without creating
  // the store first (like in /pages/ssr.js), this approach can be better and easier
  const blocks = [
    { type: BlockType.H1, value: 'Header 1' },
    { type: BlockType.H2, value: 'Header 2' },
    { type: BlockType.H3, value: 'Header 3' },
    {
      type: BlockType.TEXT,
      value:
        'Keyword cannibalization is one of the major issues that has a detrimental effect on search engine rankings. When multiple pages on your website are targeting exactly the same keyword, they may eventually start competing against each other. Search engines will be forced to make a choice as to which page they should display in search results, and their choice may not be the one you want. If you are already suffering from cannibalization issues, you can use a 301 redirect. ',
    },
    {
      type: BlockType.IMAGE,
      source: '/dummy/a.jpg',
    },
    { type: BlockType.DIVIDER, value: 'Divider' },
    { type: BlockType.CALLOUT, value: 'Callout' },
    { type: BlockType.QUOTE, value: 'Quote' },
    { type: BlockType.CODE, value: 'Code' },
  ]

  return {
    props: {
      namespacesRequired: ['common'],
      blocks,
      initialReduxState: {
        // project: projectData,
        editor: {
          blocks: blocks,
        },
      },
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { clientId: '1', slug: 'bar' } }],
    fallback: false,
  }
}
