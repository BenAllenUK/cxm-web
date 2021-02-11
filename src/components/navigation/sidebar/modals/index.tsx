import PageControls, { PageControlOptions } from 'components/navigation/sidebar/modals/page-controls'
import RenameControls, { useRenameControlModals } from 'components/navigation/sidebar/modals/rename-controls'
import { ArticleFragment } from 'generated/graphql'
import { ReactNode, useState } from 'react'
import MenuItemRefs, { useMenuItemRefs } from './menu-item-refs'

const ControlledModals = ({ articles, children, onUpdateArticles }: IProps) => {
  const [renameValue, setRenameValue] = useState<string | null>(null)
  const { showControls: showRenameControls } = useRenameControlModals()

  const { locationRefs } = useMenuItemRefs()

  const _onClick = (sectionId: number, itemId: number, optionId: PageControlOptions) => {
    if (!locationRefs?.current) {
      return
    }

    const [article] = articles.filter((item) => item.id === itemId)
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
        return
      case PageControlOptions.Rename: {
        const { top, left, height } = locationRefs?.current[sectionId][itemId].getBoundingClientRect()
        showRenameControls(sectionId, itemId, { x: left - 20, y: top + height + 5 })
        setRenameValue(article.title)
        return
      }
    }
  }

  const onArticleRenameTextChange = (sectionId: number, itemId: number, value: string) => {
    setRenameValue(value)
  }

  const _onArticleRenameSubmit = (_: number, itemId: number) => {
    if (!renameValue) {
      return
    }

    const [article] = articles.filter((item) => item.id === itemId)
    if (!article) {
      console.error(`Article not found`)
      return
    }
    const { __typename, ...articleData } = article
    onUpdateArticles([{ ...articleData, title: renameValue }])
  }

  const onArticleDelete = (itemId: number) => {
    const [article] = articles.filter((item) => item.id === itemId)
    if (!article) {
      console.error(`Article not found`)
      return
    }
    const { __typename, ...articleData } = article
    // TODO: Set archived user
    onUpdateArticles([{ ...articleData, archived: true, archivedAt: new Date().toISOString() }])
  }

  return (
    <>
      <PageControls.Component onClick={_onClick} />
      <RenameControls.Component value={renameValue} onTextChange={onArticleRenameTextChange} onSubmit={_onArticleRenameSubmit} />
      {children}
    </>
  )
}

interface IProps {
  articles: ArticleFragment[]
  children: ReactNode
  onUpdateArticles: (articles: ArticleFragment[]) => void
}

const Modals = (props: IProps) => {
  return (
    <div>
      <MenuItemRefs.Provider>
        <RenameControls.Provider>
          <PageControls.Provider>
            <ControlledModals {...props} />
          </PageControls.Provider>
        </RenameControls.Provider>
      </MenuItemRefs.Provider>
    </div>
  )
}

export default Modals
