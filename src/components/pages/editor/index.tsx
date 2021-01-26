import Sidebar, { Section } from 'components/navigation/sidebar'
import Editor from 'components/editor'
import { parseMenu } from 'utils/menu'
import { parseBlocks } from 'utils/blocks'
import { useEffect } from 'react'
import styles from './Editor.module.scss'
import throttle from 'lodash/throttle'

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

export default function EditorPage({
  article,
  project,
  onCreateArticleMutation,
  onUpsertBlockMutation,
}: IProps) {
  const { setArticleSlug, setProjectSlug } = useEditor()

  const sections = [{ id: 1, label: 'CONTENT', items: parseMenu(project.articles) }]

  const router = useRouter()
  const initialBlocks = parseBlocks(article.blocks)

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

  const onCreateArticle = async (parentId: number | null) => {
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
  }

  const onBlocksUpdate = async (blocks: Block[]) => {
    console.log('update')

    const o = blocks.map(({ payload, id: oldId, ...data }, index) => {
      let newId
      console.log(oldId)
      console.log(oldId < 0)
      if (oldId < 0) {
      } else {
        console.log('new ID = old Id')
        newId = oldId
      }

      return {
        ...data,
        id: newId,
        articleId: article.id,
        position: index,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        payload: JSON.stringify(payload),
      }
    })
    console.log({ o })
    const params = createUpsertMutationParams(article.id, {
      objects: o,
    })
    console.log(o)
    // const { data } = await onUpsertBlockMutation(params)
    // console.log(data)
  }

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
          <Editor
            id={article.id}
            blocks={initialBlocks}
            onBlocksUpdate={throttle(onBlocksUpdate, 5000)}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  )
}

interface IProps {
  article: NonNullable<GetArticleOneQuery['articles'][0]>
  project: NonNullable<NonNullable<GetProjectOneQuery['projects']>[0]>
  onCreateArticleMutation: ReturnType<typeof useCreateArticleMutation>[0]
  onUpsertBlockMutation: ReturnType<typeof useUpsertBlocksMutation>[0]
}
