import styles from './EditorEmpty.module.scss'
import useTranslation from 'utils/translations/useTranslation'

const EditorEmpty = ({}: IProps) => {
  const { t } = useTranslation(['common'])
  return (
    <div className={styles.container}>
      <>
        <h1 className={styles.title}>{t('notFound.title')}</h1>
        <h4 className={styles.subtitle}>{t('notFound.subtitle')}</h4>
      </>
    </div>
  )
}

export default EditorEmpty

interface IProps {}
