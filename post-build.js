const fs = require('fs-extra')

console.log('-> Copying locales directory...')
const localeSrc = './public/locales'
const localeDest = './.serverless_nextjs/default-lambda/public/locales'
fs.copySync(localeSrc, localeDest, { recursive: true })

const localeSrc1 = './next-i18next.config.js'
const localeDest1 = './.serverless_nextjs/default-lambda/next-i18next.config.js'
fs.copySync(localeSrc1, localeDest1)

const localeSrc2 = './next.config.js'
const localeDest2 = './.serverless_nextjs/default-lambda/next.config.js'
fs.copySync(localeSrc2, localeDest2)

console.log('Locale directory was copied successfully')
