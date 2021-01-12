import { BlockData, BlockType } from 'components/types'
import Editor from 'components/editor'
import { initialState } from 'reducers'
import { Provider } from 'react-redux'

import { useStore, initializeStore } from '../store'
import Sidebar, { Section } from 'components/navigation/sidebar'
import GET_PROJECT_DATA from 'queries/project/GET_PROJECT_DATA.gql'
import GET_ARTICLES from 'queries/articles/GET_ARTICLES.gql'
import GET_BLOCKS from 'queries/blocks/GET_BLOCKS.gql'
import { createHTTPClient } from 'config/graphql'
import { useGetArticlesQuery, useGetBlocksQuery } from 'generated/graphql'
import { formatMenu } from 'utils/menu'

import { formatBlocks } from 'utils/blocks'
import Root from 'components/root'

export default function EditorPage(props: any) {
  return (
    <Root {...props}>
      <Content />
    </Root>
  )
}

function Content() {
  const { data: articleData } = useGetArticlesQuery({
    variables: {
      projectId: 1,
    },
  })

  let articleId = 1
  const { data: blockData } = useGetBlocksQuery({
    variables: {
      articleId,
    },
  })

  let sections: Section[] = []

  if (articleData) {
    const menuItemsTree = formatMenu(articleData)
    sections = [{ id: 1, label: 'CONTENT', items: menuItemsTree }]
  }

  let blocks: BlockData[] = []

  if (blockData) {
    blocks = formatBlocks(blockData)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {articleData && <Sidebar sections={sections} />}

      <div style={{ flex: 1, height: '100vh', overflow: 'scroll' }}>
        {blockData && <Editor id={articleId} blocks={blocks} />}
      </div>
    </div>
  )
}

// export async function getStaticProps() {
//   // TODO: Get site-wide data here
//   return {
//     props: {
//       initialReduxState: {},
//       initialApolloState: {},
//     },
//   }
// }

export async function getServerSideProps() {
  // TODO: Get blocking client data here
  const reduxStore = initializeStore()
  const client = createHTTPClient()

  // const client = createHTTPClient()
  // const { data: projectData } = await client.query({ query: GET_PROJECT_DATA })
  const { data: articleData } = await client.query({
    query: GET_ARTICLES,
    variables: { projectId: 1 },
  })
  const menuItemsTree = formatMenu(articleData)

  // const { data: blockData } = await client.query({
  //   query: GET_BLOCKS,
  //   variables: { articleId: 1 },
  // })

  const sections = [{ id: 1, label: 'CONTENT', items: menuItemsTree }]

  // GET static apollo options

  return {
    props: {
      initialApolloState: {},
      initialReduxState: reduxStore.getState(),
      blocks: [],
      sections: [],
    },
  }
}
