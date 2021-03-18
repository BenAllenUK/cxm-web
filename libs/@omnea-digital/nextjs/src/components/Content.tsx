import { Article } from '../types'
import styles from './Content.module.scss'
import BlockList from './articles/BlockList'

const Content = ({ article }: IProps) => {
  return (
    <div className={styles.body}>
      <BlockList blocks={article.blocks} />
    </div>
  )
}

interface IProps {
  article: Article
}

export default Content
