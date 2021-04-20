import createPositionModal from 'components/common/modals/position'
import { Article } from 'operations/articles/types'
import ConfigControlUncontrolled from './ConfigControlUncontrolled'

const { Provider, useModal } = createPositionModal()

export const useConfigControlModal = useModal

const Component = ({ articles, onArticleRenameSubmit, onArticleUpdatePath, onUpsertArticles, ...props }: IProps) => {
  const { enabled, position, hideControls, articleId } = useConfigControlModal()

  const _onArticleUpdatePath = (renameValue: string) => {
    onArticleUpdatePath(articleId, renameValue)
  }

  const _onUpsertArticles = (value: Article) => {
    onUpsertArticles(articleId, value)
  }

  return (
    <>
      {enabled && position && (
        <ConfigControlUncontrolled
          style={{ left: 50, top: '20%' }}
          onDismiss={hideControls}
          onClick={() => null}
          {...props}
          article={articleId ? articles[articles.findIndex((element) => element.id === articleId)] : null}
          onArticleUpdatePath={_onArticleUpdatePath}
          onUpsertArticles={_onUpsertArticles}
        />
      )}
    </>
  )
}

const ConfigControl = { Provider, Component }

export default ConfigControl

interface IProps {
  articles: Article[]
  onArticleRenameSubmit: (articleId: number | null, renameValue: string) => void
  onArticleUpdatePath: (articleId: number | null, renameValue: string) => void
  onUpsertArticles: (articleId: number | null, value: Article) => void
}
