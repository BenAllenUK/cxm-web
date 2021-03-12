import { APIGatewayProxyHandler } from 'aws-lambda'

const main: APIGatewayProxyHandler = async (event) => {
  // async/await also works out of the box
  await new Promise((resolve, reject) => setTimeout(resolve, 500))

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  }
}

module.exports = { main }
