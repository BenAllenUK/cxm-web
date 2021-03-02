import { useTranslation } from 'next-i18next'
import { DependencyList, useEffect } from 'react'

const useTitle = (title?: string | null, deps?: DependencyList) => {
  const { t } = useTranslation('common')
  return useEffect(() => {
    document.title = title ? t('title', { title }) : t('loading')
  }, deps)
}

export default useTitle
