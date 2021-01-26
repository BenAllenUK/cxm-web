import { MenuItem } from 'components/navigation/sidebar'
import { GetProjectOneQuery } from 'generated/graphql'
import { unflatten } from './tree'

export function parseMenu(
  data: NonNullable<NonNullable<NonNullable<GetProjectOneQuery['projects']>[0]>['articles']>
): MenuItem[] {
  if (data.length === 0) {
    return []
  }

  const menuItemsList = data.map((item) => ({
    id: item.id,
    label: item.title,
    children: [],
    parentId: item.parentId || null,
  }))
  const menuItemsTree = unflatten<MenuItem>(menuItemsList)
  return menuItemsTree as MenuItem[]
}
