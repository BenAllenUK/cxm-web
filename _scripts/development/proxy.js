const express = require('express')
const config = require('../../development.config.json')
const { createProxyMiddleware } = require('http-proxy-middleware')

const keyBy = require('lodash/keyBy')
const mapValues = require('lodash/mapValues')
const languageConfig = require('../../next-i18next.config')
const server = express()

const { proxyHost, proxyPort, rootHost, rootPort, modules, apiHost, apiPort } = config

const locales = languageConfig.i18n.locales

const rootUrl = `http://${rootHost}:${rootPort}`

const routerArray = modules.map((item) => {
  return {
    key: `${item.host}:${proxyPort}`,
    value: `${rootUrl}/${item.path}`,
  }
})

const router = mapValues(keyBy(routerArray, 'key'), 'value')
console.log(`==========`)
routerArray.forEach((item) => {
  console.log(`${item.key} navigates to ${item.value}`)
})
console.log(`==========`)

server.use(
  createProxyMiddleware('/_next', {
    target: `${rootUrl}/_next`,
    pathRewrite: function (path, req) {
      return path.replace('/_next', '')
    },
  })
)

const rootFilter = function (pathname, req) {
  return pathname === '/'
}

server.use(
  createProxyMiddleware(rootFilter, {
    target: rootUrl,
    router,
    ignorePath: true,
    logLevel: 'debug',
  })
)

const nonRootFilterModule = function (pathname, req) {
  return pathname !== '/' && router[req.headers.host]
}

server.use(
  createProxyMiddleware(nonRootFilterModule, {
    target: rootUrl,

    pathRewrite: function (path, req) {
      const destinationPath = router[req.headers.host]
      const rootPath = destinationPath.replace(rootUrl, '')

      // Check for language
      const segments = path.split('/')
      const [_, firstItem, ...remainingPathItems] = segments
      if (locales.indexOf(firstItem) > -1) {
        // Only send to root
        if (remainingPathItems.length === 0) {
          console.log(`Resolved root language path: /${firstItem}/${rootPath}}}`)
          return `/${firstItem}/${rootPath}}`
        }

        console.log(`Resolved language path: /${firstItem}${rootPath}/${remainingPathItems.join('/')}`)
        return `/${firstItem}/${rootPath}/${remainingPathItems.join('/')}`
      }

      console.log(`Resolved path: ${rootPath}${path}`)
      return `${rootPath}${path}`
    },
    logLevel: 'debug',
  })
)

const nonRootFilterAPI = function (pathname, req) {
  return pathname !== '/'
}

server.use(
  createProxyMiddleware(nonRootFilterAPI, {
    target: `http://${apiHost}:${apiPort}/dev`,

    pathRewrite: function (path, req) {
      console.log(`[API] ${path}`)
      return path
    },
    logLevel: 'debug',
  })
)

server.listen(proxyPort)
