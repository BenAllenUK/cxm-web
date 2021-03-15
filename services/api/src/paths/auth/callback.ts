import { APIGatewayProxyHandler } from 'aws-lambda'
import lambdaToNext from 'utils/lamdaToNext'
import { CallbackOptions, handleCallback } from '@auth0/nextjs-auth0'
import error from 'utils/error'

export const main: APIGatewayProxyHandler = async (event, context) => {
  try {
    return lambdaToNext(handleCallback, {} as CallbackOptions)(event, context)
  } catch (e) {
    return error(e)
  }
}
