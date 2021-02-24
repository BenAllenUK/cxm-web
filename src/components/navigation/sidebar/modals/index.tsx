import PageControls, { PageControlOptions, usePageControlModals } from 'components/navigation/sidebar/modals/page-controls'
import RenameControls, { useRenameControlModals } from 'components/navigation/sidebar/modals/rename-controls'
import { ReactNode, useState } from 'react'
import { Article } from 'operations/articles/types'
import MenuItemRefs, { useMenuItemRefs } from './menu-item-refs'
import PageControlsTargetContext from './page-controls/PageControlsTargetContext'
import { useSidebarPageControlsContext } from './page-controls/PageControlsTargetContext'
import Search from './search'
import createDuplicateArticle from 'utils/article/createDuplicateArticle'

const ControlledModals = ({ currentViewingArticleId, articles, children, onUpsertArticles, onViewArticle }: IProps) => {
  const [renameValue, setRenameValue] = useState<string | null>(null)
  const { articleId: targetArticleId, sectionId: targetSectionId } = useSidebarPageControlsContext()
  const { showControls: showRenameControls } = useRenameControlModals()

  const { locationRefs } = useMenuItemRefs()

  const _onClick = (_: number, optionId: PageControlOptions) => {
    if (!locationRefs?.current) {
      return
    }

    const [article] = articles.filter((item) => item.id === targetArticleId)
    if (!article) {
      return
    }

    switch (optionId) {
      case PageControlOptions.Copy:
        return
      case PageControlOptions.Delete: {
        onArticleDelete(article.id)
        return
      }
      case PageControlOptions.Duplicate:
        onArticleDuplicate(article.id)
        return
      case PageControlOptions.Rename: {
        console.log({ targetArticleId, targetSectionId })
        const { top, left, height } = locationRefs?.current[targetSectionId][article.id].getBoundingClientRect()
        showRenameControls({ x: left - 20, y: top + height + 5 })
        setRenameValue(article.title)
        return
      }
    }
  }

  const onArticleRenameTextChange = (value: string) => {
    setRenameValue(value)
  }

  const _onArticleRenameSubmit = () => {
    if (!renameValue) {
      return
    }

    const [article] = articles.filter((item) => item.id === targetArticleId)
    if (!article) {
      console.error(`Article not found: ${targetArticleId}`)
      return
    }

    onUpsertArticles([{ ...article, title: renameValue }])
  }

  const onArticleDuplicate = (id: number) => {
    const [article] = articles.filter((item) => item.id === id)
    if (!article) {
      console.error(`Article not found`)
      return
    }

    const duplicatedArticle = createDuplicateArticle(article)
    onUpsertArticles([duplicatedArticle])
  }

  const onArticleDelete = (id: number) => {
    const [article] = articles.filter((item) => item.id === id)
    if (!article) {
      console.error(`Article not found`)
      return
    }
    // TODO: Set archived user
    onUpsertArticles([{ ...article, archived: true, archivedAt: new Date().toISOString() }])

    if (article.id === currentViewingArticleId) {
      const [alternativeArticle] = articles
      onViewArticle(alternativeArticle.slug)
    }
  }

  return (
    <>
      <PageControls.Component onClick={_onClick} />
      <RenameControls.Component value={renameValue} onTextChange={onArticleRenameTextChange} onSubmit={_onArticleRenameSubmit} />
      <Search.Component articles={articles} onItemClick={onViewArticle} />
      {children}
    </>
  )
}

interface IProps {
  currentViewingArticleId?: number | null
  articles: Article[]
  children: ReactNode
  onUpsertArticles: (articles: Article[]) => Promise<Article[]>
  onViewArticle: (slug: string) => void
}

const Modals = (props: IProps) => {
  return (
    <div>
      <Search.Provider>
        <MenuItemRefs.Provider>
          <PageControlsTargetContext.Provider>
            <RenameControls.Provider>
              <PageControls.Provider>
                <ControlledModals {...props} />
              </PageControls.Provider>
            </RenameControls.Provider>
          </PageControlsTargetContext.Provider>
        </MenuItemRefs.Provider>
      </Search.Provider>
    </div>
  )
}

export default Modals
