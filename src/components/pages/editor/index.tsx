import { memo } from 'react'

import Sidebar, { Section } from 'components/navigation/sidebar'
import Editor from 'components/editor'
import { parseMenu } from 'utils/menu'
import { parseBlocks } from 'utils/blocks'
import { useEffect, useCallback } from 'react'
import styles from './Editor.module.scss'

import {
  GetArticleOneQuery,
  GetArticlesQuery,
  GetArticlesQueryResult,
  GetProjectOneQuery,
  Projects,
  useCreateArticleMutation,
  useUpsertBlocksMutation,
  useDeleteBlockMutation,
  ProjectFragment,
  ArticleFragment,
  BlockFragment,
  useUpsertArticlesMutation,
  ArticlesInsertInput,
} from 'generated/graphql'

import { createArticleMutationParams } from 'queries/articles'
import { createUpsertMutationParams, deleteMutationParams } from 'queries/blocks'

import { useRouter } from 'next/router'
import { DEFAULT_ARTICLE } from 'components/editor/blocks'
import { useEditor } from 'components/editor/Provider'
import { Block } from 'components/editor/blocks/types'
import debounce from 'lodash/debounce'
import Navbar from 'components/navigation/navbar'
import { useTranslation } from 'config/translation'

const EditorPage = ({
  article,
  project,
  onCreateArticleMutation,
  onUpsertArticlesMutation,
  onUpsertBlockMutation,
  onDeleteBlockMutation,
}: IProps) => {
  const { setArticleSlug, setProjectSlug } = useEditor()

  const router = useRouter()
  const initialBlocks = article ? parseBlocks(article.blocks) : []

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

  const onCreateArticle = useCallback(
    async (parentId: number | null) => {
      const slug = 'new-' + encodeURI(new Date().toISOString())
      const { blocks, ...articleParams } = DEFAULT_ARTICLE
      const projectId = project.id
      const params = createArticleMutationParams(projectId, {
        objects: {
          ...articleParams,
          parentId,
          projectId: project.id,
          slug,
          blocks: {
            data: blocks.map((item) => ({
              ...item,
              id: undefined,
              payload: JSON.stringify(item.payload),
            })),
          },
        },
      })

      const { data } = await onUpsertArticlesMutation(params)

      const articleSlug = data?.insert_articles?.returning[0].slug
      if (!articleSlug) {
        console.error('Article failed to create')
        return
      }

      setArticleSlug(articleSlug)
      window.history.replaceState({}, '', `/admin/${project.slug}/editor/${articleSlug}`)
    },
    [project.id]
  )

  const onUpdateArticle = async (updatedArticles: ArticlesInsertInput[]) => {
    const articleId = article?.id
    const [newCurrentArticle] = updatedArticles.filter((item) => item.id == articleId)
    if (newCurrentArticle) {
      if (article.archived === false && newCurrentArticle.archived === true) {
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

    const { data } = await onUpsertArticlesMutation({
      variables: {
        objects: updatedArticles,
      },
    })
    console.log(data)
  }

  const onBlockDelete = async (id: number) => {
    const params = deleteMutationParams(article.id, id)
    const res = await onDeleteBlockMutation(params)
  }

  // TODO: Updates should be cached locally between pages and only debounce remote requests
  // This requires an architectural change...
  const onBlocksUpsert = useCallback(
    async (blocks: Block[]) => {
      const articleId = article.id
      const revisedBlocks = blocks.map(({ payload, id: oldId, ...data }) => {
        let newId
        if (oldId < 0) {
        } else {
          newId = oldId
        }

        return {
          ...data,
          id: newId,
          articleId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          payload: JSON.stringify(payload),
        }
      })
      const params = createUpsertMutationParams(articleId, { articleId, objects: revisedBlocks })
      const { data } = await onUpsertBlockMutation(params)
      console.log(
        'Sync complete',
        data?.insert_blocks?.returning.map((item) => item.id)
      )
      return data?.insert_blocks?.returning.map((item) => item.id)
    },
    [article?.id]
  )

  // TODO: Does this need memoizing to avoid article updates conflicting?
  const onDebouncedBlockUpsert = debounce(onBlocksUpsert, 500)

  const _onPageControlsClick = (id: number) => {
    console.log({ id })
  }

  return (
    <div className={styles.container}>
      <Navbar />

      <Sidebar
        project={project}
        articles={project.articles}
        onCreateArticle={onCreateArticle}
        onUpdateArticles={onUpdateArticle}
        onViewArticle={onViewArticle}
      />

      <div className={styles.editor}>
        <Editor
          key={article?.id}
          id={article?.id}
          articles={project.articles}
          blocks={initialBlocks}
          onBlockDelete={onBlockDelete}
          onBlocksUpsert={onDebouncedBlockUpsert}
        />
      </div>
    </div>
  )
}

export default memo(EditorPage)

interface IProps {
  article: ArticleFragment & { blocks: BlockFragment[] }
  project: ProjectFragment
  onCreateArticleMutation: ReturnType<typeof useCreateArticleMutation>[0]
  onUpsertArticlesMutation: ReturnType<typeof useUpsertArticlesMutation>[0]
  onUpsertBlockMutation: ReturnType<typeof useUpsertBlocksMutation>[0]
  onDeleteBlockMutation: ReturnType<typeof useDeleteBlockMutation>[0]
}
