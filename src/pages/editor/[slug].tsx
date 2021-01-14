import { initialState } from 'reducers'

import { initializeStore } from 'store'

import GET_PROJECTS from 'queries/project/GET_PROJECTS.gql'
import { initializeApollo } from 'config/graphql'
import { Blocks, useGetArticlesQuery, useGetBlocksQuery } from 'generated/graphql'
import Root, { UserContext, useUser } from 'components/root'
import EditorProvider, { useEditor } from 'components/editor/Provider'
import EditorPage from 'components/pages/editor'
import { gql, useQuery } from '@apollo/client'

export default function EditorRoot(props: any) {
  return (
    <Root {...props}>
      <EditorProvider>
        <Content />
      </EditorProvider>
    </Root>
  )
}

export function Middle() {
  return (
    <div>
      <Content />
    </div>
  )
}

export function Content() {
  const { userId, organisationId, projects } = useUser()

  console.log({ userId, organisationId, projects })

  const { projectIndex, articleId, setProjectIndex, setArticleId } = useEditor()

  console.log({ projectIndex, articleId })

  if (projectIndex === null || articleId === null) {
    return <div />
  }

  // const IS_LOGGED_IN = gql`
  //   query IsUserLoggedIn {
  //     articles {
  //       isLoggedIn @client
  //     }
  //   }
  // `

  // const { data } = useQuery(IS_LOGGED_IN)
  // console.log({ data })

  const project = projects[projectIndex]
  // const { data: articlesData } = useQuery(
  //   gql`
  //     query GetArticles($projectId: Int!) {
  //       articles(where: { project_id: { _eq: $projectId } }) {
  //         id
  //         parent_id
  //         slug
  //         title
  //         updated_at
  //         created_at
  //         # cartItems @client
  //       }
  //     }
  //   `,
  //   {
  //     variables: {
  //       projectId: project.id,
  //     },
  //   }
  // )
  const { data: articlesData } = useGetArticlesQuery({
    variables: {
      projectId: project.id,
    },
  })

  // Check to see if article Id is in article data
  // aritcle id might not be part of this project
  const { data: blocksData } = useGetBlocksQuery({
    variables: {
      articleId,
    },
  })

  return (
    <EditorPage
      project={project}
      articleId={articleId}
      articles={articlesData?.articles || []}
      blocks={blocksData?.blocks || []}
    />
  )
}

/**
 * Block client data only
 */
export async function getServerSideProps() {
  const client = initializeApollo()

  const { data: projectsData } = await client.query({ query: GET_PROJECTS })

  if (!projectsData) {
    console.error('Project data not found')
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
