import { useState, useContext, MouseEvent, memo } from 'react'
import MenuIcon from 'images/icons/menu.svg'
import SearchIcon from 'images/icons/search.svg'

import Title from './Title'

import styles from './Sidebar.module.scss'
import { MenuList } from './MenuList'

import { Tooltip } from 'components/common/tooltip'

import produce from 'immer'
import { usePageControlModals } from './modals/page-controls'
import Modals from './modals'
import { useMenuItemRefs } from './modals/menu-item-refs'
import parseMenu from 'utils/menu/parseMenu'

import AddButton from './AddButton'
import { useSearchModal } from './modals/search'
import { DEFAULT_ARTICLE } from 'components/editor/blocks'
import { BlockType } from 'components/editor/blocks/types'
import createArticleEmpty from 'utils/article/createEmptyArticle'
import { useSidebarPageControlsContext } from './modals/page-controls/PageControlsTargetContext'
import { Article } from 'operations/articles/types'

export const SIDEBAR_INDENT = 20

enum AppMenuOptions {
  Search = 0,
  Feed,
}

const appMenu = [
  {
    id: AppMenuOptions.Search,
    icon: SearchIcon,
    label: 'Quick Find',
  },
  {
    id: AppMenuOptions.Feed,
    icon: MenuIcon,
    label: 'Feed',
  },
]

export type Section = {
  id: number
  label: string
  items: MenuItem[]
}

export type MenuItem = {
  id: number
  label: string
  slug: string
  children: MenuItem[]
  parentId: number | null
}

export function ControlledSidebar({ currentViewingArticleId, project, articles, onViewArticle, onUpsertArticles }: IProps) {
  // TODO: Assumes ids have different numbers

  const { showControls } = usePageControlModals()
  const { showControls: showSearchModal } = useSearchModal()

  const [openState, setOpenState] = useState({})

  const onMenuItemClick = async (e: MouseEvent<HTMLDivElement>, section: Section, item: MenuItem) => {
    onViewArticle(item.slug)
  }

  const onMenuAddItemClick = async (e: MouseEvent<HTMLDivElement>, section: Section, item: MenuItem) => {
    const newArticle = createArticleEmpty(item.id, 999) //TODO: update position
    const [newArticleItem] = await onUpsertArticles([newArticle])

    if (newArticleItem) {
      onViewArticle(newArticleItem.slug)
    }

    setOpenState(
      produce((draftOpenState) => {
        draftOpenState[item.id] = true
      })
    )

    e.stopPropagation()
  }

  const onMenuArrowItemClick = async (e: MouseEvent<HTMLDivElement>, section: Section, item: MenuItem) => {
    if (item.children.length > 0) {
      setOpenState(
        produce((draftOpenState) => {
          draftOpenState[item.id] = !draftOpenState[item.id]
        })
      )
    }
    e.stopPropagation()
  }

  const { setTarget } = useSidebarPageControlsContext()

  const onMenuMoreItemClick = async (e: MouseEvent<HTMLDivElement>, section: Section, item: MenuItem) => {
    showControls({ x: e.clientX, y: e.clientY })
    console.log('set target')
    setTarget(section.id, item.id)
    e.stopPropagation()
  }
  const { locationRefs } = useMenuItemRefs()

  const _onSidebarAddItemClick = async () => {
    const newArticle = createArticleEmpty(null, 9999)
    const [newArticleItem] = await onUpsertArticles([newArticle])

    if (newArticleItem) {
      onViewArticle(newArticleItem.slug)
    }
  }

  const _onAppMenuClick = (id: number) => {
    switch (id) {
      case AppMenuOptions.Search:
        showSearchModal()
        return
    }
  }

  const sections = [
    { id: 0, label: 'CONTENT', items: parseMenu(articles), suffix: <AddButton onClick={_onSidebarAddItemClick} /> },
  ]

  return (
    <>
      <div className={styles.container}>
        <Title name={project.name} />
        <ul className={styles.projectMenu}>
          {appMenu.map((item, index) => (
            <li key={index} onClick={() => _onAppMenuClick(item.id)}>
              {item.icon({ style: { marginRight: 20 } })}
              <div>{item.label}</div>
            </li>
          ))}
        </ul>
        <div className={styles.scrollable}>
          {sections.map((section, index) => (
            <div key={index}>
              <div className={styles.label}>{section.label}</div>
              <MenuList
                selectedId={currentViewingArticleId}
                itemRef={(ref: HTMLDivElement | null, item: MenuItem) => {
                  if (locationRefs && locationRefs.current && ref) {
                    locationRefs.current[section.id] ||= []
                    locationRefs.current[section.id][item.id] = ref
                  }
                }}
                openState={openState}
                items={section.items}
                onItemClick={(e, item) => onMenuItemClick(e, section, item)}
                onItemArrowClick={(e, item) => onMenuArrowItemClick(e, section, item)}
                onItemAddClick={(e, item) => onMenuAddItemClick(e, section, item)}
                onItemMoreClick={(e, item) => onMenuMoreItemClick(e, section, item)}
              />
              {section.suffix}
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <Tooltip id={'sidebar'} />
      </div>
    </>
  )
}

interface IProps {
  currentViewingArticleId?: number | null

  project: {
    name: string
    image?: string | null
  }
  articles: Article[]

  onViewArticle: (slug: string) => void
  onUpsertArticles: (articles: Article[]) => Promise<Article[]>
}

const ControlledSidebarWithModals = (props: IProps) => {
  return (
    <Modals
      currentViewingArticleId={props.currentViewingArticleId}
      articles={props.articles}
      onUpsertArticles={props.onUpsertArticles}
      onViewArticle={props.onViewArticle}
    >
      <ControlledSidebar {...props} articles={props.articles} />
    </Modals>
  )
}

export default ControlledSidebarWithModals
