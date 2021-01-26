import { initialState } from 'reducers'

import { initializeStore } from 'store'

import GET_PROJECT_ONE from 'queries/project/GET_PROJECT_ONE.gql'
import GET_ARTICLE_ONE from 'queries/articles/GET_ARTICLE_ONE.gql'
import { initializeApollo } from 'config/graphql'
import {
  useCreateArticleMutation,
  useGetArticleOneQuery,
  // useGetArticlesSubscriptionSubscription as useGetArticlesSubscription,
  useGetArticlesQuery,
  useGetProjectOneQuery,
  useUpsertBlocksMutation,
} from 'generated/graphql'
import Root, { UserContext, useUser } from 'components/root'
import EditorProvider, { useEditor } from 'components/editor/Provider'
import EditorPage from 'components/pages/editor'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

export default function EditorRoot(props: any) {
  const { articleSlug, projectSlug, initialEditorContext, ...otherProps } = props
  return (
    <Root {...otherProps}>
      <EditorProvider initialContext={initialEditorContext}>
        <Content />
      </EditorProvider>
    </Root>
  )
}

export function Content() {
  const { userId, organisationId, projects } = useUser()

  const { projectSlug, articleSlug } = useEditor()
  console.log({ articleSlug })

  if (projectSlug === null || articleSlug === null) {
    return <div />
  }

  const { data: projectsData } = useGetProjectOneQuery({
    variables: {
      slug: projectSlug,
    },
  })

  const [project] = projectsData?.projects || []
  if (!project) {
    console.error(`Project not found: ${projectSlug}`)
    return <div />
  }

  // Check to see if article Id is in article data
  // aritcle id might not be part of this project
  const { data: articleData } = useGetArticleOneQuery({
    variables: {
      slug: articleSlug,
    },
  })

  const [article] = articleData?.articles || []
  if (!article) {
    console.error(`Article not found: ${articleSlug}`)
  }

  const [createArticleMutation] = useCreateArticleMutation()

  const [upsertBlockMutation] = useUpsertBlocksMutation()

  return (
    <EditorPage
      project={project}
      article={article}
      onCreateArticleMutation={createArticleMutation}
      onUpsertBlockMutation={upsertBlockMutation}
    />
  )
}

/**
 * Block client data only
 */
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const client = initializeApollo()

  const projectSlug = context.params?.projectSlug
  const articleSlug = context.params?.articleSlug

  const { data: projectsData } = await client.query({
    query: GET_PROJECT_ONE,
    variables: { slug: projectSlug },
  })

  const [project] = projectsData?.projects || []

  if (!project) {
    console.error(`Project not found: ${projectSlug}`)
    return {
      notFound: true,
    }
    return
  }

  const { data: articleData } = await client.query({
    query: GET_ARTICLE_ONE,
    variables: { slug: articleSlug },
  })

  const [article] = articleData?.articles || []

  if (!article) {
    console.error(`Article not found: ${articleSlug}`)
    return {
      notFound: true,
    }
  }

  // const reduxStore = initializeStore(initialState)

  return {
    props: {
      initialApolloState: client.cache.extract(),
      initialReduxState: {}, //reduxStore.getState(),
      initialUserContext: {
        userId: 1,
        organisationId: 1,
        projects: [],
      },
      initialEditorContext: {
        projectSlug: project.slug,
        articleSlug: article.slug,
      },
    },
  }
}
