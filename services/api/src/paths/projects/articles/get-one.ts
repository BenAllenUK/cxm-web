import { APIGatewayProxyHandler } from 'aws-lambda'
import error from 'utils/error'
import { Articles } from '@omnea-digital/queries'
import { GraphQLClient } from 'graphql-request'
import notfound from 'utils/notfound'

const client = new GraphQLClient('https://cxm.hasura.app/v1/graphql', {
  headers: {
    'x-hasura-admin-secret': 'BARBAR',
  },
})

export const main: APIGatewayProxyHandler = async (event) => {
  try {
    const { projectId, articlePath } = event.pathParameters

    // TODO: Add project
    const response = await client.request(Articles.GetArticleOne, { path: articlePath })
    console.log(response)

    const [article] = response?.articles
    if (!article) {
      notfound()
      return
    }

    return {
      statusCode: 200,
      body: JSON.stringify(article),
    }
  } catch (e) {
    return error(e)
  }
}
