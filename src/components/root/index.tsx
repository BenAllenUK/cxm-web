import { Provider } from 'react-redux'

import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'config/graphql'
import { createContext, useContext } from 'react'
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

export const useUser = () => useContext(UserContext)

export default function Root({ initialApolloState, initialReduxState, initialUserContext, children }: any) {
  const apolloClient = useApollo(initialApolloState)
  return (
    <ApolloProvider client={apolloClient}>
      <UserContext.Provider value={initialUserContext}>{children}</UserContext.Provider>
    </ApolloProvider>
  )
}
