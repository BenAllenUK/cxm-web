import { memo, useState } from 'react'
import { Block, BlockType } from 'components/types'
import { BlockTypeProperties, DEFAULT_BLOCK_START } from './blocks'
import Content from './Content'
import styles from './Editor.module.scss'
import Modals from './modals'
import Header from './header'
import PageControls from 'components/editor/page-controls'

function Editor({ id, blocks: initialBlocks, onBlocksUpsert, onBlockDelete }: IProps) {
  let content = initialBlocks
  if (content.length === 0) {
    content = [DEFAULT_BLOCK_START]
  }

  const [blocks, setBlocks] = useState<Block[]>(content)

  const _onBlockItemClick = (index: number, key: BlockType) => {
    setBlocks((state) => {
      const payload = BlockTypeProperties[key].isEditable
        ? {
            value: '',
          }
        : {}
      return [
        ...state,
        {
          id: Math.round(Math.random() * -1000000),
          parentId: null,
          editingUserId: null,

          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          position: index,
          type: key,
          payload,
        },
      ]
    })
  }

  const _onBlocksUpsert = (_blocks: Block[]) => {
    const newIds = _blocks.map((s) => s.id)

    setBlocks((state) => {
      return [...state.filter((item) => newIds.indexOf(item.id) === -1), ..._blocks]
    })
  }

  return (
    <>
      <Modals onBlockItemClick={_onBlockItemClick}>
        <PageControls onClick={() => {}}>
          <div className={styles.container}>
            <Header />
            <Content blocks={blocks} onBlocksUpsert={_onBlocksUpsert} onBlockDelete={onBlockDelete} />
          </div>
        </PageControls>
      </Modals>
    </>
  )
}

export default memo(Editor)
interface IProps {
  id: number
  blocks: Block[]
  onBlocksUpsert: (blocks: Block[]) => Promise<number[] | undefined>
  onBlockDelete: (id: number) => void
}
