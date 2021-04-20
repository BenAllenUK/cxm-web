import Button from 'components/common/button/Button'
import styles from './Breadcrumbs.module.scss'
import { BreadcrumbItem } from './types'

const BreadcrumbButton = ({ onClick, crumb, isModal }: IProps) => {
  const _onClick = () => {
    onClick(crumb.link)
  }
  return (
    <Button className={isModal ? styles.buttonModal : styles.button} onClick={_onClick}>
      {crumb.title}
    </Button>
  )
}

interface IProps {
  onClick: (link: string) => void
  crumb: BreadcrumbItem
  isModal?: boolean
}

export default BreadcrumbButton
