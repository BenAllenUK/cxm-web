import { useState, useContext, MouseEvent } from 'react'
import MenuIcon from 'images/icons/menu.svg'
import SearchIcon from 'images/icons/search.svg'

import Title from './Title'

import styles from './Sidebar.module.scss'
import { MenuList } from './MenuList'

import { Tooltip } from 'components/tooltip'

import produce from 'immer'
import Modals from './modals'

export const SIDEBAR_INDENT = 20

const appMenu = [
  {
    id: 1,
    icon: SearchIcon,
    label: 'Quick Find',
  },
  {
    id: 2,
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
  children: MenuItem[]
  parentId: number | null
}

export function Sidebar({ project, sections, onViewArticle, onCreateArticle }: IProps) {
  // TODO: Assumes ids have different numbers
  const [openState, setOpenState] = useState({})

  const onMenuItemClick = async (e: MouseEvent<HTMLDivElement>, sectionIndex: number, item: MenuItem) => {
    onViewArticle(item.id)
  }

  const onMenuAddItemClick = async (e: MouseEvent<HTMLDivElement>, sectionIndex: number, item: MenuItem) => {
    onCreateArticle(item.id)
    setOpenState(
      produce((draftOpenState) => {
        draftOpenState[item.id] = true
      })
    )
    e.stopPropagation()
  }

  const onMenuArrowItemClick = async (e: MouseEvent<HTMLDivElement>, sectionIndex: number, item: MenuItem) => {
    if (item.children.length > 0) {
      setOpenState(
        produce((draftOpenState) => {
          draftOpenState[item.id] = !draftOpenState[item.id]
        })
      )
    }
    e.stopPropagation()
  }

  const onMenuMoreItemClick = async (e: MouseEvent<HTMLDivElement>, sectionIndex: number, item: MenuItem) => {
    e.stopPropagation()
  }

  return (
    <>
      <Modals>
        <div className={styles.container}>
          <Title name={project.name} />
          <ul className={styles.projectMenu}>
            {appMenu.map((item, index) => (
              <li key={index} onClick={() => console.log(item.id)}>
                {item.icon({ style: { marginRight: 20 } })}
                <div>{item.label}</div>
              </li>
            ))}
          </ul>
          <div className={styles.scrollable}>
            {sections.map((item, index) => (
              <div key={index}>
                <div className={styles.label}>{item.label}</div>
                <MenuList
                  openState={openState}
                  items={item.items}
                  onItemClick={(e, item) => onMenuItemClick(e, index, item)}
                  onItemArrowClick={(e, item) => onMenuArrowItemClick(e, index, item)}
                  onItemAddClick={(e, item) => onMenuAddItemClick(e, index, item)}
                  onItemMoreClick={(e, item) => onMenuMoreItemClick(e, index, item)}
                />
              </div>
            ))}
          </div>
          <Tooltip id={'sidebar'} />
        </div>
      </Modals>
    </>
  )
}

interface IProps {
  project: {
    name: string
    image?: string | null
  }
  sections: Section[]
  onViewArticle: (id: number) => void
  onCreateArticle: (id: number | null) => void
}

export default Sidebar
