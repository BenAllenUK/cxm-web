import { Article } from '../types'
import './Content.scss'
import BlockList from './articles/BlockList'
import Breadcrumbs from './common/breadcrumbs'
import makeBreadCrumbs from '../utils/makeBreadcrumb'
import { useNavigation } from './navigation'

const Content = ({ article, articles }: IProps) => {
  // const { push } = useNavigation()
  console.log('wtf')
  const breadcrumbs = makeBreadCrumbs(articles, article.id)

  // const onViewArticle = (path: string) => {
  //   push(path, '/blog', { projectSlug: 'gimme', path })
  // }
  console.log('crumbs', breadcrumbs)
  return (
    <div className={'omnea-content'}>
      {/* {breadcrumbs && (
        <Breadcrumbs
          breadcrumbs={breadcrumbs}
          onViewArticle={() => null}
          separator={<div className={'separator'}>/</div>}
          maxItems={2}
        />
      )} */}
      <BlockList blocks={article.blocks || []} />
    </div>
  )
}

interface IProps {
  article: Article
  articles: Article[]
}

export default Content
