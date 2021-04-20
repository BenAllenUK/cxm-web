import styles from './Breadcrumbs.module.scss'
import Button from 'components/common/button/Button'
import { ReactNode, Children, useState, MouseEvent } from 'react'

function insertSeparators(items: ReactNode[], separator: ReactNode) {
  return items.reduce((acc: any[], current: any, index: number) => {
    if (index < items.length - 1) {
      acc = acc.concat(
        current,
        <li aria-hidden key={`separator-${index}`} className={styles.container}>
          {separator}
        </li>
      )
    } else {
      acc.push(current)
    }
    return acc
  }, [])
}

const DefaultSeparator = ({}) => {
  return <div className={styles.separator}>/</div>
}

const Breadcrumb = ({ children, itemsAfterCollapse = 1, itemsBeforeCollapse = 1, maxItems = 2, separator }: IProps) => {
  const [expanded, setExpanded] = useState(false)

  const renderItemsBeforeAndAfter = (allItems: ReactNode[]) => {
    const handleClickExpand = (event: MouseEvent) => {
      setExpanded(true)
      if (!event.currentTarget.parentNode) {
        return
      }

      const focusable = event.currentTarget.parentNode.querySelector('a[href],button,[tabindex]')
      if (focusable) {
        ;(focusable as HTMLElement)?.focus()
      }
    }

    if (itemsBeforeCollapse + itemsAfterCollapse >= allItems.length) {
      console.error(
        [
          'Material-UI: You have provided an invalid combination of props to the Breadcrumbs.',
          `itemsAfterCollapse={${itemsAfterCollapse}} + itemsBeforeCollapse={${itemsBeforeCollapse}} >= maxItems={${maxItems}}`,
        ].join('\n')
      )
      return allItems
    }

    return [
      ...allItems.slice(0, itemsBeforeCollapse),
      <Button style={{ color: 'black' }} onClick={handleClickExpand}>
        ...
      </Button>,
      ...allItems.slice(allItems.length - itemsAfterCollapse, allItems.length),
    ]
  }

  const allItems = Children.toArray(children).map((child, index) => (
    <div className={styles.li} key={`child-${index}`}>
      {child}
    </div>
  ))

  return (
    <div className={styles.container}>
      {insertSeparators(
        expanded || (maxItems && allItems.length <= maxItems) ? allItems : renderItemsBeforeAndAfter(allItems),
        separator ?? <DefaultSeparator />
      )}
    </div>
  )
}

export default Breadcrumb

interface IProps {
  maxItems: number
  children: ReactNode
  separator?: ReactNode
  itemsAfterCollapse?: number
  itemsBeforeCollapse?: number
}
