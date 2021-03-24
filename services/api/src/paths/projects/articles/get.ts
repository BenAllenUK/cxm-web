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
    const { projectId } = event.pathParameters

    // TODO: Filter
    if (!projectId) {
      notfound()
      return
    }

    const response = await client.request(Articles.GetArticlesWithBlocks, { projectId })
    const out = response?.projects_by_pk
    if (!out) {
      notfound()
      return
    }

    return {
      statusCode: 200,
      body: JSON.stringify(out),
    }
  } catch (e) {
    return error(e)
  }
}
