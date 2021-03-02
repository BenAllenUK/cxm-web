const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const run = (port) => {
  const dev = process.env.NODE_ENV !== 'production'
  const app = next({ dev })

  const handle = app.getRequestHandler()

  app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl
      console.log(pathname)
      if (pathname.indexOf(`_next`) === -1) {
        // console.log(pathname)
      }

      handle(req, res, parsedUrl)
    }).listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
}

const port = process.argv[2]

console.log(`Starting on port ${port}`)
if (!port) {
  console.log(`Missing module name and port arguments. For example: node development.js src/paths/admin 3000`)
  return
}

run(port)
