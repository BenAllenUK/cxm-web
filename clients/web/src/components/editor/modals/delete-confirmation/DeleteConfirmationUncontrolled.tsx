import Button from 'components/common/button/Button'
import useTranslation from 'utils/translations/useTranslation'
import styles from './DeleteConfirmation.module.scss'

const DeleteConfirmationUncontrolled = ({ onAccept, onDecline }: IProps) => {
  const { t } = useTranslation(['common'])

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.message}>{t('modals.confirmation.messageDelete')}</div>

        <div className={styles.actions}>
          <Button onClick={onDecline} className={styles.declineButton}>
            {t('modals.confirmation.decline')}
          </Button>
          <Button onClick={onAccept} className={styles.acceptButton}>
            {t('modals.confirmation.accept')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmationUncontrolled

interface IProps {
  onAccept: () => void
  onDecline: () => void
}
