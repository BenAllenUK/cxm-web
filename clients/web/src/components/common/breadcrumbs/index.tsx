import styles from './Breadcrumbs.module.scss'
import { BreadcrumbItem } from './types'
import BreadcrumbButton from './BreadcrumbButton'
import Breadcrumb from './Breadcrumb'
import { ReactNode } from 'react'

const Breadcrumbs = ({ breadcrumbs, onViewArticle, separator, maxItems }: IProps) => {
  const _onNavigateClick = (link: string) => {
    onViewArticle(link)
  }

  return (
    <div className={styles.historyBreadcrumbs}>
      <Breadcrumb maxItems={maxItems} separator={separator}>
        {breadcrumbs.map((item, i) => (
          <BreadcrumbButton key={i} onClick={_onNavigateClick} crumb={item} />
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
}
