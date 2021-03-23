import { ApolloProvider, QueryResult } from '@apollo/client'
import { useApollo } from 'config/graphql'
import { createContext, useContext } from 'react'
import { GetUserOneQuery } from 'generated/graphql'

type UserResult = QueryResult<GetUserOneQuery>

type UserContext = {
  userId: number | null
  idToken: string | null
  email: string | null
  user: NonNullable<UserResult['data']>['users_by_pk'] | null
}

export const UserContext = createContext<UserContext>({
  userId: null,
  idToken: null,
  email: null,
  user: null,
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
