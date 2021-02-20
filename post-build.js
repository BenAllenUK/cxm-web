const fs = require('fs-extra')

console.log('-> Copying locales directory...')
const localeSrc = './public/locales'
const localeDest = './.serverless_nextjs/default-lambda/public/locales'
fs.copySync(localeSrc, localeDest, { recursive: true })
console.log('Locale directory was copied successfully')
