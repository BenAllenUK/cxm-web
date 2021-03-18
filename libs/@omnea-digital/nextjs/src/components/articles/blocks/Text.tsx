import { BlockDataText, BlockType } from '../../../types'
import styles from './Text.module.scss'

export default function Text({ content, type }: IProps) {
  const { value } = content
  switch (type) {
    case BlockType.H1:
      return <h1 className={styles.text}>{value}</h1>
    case BlockType.H2:
      return <h2 className={styles.text}>{value}</h2>
    case BlockType.H3:
      return <h3 className={styles.text}>{value}</h3>
    case BlockType.TEXT:
      return <p className={styles.text}>{value}</p>
    case BlockType.CODE:
      return (
        <div className={styles.code}>
          <div>{value}</div>
        </div>
      )
    case BlockType.CALLOUT:
      return (
        <div className={styles.callout}>
          <div>{value}</div>
        </div>
      )
    case BlockType.QUOTE:
      return (
        <div className={styles.quote}>
          <div>{value}</div>
        </div>
      )
    default:
      return <div />
  }
}

interface IProps {
  type: BlockType
  content: BlockDataText
}
