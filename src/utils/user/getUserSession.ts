import { getSession } from '@auth0/nextjs-auth0'
import { GetServerSideProps } from 'next'
import { IncomingMessage, ServerResponse } from 'http'
import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils'

function getUserSession(
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  },
  res: ServerResponse
) {
  const session = getSession(req, res)

  const idToken = session?.idToken
  const user = session?.user

  if (!user || !idToken) {
    return null
  }

  const userId = Number(session?.user['https://hasura.io/jwt/claims']['x-hasura-user-id'])
  return { userId, idToken, user }
}

export default getUserSession
