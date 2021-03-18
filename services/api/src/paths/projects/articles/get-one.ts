import { APIGatewayProxyHandler } from 'aws-lambda'
import error from 'utils/error'
import { Articles } from '@omnea-digital/queries'
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient('https://cxm.hasura.app/v1/graphql', {
  headers: {
    'x-hasura-admin-secret': 'BARBAR',
  },
})

export const main: APIGatewayProxyHandler = async (event) => {
  try {
    const { projectId, articleId } = event.pathParameters

    console.log(projectId, articleId)

    // const query = req.queryStringParameters || {}

    const response = await client.request(Articles.GetArticles, { projectId: 1 })
    console.log(response)

    return {
      statusCode: 200,
      body: JSON.stringify({
        query: {},
      }),
    }
  } catch (e) {
    return error(e)
  }
}
