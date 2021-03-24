import { memo, useCallback, useRef, useState } from 'react'
import { Block, BlockDataText, BlockType } from 'components/editor/blocks/types'
import { BlockTypeProperties, DEFAULT_BLOCK_START } from './blocks'

import styles from './Editor.module.scss'
import Modals from './modals'
import Header from './header'
import { Article } from 'operations/articles/types'
import List from './components/List'
import EditorEmpty from './misc/EditorEmpty'
import readPathRoute from 'utils/article/readPathRoute'

function Editor({
  id,
  articles,
  path,
  blocks: initialBlocks,
  onBlocksUpsert: onServerBlocksUpsert,
  onBlocksDelete: onServerBlocksDelete,
  onViewArticle,
  loading,
}: IProps) {
  const [focusIndex, setFocusIndex] = useState(initialBlocks.length <= 1 ? 0 : -1)

  const [blocks, setBlocks] = useState<Block[]>(initialBlocks)

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
    console.log('NEW BLOCKS', newBlocks)
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
      <Modals articles={articles} onModifyBlockType={_onModifyBlockType}>
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

export default memo(Editor)
interface IProps {
  id?: number | null
  articles: Article[]
  blocks: Block[]
  loading?: boolean
  path: Article[]
  onBlocksUpsert: (blocks: Block[]) => void
  onBlocksDelete: (ids: number[]) => void
  onViewArticle: (path: string) => void
}
