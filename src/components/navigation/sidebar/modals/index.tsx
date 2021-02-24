import PageControls, { PageControlOptions, usePageControlModals } from 'components/navigation/sidebar/modals/page-controls'
import RenameControls, { useRenameControlModals } from 'components/navigation/sidebar/modals/rename-controls'
import { ArticleFragment, ArticlesInsertInput, ArticlesSetInput } from 'generated/graphql'
import { ReactNode, useState } from 'react'
import { ArticleBlocksFragment } from 'types/types'
import MenuItemRefs, { useMenuItemRefs } from './menu-item-refs'
import PageControlsTargetContext from './page-controls/PageControlsTargetContext'
import { useSidebarPageControlsContext } from './page-controls/PageControlsTargetContext'
import Search from './search'

const ControlledModals = ({ articles, children, onUpsertArticle, onViewArticle }: IProps) => {
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
    const { __typename, ...articleData } = article
    onUpsertArticle([{ ...articleData, title: renameValue }])
  }

  const onArticleDuplicate = (id: number) => {
    const [article] = articles.filter((item) => item.id === id)
    if (!article) {
      console.error(`Article not found`)
      return
    }
    const { __typename, id: _, ...articleData } = article
    onUpsertArticle([
      {
        id: -1,
        ...articleData,
        title: `${articleData.title} Copy`,
        slug: `${articleData.slug}-copy`,
      },
    ])
  }

  const onArticleDelete = (id: number) => {
    const [article] = articles.filter((item) => item.id === id)
    if (!article) {
      console.error(`Article not found`)
      return
    }
    const { __typename, ...articleData } = article
    // TODO: Set archived user
    onUpsertArticle([{ ...articleData, archived: true, archivedAt: new Date().toISOString() }])
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
  articles: ArticleFragment[]
  children: ReactNode
  onUpsertArticle: (articles: ArticleBlocksFragment[]) => void
  onViewArticle: (id: number) => void
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
