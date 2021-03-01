const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const run = (path, port) => {
  const dev = process.env.NODE_ENV !== 'production'
  const app = next({ dir: path, dev })

  const handle = app.getRequestHandler()

  app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl

      // if (req.headers.host === 'omnea.local:3000') {
      handle(req, res, parsedUrl)
    }).listen(port, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
}

const path = process.argv[2]
const port = process.argv[3]

console.log(`Starting ${path} on port ${port}`)
if (!path || !port) {
  console.log(`Missing module name and port arguments. For example: node development.js src/paths/admin 3000`)
  return
}

run(path, port)
