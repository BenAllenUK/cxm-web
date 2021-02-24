import { memo } from 'react'

import Sidebar, { Section } from 'components/navigation/sidebar'
import Editor from 'components/editor'
import { fromBlockFragments, toBlockFragments } from 'utils/blocks/parseBlocks'
import { useEffect, useCallback } from 'react'
import styles from './Editor.module.scss'

import { BlockFragment, ProjectFragment } from 'generated/graphql'

import { UpsertArticlesMutationScopedFunc } from 'operations/articles/upsert'

import { useRouter } from 'next/router'
import { useEditor } from 'components/editor/components/Provider'
import { Block } from 'components/editor/blocks/types'
import debounce from 'lodash/debounce'
import Navbar from 'components/navigation/navbar'
import { useTranslation } from 'config/translation'
import { ArticleBlocksFragment } from 'types/types'
import { DeleteBlocksMutationScopedFunc } from 'operations/blocks/delete'
import { UpsertBlocksMutationScopedFunc } from 'operations/blocks/upsert'

const EditorPage = ({
  article,
  project,

  onUpsertArticlesMutation,
  onUpsertBlocksMutation,
  onDeleteBlockMutation,
}: IProps) => {
  const { setArticleSlug, setProjectSlug } = useEditor()

  const router = useRouter()

  const { t } = useTranslation(['editor'])

  useEffect(() => {
    document.title = article?.title ? t('title', { title: article.title }) : t('loading')
  })

  const onViewArticle = (id: number) => {
    const [article] = project.articles.filter((item) => item.id === id)
    if (!article) {
      console.error("Clicked on an article that didn't exist")
      return
    }
    setArticleSlug(article.slug)
    window.history.pushState({}, '', `/admin/${project.slug}/editor/${article.slug}`)
  }

  const onUpsertArticle = async (updatedArticles: ArticleBlocksFragment[]) => {
    const articleId = article?.id
    const [newCurrentArticle] = updatedArticles.filter((item) => item.id == articleId)
    if (newCurrentArticle) {
      if (article && article.archived === false && newCurrentArticle.archived === true) {
        // TODO: Order by position
        const [nextViewingArticle] = project.articles.filter((item) => item.id !== articleId)
        if (nextViewingArticle) {
          setArticleSlug(nextViewingArticle.slug)
          window.history.replaceState({}, '', `/admin/${project.slug}/editor/${nextViewingArticle.slug}`)
        } else {
          console.error('Cannot delete only page')
          return
        }
      }
    }

    return onUpsertArticlesMutation(updatedArticles)
  }

  const onBlocksDelete = async (ids: number[]) => {
    return onDeleteBlockMutation(ids)
  }

  const onBlocksUpsert = async (blocks: Block[]) => {
    if (!article?.id) {
      return
    }

    const blockFragments = toBlockFragments(article.id, blocks)
    return onUpsertBlocksMutation(blockFragments)
  }

  const onDebouncedBlockUpsert = debounce(onBlocksUpsert, 500)

  const blocks = fromBlockFragments(article?.blocks || [])

  return (
    <div className={styles.container}>
      <Navbar />

      <Sidebar project={project} articles={project.articles} onUpsertArticle={onUpsertArticle} onViewArticle={onViewArticle} />

      <div className={styles.editor}>
        <Editor
          key={article?.id}
          id={article?.id}
          articles={project.articles}
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
