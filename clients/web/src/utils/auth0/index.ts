import { initAuth0 } from '@auth0/nextjs-auth0'

const auth0: ReturnType<typeof initAuth0> = initAuth0({
  secret: process.env.AUTH0_SECRET,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  routes: {
    postLogoutRedirect: process.env.AUTH0_POST_LOGOUT_REDIRECT,
    callback: process.env.AUTH0_CALLBACK,
    // @ts-ignore
    login: process.env.NEXT_PUBLIC_AUTH0_LOGIN,
  },
  session: {
    cookie: {
      domain: process.env.AUTH0_COOKIE_DOMAIN,
    },
  },
})

export default auth0
