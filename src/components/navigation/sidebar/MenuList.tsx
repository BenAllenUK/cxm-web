import styles from './Sidebar.module.scss'
import MenuItem from './MenuItem'
import { MenuItem as MenuItemType, SIDEBAR_INDENT } from '.'

export function MenuList({ items, onItemClick, indexes = [] }: IProps) {
  return (
    <ul className={styles.menu}>
      {items.map((item, index) => (
        <div key={index}>
          <MenuItem
            subList={item.children.length > 0}
            innerStyle={{ paddingLeft: SIDEBAR_INDENT * (indexes.length + 1) }}
            onClick={() => onItemClick(item.id, [...indexes, index])}
            isOpen={item.isOpen}
          >
            {item.label}
          </MenuItem>
          {item.isOpen && (
            <MenuList
              items={item.children}
              onItemClick={onItemClick}
              indexes={[...indexes, index]}
            />
          )}
        </div>
      ))}
    </ul>
  )
}
interface IProps {
  items: MenuItemType[]
  onItemClick: (id: number, indexes: number[]) => void
  indexes?: number[]
}
