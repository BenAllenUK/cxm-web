import ErrorModal from 'components/common/modals/error'
import EditorProvider, { useEditor } from 'components/editor/components/Provider'
import EditorPage from 'components/pages/editor'
import Root, { useUser } from 'components/root'
import { initializeApollo } from 'config/graphql'
import {
  useDeleteBlocksMutation,
  useGetArticleOneQuery,
  useGetProjectOneQuery,
  useUpsertArticlesMutation,
  useUpsertBlocksMutation,
} from 'generated/graphql'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import useUpsertArticlesMutationScoped from 'operations/articles/upsert'
import useDeleteBlocksMutationScoped from 'operations/blocks/delete'
import useUpsertBlocksMutationScoped from 'operations/blocks/upsert'
import GET_ARTICLE_ONE from 'queries/articles/GET_ARTICLE_ONE.gql'
import GET_PROJECT_ONE from 'queries/project/GET_PROJECT_ONE.gql'
import AssetsProvider from 'components/providers/assets'

export default function EditorRoot(props: any) {
  const { articleSlug, projectSlug, initialEditorContext, ...otherProps } = props
  return (
    <Root {...otherProps}>
      <AssetsProvider>
        <ErrorModal.Provider>
          <EditorProvider initialContext={initialEditorContext}>
            <Content />
            <ErrorModal.Component />
          </EditorProvider>
        </ErrorModal.Provider>
      </AssetsProvider>
    </Root>
  )
}

export function Content() {
  const { userId, organisationId, projects } = useUser()

  const { projectSlug, articleSlug } = useEditor()

  const { data: projectsData } = useGetProjectOneQuery({
    variables: {
      slug: projectSlug || '', // TODO: avoid default to none
    },
  })

  const [project] = projectsData?.projects || []
  if (!project) {
    console.error(`Project not found: ${projectSlug}`)
  }

  // Check to see if article Id is in article data
  // article id might not be part of this project

  let articleData = null

  const response = useGetArticleOneQuery({
    variables: {
      slug: articleSlug || '',
    },
  })

  articleData = response?.data

  // Stops the local query cache from working
  // Move to subscription after fetch
  // if (typeof window !== 'undefined') {
  //   const { data } = useGetArticleOneSubscriptionSubscription({
  //     variables: {
  //       slug: articleSlug,
  //     },
  //   })
  //   articleData = data ?? articleData
  // }

  const [article] = articleData?.articles || []

  const [upsertArticlesMutation] = useUpsertArticlesMutation()
  const upsertArticlesMutationScoped = useUpsertArticlesMutationScoped(project?.id, upsertArticlesMutation)

  const [upsertBlockMutation] = useUpsertBlocksMutation()
  const upsertBlocksMutationScoped = useUpsertBlocksMutationScoped(article?.id, upsertBlockMutation)

  const [deleteBlocksMutation] = useDeleteBlocksMutation()
  const deleteBlocksMutationScoped = useDeleteBlocksMutationScoped(article?.id, deleteBlocksMutation)

  if (!project) {
    return <div />
  }

  return (
    <EditorPage
      project={project}
      article={article}
      onUpsertArticlesMutation={upsertArticlesMutationScoped}
      onUpsertBlocksMutation={upsertBlocksMutationScoped}
      onDeleteBlockMutation={deleteBlocksMutationScoped}
    />
  )
}

/**
 * Block client data only
 */
export async function getServerSideProps({ params, locale }: GetServerSidePropsContext) {
  const client = initializeApollo()

  const projectSlug = params?.projectSlug
  const articleSlug = params?.articleSlug

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

  return {
    props: {
      initialApolloState: client.cache.extract(),
      initialUserContext: {
        userId: 1,
        organisationId: 1,
        projects: [],
      },
      initialEditorContext: {
        projectSlug: project.slug,
        articleSlug: article.slug,
      },
      // ...(await serverSideTranslations(locale, ['common', 'editor'])),
    },
  }
}
