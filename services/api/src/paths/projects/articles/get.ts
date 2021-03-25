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
    const { projectSlug } = event.pathParameters

    // TODO: Filter
    if (!projectSlug) {
      return notfound()
    }

    const response = await client.request(Articles.GetArticlesWithBlocks, { projectSlug })
    const [project] = response?.projects
    if (!project) {
      return notfound()
    }

    const unwrappedArticles = project.articles.map((item) => ({
      ...item,
      blocks: item.blocks.map((blockItem) => ({
        ...blockItem,
        payload: blockItem.payload ? JSON.parse(blockItem.payload) : null,
      })),
    }))

    return {
      statusCode: 200,
      body: JSON.stringify(unwrappedArticles),
    }
  } catch (e) {
    return error(e)
  }
}
