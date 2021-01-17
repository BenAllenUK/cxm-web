import { BlockData } from 'components/types'
import { DEFAULT_BLOCK_START } from './blocks'
import Content from './Content'
import styles from './Editor.module.scss'

export default function Editor({ id, blocks }: IProps) {
  let content = blocks
  if (content.length === 0) {
    content = [DEFAULT_BLOCK_START]
  }

  return (
    <>
      <div className={styles.container}>
        <Content blocks={content} />
      </div>
    </>
  )
}

interface IProps {
  id: number
  blocks: BlockData[]
}
