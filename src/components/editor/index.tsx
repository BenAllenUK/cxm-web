import { memo } from 'react'
import { Block } from 'components/types'
import { DEFAULT_BLOCK_START } from './blocks'
import Content from './Content'
import styles from './Editor.module.scss'

function Editor({ id, blocks, onBlocksUpsert }: IProps) {
  let content = blocks
  if (content.length === 0) {
    content = [DEFAULT_BLOCK_START]
  }

  return (
    <>
      <div className={styles.container}>
        <Content blocks={content} onBlocksUpsert={onBlocksUpsert} />
      </div>
    </>
  )
}

export default memo(Editor)
interface IProps {
  id: number
  blocks: Block[]
  onBlocksUpsert: (blocks: Block[], onComplete?: () => void) => void
}
