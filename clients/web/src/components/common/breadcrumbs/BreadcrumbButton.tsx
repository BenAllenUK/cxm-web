import Button from 'components/common/button/Button'
import { BreadcrumbItem } from './types'
import styles from './Breadcrumbs.module.scss'

const BreadcrumbButton = ({ onClick, crumb }: IProps) => {
  const _onClick = () => {
    onClick(crumb.link)
  }
  return (
    <Button className={styles.button} onClick={_onClick}>
      {crumb.title}
    </Button>
  )
}

interface IProps {
  onClick: (link: string) => void
  crumb: BreadcrumbItem
}

export default BreadcrumbButton
