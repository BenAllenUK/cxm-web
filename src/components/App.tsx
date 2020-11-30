import * as React from 'react'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import styled from 'styled-components'

import Workflow from './workflow/Workflow'

import { useAuth0 } from './auth/Auth0'
import Editor from './editor'

const Container = styled.div`
  display: flex;
`

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

interface IUserData {
  id: number | null
  organisationId: number | null
  projectId: number | null
}

export const UserContext = React.createContext<IUserData>({
  id: null,
  organisationId: null,
  projectId: null,
})

const App = ({
  idToken,
  userId,
  organisationId,
}: {
  idToken: string
  userId: number
  organisationId: number
}) => {
  const { loading, logout } = useAuth0()
  console.log({ idToken })
  if (loading) {
    return <div>Loading...</div>
  }

  const client = createApolloClient(idToken)

  const userContext = { id: userId, organisationId, projectId: null }

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={userContext}>
        <Container>
          {/* <Workflow /> */}
          <Editor />
        </Container>
      </UserContext.Provider>
    </ApolloProvider>
  )
}

export default App
