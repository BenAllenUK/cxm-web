import React, { useState, useContext } from 'react'
import MenuIcon from 'images/icons/menu.svg'
import SearchIcon from 'images/icons/search.svg'

import Title from './Title'

import styles from './Sidebar.module.scss'
import { MenuList } from './MenuList'

import { Tooltip } from 'components/tooltip'

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

export interface ISection {
  id: number
  label: string
  items: IItem[]
}

export interface IItem {
  id: number
  label: string
  isOpen: boolean
  children: IItem[]
}

export function Sidebar({ sections: savedSections }: IProps) {
  const [sections, setSections] = useState(savedSections)

  const onMenuItemClick = async (sectionIndex: number, menuIndexes: number[]) => {
    const sectionPath = `${sectionIndex}.items.`
    const menuPath = menuIndexes.map((i) => `${i}`).join('.children.')
    const u = await (await import('updeep')).default
    const mutatedSections = u.updateIn(
      sectionPath + menuPath,
      (value: IItem) => ({ ...value, isOpen: !value.isOpen }),
      sections
    )
    setSections(mutatedSections)
  }

  return (
    <>
      <div className={styles.container}>
        <Title name={'Gimme Radio'} />
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
  sections: ISection[]
}

export default Sidebar