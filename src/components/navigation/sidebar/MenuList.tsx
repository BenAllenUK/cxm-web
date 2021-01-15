import styles from './Sidebar.module.scss'
import MenuItem from './MenuItem'
import { MenuItem as MenuItemType, SIDEBAR_INDENT } from '.'

export function MenuList(props: IProps) {
  const { items, openState, depth = 0, onItemClick, onItemAddClick, onItemMoreClick } = props
  return (
    <ul className={styles.menu}>
      {items.map((item, index) => (
        <div key={index}>
          <MenuItem
            subList={item.children.length > 0}
            innerStyle={{ paddingLeft: SIDEBAR_INDENT * (depth + 1) }}
            isOpen={openState[item.id]}
            onClick={(e) => onItemClick(e, item)}
            onAddClick={(e) => onItemAddClick(e, item)}
            onMoreClick={(e) => onItemMoreClick(e, item)}
          >
            {item.label}
          </MenuItem>
          {openState[item.id] && <MenuList {...props} items={item.children} depth={depth + 1} />}
        </div>
      ))}
    </ul>
  )
}
interface IProps {
  items: MenuItemType[]
  openState: { [key: string]: boolean }
  depth?: number
  onItemClick: (e: React.MouseEvent<HTMLDivElement>, item: MenuItemType) => void
  onItemAddClick: (e: React.MouseEvent<HTMLDivElement>, item: MenuItemType) => void
  onItemMoreClick: (e: React.MouseEvent<HTMLDivElement>, item: MenuItemType) => void
}
