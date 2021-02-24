import styles from './Sidebar.module.scss'
import MenuItem from './MenuItem'
import { MenuItem as MenuItemType, SIDEBAR_INDENT } from '.'
import { RefObject } from 'react'

export function MenuList(props: IProps) {
  const { itemRef, items, openState, depth = -1, onItemClick, onItemArrowClick, onItemAddClick, onItemMoreClick } = props
  return (
    <ul className={styles.menu}>
      {items.map((item, index) => (
        <div key={index}>
          <MenuItem
            ref={(ref) => itemRef(ref, item)}
            subList={item.children.length > 0}
            innerStyle={{ paddingLeft: SIDEBAR_INDENT * (depth + 1) }}
            isOpen={openState[item.id]}
            onClick={(e) => onItemClick(e, item)}
            onArrowClick={(e) => onItemArrowClick(e, item)}
            onAddClick={(e) => onItemAddClick(e, item)}
            onMoreClick={(e) => onItemMoreClick(e, item)}
          >
            ({item.id}) {item.label}
          </MenuItem>
          {openState[item.id] && <MenuList {...props} items={item.children} depth={depth + 1} />}
        </div>
      ))}
    </ul>
  )
}
interface IProps {
  itemRef: (ref: HTMLDivElement | null, item: MenuItemType) => void
  items: MenuItemType[]
  openState: { [key: string]: boolean }
  depth?: number
  onItemClick: (e: React.MouseEvent<HTMLDivElement>, item: MenuItemType) => void
  onItemArrowClick: (e: React.MouseEvent<HTMLDivElement>, item: MenuItemType) => void
  onItemAddClick: (e: React.MouseEvent<HTMLDivElement>, item: MenuItemType) => void
  onItemMoreClick: (e: React.MouseEvent<HTMLDivElement>, item: MenuItemType) => void
}
