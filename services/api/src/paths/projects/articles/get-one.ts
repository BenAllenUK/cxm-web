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
    const { projectSlug, articlePath } = event.pathParameters

    const response = await client.request(Articles.GetArticleOne, { projectSlug, path: articlePath })

    const [article] = response?.articles
    if (!article) {
      return notfound()
    }

    const unwrappedArticle = {
      ...article,
      blocks: article.blocks.map((blockItem) => ({
        ...blockItem,
        payload: blockItem.payload ? JSON.parse(blockItem.payload) : null,
      })),
    }

    return {
      statusCode: 200,
      body: JSON.stringify(unwrappedArticle),
    }
  } catch (e) {
    return error(e)
  }
}
