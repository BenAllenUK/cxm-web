import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'config/graphql'
import { createContext, useContext } from 'react'
import { Projects } from 'generated/graphql'

type UserContext = {
  userId: number | null
  organisationId: number | null
  projects: Projects[]
  idToken: string | null
}

export const UserContext = createContext<UserContext>({
  userId: null,
  organisationId: null,
  projects: [],
  idToken: null,
})

export const useUser = () => useContext(UserContext)

export default function Root({ initialApolloState, initialReduxState, initialUserContext, children }: any) {
  const apolloClient = useApollo(initialApolloState, initialUserContext.idToken)
  return (
    <ApolloProvider client={apolloClient}>
      <UserContext.Provider value={initialUserContext}>{children}</UserContext.Provider>
    </ApolloProvider>
  )
}
