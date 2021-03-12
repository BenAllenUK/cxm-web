import { APIGatewayProxyHandler } from 'aws-lambda'
import { initializeApollo } from 'config/graphql'
import error from 'utils/error'
import notfound from 'utils/notfound'
import GET_ARTICLE_ONE from '@omnea/queries/articles/GET_ARTICLE_ONE'

/**
 * @openapi
 *
 * /articles/{id}:
 *   post:
 *     produces:
 *       - application/json
 */
const main: APIGatewayProxyHandler = async (event) => {
  try {
    const id = event.pathParameters?.id

    const client = initializeApollo()

    const { data } = await client.query({
      query: GET_ARTICLE_ONE,
      variables: {
        path: 'new-2021-02-23T17:01:20.019Z',
      },
    })

    if (!data) {
      return notfound()
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        id,
      }),
    }
  } catch (e) {
    return error(e)
  }
}

module.exports = { main }
