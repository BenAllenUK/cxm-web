import { MenuItem } from 'components/navigation/sidebar'
import { Article } from 'operations/articles/types'
import tree from '../objects/tree'

function parseMenu(data: Article[]): MenuItem[] {
  if (data.length === 0) {
    return []
  }

  const menuItemsList = data.map((item) => ({
    id: item.id,
    label: item.title,
    children: [],
    parentId: item.parentId || null,
  }))
  const menuItemsTree = tree<MenuItem>(menuItemsList)
  return menuItemsTree as MenuItem[]
}

export default parseMenu
