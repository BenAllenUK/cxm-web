import React, { useState, useContext } from 'react'
import MenuIcon from 'images/icons/menu.svg'
import SearchIcon from 'images/icons/search.svg'

import Title from './Title'

import styles from './Sidebar.module.scss'
import { MenuList } from './MenuList'

import { Tooltip } from 'components/tooltip'

import produce from 'immer'
import update from 'lodash/update'

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

  const onMenuItemClick = async (
    e: React.MouseEvent<HTMLDivElement>,
    sectionIndex: number,
    item: MenuItem
  ) => {
    if (item.children.length > 0) {
      setOpenState(
        produce((draftOpenState) => {
          draftOpenState[item.id] = !draftOpenState[item.id]
        })
      )
    }
    onViewArticle(item.id)
  }

  const onMenuAddItemClick = async (
    e: React.MouseEvent<HTMLDivElement>,
    sectionIndex: number,
    item: MenuItem
  ) => {
    console.log('add')
    onCreateArticle(item.id)
    setOpenState(
      produce((draftOpenState) => {
        draftOpenState[item.id] = true
      })
    )
    e.stopPropagation()
  }

  const onMenuMoreItemClick = async (
    e: React.MouseEvent<HTMLDivElement>,
    sectionIndex: number,
    item: MenuItem
  ) => {
    e.stopPropagation()
  }

  return (
    <>
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
                onItemAddClick={(e, item) => onMenuAddItemClick(e, index, item)}
                onItemMoreClick={(e, item) => onMenuMoreItemClick(e, index, item)}
              />
            </div>
          ))}
        </div>
        <Tooltip id={'sidebar'} />
      </div>
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
