// import { useMemo } from 'react'

// let apolloClient: any

// import dynamic from 'next/dynamic'

// export const ApolloProvider = () => {
//   const { ApolloProvider, InMemoryCache } = dynamic(() => import('@apollo/client'))
//   const { HttpLink } = dynamic(() => import('@apollo/client/link/http'))
//   const { WebSocketLink } = dynamic(() => import('@apollo/client/link/ws'))

//   function initializeApollo(initialState: any = {}) {
//     const _apolloClient = apolloClient ?? createGraphQLClient()

//     // If your page has Next.js data fetching methods that use Apollo Client,
//     // the initial state gets hydrated here
//     if (initialState) {
//       // Get existing cache, loaded during client side data fetching
//       const existingCache = _apolloClient.extract()

//       // Restore the cache using the data passed from
//       // getStaticProps/getServerSideProps combined with the existing cached data
//       _apolloClient.cache.restore({ ...existingCache, ...initialState })
//     }

//     // For SSG and SSR always create a new Apollo Client
//     if (typeof window === 'undefined') return _apolloClient

//     // Create the Apollo Client once in the client
//     if (!apolloClient) apolloClient = _apolloClient
//     return _apolloClient
//   }

//   function useApollo(initialState: any = {}) {
//     const store = useMemo(() => initializeApollo(initialState), [initialState])
//     return store
//   }

//   function createGraphQLClient() {
//     return new ApolloClient({
//       ssrMode: typeof window === 'undefined',
//       link: new HttpLink({
//         uri: process.env.GRAPHQL_ENDPOINT || 'https://cxm.hasura.app/v1/graphql',
//         headers: {
//           'X-Hasura-admin-secret': 'BARBAR',
//         },
//       }),
//       cache: new InMemoryCache(),
//     })
//   }
// }

export {}
