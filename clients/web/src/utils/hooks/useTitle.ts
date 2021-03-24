import useTranslation from 'utils/translations/useTranslation'
import { DependencyList, useEffect } from 'react'

const useTitle = (title?: string | null, loading?: boolean, deps?: DependencyList) => {
  const { t } = useTranslation(['common'])
  return useEffect(() => {
    if (title) {
      document.title = t('title', { title })
    } else if (loading) {
      document.title = t('loading')
    } else {
      document.title = t('notFound.pageTitle', { title })
    }
  }, deps)
}

export default useTitle
