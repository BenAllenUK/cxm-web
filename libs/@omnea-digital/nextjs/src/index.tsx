// import styles from './styles.module.css'
import React, { ElementType } from 'react'

import axios from 'axios'
// import type {
//   GetStaticPaths,
//   GetStaticPathsContext,
//   GetStaticProps,
//   GetStaticPropsContext
// } from 'next'

// import type { AppProps as NextJsAppProps } from 'next/app'

type GetStaticPaths = any
type GetStaticPathsContext = any
type GetStaticProps = any
type GetStaticPropsContext = any
type NextJsAppProps = any

import hoistNonReactStatics from 'hoist-non-react-statics'
import { Article, ComponentProps, Config, ArticleRaw } from './types'
import Content from './components/Content'

type AppProps = NextJsAppProps & ComponentProps

var _cachedArticles: Article[] | null = null
var _isInitialized: boolean = false
var _config: Config | null = null

initOmnea()

export function initOmnea(config?: Config) {
  const newConfig = {
    rootUrl: config?.rootUrl || (process.env.OMNEA_ROOT_URL as string) || '',
    projectId:
      config?.projectId || (process.env.OMNEA_PROJECT_ID as string) || '',
    secretKey:
      config?.secretKey || (process.env.OMNEA_SECRET_KEY as string) || ''
  }

  if (!newConfig.rootUrl) {
    console.error(`[Omnea Error] Missing OMNEA_ROOT_URL env var`)
    return
  }

  if (!newConfig.projectId) {
    console.error(`[Omnea Error] Missing OMNEA_PROJECT_ID env var`)
    return
  }

  if (!newConfig.secretKey) {
    console.error(`[Omnea Error] Missing OMNEA_SECRET_KEY env var`)
    return
  }

  _config = newConfig
}

function getConfig() {
  return _config
}

async function fetchProjectData(url: string) {
  if (!_isInitialized) {
    initOmnea()
  }

  const config = getConfig()

  if (!config) {
    return null
  }

  return axios.get(`${config.rootUrl}/${config.projectId}${url}`)
}

async function fetchArticles(): Promise<Article[] | null> {
  if (_cachedArticles) {
    return _cachedArticles
  }

  const response = await fetchProjectData(`/articles`)
  if (!response?.data) {
    return null
  }

  let articles = response.data.articles || []
  const articlesFormatted = articles.map((item: ArticleRaw) => ({
    ...item,
    blocks: item.blocks.map((blockItem) => ({
      ...blockItem,
      payload: blockItem.payload ? JSON.parse(blockItem.payload) : null
    }))
  }))

  _cachedArticles = articlesFormatted

  return articlesFormatted
}

export const withOmneaPage = (
  WrappedComponent: React.ComponentType<AppProps> | any
) => {
  const AppWithStaticPages = (props: AppProps) => {
    // @ts-ignore
    const article = props.article

    if (!article) {
      return <WrappedComponent {...props} />
    }

    return <Content article={article} />
  }

  return hoistNonReactStatics(AppWithStaticPages, WrappedComponent)
}

export const withOmneaStaticPaths = (handler: GetStaticPaths) => async (
  context: GetStaticPathsContext
) => {
  const articles = await fetchArticles()
  const original = await handler(context)

  if (!articles) {
    return original
  }

  const newPaths = articles.map((item) => ({
    params: { path: item.path.split('/') }
  }))

  return {
    ...original,
    paths: [...original.paths, ...newPaths],
    fallback: true
  }
}

export const withOmneaStaticProps = (handler: GetStaticProps) => async (
  context: GetStaticPropsContext
) => {
  const articles = await fetchArticles()

  const original = await handler(context)
  const path = context.params?.path

  if (!path || !articles) {
    return original
  }

  const fullPath = Array.isArray(path) ? path.join('/') : path
  const [article] = articles.filter((item) => item.path === fullPath)
  console.log(article)

  if (!article) {
    return original
  }

  return {
    ...original,
    props: {
      ...original['props'],
      article
    }
  }
}
