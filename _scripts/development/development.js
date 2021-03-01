const concurrently = require('concurrently')
const fs = require('fs-extra')

const config = require(`../../development.config.json`)
const { basePath, modules, coreFiles } = config

modules.forEach((item) => {
  coreFiles.forEach((file) => {
    fs.copySync(`${file}`, `${basePath}/${item.name}/${file}`)
  })
})

concurrently(
  modules.map((item) => `node _scripts/development/server.js ${basePath}/${item.name} ${item.port}`),
  {
    killOthers: true,
  }
)
