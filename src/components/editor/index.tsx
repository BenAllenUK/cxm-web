import { memo, useCallback, useRef, useState } from 'react'
import { Block, BlockDataText, BlockType } from 'components/editor/blocks/types'
import { BlockTypeProperties, DEFAULT_BLOCK_START } from './blocks'
import Content from './Content'
import styles from './Editor.module.scss'
import Modals from './modals'
import Header from './header'
import { ArticleFragment } from 'generated/graphql'

function Editor({ id, articles, blocks: initialBlocks, onBlocksUpsert, onBlockDelete }: IProps) {
  const [focusIndex, setFocusIndex] = useState(-1)

  let content = initialBlocks
  if (!!id && content.length === 0) {
    content = [{ ...DEFAULT_BLOCK_START, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }]
  }

  const [blocks, setBlocks] = useState<Block[]>(content)

  const _onBlockItemClick = (index: number, key: BlockType) => {
    const payload = BlockTypeProperties[key].isEditable
      ? {
          value: '',
        }
      : {}
    const block = blocks[index]
    if (!block) {
      console.error('Block not found')
      return
    }
    upsertBlocks({
      ...block,
      type: key,
      payload,
    })
    setFocusIndex(index)
  }

  const upsertBlocks = (_block: Block) => {
    setBlocks((state) => {
      var existingItems = state.filter((item) => _block.id !== item.id).sort((a: Block, b: Block) => a.position - b.position)
      // console.log('new block:', _block)
      // console.log('existing blocks: ', existingItems)
      existingItems = existingItems.map((item, i) => {
        if (item.position >= _block.position) {
          return { ...item, position: i + 1 }
        }
        return item
      })
      onBlocksUpsert([...existingItems, _block])
      // console.log(' final blocks', [...existingItems, _block])
      return [...existingItems, _block]
    })
  }

  const _onBlocksUpsert = (_block: Block) => {
    upsertBlocks(_block)
  }

  const _onBlockDelete = (id: number) => {
    setBlocks((state) => {
      const [deletedBlock] = state.filter((item) => item.id == id)
      var existingItems = state.filter((item) => id !== item.id).sort((a: Block, b: Block) => a.position - b.position)
      existingItems = existingItems.map((item, i) => {
        if (item.position > deletedBlock.position) {
          return { ...item, position: i }
        }
        return item
      })

      onBlocksUpsert(existingItems)
      return existingItems
    })
  }

  return (
    <>
      <Modals articles={articles} onBlockItemClick={_onBlockItemClick}>
        <div className={styles.container}>
          <Header loading={!id} />
          <Content
            focusIndex={focusIndex}
            blocks={blocks}
            onBlocksUpsert={_onBlocksUpsert}
            onBlockDelete={_onBlockDelete}
            setFocusIndex={setFocusIndex}
          />
        </div>
      </Modals>
    </>
  )
}

export default memo(Editor)
interface IProps {
  id: number | null
  articles: ArticleFragment[]
  blocks: Block[]
  onBlocksUpsert: (blocks: Block[]) => void
  onBlockDelete: (id: number) => void
}
