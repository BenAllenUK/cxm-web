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
  useGetOrganisationOneQuery,
  useGetUserOneQuery,
} from 'generated/graphql'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import useUpsertArticlesMutationScoped from 'operations/articles/upsert'
import useDeleteBlocksMutationScoped from 'operations/blocks/delete'
import useUpsertBlocksMutationScoped from 'operations/blocks/upsert'
import GET_ARTICLE_ONE from 'queries/articles/GET_ARTICLE_ONE.gql'
import GET_ORGANISATION_ONE from 'queries/organisations/GET_ORGANISATION_ONE.gql'
import GET_USER_ONE from 'queries/users/GET_USER_ONE.gql'
import AssetsProvider from 'components/providers/assets'
import getUserSession from 'utils/user/getUserSession'
import redirect from 'utils/server/redirect'

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
  const { userId } = useUser()
  const { projectSlug, articlePath, organisationSlug } = useEditor()

  // FETCH USER

  const foo = useGetUserOneQuery({
    variables: {
      id: userId ?? -1,
    },
  })

  const user = foo.data?.users_by_pk
  if (!user) {
    console.error(`User not found: ${userId}`)
  }

  // FETCH ORGANISATION

  const { data: organisationsData, ...other } = useGetOrganisationOneQuery({
    variables: {
      slug: organisationSlug ?? '',
      projectSlug: projectSlug ?? '',
    },
  })

  const [organisation] = organisationsData?.organisations || []

  // FETCH PROJECT

  const [project] = organisation?.projects || []

  // FETCH ARTICLE
  const defaultPath = project?.articles.length > 0 ? project?.articles[0].path : ''
  const selectedArticlePath = articlePath ?? defaultPath
  let { data: articleData, loading: articleQueryLoading } = useGetArticleOneQuery({
    variables: {
      path: selectedArticlePath,
    },
  })

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

  const [upsertArticlesMutation, { loading: articleUpsertLoading }] = useUpsertArticlesMutation()
  const upsertArticlesMutationScoped = useUpsertArticlesMutationScoped(project?.id, upsertArticlesMutation)

  const [upsertBlockMutation] = useUpsertBlocksMutation()
  const upsertBlocksMutationScoped = useUpsertBlocksMutationScoped(article?.id, upsertBlockMutation)

  const [deleteBlocksMutation] = useDeleteBlocksMutation()
  const deleteBlocksMutationScoped = useDeleteBlocksMutationScoped(article?.id, deleteBlocksMutation)

  if (!organisation) {
    return <div />
  }

  return (
    <EditorPage
      organisation={organisation}
      loading={articleQueryLoading || articleUpsertLoading}
      article={article}
      onUpsertArticlesMutation={upsertArticlesMutationScoped}
      onUpsertBlocksMutation={upsertBlocksMutationScoped}
      onDeleteBlockMutation={deleteBlocksMutationScoped}
    />
  )
}

export async function getServerSideProps({ params, locale, req, res }: GetServerSidePropsContext) {
  const session = getUserSession(req, res)
  if (!session) {
    return redirect()
  }
  const {
    userId,
    idToken,
    user: { email },
  } = session

  const client = initializeApollo({}, idToken)

  const organisationSlug = process.env.ORGANISATION

  const projectSlug = params?.projectSlug
  const articlePathRaw = params?.articlePath || []

  if (!organisationSlug || !projectSlug || !userId) {
    return redirect()
  }

  // FETCH USER

  const { data: usersData } = await client.query({
    query: GET_USER_ONE,
    variables: { id: userId },
  })

  const user = usersData?.users_by_pk
  if (!user) {
    console.error(`User not found: ${userId}`)
    return redirect()
  }

  // FETCH ORGANISATION

  const { data: organisationsData } = await client.query({
    query: GET_ORGANISATION_ONE,
    variables: { slug: organisationSlug, projectSlug },
  })

  const [organisation] = organisationsData?.organisations || []
  if (!organisation) {
    console.error(`Organisation not found: ${organisationSlug}`)
    return redirect()
  }

  // FETCH PROJECT
  console.log(organisation)

  const [project] = organisation.projects || []
  if (!project) {
    console.error(`Project not found: ${projectSlug}`)
    return redirect()
  }

  // FETCH ARTICLES

  const articlePath = Array.isArray(articlePathRaw) ? articlePathRaw.join('/') : articlePathRaw
  const selectedArticlePath = articlePath || project.articles[0].path

  const { data: articleData } = await client.query({
    query: GET_ARTICLE_ONE,
    variables: { path: selectedArticlePath },
  })

  return {
    props: {
      initialApolloState: client.cache.extract(),
      initialUserContext: {
        userId,
        idToken,
        email,
        user,
      },
      initialEditorContext: {
        projectSlug,
        articlePath: selectedArticlePath,
        organisationSlug,
      },
      ...(await serverSideTranslations(locale, ['common', 'editor'])),
    },
  }
}
