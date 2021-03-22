const AWS = require('aws-sdk')
const { appendFileSync, existsSync, writeFileSync } = require('fs')

const util = require('util')
const exec = util.promisify(require('child_process').exec)

var ssm = new AWS.SSM({ region: 'us-east-1' })
const chunk = require('lodash/chunk')

async function fetchParameterDescriptionBatch(prefixes, nextToken) {
  const params = {
    MaxResults: '50',
    NextToken: nextToken ? nextToken : undefined,
    ParameterFilters: [
      {
        Key: 'Name',
        Option: 'BeginsWith',
        Values: prefixes,
      },
    ],
  }
  return await ssm.describeParameters(params).promise()
}

async function fetchAllParameterDescriptions(prefixes) {
  var moreAvailable = true
  var params = []
  var nextToken = undefined
  while (moreAvailable) {
    const { Parameters, NextToken } = await fetchParameterDescriptionBatch(prefixes, nextToken)
    nextToken = NextToken
    params = [...params, ...Parameters]
    if (!NextToken) {
      moreAvailable = false
      break
    }
  }

  return params
}

async function fetchParameterValuesDecryptType(items, WithDecryption) {
  const chunks = chunk(items, 10)
  var result = []
  for (var i = 0; i < chunks.length; i++) {
    const batch = chunks[i]
    var { Parameters: responseParams } = await ssm
      .getParameters({
        Names: batch.map((item) => item.name),
        WithDecryption,
      })
      .promise()
    result = [...result, ...responseParams.map((item) => ({ name: item.Name, value: item.Value }))]
  }
  return result
}

async function fetchParameterValues(items) {
  const regularItemNames = items.filter((item) => !item.decrypt)
  const regularValues = await fetchParameterValuesDecryptType(regularItemNames, false)

  const secureItemNames = items.filter((item) => item.decrypt)
  const secureValues = await fetchParameterValuesDecryptType(secureItemNames, true)

  return [...regularValues, ...secureValues]
}

async function run() {
  const prefix = process.env.DEPLOY_ENVIRONMENT
  const output = '.envars'

  if (prefix !== '/prod/' || prefix !== '/prod/') {
    console.error(`Environment not ok ${prefix}. Must be /prod/ or /stag/`)
    return 1
  }

  const params = await fetchAllParameterDescriptions([prefix])
  const items = params.map((item) => ({ name: item.Name, decrypt: item.Type === 'SecureString' }))
  const values = await fetchParameterValues(items)
  values.forEach((item) => {
    process.env[item.name.replace(prefix, '')] = item.value
  })
  const exportString = values.map((item) => `export ${item.name.replace(prefix, '')}=${item.value};`).join('\n')

  if (existsSync(output)) {
    appendFileSync(output, '\n' + exportString)
  } else {
    writeFileSync(output, exportString, { mode: 0o755 })
  }
}

return run()
