import { ApolloClient, gql, InMemoryCache, makeVar } from '@apollo/client'

import { HttpLink } from '@apollo/client/link/http'
import { WebSocketLink } from '@apollo/client/link/ws'
import { useMemo } from 'react'

import { ApolloProvider } from '@apollo/client'

export let apolloClient: any

export function initializeApollo(initialState: any = {}) {
  const _apolloClient = apolloClient ?? createGraphQLClient()

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient
  return _apolloClient
}

export function useApollo(initialState: any = {}) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
export const isLoggedInVar = makeVar<boolean>(false) // !!localStorage.getItem('token')

const cache = new InMemoryCache()

export function createGraphQLClient() {
  if (typeof window === 'undefined') {
    return new ApolloClient({
      ssrMode: true,
      link: new HttpLink({
        uri: process.env.GRAPHQL_ENDPOINT || 'https://cxm.hasura.app/v1/graphql',
        headers: {
          'X-Hasura-admin-secret': 'BARBAR',
        },
      }),
      cache: new InMemoryCache(),
    })
  }
  return new ApolloClient({
    connectToDevTools: true,

    link: new WebSocketLink({
      uri: 'wss://cxm.hasura.app/v1/graphql',
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            'X-Hasura-admin-secret': 'BARBAR',
          },
        },
      },
    }),
    cache: cache,
  })
}
