import * as React from 'react'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'

import Header from './Header'
import EditorActivity from './editor-activity/EditorActivity'
/* 
import { useAuth0 } from './Auth/react-auth0-spa'

const { loading, logout } = useAuth0()
  if (loading) {
    return <div>Loading...</div>
  }

*/

const createApolloClient = (authToken: string) => {
  return new ApolloClient({
    link: new WebSocketLink({
      uri: process.env.GRAPHQL_ENDPOINT || 'ws://cxm.hasura.app/v1/graphql',
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      },
    }),
    cache: new InMemoryCache(),
  })
}

const App = ({ idToken }: { idToken: string }) => {
  const client = createApolloClient(idToken)

  return (
    <ApolloProvider client={client}>
      <div>
        <Header logoutHandler={() => {}} />
        <EditorActivity />
      </div>
    </ApolloProvider>
  )
}

export default App
