import { APIGatewayProxyHandler } from 'aws-lambda'
import lambdaToNext from 'utils/lamdaToNext'
import { handleLogout, LogoutOptions } from '@auth0/nextjs-auth0'
import error from 'utils/error'

export const main: APIGatewayProxyHandler = async (event, context) => {
  try {
    return lambdaToNext(handleLogout, {} as LogoutOptions)(event, context)
  } catch (e) {
    return error(e)
  }
}
