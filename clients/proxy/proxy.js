const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const https = require('https')
const fs = require('fs')

const options = {
  key: fs.readFileSync('omnea.local-key.pem'),
  cert: fs.readFileSync('omnea.local.pem'),
}

const app = express()
const localhostServer = https.createServer(options, app)

const tapi = createProxyMiddleware('/api', {
  target: 'http://localhost:3001',
  changeOrigin: true,
})

const nextProxy = createProxyMiddleware('/_next', {
  target: 'http://localhost:3001',
  changeOrigin: true,
})

const assetProxy = createProxyMiddleware('/assets', {
  target: 'http://localhost:3001',
  changeOrigin: true,
})

// ---------

const [rootIndexProxy, rootPathProxy] = createModuleProxy(`omnea.local`, 'http://localhost:3001', '_root_')
const [adminIndexProxy, adminPathProxy] = createModuleProxy(`admin.omnea.local`, 'http://localhost:3001', 'admin')
const [docsIndexProxy, docsPathProxy] = createModuleProxy(`docs.omnea.local`, 'http://localhost:3001', 'docs')
const [apiIndexProxy, apiPathProxy] = createModuleProxy(`api.omnea.local`, 'http://localhost:3003', 'dev')

// ---------

app.use('/api', tapi)
app.use('/assets', assetProxy)
app.use('/_next', nextProxy)

app.use('**', apiIndexProxy)
app.use('**', apiPathProxy)

app.use('**', docsIndexProxy)
app.use('**', docsPathProxy)

app.use('**', adminIndexProxy)
app.use('**', adminPathProxy)

app.use('**', rootIndexProxy)
app.use('**', rootPathProxy)

localhostServer.listen(3000)

const locales = ['en', 'fr']

function pathRewrite(target, basePath) {
  return (path, req) => {
    // Check for language
    const segments = path.split('/')
    const [_, locale, ...remainingPathItems] = segments

    // No locale present
    if (locales.indexOf(locale) === -1) {
      console.log(basePath, path)
      const resolve = `/${basePath}${path}`
      console.log(`Resolved path: ${target}${resolve}`)
      return resolve
    }

    // Locale present at root
    if (remainingPathItems.length === 0) {
      const resolve = `/${locale}/${basePath}`
      console.log(`Resolved root language path: ${target}${resolve}`)
      return resolve
    }

    // Locale present at path
    const resolve = `/${locale}/${basePath}/${remainingPathItems.join('/')}`
    console.log(`Resolved language path: ${target}${resolve}`)
    return resolve
  }
}

function createModuleProxy(match, target, basePath) {
  const indexFilter = function (pathname, req) {
    return req.headers.host.match(`^(${match})+`) && pathname === '/'
  }

  const indexProxy = createProxyMiddleware(indexFilter, {
    target: target + '/' + basePath,
    changeOrigin: true,
    ignorePath: true,
  })

  const pathFilter = function (pathname, req) {
    return req.headers.host.match(`^(${match})+`) && pathname !== '/'
  }

  const pathProxy = createProxyMiddleware(pathFilter, {
    target: target,
    changeOrigin: true,
    pathRewrite: pathRewrite(target, basePath),
  })

  return [indexProxy, pathProxy]
}
