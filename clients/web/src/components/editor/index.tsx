import { memo, useCallback, useMemo, useRef, useState } from 'react'
import { Block, BlockDataText, BlockType } from 'components/editor/blocks/types'
import { BlockTypeProperties, DEFAULT_BLOCK_START } from './blocks'

import styles from './Editor.module.scss'
import Modals from './modals'
import Header from './header'
import { Article } from 'operations/articles/types'
import List from './components/List'
import EditorEmpty from './misc/EditorEmpty'
import useWindowKeyDown from 'utils/hooks/useWindowKeyDown'
import LocalBlocksProvider, { useLocalBlocksProvider } from './providers/LocalBlocksProvider'
// Omit<IProps, 'blocks'>
function Editor({
  id,
  articles,
  path,
  onUpsertArticles: onServerUpsertArticles,
  onBlocksUpsert: onServerBlocksUpsert,
  onBlocksDelete: onServerBlocksDelete,
  onViewArticle,
  loading,
  blocks: initialBlocks,
}: IProps) {
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
              <Header loading={loading} path={path} onViewArticle={onViewArticle} />
              <List
                focusIndex={focusIndex}
                blocks={blocks}
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
    <Editor blocks={blocks} {...otherProps} />
  </LocalBlocksProvider>
)

export default memo(ConnectedEditor)
interface IProps {
  id?: number | null
  articles: Article[]
  blocks: Block[]
  loading?: boolean
  path: Article[]
  onUpsertArticles: (articles: Article[]) => Promise<Article[]>
  onBlocksUpsert: (blocks: Block[]) => void
  onBlocksDelete: (ids: number[]) => void
  onViewArticle: (path: string) => void
}
