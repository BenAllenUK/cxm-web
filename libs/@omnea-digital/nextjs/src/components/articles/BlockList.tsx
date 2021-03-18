import { Block } from '../../types'

import styles from './BlockList.module.scss'

import BlockItem from './Block'

const BlockList = ({ blocks }: IProps) => {
  return (
    <div className={styles.container}>
      {blocks.map((item, i) => (
        <div
          key={i}
          style={{
            marginTop: 10,
            marginBottom: 10
          }}
        >
          <BlockItem item={item} index={i} />
        </div>
      ))}
    </div>
  )
}

interface IProps {
  blocks: Block[]
}

export default BlockList
