import { Provider } from 'react-redux'

import { useStore } from 'store'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'config/graphql'
import { createContext } from 'react'
import { Projects } from 'generated/graphql'

type UserContext = {
  userId: number | null
  organisationId: number | null
  projects: Projects[]
}

export const UserContext = createContext<UserContext>({
  userId: null,
  organisationId: null,
  projects: [],
})

export default function Root({
  initialApolloState,
  initialReduxState,
  initialUserContext,
  children,
}: any) {
  const store = useStore(initialReduxState)
  const apolloClient = useApollo(initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <UserContext.Provider value={initialUserContext}>{children}</UserContext.Provider>
      </Provider>
    </ApolloProvider>
  )
}
