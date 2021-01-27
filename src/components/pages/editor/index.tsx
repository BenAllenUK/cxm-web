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
} from 'generated/graphql'

import { createArticleMutationParams } from 'queries/articles'
import { createUpsertMutationParams } from 'queries/blocks'

import { useRouter } from 'next/router'
import { DEFAULT_ARTICLE } from 'components/editor/blocks'
import { useEditor } from 'components/editor/Provider'
import { Block } from 'components/types'

const EditorPage = ({
  article,
  project,
  onCreateArticleMutation,
  onUpsertBlockMutation,
}: IProps) => {
  const { setArticleSlug, setProjectSlug } = useEditor()

  const sections = [{ id: 1, label: 'CONTENT', items: parseMenu(project.articles) }]

  const router = useRouter()
  const initialBlocks = article ? parseBlocks(article.blocks) : []

  useEffect(() => {
    document.title = `Omnia | ${article?.title ?? 'Loading...'}`
  })

  const onViewArticle = (id: number) => {
    const [article] = project.articles.filter((item) => item.id === id)
    if (!article) {
      console.error("Clicked on an article that didn't exist")
      return
    }
    setArticleSlug(article.slug)
    window.history.replaceState({}, '', `/admin/${project.slug}/editor/${article.slug}`)
  }

  const onCreateArticle = useCallback(
    async (parentId: number | null) => {
      const { blocks, ...articleParams } = DEFAULT_ARTICLE
      const projectId = project.id
      const params = createArticleMutationParams(projectId, {
        object: {
          ...articleParams,
          parentId,
          projectId: project.id,
          slug: 'new-' + encodeURI(new Date().toISOString()),
          blocks: { data: blocks },
        },
      })
      const { data } = await onCreateArticleMutation(params)

      const articleSlug = data?.insert_articles_one?.slug
      if (!articleSlug) {
        console.error('Article failed to create')
        return
      }

      setArticleSlug(articleSlug)
      window.history.replaceState({}, '', `/admin/${project.slug}/editor/${articleSlug}`)
    },
    [project.id]
  )

  const onBlocksUpsert = useCallback(
    async (blocks: Block[]) => {
      console.log('update')

      const o = blocks.map(({ payload, id: oldId, ...data }) => {
        let newId
        // console.log(oldId)
        if (oldId < 0) {
        } else {
          newId = oldId
        }

        return {
          ...data,
          id: newId,
          articleId: article.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          payload: JSON.stringify(payload),
        }
      })
      const params = createUpsertMutationParams(article.id, {
        objects: o,
      })

      const { data } = await onUpsertBlockMutation(params)
    },
    [article.id]
  )

  console.log('Re render editor page')
  return (
    <div className={styles.container}>
      <Sidebar
        project={project}
        sections={sections}
        onCreateArticle={onCreateArticle}
        onViewArticle={onViewArticle}
      />

      <div className={styles.editor}>
        {article ? (
          <Editor id={article.id} blocks={initialBlocks} onBlocksUpsert={onBlocksUpsert} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  )
}

export default memo(EditorPage)

interface IProps {
  article: NonNullable<GetArticleOneQuery['articles'][0]>
  project: NonNullable<NonNullable<GetProjectOneQuery['projects']>[0]>
  onCreateArticleMutation: ReturnType<typeof useCreateArticleMutation>[0]
  onUpsertBlockMutation: ReturnType<typeof useUpsertBlocksMutation>[0]
}
