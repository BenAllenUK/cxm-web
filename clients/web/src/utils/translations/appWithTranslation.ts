import { appWithTranslation as appWithTranslationRaw } from 'next-i18next'
import path from 'path'

const appWithTranslation = (Component: any) => {
  return appWithTranslationRaw(Component, {
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'fr'],
    },
    localePath: path.resolve('./public/locales'),
  })
}

export default appWithTranslation
