import next from 'next'

const app = next({ dev: false })
const handle = app.getRequestHandler()

handle()
