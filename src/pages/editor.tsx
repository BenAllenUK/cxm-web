import { BlockData, BlockType } from 'components/types'
import Editor from 'components/editor'
import { initialState, IRootState } from 'reducers'
import { Provider } from 'react-redux'
import { createContext, useContext } from 'react'

import { useStore, initializeStore } from '../store'
import Sidebar, { Section } from 'components/navigation/sidebar'
import GET_PROJECTS from 'queries/project/GET_PROJECTS.gql'
import GET_ARTICLES from 'queries/articles/GET_ARTICLES.gql'
import GET_BLOCKS from 'queries/blocks/GET_BLOCKS.gql'
import { createHTTPClient, initializeApollo } from 'config/graphql'
import { useGetArticlesQuery, useGetBlocksQuery, useGetProjectsQuery } from 'generated/graphql'
import { formatMenu } from 'utils/menu'

import { formatBlocks } from 'utils/blocks'
import Root, { UserContext } from 'components/root'
import { EditorContext } from 'components/editor/context'

export default function EditorPage(props: any) {
  return (
    <Root {...props}>
      <EditorContext.Provider value={props.initialEditorContext}>
        <Content />
      </EditorContext.Provider>
    </Root>
  )
}

function Content() {
  const { userId, organisationId, projects } = useContext(UserContext)
  // why are these null
  const { projectIndex, articleId, setProjectIndex, setArticleId } = useContext(EditorContext)

  console.log(projectIndex, articleId)
  if (!projectIndex || !articleId) {
    return <div />
  }

  const project = projects[projectIndex]

  const { data: articleData } = useGetArticlesQuery({
    variables: {
      projectId: project.id,
    },
  })

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
      {articleData && <Sidebar project={project} sections={sections} />}

      <div style={{ flex: 1, height: '100vh', overflow: 'scroll' }}>
        {blockData && <Editor id={articleId} blocks={blocks} />}
      </div>
    </div>
  )
}

/**
 * Block client data only
 */
export async function getServerSideProps() {
  const client = initializeApollo()

  const { data: projectsData } = await client.query({ query: GET_PROJECTS })

  if (!projectsData) {
    return
  }

  const reduxStore = initializeStore(initialState)

  return {
    props: {
      initialApolloState: {},
      initialReduxState: reduxStore.getState(),
      initialUserContext: {
        userId: 1,
        organisationId: 1,
        projects: projectsData.projects,
      },
      initialEditorContext: {
        projectIndex: null, // TODO: Init on client side from cookies
        articleId: null,
      },
    },
  }
}
