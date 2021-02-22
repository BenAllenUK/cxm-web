import NextI18Next from 'next-i18next'
const path = require('path')
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig

const translator = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['fr', 'es'],
  localePath: path.resolve('./public/locales'),
  localeSubpaths,
  fallbackLng: 'en',
})

export const appWithTranslation = translator.appWithTranslation
export const useTranslation = translator.useTranslation
