import { APIGatewayProxyHandler } from 'aws-lambda'
import error from 'utils/error'
// import { Articles } from '@omnea-digital/queries'

export const main: APIGatewayProxyHandler = async (event) => {
  try {
    const body = event.body ? JSON.parse(event.body) : {}

    return {
      statusCode: 200,
      body: JSON.stringify({
        // query: Articles.GetArticles.GetArticlesRaw,
      }),
    }
  } catch (e) {
    return error(e)
  }
}
