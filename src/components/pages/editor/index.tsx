import Editor from 'components/editor'
import { Block } from 'components/editor/blocks/types'
import { useEditor } from 'components/editor/components/Provider'
import Navbar from 'components/navigation/navbar'
import Sidebar from 'components/navigation/sidebar'
import debounce from 'lodash/debounce'
import Routes from 'navigation/routes'
import { navigate } from 'navigation/utils'
import { Article } from 'operations/articles/types'
import { fromArticleFragments, toArticleFragments } from 'utils/article/parse'
import { fromBlockFragments, toBlockFragments } from 'utils/blocks/parse'
import useTitle from 'utils/hooks/useTitle'
import { fromProjectFragments } from 'utils/project/parse'
import styles from './Editor.module.scss'
import { memo } from 'react'
import { ArticleBlocksFragment } from 'types/types'
import { UpsertArticlesMutationScopedFunc } from 'operations/articles/upsert'
import { UpsertBlocksMutationScopedFunc } from 'operations/blocks/upsert'
import { DeleteBlocksMutationScopedFunc } from 'operations/blocks/delete'
import { ProjectFragment } from 'generated/graphql'
import { useErrorModal } from 'components/common/modals/error'
import TitleBar from 'components/common/title-bar'
import isElectron from 'is-electron'
import readPathRoute from 'utils/article/readPathRoute'

const EditorPage = ({
  article: articleRaw,
  project: projectRaw,
  loading,

  onUpsertArticlesMutation,
  onUpsertBlocksMutation,
  onDeleteBlockMutation,
}: IProps) => {
  const { setArticlePath, setProjectSlug } = useEditor()
  const { showErrorMsg } = useErrorModal()

  const [project] = fromProjectFragments([projectRaw])
  const articles = project.articles || []
  const [article] = articleRaw ? fromArticleFragments([articleRaw]) : [null]
  const blocks = article?.blocks || []

  useTitle(article?.title, loading)

  const onViewArticle = (path: string) => {
    setArticlePath(path)
    const fullPath = Routes.admin.editor.path(project.slug, path)
    navigate(fullPath)
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
        />

        <div className={styles.editor}>
          <Editor
            path={path}
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
  project: ProjectFragment
  onUpsertArticlesMutation: UpsertArticlesMutationScopedFunc
  onUpsertBlocksMutation: UpsertBlocksMutationScopedFunc
  onDeleteBlockMutation: DeleteBlocksMutationScopedFunc
}
