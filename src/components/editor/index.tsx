import { memo } from 'react'
import { Block, BlockType } from 'components/types'
import { DEFAULT_BLOCK_START } from './blocks'
import Content from './Content'
import styles from './Editor.module.scss'
import Modals from './modals'

function Editor({ id, blocks, onBlocksUpsert, onBlockDelete }: IProps) {
  let content = blocks
  if (content.length === 0) {
    content = [DEFAULT_BLOCK_START]
  }

  const _onBlockItemClick = (index: number, key: BlockType) => {
    const block = blocks[index]
    onBlocksUpsert([
      {
        ...block,
        type: key,
        payload: {},
      },
    ])
  }

  return (
    <>
      <div className={styles.container}>
        <Modals onBlockItemClick={_onBlockItemClick}>
          <Content blocks={content} onBlocksUpsert={onBlocksUpsert} onBlockDelete={onBlockDelete} />
        </Modals>
      </div>
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
