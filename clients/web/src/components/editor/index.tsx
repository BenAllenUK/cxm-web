import { Block, BlockType } from 'components/editor/blocks/types'
import { Article } from 'operations/articles/types'
import { memo, useState } from 'react'
import { BlockTypeProperties } from './blocks'
import EditorArticle from './components/EditorArticle'
import styles from './Editor.module.scss'
import Header from './header'
import EditorEmpty from './misc/EditorEmpty'
import { BreadcrumbItem } from 'components/common/breadcrumbs/types'
import Modals from './modals'
import LocalBlocksProvider, { useLocalBlocksProvider } from './providers/LocalBlocksProvider'

function Editor({
  id,
  articles,
  breadcrumbs,
  coverImage,
  onUpsertArticles: onServerUpsertArticles,
  onBlocksUpsert: onServerBlocksUpsert,
  onBlocksDelete: onServerBlocksDelete,
  onViewArticle,
  loading,
}: Omit<IProps, 'blocks'>) {
  const { blocks, setBlocks } = useLocalBlocksProvider()
  const [focusIndex, setFocusIndex] = useState(blocks.length <= 1 ? 0 : -1)

  const _onModifyBlockType = (id: number, key: BlockType) => {
    const [block] = blocks.filter((item) => item.id === id)
    if (!block) {
      console.error('Block not found')
      return
    }

    onBlocksUpsert([
      {
        ...block,
        type: key,
        payload: BlockTypeProperties[key].initialPayload,
      },
    ])
    setFocusIndex(block.position)
  }

  // ______ TEMP ________

  const onBlocksUpsert = (newBlocks: Block[]) => {
    const newBlockIds = newBlocks.map((item) => item.id)
    setBlocks((prevBlocks) => {
      var prevBlocksFiltered = prevBlocks
        .filter((item) => newBlockIds.indexOf(item.id) === -1)
        .sort((a: Block, b: Block) => a.position - b.position)

      newBlocks.forEach((subItem, i) => {
        prevBlocksFiltered = prevBlocksFiltered.map((item, i) => {
          if (item.position >= subItem.position) {
            return { ...item, position: i + 1 }
          }
          return item
        })
      })
      const finalBlocks = [...prevBlocksFiltered.filter((item) => newBlockIds.indexOf(item.id) === -1), ...newBlocks]
      onServerBlocksUpsert(finalBlocks)
      return finalBlocks
    })
  }

  const onBlocksDelete = (ids: number[]) => {
    setBlocks((prevBlocks) => {
      var newBlocks = prevBlocks
        .filter((item) => ids.indexOf(item.id) === -1)
        .sort((a: Block, b: Block) => a.position - b.position)

      ids.forEach((subId, i) => {
        const [subItem] = prevBlocks.filter((item) => item.id === subId)
        newBlocks = newBlocks.map((item, i) => {
          if (item.position > subItem.position) {
            return { ...item, position: i }
          }
          return item
        })
      })

      onServerBlocksUpsert(newBlocks)
      return newBlocks
    })
  }

  // ______ TEMP END ________

  const _onCoverImageChange = (image: string | null) => {
    const [article] = articles.filter((item) => item.id === id)
    if (!article) {
      return
    }

    onServerUpsertArticles([{ ...article, coverImage: image }])
  }

  return (
    <>
      <Modals
        onUpsertArticles={onServerUpsertArticles}
        articles={articles}
        blocks={blocks}
        onModifyBlockType={_onModifyBlockType}
        onBlocksUpsert={onBlocksUpsert}
      >
        <div className={styles.container}>
          {id && (
            <>
              <Header articleId={id} loading={loading} breadcrumbs={breadcrumbs} onViewArticle={onViewArticle} />
              <EditorArticle
                coverImage={coverImage}
                focusIndex={focusIndex}
                blocks={blocks}
                onCoverImageChange={_onCoverImageChange}
                onBlocksUpsert={onBlocksUpsert}
                onBlocksDelete={onBlocksDelete}
                setFocusIndex={setFocusIndex}
              />
            </>
          )}
          {!id && !loading && <EditorEmpty />}
        </div>
      </Modals>
    </>
  )
}

const ConnectedEditor = ({ blocks, ...otherProps }: IProps) => (
  <LocalBlocksProvider initialBlocks={blocks}>
    <Editor {...otherProps} />
  </LocalBlocksProvider>
)

export default memo(ConnectedEditor)
interface IProps {
  id?: number | null
  coverImage?: string | null
  articles: Article[]
  blocks: Block[]
  loading?: boolean
  breadcrumbs: BreadcrumbItem[]
  onUpsertArticles: (articles: Article[]) => Promise<Article[]>
  onBlocksUpsert: (blocks: Block[]) => void
  onBlocksDelete: (ids: number[]) => void
  onViewArticle: (path: string) => void
}
