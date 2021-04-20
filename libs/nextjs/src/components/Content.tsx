import { Article, Block } from '../types'
import './Content.scss'
import BlockList from './articles/BlockList'
import Breadcrumbs from './common/breadcrumbs'
import createBreadcrumbs from '../utils/createBreadcrumbs'
import { useNavigation } from './navigation'

const Content = ({ article, articles }: IProps) => {
  // const { push } = useNavigation()
  const breadcrumbs = createBreadcrumbs(articles, article.id)
  // TODO: Once hooks are enabled:
  // useEffect(() => {
  //   if (article.title) {
  //     document.title = article.title
  //   }
  // }, [article.title])
  // const onViewArticle = (path: string) => {
  //   push(path, '/blog', { projectSlug: 'gimme', path })
  // }

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
      <BlockList
        blocks={
          article?.blocks?.sort(
            (a: Block, b: Block) => a.position - b.position
          ) || []
        }
      />
    </div>
  )
}

interface IProps {
  article: Article
  articles: Article[]
}

export default Content
