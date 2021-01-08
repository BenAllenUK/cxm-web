import { BlockType } from 'components/types'
import styles from './Text.module.scss'

export default function Text({ content, type }: IProps) {
  switch (type) {
    case BlockType.H1:
      return <h1 className={styles.text}>{content}</h1>
    case BlockType.H2:
      return <h2 className={styles.text}>{content}</h2>
    case BlockType.H3:
      return <h3 className={styles.text}>{content}</h3>
    case BlockType.TEXT:
      return <p className={styles.text}>{content}</p>
  }
}

// const Container = ({ children }) => <div className={styles.text}>{child}</div>

interface IProps {
  content: string
  type: BlockType.TEXT | BlockType.H1 | BlockType.H2 | BlockType.H3
}
