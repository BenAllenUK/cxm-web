import PageControls from 'components/navigation/sidebar/modals/page-controls'
import RenameControls, { useRenameControlModals } from 'components/navigation/sidebar/modals/rename-controls'
import { ArticleFragment } from 'generated/graphql'
import { ReactNode, useState } from 'react'
import MenuItemRefs, { useMenuItemRefs } from './menu-item-refs'

const ControlledModals = ({ articles, children, onCopyLinkClick, onDeleteClick, onDuplicateClick, onUpdateArticles }: IProps) => {
  const [renameValue, setRenameValue] = useState<string | null>(null)
  const { showControls: showRenameControls } = useRenameControlModals()

  const { locationRefs } = useMenuItemRefs()

  const _onClick = (sectionId: number, itemId: number, optionId: number) => {
    if (!locationRefs?.current) {
      return
    }

    const [article] = articles.filter((item) => item.id === itemId)
    if (!article) {
      return
    }

    const { top, left, height } = locationRefs?.current[sectionId][itemId].getBoundingClientRect()
    showRenameControls(sectionId, itemId, { x: left - 20, y: top + height + 5 })
    setRenameValue(article.title)
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

  return (
    <>
      <PageControls.Component onClick={_onClick} />
      <RenameControls.Component value={renameValue} onTextChange={onArticleRenameTextChange} onSubmit={_onArticleRenameSubmit} />
      {children}
    </>
  )
}

interface IPageControlProps {
  articles: ArticleFragment[]
  children: ReactNode
  onUpdateArticles: (articles: ArticleFragment[]) => void
  onDuplicateClick: (id: number) => void
  onDeleteClick: (id: number) => void
  onCopyLinkClick: (id: number) => void
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

interface IProps extends IPageControlProps {
  articles: ArticleFragment[]
  onArticleNameChange: (sectionId: number, itemId: number, value: string) => void
}

export default Modals
