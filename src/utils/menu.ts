import { MenuItem } from 'components/navigation/sidebar'
import { GetArticlesQueryResult } from 'generated/graphql'
import { unflatten } from './tree'

type Data = NonNullable<GetArticlesQueryResult['data']>

export function formatMenu(data: Data): MenuItem[] {
  const menuItemsList = data.articles.map((item) => ({
    id: item.id,
    label: item.title,
    isOpen: false,
    children: [],
    parentId: item.parent_id || null,
  }))
  const menuItemsTree = unflatten<MenuItem>(menuItemsList)

  return menuItemsTree as MenuItem[]
}
