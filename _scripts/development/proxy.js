const express = require('express')
const config = require('../../development.config.json')
const { createProxyMiddleware } = require('http-proxy-middleware')

const keyBy = require('lodash/keyBy')
const mapValues = require('lodash/mapValues')
const languageConfig = require('../../next-i18next.config')
const server = express()

const { sourceHost, sourcePort, baseTargetHost, baseTargetPort, modules, api } = config

const locales = languageConfig.i18n.locales

const targetBaseUrl = `http://${baseTargetHost}:${baseTargetPort}`

const routerArray = modules.map((item) => {
  return {
    key: `${item.host}:${sourcePort}`,
    value: `${targetBaseUrl}/${item.path}`,
  }
})

const router = mapValues(keyBy(routerArray, 'key'), 'value')
console.log(`==========`)
routerArray.forEach((item) => {
  console.log(`${item.key} navigates to ${item.value}`)
})
console.log(`==========`)

//////////////////////////////////////////////////////////////////////////////////////
// Map all /_next requests to main NextJS App. Ignores modules.
//   i.e example.local/_next/{path...} -> localhost:3003/_next/{path...}
//   i.e foo.example.local/fr/asdfasdf -> localhost:3003/_next/{path...}
//////////////////////////////////////////////////////////////////////////////////////
server.use(
  createProxyMiddleware('/_next', {
    target: `${targetBaseUrl}/_next`,
    pathRewrite: function (path, req) {
      return path.replace('/_next', '')
    },
  })
)

//////////////////////////////////////////////////////////////////////////////////////
// Map all / requests to each NextJS App. Exclude path since we are at root
//   i.e foo.example.local/asdfasdf -> localhost:3003/foo/
//////////////////////////////////////////////////////////////////////////////////////

const rootFilter = function (pathname, req) {
  return pathname === '/' && router[req.headers.host]
}

server.use(
  createProxyMiddleware(rootFilter, {
    target: targetBaseUrl,
    router,
    ignorePath: true,
    logLevel: 'debug',
  })
)

//////////////////////////////////////////////////////////////////////////////////////
// Map all /{path...} requests to each NextJS App. Include path since not at root
// Also take into account language.
//   i.e foo.example.local/fr/asdfasdf -> localhost:3003/fr/foo/asfasdfasd
//   i.e bar.example.local/asdfasdf -> localhost:3003/bar/asfasdfasd
//////////////////////////////////////////////////////////////////////////////////////

const nonRootFilterModule = function (pathname, req) {
  return pathname !== '/' && router[req.headers.host]
}

server.use(
  createProxyMiddleware(nonRootFilterModule, {
    target: targetBaseUrl,

    pathRewrite: function (path, req) {
      const destinationPath = router[req.headers.host]
      const rootPath = destinationPath.replace(targetBaseUrl, '')

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

//////////////////////////////////////////////////////////////////////////////////////
// Map all api.example.local requests to the API.
//   i.e api.example.local/item/1 -> localhost:3003/item/1
//////////////////////////////////////////////////////////////////////////////////////

const nonRootFilterAPI = function (pathname, req) {
  console.log(req.headers.host)
  return req.headers.host === api.sourceHost
}

server.use(
  createProxyMiddleware(nonRootFilterAPI, {
    target: `http://${api.targetHost}:${api.targetPort}/${api.targetPath}`,
    pathRewrite: function (path, req) {
      console.log(`[API] ${path}`)
      return path
    },
    logLevel: 'debug',
  })
)

//////////////////////////////////////////////////////////////////////////////////////
// Map all uncaught requests to root module
//   i.e localhost:3000/bar -> localhost:3003/bar
//////////////////////////////////////////////////////////////////////////////////////

const localHostRootFilter = function (pathname, req) {
  return pathname === '/' && req.headers.host === `${sourceHost}:${sourcePort}`
}

server.use(
  createProxyMiddleware(localHostRootFilter, {
    target: `http://${baseTargetHost}:${baseTargetPort}/_root_`,
    pathRewrite: function (path, req) {
      return path
    },
    ignorePath: true,
    logLevel: 'debug',
  })
)

//////////////////////////////////////////////////////////////////////////////////////
// Map all uncaught requests to root module
//   i.e localhost:3000/bar -> localhost:3003/bar
//////////////////////////////////////////////////////////////////////////////////////

const localHostFilter = function (pathname, req) {
  return pathname !== '/' && req.headers.host === `${sourceHost}:${sourcePort}`
}

server.use(
  createProxyMiddleware(localHostFilter, {
    target: `http://${baseTargetHost}:${baseTargetPort}/_root_`,
    pathRewrite: function (path, req) {
      return path
    },
    logLevel: 'debug',
  })
)

server.listen(sourcePort)
