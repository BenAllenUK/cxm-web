import { useTranslation } from 'config/translation'

export default function Home() {
  const { t } = useTranslation(['common'])
  return <h1>{t('welcome')}</h1>
}
