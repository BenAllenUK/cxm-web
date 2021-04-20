import { appWithTranslation as appWithTranslationRaw } from 'next-i18next'
import nextI18NextConfig from '../../../next-i18next.config.js'

const appWithTranslation = (Component: any) => {
  return appWithTranslationRaw(Component, nextI18NextConfig)
}

export default appWithTranslation
