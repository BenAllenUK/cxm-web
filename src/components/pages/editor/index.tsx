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

const EditorPage = ({
  article: articleRaw,
  project: projectRaw,

  onUpsertArticlesMutation,
  onUpsertBlocksMutation,
  onDeleteBlockMutation,
}: IProps) => {
  const { setArticleSlug, setProjectSlug } = useEditor()
  const { showErrorMsg } = useErrorModal()

  const [project] = fromProjectFragments([projectRaw])
  const articles = project.articles || []
  const [article] = articleRaw ? fromArticleFragments([articleRaw]) : [null]
  const blocks = article?.blocks || []

  useTitle(article?.title)

  const onViewArticle = (slug: string) => {
    setArticleSlug(slug)
    const path = Routes.admin.editor.path(project.slug, slug)
    navigate(path)
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

  return (
    <div className={styles.container}>
      <Navbar />

      <Sidebar
        currentViewingArticleId={article?.id}
        project={project}
        articles={articles}
        onUpsertArticles={onUpsertArticles}
        onViewArticle={onViewArticle}
      />

      <div className={styles.editor}>
        <Editor
          key={article?.id}
          id={article?.id}
          articles={articles}
          blocks={blocks}
          onBlocksDelete={onBlocksDelete}
          onBlocksUpsert={onDebouncedBlockUpsert}
        />
      </div>
    </div>
  )
}

export default memo(EditorPage)

interface IProps {
  article?: ArticleBlocksFragment | null
  project: ProjectFragment
  onUpsertArticlesMutation: UpsertArticlesMutationScopedFunc
  onUpsertBlocksMutation: UpsertBlocksMutationScopedFunc
  onDeleteBlockMutation: DeleteBlocksMutationScopedFunc
}
