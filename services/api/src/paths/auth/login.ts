import { APIGatewayProxyHandler } from 'aws-lambda'
import lambdaToNext from '../../utils/lamdaToNext'
import { handleLogin, LoginOptions } from '@auth0/nextjs-auth0'
import error from '../../utils/error'

const main: APIGatewayProxyHandler = async (event, context) => {
  try {
    return lambdaToNext(handleLogin, { returnTo: process.env.NEXT_PUBLIC_AUTH_POST_LOGIN } as LoginOptions)(event, context)
  } catch (e) {
    return error(e)
  }
}

module.exports = { main }
