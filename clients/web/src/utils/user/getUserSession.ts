import auth0 from 'utils/auth0'
import { IncomingMessage, ServerResponse } from 'http'

function getUserSession(
  req: IncomingMessage & {
    cookies: {
      [key: string]: string
    }
  },
  res: ServerResponse
) {
  const session = auth0.getSession(req, res)

  const idToken = session?.idToken
  const user = session?.user

  if (!user || !idToken) {
    return null
  }

  const userId = Number(session?.user['https://hasura.io/jwt/claims']['x-hasura-user-id'])
  return { userId, idToken, user }
}

export default getUserSession
