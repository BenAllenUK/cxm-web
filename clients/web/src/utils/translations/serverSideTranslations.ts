import { serverSideTranslations as serverSideTranslationsMapped } from 'next-i18next/serverSideTranslations'
import path from 'path'

const serverSideTranslations = async (locale: string | undefined, modules: string[]) => {
  return serverSideTranslationsMapped(locale, modules, {
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'fr'],
    },
    localePath: path.resolve('./public/locales'),
  })
}

export default serverSideTranslations
