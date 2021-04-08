import { useTranslation as useTranslationRaw } from 'next-i18next'

const useTranslation = (modules: string[]) => {
  const { t } = useTranslationRaw(modules)
  return {
    t: (value: string, variables: object = {}) => {
      return t(value, variables)
    },
  }
}

export default useTranslation
