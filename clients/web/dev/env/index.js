const AWS = require('aws-sdk')

async function run(env) {
  const ssm = new AWS.SSM()
  const params = await ssm.describeParameters().promise()
  console.log(params.filter((item) => item.Name.indexOf(env) == 0))
}

run('prod')
