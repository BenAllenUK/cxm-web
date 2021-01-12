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
  isOpen: boolean
  children: MenuItem[]
  parentId: number | null
}

export function Sidebar({ project, sections: savedSections }: IProps) {
  const [sections, setSections] = useState(savedSections)

  const onMenuItemClick = async (sectionIndex: number, menuIndexes: number[]) => {
    const sectionPath = `[${sectionIndex}].items.`
    const menuPath = menuIndexes.map((i) => `[${i}]`).join('.children.')
    const path = sectionPath + menuPath + '.isOpen'
    setSections(
      produce((draftSections) => {
        update(draftSections, path, (val: boolean) => !val)
      })
    )
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
                items={item.items}
                onItemClick={(_, menuIndexes) => onMenuItemClick(index, menuIndexes)}
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
}

export default Sidebar
