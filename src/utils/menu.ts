import { MenuItem } from 'components/navigation/sidebar'
import { unflatten } from './tree'

export function parseMenu(
  data: { id: number; title: string; parent_id?: number | null }[]
): MenuItem[] {
  if (data.length === 0) {
    return []
  }

  const menuItemsList = data.map((item) => ({
    id: item.id,
    label: item.title,
    children: [],
    parentId: item.parent_id || null,
  }))
  const menuItemsTree = unflatten<MenuItem>(menuItemsList)
  return menuItemsTree as MenuItem[]
}
