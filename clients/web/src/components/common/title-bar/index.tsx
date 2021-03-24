import useTranslation from 'utils/translations/useTranslation'
import styles from './TitleBar.module.scss'

const TitleBar = ({ title }: IProps) => {
  const { t } = useTranslation(['common'])

  return (
    <div className={styles.container}>
      <>{title ? t('title', { title }) : t('loading')}</>
    </div>
  )
}

export default TitleBar

interface IProps {
  title?: string | undefined
}
