import styles from './Breadcrumbs.module.scss'
import { BreadcrumbItem } from './types'
import BreadcrumbButton from './BreadcrumbButton'
import Breadcrumb from './Breadcrumb'
import { ReactNode, useCallback } from 'react'

const Breadcrumbs = ({ breadcrumbs, onViewArticle, separator, maxItems, isModal }: IProps) => {
  const _onNavigateClick = useCallback(
    (link: string) => {
      onViewArticle(link)
    },
    [onViewArticle]
  )

  return (
    <div className={styles.historyBreadcrumbs}>
      <Breadcrumb maxItems={maxItems} separator={separator}>
        {breadcrumbs.map((item, i) => (
          <BreadcrumbButton key={i} onClick={_onNavigateClick} crumb={item} isModal={isModal} />
        ))}
      </Breadcrumb>
    </div>
  )
}

export default Breadcrumbs

interface IProps {
  breadcrumbs: BreadcrumbItem[]
  onViewArticle: (path: string) => void
  separator: ReactNode
  maxItems: number
  isModal?: boolean
}
