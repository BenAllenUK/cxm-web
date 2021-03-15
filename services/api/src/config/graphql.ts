import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'

import { HttpLink } from '@apollo/client/link/http'

export let apolloClient: any

export function initializeApollo(): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createGraphQLClient()
  return _apolloClient
}

export function createGraphQLClient() {
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
