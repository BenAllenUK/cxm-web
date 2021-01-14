import Sidebar, { Section } from 'components/navigation/sidebar'
import Editor from 'components/editor'
import { BlockData } from 'components/types'
import { parseMenu } from 'utils/menu'
import { parseBlocks } from 'utils/blocks'
import { useEffect } from 'react'
import styles from './Editor.module.scss'
import {
  Articles,
  Blocks,
  GetArticlesQuery,
  GetArticlesQueryResult,
  GetBlocksQuery,
  Projects,
} from 'generated/graphql'

import { useRouter } from 'next/router'

export default function EditorPage({ articleId, project, articles, blocks: blocksRaw }: IProps) {
  const sections = [{ id: 1, label: 'CONTENT', items: parseMenu(articles) }]

  const [article] = articles.filter((item) => item.id === articleId)
  const router = useRouter()

  let blocks = parseBlocks(blocksRaw)

  useEffect(() => {
    document.title = `Omnia ${article?.title ? `| ${article?.title}` : ''}`
  })

  const onMenuItemClick = (id: number) => {
    const [article] = articles.filter((item) => item.id === id)
    if (!article) {
      console.error("Clicked on an article that didn't exist")
      return
    }

    router.replace(`/editor/${article.slug}`)
  }

  return (
    <div className={styles.container}>
      <Sidebar project={project} sections={sections} onItemClick={onMenuItemClick} />

      <div className={styles.editor}>
        {article ? <Editor id={articleId} blocks={blocks} /> : <div>Pick an article</div>}
      </div>
    </div>
  )
}

interface IProps {
  articleId: number
  project: Projects
  articles: NonNullable<GetArticlesQuery['articles']>
  blocks: NonNullable<GetBlocksQuery['blocks']>
}
