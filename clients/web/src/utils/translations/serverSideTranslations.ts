import { serverSideTranslations as serverSideTranslationsMapped } from 'next-i18next/serverSideTranslations'

const serverSideTranslations = async (locale: string | undefined, modules: string[]) => {
  return serverSideTranslationsMapped(locale, modules)
}

export default serverSideTranslations
