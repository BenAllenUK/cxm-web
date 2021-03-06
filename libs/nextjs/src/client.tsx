import hoistNonReactStatics from 'hoist-non-react-statics'
import {
  Article,
  Config,
  ArticleRaw,
  AppPropsWithOmnea,
  WithOmneaCustomPage
} from './types'
import Content from './components/Content'
import Loading from './components/Loading'
import fetch from 'node-fetch'
import {
  WithOmneaStaticProps,
  WithOmneaStaticPaths,
  WithOmneaPage,
  Client
} from './types'

export default function init(config?: Config): Client {
  let client: Client | null = null
  var _cachedArticles: Article[] | null = null
  var _isInitialized: boolean = false
  var _config: Config | null = null

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

    const response = await fetch(
      `${config.rootUrl}/${config.projectSlug}${url}`
    )

    const data = response.json()
    return data
  }

  async function fetchArticles(): Promise<Article[] | null> {
    if (_cachedArticles) {
      return _cachedArticles
    }

    const response = await fetchProjectData(`/articles`)
    if (!response) {
      return null
    }

    let articles = response || []

    _cachedArticles = articles

    return articles
  }

  function initOmnea(config?: Config) {
    const newConfig = {
      rootUrl: config?.rootUrl || (process.env.OMNEA_ROOT_URL as string) || '',
      projectSlug:
        config?.projectSlug || (process.env.OMNEA_PROJECT_SLUG as string) || '',
      secretKey:
        config?.secretKey || (process.env.OMNEA_SECRET_KEY as string) || ''
    }

    if (!newConfig.rootUrl) {
      console.error(`[Omnea Error] Missing OMNEA_ROOT_URL env var`)
      return
    }

    if (!newConfig.projectSlug) {
      console.error(`[Omnea Error] Missing OMNEA_PROJECT_SLUG env var`)
      return
    }

    if (!newConfig.secretKey) {
      console.error(`[Omnea Error] Missing OMNEA_SECRET_KEY env var`)
      return
    }

    _config = newConfig
  }

  const withOmneaPage: WithOmneaPage = (FallbackPage?) => {
    const AppWithStaticPages = (props: AppPropsWithOmnea) => {
      const article = props.article

      if (!article) {
        return FallbackPage ? <FallbackPage {...props} /> : <Loading />
      }

      return <Content article={article} />
    }

    return hoistNonReactStatics(AppWithStaticPages, FallbackPage)
  }

  const withOmneaCustomPage: WithOmneaCustomPage = (WrappedComponent) => {
    const AppWithStaticPages = (props: AppPropsWithOmnea) => {
      const article = props.article
      return <WrappedComponent {...props} article={article} />
    }

    return hoistNonReactStatics(AppWithStaticPages, WrappedComponent)
  }

  const withOmneaStaticPaths: WithOmneaStaticPaths = (handler) => async (
    context
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

  const withOmneaStaticProps: WithOmneaStaticProps = (handler) => async (
    context
  ) => {
    const articles = await fetchArticles()

    const original = await handler(context)
    const path = context.params?.path

    if (!path || !articles) {
      return original
    }

    const fullPath = (Array.isArray(path) ? path.join('/') : path) || ''

    const [article] = articles.filter((item) => item.path === fullPath)

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

  initOmnea(config)
  client = {
    withOmneaStaticPaths,
    withOmneaPage,
    withOmneaCustomPage,
    withOmneaStaticProps
  }
  return client
}
