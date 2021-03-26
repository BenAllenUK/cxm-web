import Editor from 'components/editor'
import { Block } from 'components/editor/blocks/types'
import { useEditor } from 'components/editor/components/Provider'
import Navbar from 'components/navigation/navbar'
import Sidebar from 'components/navigation/sidebar'
import debounce from 'lodash/debounce'
import Routes, { Subdomain } from 'navigation/routes'
import { navigate } from 'navigation/utils'
import { Article } from 'operations/articles/types'
import { fromArticleFragments, toArticleFragments } from 'utils/article/parse'
import { fromBlockFragments, toBlockFragments } from 'utils/blocks/parse'
import useTitle from 'utils/hooks/useTitle'
import { fromProjectFragments } from 'utils/project/parse'
import styles from './Editor.module.scss'
import { memo } from 'react'
import { ArticleBlocksFragment, OrganisationProjectFragment } from 'types/types'
import { UpsertArticlesMutationScopedFunc } from 'operations/articles/upsert'
import { UpsertBlocksMutationScopedFunc } from 'operations/blocks/upsert'
import { DeleteBlocksMutationScopedFunc } from 'operations/blocks/delete'
import { ProjectFragment } from 'generated/graphql'
import { useErrorModal } from 'components/common/modals/error'
import TitleBar from 'components/common/title-bar'
import isElectron from 'is-electron'
import readPathRoute from 'utils/article/readPathRoute'
import makeBreadCrumbs from 'utils/article/makeBreadcrumb'
import { fromOrganisationFragments } from 'utils/organisation/parse'
import { useRouter } from 'next/router'
import { useNavigation } from 'components/navigation/provider'

const EditorPage = ({
  article: articleRaw,
  organisation: organisationRaw,
  loading,

  onUpsertArticlesMutation,
  onUpsertBlocksMutation,
  onDeleteBlockMutation,
}: IProps) => {
  const { setArticlePath, setProject, setOrganisation } = useEditor()
  const { showErrorMsg } = useErrorModal()

  const [organisation] = fromOrganisationFragments([organisationRaw])
  const projectRaw = organisation.projects || []

  const [project] = fromProjectFragments(projectRaw)
  const articles = project.articles || []

  const [article] = articleRaw ? fromArticleFragments([articleRaw]) : [null]
  const blocks = article?.blocks || []

  useTitle(article?.title, loading)
  const { navigate, push, navigateOrganisation } = useNavigation()

  const onViewArticle = (path: string) => {
    setArticlePath(path)
    push(path, Routes.admin.editor, { projectSlug: project.slug, path })
  }

  const onViewProject = (orgSlug: string, projSlug: string) => {
    if (orgSlug !== organisation.slug) {
      setOrganisation(orgSlug, projSlug, null)
      navigateOrganisation(orgSlug, Subdomain.Admin, Routes.admin.editor, { projectSlug: projSlug, path })
      return
    }

    setProject(projSlug, null)
    push('', Routes.admin.editor, { projectSlug: projSlug, path })
  }

  const onUpsertArticles = async (updatedArticles: Article[]) => {
    const newArticles = toArticleFragments(project?.id, updatedArticles)
    const newArticlesResponse = await onUpsertArticlesMutation(newArticles)

    if (!newArticlesResponse) {
      showErrorMsg(`Error updating article`)
      return []
    }

    return fromArticleFragments(newArticlesResponse)
  }

  const onBlocksDelete = async (ids: number[]) => {
    return onDeleteBlockMutation(ids)
  }

  const onBlocksUpsert = async (blocks: Block[]) => {
    if (!article?.id) {
      return
    }

    const blockFragments = toBlockFragments(article.id, blocks)
    const blockFragmentsResponse = await onUpsertBlocksMutation(blockFragments)
    if (!blockFragmentsResponse) {
      showErrorMsg(`Error updating blocks`)
      return []
    }

    return fromBlockFragments(blockFragmentsResponse)
  }

  const onDebouncedBlockUpsert = debounce(onBlocksUpsert, 500)
  const path = article?.id ? readPathRoute(articles, article.id) : []
  const breadcrumbs = article?.id ? makeBreadCrumbs(articles, article.id) : []

  return (
    <div className={styles.root}>
      {isElectron() && <TitleBar title={article?.title} />}
      <div className={styles.container}>
        <Navbar />

        <Sidebar
          path={path}
          currentViewingArticleId={article?.id}
          project={project}
          articles={articles}
          onUpsertArticles={onUpsertArticles}
          onViewArticle={onViewArticle}
          onViewProject={onViewProject}
        />

        <div className={styles.editor}>
          <Editor
            breadcrumbs={breadcrumbs}
            key={article?.id}
            id={article?.id}
            loading={loading}
            articles={articles}
            blocks={blocks}
            onBlocksDelete={onBlocksDelete}
            onBlocksUpsert={onDebouncedBlockUpsert}
            onViewArticle={onViewArticle}
          />
        </div>
      </div>
    </div>
  )
}

export default memo(EditorPage)

interface IProps {
  loading?: boolean
  article?: ArticleBlocksFragment | null
  organisation: OrganisationProjectFragment
  onUpsertArticlesMutation: UpsertArticlesMutationScopedFunc
  onUpsertBlocksMutation: UpsertBlocksMutationScopedFunc
  onDeleteBlockMutation: DeleteBlocksMutationScopedFunc
}
