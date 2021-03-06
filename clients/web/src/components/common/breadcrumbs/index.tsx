import MUIBreadcrumbs from '@material-ui/core/Breadcrumbs'
import styles from './Breadcrumbs.module.scss'
import { Article } from 'operations/articles/types'
import BreadcrumbButton from './BreadcrumbButton'

const Breadcrumbs = ({ path, onViewArticle }: IProps) => {
  const _onNavigateClick = (position: number) => {
    onViewArticle(path[position].path)
  }

  return (
    <div className={styles.historyBreadcrumbs}>
      <MUIBreadcrumbs maxItems={4}>
        {path.map((item, i) => (
          <BreadcrumbButton key={i} position={i} onClick={_onNavigateClick} title={item.title} />
        ))}
      </MUIBreadcrumbs>
    </div>
  )
}

export default Breadcrumbs

interface IProps {
  path: Article[]
  onViewArticle: (path: string) => void
}
