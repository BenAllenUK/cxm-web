import { APIGatewayProxyHandler } from 'aws-lambda'
import lambdaToNext from 'utils/lamdaToNext'
import { handleProfile, ProfileOptions } from '@auth0/nextjs-auth0'

import error from 'utils/error'

export const main: APIGatewayProxyHandler = async (event, context) => {
  try {
    console.log('called')
    console.log({ event })
    const content = await lambdaToNext(handleProfile, {} as ProfileOptions)(event, context)
    console.log({ content })
    return content
  } catch (e) {
    return error(e)
  }
}
