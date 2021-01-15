import Sidebar, { Section } from 'components/navigation/sidebar'
import Editor from 'components/editor'
import { parseMenu } from 'utils/menu'
import { parseBlocks } from 'utils/blocks'
import { useEffect } from 'react'
import styles from './Editor.module.scss'
import {
  GetArticlesQuery,
  GetArticlesQueryResult,
  GetBlocksQuery,
  Projects,
  useCreateArticleMutation,
} from 'generated/graphql'

import GET_ARTICLES from 'queries/articles/GET_ARTICLES.gql'

import { createArticleMutationParams } from 'queries/articles'

import { useRouter } from 'next/router'
import { gql } from '@apollo/client'
import produce from 'immer'

export default function EditorPage({
  articleId,
  project,
  articles,
  blocks: blocksRaw,
  onCreateArticleMutation,
}: IProps) {
  const sections = [{ id: 1, label: 'CONTENT', items: parseMenu(articles) }]

  const [article] = articles.filter((item) => item.id === articleId)
  const router = useRouter()

  let blocks = parseBlocks(blocksRaw)

  useEffect(() => {
    document.title = `Omnia ${article?.title ? `| ${article?.title}` : ''}`
  })

  const onViewArticle = (id: number) => {
    const [article] = articles.filter((item) => item.id === id)
    if (!article) {
      console.error("Clicked on an article that didn't exist")
      return
    }

    // router.replace(`/editor/${article.slug}`)
  }

  const onCreateArticle = (id: number | null) => {
    const newArticle = {
      title: 'New Page',
      slug: 'new' + new Date().getTime(),
    }

    const params = createArticleMutationParams({
      parentId: id,
      projectId: project.id,
      ...newArticle,
    })
    onCreateArticleMutation(params)
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
        {article ? <Editor id={articleId} blocks={blocks} /> : <div>Pick an article</div>}
      </div>
    </div>
  )
}

interface IProps {
  articleId: number
  project: Projects
  articles: NonNullable<NonNullable<GetArticlesQuery['projects_by_pk']>['articles']>
  blocks: NonNullable<GetBlocksQuery['blocks']>
  onCreateArticleMutation: ReturnType<typeof useCreateArticleMutation>[0]
}
