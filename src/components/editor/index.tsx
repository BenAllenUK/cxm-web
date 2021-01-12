import { BlockData } from 'components/types'
import Content from './Content'
import styles from './Editor.module.scss'

export default function Editor({ id, blocks }: IProps) {
  return (
    <>
      <div className={styles.container}>
        <Content id={id} blocks={blocks} />
      </div>
    </>
  )
}

interface IProps {
  id: number
  blocks: BlockData[]
}
