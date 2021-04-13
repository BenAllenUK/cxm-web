import ErrorModal from 'components/common/modals/error'
import AdminProvider, { useAdmin } from 'components/editor/providers/AdminProvider'
import EditorPage from 'components/pages/editor'
import Root from 'components/root'
import { useUser } from 'components/root/UserProvider'
import { initializeApollo } from 'config/graphql'
import {
  useDeleteBlocksMutation,
  useGetArticleOneQuery,
  useUpsertArticlesMutation,
  useUpsertBlocksMutation,
  useGetOrganisationOneQuery,
} from 'generated/graphql'
import { GetServerSidePropsContext } from 'next'
import useUpsertArticlesMutationScoped from 'operations/articles/upsert'
import useDeleteBlocksMutationScoped from 'operations/blocks/delete'
import useUpsertBlocksMutationScoped from 'operations/blocks/upsert'
import AssetsProvider from 'components/providers/assets'
import getUserSession from 'utils/user/getUserSession'
import redirect from 'utils/server/redirect'
import serverSideTranslations from 'utils/translations/serverSideTranslations'
import NavigationProvider from 'components/navigation/provider'
import EditorPageSkelton from 'components/pages/editor/EditorPageSkelton'
import UserProvider from 'components/root/UserProvider'

export default function EditorRoot(props: any) {
  const { initialAdminContext, initialUserData, initialApolloState } = props

  return (
    <Root initialUserData={initialUserData} initialApolloState={initialApolloState}>
      <UserProvider initialUserData={initialUserData}>
        <AssetsProvider>
          <ErrorModal.Provider>
            <AdminProvider initialContext={initialAdminContext}>
              <NavigationProvider>
                <Content />
                <ErrorModal.Component />
              </NavigationProvider>
            </AdminProvider>
          </ErrorModal.Provider>
        </AssetsProvider>
      </UserProvider>
    </Root>
  )
}

export function Content() {
  const { user } = useUser()
  const { projectSlug, articlePath, organisationSlug } = useAdmin()

  // FETCH ORGANISATION

  const { data: organisationsData } = useGetOrganisationOneQuery({
    variables: {
      slug: organisationSlug ?? '',
      projectSlug: projectSlug ?? '',
    },
  })

  const [organisation] = organisationsData?.organisations || []
  const [project] = organisation?.projects || []

  // FETCH ARTICLE
  const defaultPath = project?.articles.length > 0 ? project?.articles[0].path : ''
  const selectedArticlePath = articlePath ?? defaultPath

  const { data: articleData, loading: articleQueryLoading } = useGetArticleOneQuery({
    variables: {
      projectSlug: project?.slug || '',
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

  if (!organisation || !user) {
    return <EditorPageSkelton />
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
    console.log(`Redirect. session`, session)
    return redirect()
  }
  const {
    userId,
    idToken,
    user: { email },
  } = session

  const client = initializeApollo({}, idToken)

  const organisationSlug = process.env.ORGANISATION || 'gimme'

  const projectSlug = params?.projectSlug
  const articlePathRaw = params?.articlePath || []

  if (!organisationSlug || !projectSlug || !userId) {
    console.log(`Redirect. organisationSlug: ${organisationSlug} projectSlug: ${projectSlug} userId: ${userId}`)
    return redirect()
  }

  const articlePath = Array.isArray(articlePathRaw) ? articlePathRaw.join('/') : articlePathRaw

  return {
    props: {
      initialApolloState: client.cache.extract(),
      initialUserData: {
        userId,
        idToken,
        email,
        user: null,
      },
      initialAdminContext: {
        projectSlug,
        articlePath: articlePath,
        organisationSlug,
      },
      ...(await serverSideTranslations(locale, ['common', 'editor'])),
    },
  }
}
