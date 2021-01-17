import Sidebar, { Section } from 'components/navigation/sidebar'
import Editor from 'components/editor'
import { parseMenu } from 'utils/menu'
import { parseBlocks } from 'utils/blocks'
import { useEffect } from 'react'
import styles from './Editor.module.scss'
import {
  GetArticleOneQuery,
  GetArticlesQuery,
  GetArticlesQueryResult,
  GetBlocksQuery,
  GetProjectOneQuery,
  Projects,
  useCreateArticleMutation,
  useUpsertBlocksMutation,
} from 'generated/graphql'

import { createArticleMutationParams } from 'queries/articles'
import { createUpsertMutationParams } from 'queries/blocks'

import { useRouter } from 'next/router'
import { DEFAULT_ARTICLE } from 'components/editor/blocks'

export default function EditorPage({
  article,
  project,
  onCreateArticleMutation,
  onUpsertBlockMutation,
}: IProps) {
  const sections = [{ id: 1, label: 'CONTENT', items: parseMenu(project.articles) }]

  const router = useRouter()

  let blocks = parseBlocks(article.blocks)

  useEffect(() => {
    document.title = `Omnia | ${article.title}`
  })

  const onViewArticle = (id: number) => {
    const [article] = project.articles.filter((item) => item.id === id)
    if (!article) {
      console.error("Clicked on an article that didn't exist")
      return
    }
    router.push(`/admin/${project.slug}/editor/${article.slug}`)
  }

  const onCreateArticle = async (parentId: number | null) => {
    const params = createArticleMutationParams({
      parent_id: parentId,
      project_id: project.id,
      slug: 'new-' + encodeURI(new Date().toISOString()),
      ...DEFAULT_ARTICLE,
    })
    const { data } = await onCreateArticleMutation(params)
    const articleId = data?.insert_articles_one?.id
    if (articleId) {
      const articleSlug = data?.insert_articles_one?.slug
      router.push(`/admin/${project.slug}/editor/${articleSlug}`)
    }
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
        {article ? <Editor id={article.id} blocks={blocks} /> : <div>Pick an article</div>}
      </div>
    </div>
  )
}

interface IProps {
  article: NonNullable<GetArticleOneQuery['articles'][0]>
  project: NonNullable<NonNullable<GetProjectOneQuery['projects']>[0]>
  articles: NonNullable<NonNullable<NonNullable<GetProjectOneQuery['projects']>[0]>['articles']>
  blocks: NonNullable<GetArticleOneQuery['articles'][0]>['blocks']
  onCreateArticleMutation: ReturnType<typeof useCreateArticleMutation>[0]
  onUpsertBlockMutation: ReturnType<typeof useUpsertBlocksMutation>[0]
}
