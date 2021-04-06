import { Article } from '../types'
import './Content.scss'
import BlockList from './articles/BlockList'
import { useEffect } from 'react'

const Content = ({ article }: IProps) => {
  // TODO: Once hooks are enabled:
  // useEffect(() => {
  //   if (article.title) {
  //     document.title = article.title
  //   }
  // }, [article.title])

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
