import NextI18Next from 'next-i18next'
const path = require('path')

const translator = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: [],
  localePath: path.resolve('./public/locales'),
})

export const appWithTranslation = translator.appWithTranslation
export const useTranslation = translator.useTranslation
