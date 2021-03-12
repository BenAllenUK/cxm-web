import { useTranslation } from 'next-i18next'
import Button from 'components/common/button/Button'
import styles from './Footer.module.scss'

const Footer = ({ onLogoutClick, onGetAppClick }: IProps) => {
  const { t } = useTranslation(['common'])
  return (
    <div className={styles.container}>
      <Button className={styles.button} onClick={onLogoutClick}>
        {t('modals.projectSelection.account.logout')}
      </Button>
      <div className={styles.line} />
      <Button className={styles.button} onClick={onGetAppClick}>
        {t('modals.projectSelection.getDesktopApp')}
      </Button>
    </div>
  )
}

export default Footer

interface IProps {
  onLogoutClick: () => void
  onGetAppClick: () => void
}
