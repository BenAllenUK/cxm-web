import { initialState } from 'reducers'

import { initializeStore } from 'store'

import GET_PROJECTS from 'queries/project/GET_PROJECTS.gql'
import { initializeApollo } from 'config/graphql'
import {
  useCreateArticleMutation,
  // useGetArticlesSubscriptionSubscription as useGetArticlesSubscription,
  useGetArticlesQuery,
  useGetBlocksQuery,
} from 'generated/graphql'
import Root, { UserContext, useUser } from 'components/root'
import EditorProvider, { useEditor } from 'components/editor/Provider'
import EditorPage from 'components/pages/editor'

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

  const { projectIndex, articleId, setProjectIndex, setArticleId } = useEditor()

  if (projectIndex === null || articleId === null) {
    return <div />
  }

  const project = projects[projectIndex]

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

  const [createArticleMutation, { data, loading, error }] = useCreateArticleMutation()

  return (
    <EditorPage
      project={project}
      articleId={articleId}
      articles={articlesData?.projects_by_pk?.articles || []}
      blocks={blocksData?.blocks || []}
      onCreateArticleMutation={createArticleMutation}
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
