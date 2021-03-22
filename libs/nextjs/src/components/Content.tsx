import { Article } from '../types'
import './Content.scss'
import BlockList from './articles/BlockList'

const Content = ({ article }: IProps) => {
  return (
    <div className={'omnea-content'}>
      <BlockList blocks={article.blocks} />
    </div>
  )
}

interface IProps {
  article: Article
}

export default Content
